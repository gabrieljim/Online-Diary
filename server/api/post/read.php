<?php
//Headers 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type, Authorization, x-authorization, X-Requested-With');

include_once('../../config/config.php');
include_once('../../config/core.php');
include_once('../../models/Post.php');

require('../../vendor/autoload.php');

use \Firebase\JWT\JWT;

//Instantiate DB and connect
$database = new Database();
$db = $database->connect();

//Instantiate Post
$post = new Post($db);

//User query
$jwt = $_SERVER['HTTP_X_AUTHORIZATION'] ? $_SERVER['HTTP_X_AUTHORIZATION'] : null;

if ($jwt) {
    $user = JWT::decode($jwt, $key, array('HS256'));
    http_response_code(200);

    $post->author_id = $user->data->id;
    $result = $post->read();

    $num = $result->rowCount();

    if ($num > 0) {
        $posts_array = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $post = array(
                'id' => $id,
                'author_id' => $author_id,
                'title' => $title,
                'body' => $body,
                'published_at' => $published_at,
            );
            array_push($posts_array, $post);
        }
        echo json_encode(array('posts' => $posts_array));
    } else {
        echo json_encode(array('posts' => 'No posts'));
    }
}
