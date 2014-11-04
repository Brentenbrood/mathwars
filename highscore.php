<?php

include_once("conn.php");
$name = mysqli_real_escape_string($mysqli,nl2br($_POST['name']));
        
$mysqli->query("
    INSERT INTO
			highscore
		(
			name,
			score,
			difficulty,
                        date
		)
		VALUES
		(
			'" . $name . "',
			'" . $_POST['score'] . "',
			" . $_POST['difficulty'] . ",
                            NOW()
		);
	");
$mysqli->close();
?>