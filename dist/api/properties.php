<?php
/**
 * Properties endpoint.
 *
 *   GET /api/properties.php                 -> all active properties
 *   GET /api/properties.php?slug=dha-phase-6-modern-villa-lahore
 *                                            -> one property + similar listings
 *   GET /api/properties.php?city=Lahore&purpose=sale&type=House
 *   GET /api/properties.php?featured=1&min=1000000&max=50000000
 *   GET /api/properties.php?ids=1,2,3
 *
 * All filters are optional and combined with AND. Values are bound, never
 * interpolated, so the endpoint is not injectable.
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

api(function (): void {
    $where  = ['is_active = 1'];
    $params = [];

    $slug = trim((string) ($_GET['slug'] ?? ''));
    if ($slug !== '') {
        $where[]  = 'slug = :slug';
        $params[':slug'] = $slug;
    }

    $ids = trim((string) ($_GET['ids'] ?? ''));
    if ($ids !== '') {
        $clean = array_values(array_filter(array_map('trim', explode(',', $ids)), 'strlen'));
        if ($clean) {
            $ph = [];
            foreach ($clean as $i => $v) {
                $ph[] = ':id' . $i;
                $params[':id' . $i] = $v;
            }
            $where[] = 'id IN (' . implode(',', $ph) . ')';
        }
    }

    foreach (['city', 'purpose', 'type'] as $key) {
        $val = trim((string) ($_GET[$key] ?? ''));
        if ($val !== '') {
            $where[]        = $key . ' = :' . $key;
            $params[':' . $key] = $val;
        }
    }

    if (isset($_GET['featured']) && $_GET['featured'] !== '') {
        $where[] = 'featured = :featured';
        $params[':featured'] = (int) $_GET['featured'];
    }

    if (isset($_GET['min']) && $_GET['min'] !== '') {
        $where[] = 'price >= :min';
        $params[':min'] = (int) $_GET['min'];
    }

    if (isset($_GET['max']) && $_GET['max'] !== '') {
        $where[] = 'price <= :max';
        $params[':max'] = (int) $_GET['max'];
    }

    $sql = 'SELECT * FROM properties WHERE ' . implode(' AND ', $where)
         . ' ORDER BY sort_order ASC, id ASC';

    $rows = db_query($sql, $params)->fetchAll();
    $list = array_map('row_to_property', $rows);

    // Single-property response includes "similar" the way the detail page wants.
    if ($slug !== '') {
        if (!$list) {
            fail('Property not found.', 404, ['slug' => $slug]);
        }
        $p = $list[0];

        $similar = db_query(
            'SELECT * FROM properties
              WHERE is_active = 1 AND id <> :id AND (city = :city OR type = :type)
              ORDER BY sort_order ASC, id ASC
              LIMIT 3',
            [':id' => $p['id'], ':city' => $p['city'], ':type' => $p['type']]
        )->fetchAll();

        json_out([
            'ok'       => true,
            'property' => $p,
            'similar'  => array_map('row_to_property', $similar),
        ]);
    }

    json_out([
        'ok'         => true,
        'count'      => count($list),
        'properties' => $list,
    ]);
});
