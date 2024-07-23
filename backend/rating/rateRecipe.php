<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $recipe_id = $data->recipe_id;
    $user_id = $data->user_id;
    $rating = $data->rating;

    // Insert or update the rating
    $sql = "INSERT INTO ratings (user_id, recipe_id, rating) VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rating = VALUES(rating)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iii', $user_id, $recipe_id, $rating);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Rating updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update rating']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
