<?php
$dbc = mysqli_connect('localhost', 'root', '', 'petsite');

$query = "SELECT * FROM parameters";
$result = mysqli_query($dbc, $query) or die(mysqli_error());

$parameters = array();
while ($row = mysqli_fetch_assoc($result)) {
    $parameters[] = array(
        'name' => $row['name'],
        'activity' => $row['activity'],        
        'size' => $row['size'],
        'friendliness' => $row['friendliness'],
        'aggressiveness' => $row['aggressiveness'],
        'health' => $row['health'],
        'walks' => $row['walks'],
        'fur' => $row['fur'],
        'attention' => $row['attention'],
        'intellect' => $row['intellect'],
        'space' => $row['space'],
        'obedience' => $row['obedience'],
        'socialization' => $row['socialization'],
    );
}

http_response_code(200);
header('Content-type: application/json');
print json_encode($parameters);

mysqli_close($dbc);

?>
