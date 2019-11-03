<?php
date_default_timezone_set('America/Caracas');

$key = 'super secret key of jwt 81273 that will never be found';
$iss = "http://localhost";
$aud = "http://localhost:3000";
$iat = time();
$nbf = 100;
$exp = time() + (60 * 60);
