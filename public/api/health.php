<?php
/**
 * Connection health check. Open in a browser after uploading:
 *
 *   https://yourdomain.com/api/health.php
 *
 * Tells you exactly what is wrong: config missing, host unreachable, wrong
 * password, or tables not imported. DELETE THIS FILE once it is green.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: text/html; charset=utf-8');

$checks = [];

$configFile = is_readable(__DIR__ . '/.config.php') ? __DIR__ . '/.config.php' : null;
$checks[] = [
    'Config file',
    $configFile ? 'found: ' . basename((string) $configFile) : 'MISSING — create api/.config.php',
    (bool) $configFile,
];

if ($configFile) {
    $c = require $configFile;
    $checks[] = ['Host', (string) $c['host'], true];
    $checks[] = ['Database / user', (string) $c['database'], true];
    // Never print the password.

    try {
        $pdo = db();
        $checks[] = ['TCP + auth', 'connected to ' . $pdo->getAttribute(PDO::ATTR_SERVER_VERSION), true];

        $expected = ['properties', 'cities', 'testimonials', 'services', 'team', 'milestones', 'offices', 'site_settings'];
        $found = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
        $missing = array_values(array_diff($expected, $found));
        $checks[] = [
            'Tables',
            $missing ? 'MISSING: ' . implode(', ', $missing) . ' — import database/schema.sql then database/seed.sql'
                     : 'all ' . count($expected) . ' tables present',
            !$missing,
        ];

        $count = (int) $pdo->query('SELECT COUNT(*) FROM properties WHERE is_active = 1')->fetchColumn();
        $checks[] = ['Active properties', (string) $count, true];

        $sample = $pdo->query('SELECT slug, title_ur FROM properties ORDER BY sort_order ASC LIMIT 1')->fetch();
        $checks[] = [
            'Urdu text intact',
            $sample ? (string) $sample['title_ur'] : 'no rows',
            true,
        ];
    } catch (Throwable $e) {
        $checks[] = ['Connection', $e->getMessage(), false];
    }
}

$allOk = true;
foreach ($checks as $chk) {
    if (!$chk[2]) {
        $allOk = false;
    }
}

function h(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>API health check</title>
<style>
  body{font:15px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;background:#0a1410;color:#e6f1ea;margin:0;padding:40px}
  .wrap{max-width:820px;margin:0 auto}
  h1{font-size:20px;margin:0 0 4px}
  p.sub{color:#8fa89a;margin:0 0 24px}
  .banner{padding:14px 18px;border-radius:10px;font-weight:700;margin-bottom:24px}
  .ok{background:#0d3b2a;border:1px solid #1f7a55;color:#5ef0b0}
  .bad{background:#3b1414;border:1px solid #7a1f1f;color:#ff8f8f}
  table{width:100%;border-collapse:collapse}
  td{padding:9px 12px;border-bottom:1px solid #1c2b24;vertical-align:top}
  td.k{width:190px;color:#8fa89a}
  .mark{font-weight:700}
  .pass{color:#3ad6a4}
  .fail{color:#ff6b6b}
  code{background:#132520;padding:2px 6px;border-radius:4px}
  .warn{margin-top:28px;padding:14px 18px;background:#2a2410;border:1px solid #6b5a1f;border-radius:10px;color:#f0d98f}
  a{color:#3ad6a4}
</style>
</head>
<body>
<div class="wrap">
  <h1>Pak Property Point — API health check</h1>
  <p class="sub">DELETE this file (api/health.php) once everything below is green.</p>

  <div class="banner <?= $allOk ? 'ok' : 'bad' ?>">
    <?= $allOk ? 'ALL GOOD — the API is connected to MySQL.' : 'PROBLEM FOUND — see the failing row below.' ?>
  </div>

  <table>
  <?php foreach ($checks as [$label, $detail, $passed]): ?>
    <tr>
      <td class="k"><?= h($label) ?></td>
      <td><span class="mark <?= $passed ? 'pass' : 'fail' ?>"><?= $passed ? 'PASS' : 'FAIL' ?></span> &nbsp; <?= h($detail) ?></td>
    </tr>
  <?php endforeach; ?>
  </table>

  <?php if (!$allOk): ?>
  <div class="warn">
    <strong>Common fixes</strong>
    <ul>
      <li><strong>Host not found</strong> — <code>sdb-k.hosting.stackcp.net</code> is the old StackCP domain and no longer resolves. Copy the current Server value from the panel: Manage Hosting &rarr; Options &rarr; Manage &rarr; Web Tools &rarr; MySQL Databases.</li>
      <li><strong>Access denied</strong> — check the database name, username and password in <code>api/.config.php</code>.</li>
      <li><strong>Unknown database</strong> — you are on the right server but the DB name is wrong; the username is usually identical to the database name.</li>
      <li><strong>Missing tables</strong> — import <code>database/schema.sql</code> then <code>database/seed.sql</code> through phpMyAdmin.</li>
    </ul>
  </div>
  <?php else: ?>
  <div class="warn" style="background:#0d3b2a;border-color:#1f7a55;color:#8fe8c4">
    Next: visit <code>/api/properties.php</code> — you should get JSON. The frontend uses it automatically and falls back to bundled data if it is unavailable, so the site never breaks.
  </div>
  <?php endif; ?>
</div>
</body>
</html>
