<?php
/**
 * Shared bootstrap for every API endpoint: headers, CORS, JSON helpers,
 * and row->JS mapping. No output is allowed before this runs.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=60');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    // Echo the requesting origin so the API also works from the Vite dev server
    // (http://localhost:5173) without relaxing CORS for everyone.
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_out($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $status = 500, array $extra = []): void
{
    json_out(['ok' => false, 'error' => $message] + $extra, $status);
}

/** Wrap a handler so any exception becomes clean JSON instead of a blank 500. */
function api(callable $handler): void
{
    try {
        $handler();
    } catch (PDOException $e) {
        error_log('[api] PDO: ' . $e->getMessage());
        fail('Database connection failed. Check api/.config.php (host, database, user, password).', 503);
    } catch (Throwable $e) {
        error_log('[api] ' . $e->getMessage());
        fail('Internal server error.', 500);
    }
}

/** JSON column -> PHP array (tolerates NULL and already-decoded values). */
function json_col($value, array $fallback = []): array
{
    if ($value === null || $value === '') {
        return $fallback;
    }
    if (is_array($value)) {
        return $value;
    }
    $decoded = json_decode((string) $value, true);
    return is_array($decoded) ? $decoded : $fallback;
}

/**
 * Map a `properties` row to the exact TypeScript Property shape.
 *
 * Key order matches the Property interface in src/lib/data.ts, and the boolean
 * flags are OMITTED when false (not sent as false) so the JSON is identical to
 * the original hand-written data.ts. Same keys, same order, same values — the
 * rendered markup is therefore unchanged.
 */
function row_to_property(array $r): array
{
    $out = [
        'id'      => (string) $r['id'],
        'slug'    => (string) $r['slug'],
        'title'   => (string) $r['title'],
        'titleUr' => (string) ($r['title_ur'] ?? ''),
        'city'    => (string) $r['city'],
        'area'    => (string) ($r['area'] ?? ''),
        'type'    => (string) $r['type'],
        'purpose' => (string) $r['purpose'],
        'price'   => (int) $r['price'],
        'beds'    => (int) $r['beds'],
        'baths'   => (int) $r['baths'],
        'size'    => (string) ($r['size_label'] ?? ''),
        'sqft'    => (int) $r['sqft'],
        'image'   => (string) ($r['image'] ?? ''),
        'gallery' => json_col($r['gallery'] ?? null),
    ];

    if (!empty($r['featured'])) {
        $out['featured'] = true;
    }
    if (!empty($r['verified'])) {
        $out['verified'] = true;
    }
    if (!empty($r['installments'])) {
        $out['installments'] = true;
    }
    if (($r['badge'] ?? null) !== null && $r['badge'] !== '') {
        $out['badge'] = (string) $r['badge'];
    }

    $out['description'] = (string) ($r['description'] ?? '');
    $out['amenities']   = json_col($r['amenities'] ?? null);
    $out['agent']       = (string) ($r['agent'] ?? '');
    $out['agentPhone']  = (string) ($r['agent_phone'] ?? '');
    $out['posted']      = (string) ($r['posted_label'] ?? '');
    $out['possession']  = (string) ($r['possession'] ?? '');

    return $out;
}

/** Query-string filters shared by the list endpoint. */
function request_filters(): array
{
    $q = $_GET;

    $filters = [];
    if (!empty($q['city']))    { $filters['city']    = (string) $q['city']; }
    if (!empty($q['purpose'])) { $filters['purpose'] = (string) $q['purpose']; }
    if (!empty($q['type']))    { $filters['type']    = (string) $q['type']; }
    if (isset($q['featured']) && $q['featured'] !== '') {
        $filters['featured'] = (int) $q['featured'];
    }
    if (isset($q['min']) && $q['min'] !== '') { $filters['min'] = (int) $q['min']; }
    if (isset($q['max']) && $q['max'] !== '') { $filters['max'] = (int) $q['max']; }

    return $filters;
}
