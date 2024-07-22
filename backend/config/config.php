<?php
$db = 'cookcanvas';
$host = 'localhost';
$user = 'root';
$pass = '';

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die('Connection error: ' . mysqli_connect_error());
}

