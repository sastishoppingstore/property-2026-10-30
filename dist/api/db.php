<?php
/**
 * PDO connection helper.
 *
 * The config file is a dotfile so that most webservers refuse to serve it
 * even if .htaccess is misconfigured. Falls back to a sibling non-dot copy
 * only if the dotfile is missing.
 */

declare(strict_types=1);

function db_config(): array
{
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }

    $candidates = [
        __DIR__ . '/.config.php',
        __DIR__ . '/config.php',
    ];

    foreach ($candidates as $file) {
        if (is_readable($file)) {
            $loaded = require $file;
            if (is_array($loaded)) {
                $cfg = $loaded;
                return $cfg;
            }
        }
    }

    throw new RuntimeException('Database config not found. Expected api/.config.php');
}

/**
 * @throws PDOException
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $c = db_config();

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $c['host'],
        (int) $c['port'],
        $c['database'],
        $c['charset']
    );

    $pdo = new PDO($dsn, $c['username'], $c['password'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    return $pdo;
}

/** Run a query with bound params and return the statement. */
function db_query(string $sql, array $params = []): PDOStatement
{
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st;
}
