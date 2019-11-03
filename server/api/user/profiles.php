<?php
//Headers 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type, Authorization, x-authorization, X-Requested-With');

include_once('../../config/config.php');
include_once('../../config/core.php');
include_once('../../models/User.php');

//Instantiate DB and connect
$database = new Database();
$db = $database->connect();

$user = new User($db);

//User query
$result = $user->profiles();

$user_array = array();

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    array_push($user_array, array('id' => $id, 'username' => $username));
}

http_response_code(200);
echo json_encode(array('users' => $user_array));
