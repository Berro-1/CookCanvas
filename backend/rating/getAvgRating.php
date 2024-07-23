<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $recipe_id = $_GET['recipe_id'];

    $sql = "SELECT AVG(rating) as average_rating FROM ratings WHERE recipe_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $recipe_id);
    $stmt->execute();
    $stmt->bind_result($average_rating);
    $stmt->fetch();

    if ($average_rating !== null) {
        echo json_encode(['status' => 'success', 'average_rating' => $average_rating]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No ratings found']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

