<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$response = array("status" => "error", "message" => "Unknown error");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $userId = $_POST['user_id'] ?? '';
    $ingredients = $_POST['ingredients'] ?? [];
    $steps = $_POST['steps'] ?? [];

    // Verify user ID exists
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid user ID']);
        exit;
    }
    $stmt->close();

    // Handle the image upload
    $imagePath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imageTmpPath = $_FILES['image']['tmp_name'];
        $imageName = basename($_FILES['image']['name']);
        $uploadDir = '../uploads/';

        // Ensure the uploads directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $imagePath = $uploadDir . $imageName;
        if (!move_uploaded_file($imageTmpPath, $imagePath)) {
            echo json_encode(['status' => 'error', 'message' => 'Error uploading image']);
            exit;
        }
        // Store the path as a URL relative to the server root
        $imagePath = '/uploads/' . $imageName;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Image upload failed']);
        exit;
    }

    // Start transaction
    $conn->begin_transaction();
    try {
        // Insert recipe
        $stmt = $conn->prepare("INSERT INTO recipes (title, description, user_id, image) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $title, $description, $userId, $imagePath);
        if (!$stmt->execute()) {
            throw new Exception("Error inserting recipe: " . $stmt->error);
        }
        $recipeId = $stmt->insert_id;
        $stmt->close();

        // Insert ingredients
        $stmt = $conn->prepare("INSERT INTO ingredients (recipe_id, ingredient_name) VALUES (?, ?)");
        foreach ($ingredients as $ingredient) {
            $stmt->bind_param("is", $recipeId, $ingredient);
            if (!$stmt->execute()) {
                throw new Exception("Error inserting ingredient: " . $stmt->error);
            }
        }
        $stmt->close();

        // Insert steps
        $stmt = $conn->prepare("INSERT INTO steps (recipe_id, step_number, description) VALUES (?, ?, ?)");
        foreach ($steps as $index => $step) {
            $stepNumber = $index + 1;
            $stmt->bind_param("iis", $recipeId, $stepNumber, $step);
            if (!$stmt->execute()) {
                throw new Exception("Error inserting step: " . $stmt->error);
            }
        }
        $stmt->close();

        // Commit transaction
        $conn->commit();
        $response["status"] = "success";
        $response["message"] = "Recipe created successfully";
        $response["recipe"] = array(
            "recipe_id" => $recipeId,
            "title" => $title,
            "description" => $description,
            "user_id" => $userId,
            "image" => $imagePath,
            "ingredients" => $ingredients,
            "steps" => $steps
        );
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        $response["message"] = 'Error creating recipe';
        $response["error"] = $e->getMessage();
    }
}

$conn->close();
echo json_encode($response);
?>
