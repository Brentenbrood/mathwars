<?php

include_once("conn.php");

$result = $mysqli->query(
        "SELECT name,score,difficulty FROM highscore"
        );
$array1 = [];
while($row = mysqli_fetch_assoc($result)){
    array_push($array1,$row);
}
echo json_encode($array1);
?>