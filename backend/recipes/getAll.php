<?php
require '../config/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $recipes = array();

    $recipeResult = $conn->query("SELECT * FROM recipes");
    while ($recipeRow = $recipeResult->fetch_assoc()) {
        $recipeId = $recipeRow['recipe_id'];

        $ingredientsResult = $conn->query("SELECT ingredient_name FROM ingredients WHERE recipe_id = $recipeId");
        $ingredients = array();
        while ($ingredientRow = $ingredientsResult->fetch_assoc()) {
            $ingredients[] = $ingredientRow['ingredient_name'];
        }

        $stepsResult = $conn->query("SELECT step_number, description FROM steps WHERE recipe_id = $recipeId ORDER BY step_number ASC");
        $steps = array();
        while ($stepRow = $stepsResult->fetch_assoc()) {
            $steps[] = array('step_number' => $stepRow['step_number'], 'description' => $stepRow['description']);
        }

        $recipeRow['ingredients'] = $ingredients;
        $recipeRow['steps'] = $steps;

        $recipes[] = $recipeRow;
    }

    echo json_encode($recipes);
}

$conn->close();
?>
