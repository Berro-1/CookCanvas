<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $recipe_id = $data->recipe_id;
    $user_id = $data->user_id;
    $comment = $data->comment;

    $sql = "INSERT INTO comments (recipe_id, user_id, comment) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iis', $recipe_id, $user_id, $comment);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Comment added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add comment']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}