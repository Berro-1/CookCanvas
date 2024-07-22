<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Debugging statement to check raw input
    $rawData = file_get_contents("php://input");
    
    $data = json_decode($rawData, true);

    // Debugging statement to check decoded data
    error_log("Decoded data: " . print_r($data, true));

    if (isset($data['email']) && isset($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        $sql = 'SELECT password FROM users WHERE email = ?';
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($hashedPassword);
                $stmt->fetch();

                if (password_verify($password, $hashedPassword)) {
                    echo json_encode(['success' => 'User logged in successfully']);
                } else {
                    echo json_encode(["error" => "Invalid password"]);
                }
            } else {
                echo json_encode(["error" => "Email does not exist"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Failed to prepare the statement"]);
        }
    } else {
        echo json_encode(["error" => "Email or password is missing"]);
    }
    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
