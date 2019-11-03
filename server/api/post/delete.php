<?php
//Headers 
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
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

$post->id = $data->postId;
$post->author_id = $data->postAuthorId;

if ($jwt) {
    $user = JWT::decode($jwt, $key, array('HS256'));
    if ($post->author_id == $user->data->id) {
        if ($post->delete()) {
            http_response_code(200);
            echo json_encode(
                array(
                    'message' => 'Post deleted'
                )
            );
        } else {
            echo json_encode(
                array(
                    'message' => 'Failed to delete post'
                )
            );
        }
    } else {
        http_response_code(401);
        echo json_encode(
            array(
                'message' => 'Unauthorized'
            )
        );
    }
} else {
    echo json_encode(
        array(
            'message' => 'Unauthorized'
        )
    );
}
