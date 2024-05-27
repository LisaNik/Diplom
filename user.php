<?php
$dbc = mysqli_connect('localhost', 'root', '', 'petsite');

$data = json_decode(file_get_contents('php://input'),true);
$username = $data['name'];
$surname = $data['surname'];
$phone = $data['phone'];
$email = $data['email'];
$comment= $data['comment'];
$name= $data['petname'];

// echo var_dump($data);

$query = "INSERT INTO user (username, surname, phone, email, comment, name)
          VALUES ('$username', '$surname', '$phone', '$email','$comment','$name')";

$result = mysqli_query($dbc, $query) or die(mysqli_error());

http_response_code('201');
header('Content-type: application/json');
print json_encode(array('message'=>'new user info'));

mysqli_close($dbc);
?>
