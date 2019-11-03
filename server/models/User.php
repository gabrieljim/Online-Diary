<?php
class User
{
    // DB stuff
    private $conn;
    private $table = 'users';

    // User Properties
    public $id;
    public $username;
    public $email;
    public $password;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function register()
    {
        $query = "INSERT INTO " . $this->table . " (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);

        if ($stmt->execute()) {
            return $stmt;
        }

        //If error
        print_r("Error: %s.\n", $stmt->error);
    }

    public function profiles()
    {
        $query = "SELECT username, id FROM " . $this->table;
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return $stmt;
        }
    }

    public function exists()
    {
        $query = "SELECT * FROM " . $this->table . " WHERE username=:username";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);

        if ($stmt->execute()) {
            return $stmt;
        }

        //If error
        print_r("Error: %s.\n", $stmt->error);
    }
}
