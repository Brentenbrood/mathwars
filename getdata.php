<?php

include_once("conn.php");

$result = $mysqli->query(
        "SELECT name,score,difficulty FROM highscore"
        );
$array1 = [];
while($array = mysqli_fetch_assoc($result)){
    array_push($array1,$array);
}
echo json_encode($array1);
?>