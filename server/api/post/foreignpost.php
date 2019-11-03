<?php
//Headers 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type, Authorization, x-authorization, X-Requested-With');

include_once('../../config/config.php');
include_once('../../models/Post.php');

//Instantiate DB and connect
$database = new Database();
$db = $database->connect();

//Instantiate Post
$post = new Post($db);

$data = json_decode(file_get_contents('php://input'));

//User query
http_response_code(200);

$post->author_id = $data->id;

$query = "SELECT username FROM users WHERE id=" . $data->id;
$stmt = $db->prepare($query);
$stmt->execute();
$result = $stmt;

$row = $result->fetch(PDO::FETCH_ASSOC);

$username = $row['username'];

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
    echo json_encode(array('username' => $username, 'posts' => $posts_array));
} else {
    echo json_encode(array('username' =>  $username, 'posts' => 'No posts'));
}
