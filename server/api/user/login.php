<?php

require('../../vendor/autoload.php');

use \Firebase\JWT\JWT;

include_once('../../config/core.php');

//Headers 
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With');

include_once('../../config/config.php');
include_once('../../models/User.php');

//Instantiate DB and connect
$database = new Database();
$db = $database->connect();

//Instantiate User
$user = new User($db);

//Get raw posted data
$data = json_decode(file_get_contents('php://input'));

$user->username = $data->username;
$user->password = $data->password;

$result = $user->exists();
$num = $result->rowCount();

$row = $result->fetch(PDO::FETCH_ASSOC);

if ($num > 0) {
    if (password_verify($user->password, $row['password'])) {
        $token = array(
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "nbf" => $nbf,
            "data" => array(
                "id" => $row['id'],
                "username" => $row['username'],
                "email" => $row['email']
            )
        );
        http_response_code(200);
        $jwt = JWT::encode($token, $key);
        echo json_encode(
            array(
                "message" => "Succesful login",
                "jwt" => $jwt
            )
        );
    } else {
        echo json_encode(array("message" => "Wrong password"));
    }
} else {
    http_response_code(401);
    echo json_encode(array("message" => "User not found"));
}
