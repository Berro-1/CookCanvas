<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['username']) && isset($data['email']) && isset($data['password'])) {
        $username = $data['username'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        $sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param('sss', $username, $email, $password);
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error registering user']);
            }
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to prepare the statement']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username, email, or password is missing']);
    }
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
