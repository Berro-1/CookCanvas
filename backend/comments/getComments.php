<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $recipe_id = $_GET['recipe_id'];

    $sql = "SELECT comments.comment, users.username, comments.created_at 
            FROM comments 
            JOIN users ON comments.user_id = users.user_id 
            WHERE comments.recipe_id = ? 
            ORDER BY comments.created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $recipe_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }

    echo json_encode(['status' => 'success', 'comments' => $comments]);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
