<?php
$dbc = mysqli_connect('localhost', 'root', '', 'duckburg');
$selectedSize = isset($_POST['selectedSize']) ? $_POST['selectedSize'] : array();
$selectedAge = isset($_POST['selectedAge']) ? $_POST['selectedAge'] : array();
$selectedGender = isset($_POST['selectedGender']) ? $_POST['selectedGender'] : array();


$query = "SELECT * FROM profile ORDER BY RAND()";
$result = mysqli_query($dbc, $query) or die(mysqli_error());

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'info' => $row['info'],        
        'size' => $row['size'],
        'gender' => $row['gender'],
        'age' => $row['age'],
        'type' => $row['type'],
        'img' => $row['img'],
    );
}

http_response_code(200);
header('Content-type: application/json');
print json_encode($data);

mysqli_close($dbc);
?>
