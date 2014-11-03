<?php

include_once("conn.php");

$mysqli->query("
    INSERT INTO
			highscore
		(
			name,
			score,
			difficulty
		)
		VALUES
		(
			'" . $_POST['name'] . "',
			'" . $_POST['score'] . "',
			" . $_POST['difficulty'] . "
		);
	");
print_r($_POST);
$mysqli->close();
?>