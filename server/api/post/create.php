<?php
//Headers 
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, x-authorization, X-Requested-With');

require('../../vendor/autoload.php');

use \Firebase\JWT\JWT;

include_once('../../config/core.php');
include_once('../../config/config.php');
include_once('../../models/Post.php');

//Instantiate DB and connect
$database = new Database();
$db = $database->connect();

$post = new Post($db);

//Get raw posted data
$data = json_decode(file_get_contents('php://input'));

$jwt = $_SERVER['HTTP_X_AUTHORIZATION'] ? $_SERVER['HTTP_X_AUTHORIZATION'] : null;
$post->title = $data->title;
$post->body = $data->body;

if ($jwt && $post->body) {
    $user = JWT::decode($jwt, $key, array('HS256'));

    $post->author_id = $user->data->id;

    if ($post->create()) {
        http_response_code(200);
        echo json_encode(
            array(
                'message' => 'Post created'
            )
        );
    } else {
        echo json_encode(
            array(
                'message' => 'Failed to create post'
            )
        );
    }
}
