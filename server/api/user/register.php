<?php
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
$user->email = $data->email;
$user->password = password_hash($data->password, PASSWORD_DEFAULT);

if ($user->register()) {
    http_response_code(200);
    echo json_encode(
        array(
            'message' => 'User created'
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'Failed to create user'
        )
    );
}
