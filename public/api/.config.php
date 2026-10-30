<?php
/**
 * Database credentials — KEEP THIS FILE OUT OF PUBLIC ACCESS.
 *
 * This is a dotfile (.config.php) and api/.htaccess blocks direct web access
 * to it. If you can place this file OUTSIDE public_html (e.g. one level up),
 * that is even safer — then set DB_CONFIG_PATH in api/db.php accordingly.
 *
 * HOST: copy the CURRENT hostname from StackCP panel ->
 *       Manage Hosting > Options > Manage > Web Tools > MySQL Databases > Server
 *       The old "sdb-k.hosting.stackcp.net" no longer resolves; StackCP moved
 *       from the .net domain to .com.
 */

return [
    'host'     => 'sdb-k.hosting.stackcp.net',
    'port'     => 3306,
    'database' => 'proprty-313931189c',
    'username' => 'proprty-313931189c',
    'password' => 'Wafa@1122',
    'charset'  => 'utf8mb4',
];
