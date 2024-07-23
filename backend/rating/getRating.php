<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $recipe_id = $_GET['recipe_id'];
    $user_id = $_GET['user_id'];

    $sql = "SELECT rating FROM ratings WHERE recipe_id = ? AND user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $recipe_id, $user_id);
    $stmt->execute();
    $stmt->bind_result($rating);
    $stmt->fetch();

    if ($rating !== null) {
        echo json_encode(['status' => 'success', 'rating' => $rating]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No rating found']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
