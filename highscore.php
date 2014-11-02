<?php

include_once("conn.php");

$results = $mysqli->query("
    INSERT INTO
			highscore
		(
			name,
			score,
			difficulty
		)
		VALUES
		(
			" . $_POST['name'] . ",
			'" . $_POST['score'] . "',
			" . $_POST['difficulty'] . "
		);
	");
$mysqli->close();
?>