<?php
/**
 * Site content endpoint — everything in data.ts that is not a property.
 *
 *   GET /api/content.php  -> { cities, testimonials, services, team,
 *                             milestones, offices, settings }
 *
 * Every list is optional on the frontend: if a key is missing or empty the
 * app falls back to the bundled static copy, so partial imports still work.
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

api(function (): void {
    $pdo = db();

    $out = ['ok' => true];

    $cities = $pdo->query(
        'SELECT name, listings, image FROM cities ORDER BY sort_order ASC, id ASC'
    )->fetchAll();
    $out['cities'] = array_map(static function (array $r): array {
        return [
            'name'     => (string) $r['name'],
            'listings' => (int) $r['listings'],
            'image'    => (string) ($r['image'] ?? ''),
        ];
    }, $cities);

    $out['testimonials'] = array_map(static function (array $r): array {
        return [
            'name'  => (string) $r['name'],
            'role'  => (string) ($r['role'] ?? ''),
            'text'  => (string) ($r['text'] ?? ''),
            'stars' => (int) $r['stars'],
        ];
    }, $pdo->query('SELECT name, role, text, stars FROM testimonials ORDER BY sort_order ASC, id ASC')->fetchAll());

    $out['services'] = array_map(static function (array $r): array {
        return [
            'title'    => (string) $r['title'],
            'titleUr'  => (string) ($r['title_ur'] ?? ''),
            'icon'     => (string) ($r['icon'] ?? ''),
            'blurb'    => (string) ($r['blurb'] ?? ''),
            'points'   => json_col($r['points'] ?? null),
        ];
    }, $pdo->query('SELECT title, title_ur, icon, blurb, points FROM services ORDER BY sort_order ASC, id ASC')->fetchAll());

    $out['team'] = array_map(static function (array $r): array {
        return [
            'name'  => (string) $r['name'],
            'role'  => (string) ($r['role'] ?? ''),
            'city'  => (string) ($r['city'] ?? ''),
            'years' => (int) $r['years'],
            'image' => (string) ($r['image'] ?? ''),
        ];
    }, $pdo->query('SELECT name, role, city, years, image FROM team ORDER BY sort_order ASC, id ASC')->fetchAll());

    $out['milestones'] = array_map(static function (array $r): array {
        return [
            'year' => (string) $r['year'],
            'text' => (string) ($r['text'] ?? ''),
        ];
    }, $pdo->query('SELECT year, text FROM milestones ORDER BY sort_order ASC, id ASC')->fetchAll());

    $out['offices'] = array_map(static function (array $r): array {
        return [
            'city'    => (string) $r['city'],
            'address' => (string) ($r['address'] ?? ''),
            'phone'   => (string) ($r['phone'] ?? ''),
        ];
    }, $pdo->query('SELECT city, address, phone FROM offices ORDER BY sort_order ASC, id ASC')->fetchAll());

    $settings = [];
    foreach ($pdo->query('SELECT `key`, value FROM site_settings')->fetchAll() as $r) {
        $settings[(string) $r['key']] = (string) ($r['value'] ?? '');
    }
    $out['settings'] = $settings;

    json_out($out);
});
