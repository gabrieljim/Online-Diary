<?php
//Headers 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type, Authorization, x-authorization, X-Requested-With');

include_once('../../config/config.php');
include_once('../../config/core.php');
include_once('../../models/User.php');

require('../../vendor/autoload.php');

use \Firebase\JWT\JWT;

//Instantiate DB and connect
$database = new Database();
$db = $database->connect();

$user = new User($db);

//User query
$jwt = $_SERVER['HTTP_X_AUTHORIZATION'] ? $_SERVER['HTTP_X_AUTHORIZATION'] : null;

if ($jwt) {
    $data = JWT::decode($jwt, $key, array('HS256'));
    http_response_code(200);
    echo json_encode(array(
        'id' => $data->data->id,
        'username' => $data->data->username,
        'email' => $data->data->email
    ));
} else {
    echo json_encode(array('message' => 'Unauthorized'));
}
