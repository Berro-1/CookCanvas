<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $userId = $_POST['user_id'];
    $ingredients = json_decode($_POST['ingredients'], true);
    $steps = json_decode($_POST['steps'], true);

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
        $stmt->execute();
        $recipeId = $stmt->insert_id;
        $stmt->close();

        // Insert ingredients
        $stmt = $conn->prepare("INSERT INTO ingredients (recipe_id, ingredient_name) VALUES (?, ?)");
        foreach ($ingredients as $ingredient) {
            $stmt->bind_param("is", $recipeId, $ingredient);
            $stmt->execute();
        }
        $stmt->close();

        // Insert steps
        $stmt = $conn->prepare("INSERT INTO steps (recipe_id, step_number, description) VALUES (?, ?, ?)");
        foreach ($steps as $index => $step) {
            $stepNumber = $index + 1;
            $stmt->bind_param("iis", $recipeId, $stepNumber, $step);
            $stmt->execute();
        }
        $stmt->close();

        // Commit transaction
        $conn->commit();
        echo json_encode(['status' => 'success', 'message' => 'Recipe created successfully']);
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => 'Error creating recipe', 'error' => $e->getMessage()]);
    }
}

$conn->close();
?>
