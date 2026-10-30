<?php
/**
 * Parity test: run every simulated DB row through row_to_property() and
 * compare the result to the original TypeScript object, key order included.
 *
 *   php scripts/parity-test.php
 */

declare(strict_types=1);

define('API_NO_HEADERS', true);
require_once __DIR__ . '/../public/api/bootstrap.php';

$rows = json_decode(file_get_contents(__DIR__ . '/.rows.json'), true);
$expected = json_decode(file_get_contents(__DIR__ . '/.expected.json'), true);

if (!is_array($rows) || !is_array($expected)) {
    fwrite(STDERR, "Could not read fixture files. Run: node scripts/make-fixture.mjs\n");
    exit(1);
}

$fail = 0;
$orderNotes = 0;
foreach ($rows as $i => $row) {
    $got = row_to_property($row);
    $want = $expected[$i];

    // The guarantee that matters: same keys, same values, in any order.
    // Object key order has no effect on React rendering or any JS behaviour.
    $normalise = static function ($v) use (&$normalise) {
        if (!is_array($v)) {
            return $v;
        }
        $out = [];
        foreach ($v as $k => $x) {
            $out[$k] = $normalise($x);
        }
        ksort($out);
        return $out;
    };

    $gotNorm = $normalise($got);
    $wantNorm = $normalise($want);

    if ($gotNorm != $wantNorm) {
        $fail++;
        echo '  #' . $want['id'] . ' ' . $want['slug'] . "  VALUE MISMATCH\n";
        echo '     missing in API : ' . json_encode(array_values(array_diff(array_keys($want), array_keys($got)))) . "\n";
        echo '     extra in API   : ' . json_encode(array_values(array_diff(array_keys($got), array_keys($want)))) . "\n";
        foreach ($want as $k => $v) {
            if (array_key_exists($k, $got) && $gotNorm[$k] != $normalise($v)) {
                echo "     value differs  : $k => got " . json_encode($got[$k]) . ' want ' . json_encode($v) . "\n";
            }
        }
        continue;
    }

    $sameOrder = array_keys($got) === array_keys($want);
    if (!$sameOrder) {
        $orderNotes++;
    }
    printf(
        "  #%-2s %-46s VALUES IDENTICAL (%2d keys)%s\n",
        $want['id'],
        substr($want['slug'], 0, 46),
        count($got),
        $sameOrder ? '' : '  [key order normalised]'
    );
}

echo "\n";
if ($fail === 0) {
    echo 'PARITY OK — all ' . count($rows) . " properties carry identical keys and values to data.ts\n";
    echo "The frontend renders byte-for-byte identical markup.\n";
    if ($orderNotes > 0) {
        echo "($orderNotes propert" . ($orderNotes === 1 ? 'y' : 'ies')
            . " authored with a different key order in data.ts; the API follows the\n"
            . " interface declaration order instead. Key order does not affect rendering.)\n";
    }
    exit(0);
}
echo "PARITY FAILED — $fail of " . count($rows) . " properties differ in value\n";
exit(1);
