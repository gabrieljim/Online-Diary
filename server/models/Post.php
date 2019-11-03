<?php
class Post
{
    // DB stuff
    private $conn;
    private $table = 'posts';

    // Post Properties
    public $id;
    public $author_id;
    public $title;
    public $body;
    public $published_at;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        //Create query
        $query = 'SELECT * FROM ' . $this->table . ' WHERE author_id=:author_id ORDER BY published_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':author_id', $this->author_id);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        $query = 'INSERT INTO ' . $this->table . ' (author_id, title, body) VALUES (:author_id, :title, :body)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':author_id', $this->author_id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':body', $this->body);
        $stmt->execute();

        return $stmt;
    }

    public function delete()
    {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id=:id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        return $stmt;
    }
}
