$(document).ready(function(){
	var canvas = document.createElement('canvas');
	canvas.id     = "gameCanvas";
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	canvas.style.zIndex   = 1;
	canvas.style.position = "relative";
	document.body.appendChild(canvas);
	ctx=canvas.getContext("2d");
	createjs.Ticker.setFPS(30);
	var stage = new createjs.Stage("gameCanvas");
        var explosiondata = {
            framerate: 60,
            images: ["assets/sprite/explosion.png"],
            frames: {width:100, height:100, count:81},
            animations: {run:[0,81]}
        };
        var explosionsprite = new createjs.SpriteSheet(explosiondata);
        var aniexplosion = new createjs.Sprite(explosionsprite,"run");
        aniexplosion.x = 1084;
        aniexplosion.y = 90;
        aniexplosion.stop();
        aniexplosion.visible = false;
	var endragon = new createjs.Bitmap("assets/img/enflying.gif");
        endragon.x = 100;
	endragon.y = 100;
	endragon.scaleX=0.2;
	endragon.scaleY=0.2;
        var bgimg = new createjs.Bitmap("assets/img/bg2.png");
        bgimg.scaleX=1;
        bgimg.scaleY=1;
        bgimg.width = window.innerWidth;
        bgimg.height = window.innerHeight;
	var circle1 = new createjs.Shape();
        circle1.graphics.beginFill("green").drawCircle(0, 0, 40);
	circle1.x = canvas.width/2-100;
	circle1.y = canvas.height/2;
        var circle2 = new createjs.Shape();
        circle2.graphics.beginFill("orange").drawCircle(0, 0, 40);
        circle2.x = canvas.width/2;
        circle2.y = canvas.height/2;
	var starttext2 = new createjs.Text("Medium", "20px Arial", "#000");
        var starttext1 = new createjs.Text("Easy", "20px Arial", "#000");
	starttext2.x = canvas.width/2-35;
	starttext2.y = canvas.height/2-10;
	starttext1.x = canvas.width/2-122;
	starttext1.y = canvas.height/2-10;
        var ship = new createjs.Bitmap("assets/img/ship.png");
        ship.x = 1084;
        ship.y = 90;
	var score = 0;
        var answersum,
            mathnumber1,
            mathnumber2,
            difficulty;
        var propositionallogic = []; // fancy word lol
	
	var constartmenu = new createjs.Container();
	var conmaingame = new createjs.Container();
	constartmenu.addChild(bgimg,circle1,circle2,starttext1,starttext2);
	conmaingame.addChild(bgimg,endragon,ship,aniexplosion);
	
	stage.addChild(constartmenu);
	
	circle1.addEventListener("click", handleClickEasy);
 	function handleClickEasy(event){
		stage.removeChild(constartmenu);
		stage.addChild(conmaingame);
		$('body').append('<div id="scorebox"></div><div id="sumbox"></div><input maxlength="3" type="text">');
                mathnumber1 = 10;
                mathnumber2 = 10;
                propositionallogic.push("+");
                difficulty = 1;
                console.log(difficulty);
		startGame(mathnumber1,mathnumber2,difficulty);
 	}
        
        circle2.addEventListener("click", handleClickMedium);
 	function handleClickMedium(event){
		stage.removeChild(constartmenu);
		stage.addChild(conmaingame);
		$('body').append('<div id="scorebox"></div><div id="sumbox"></div><input maxlength="3" type="text">');
                mathnumber1 = 6;
                mathnumber2 = 6;
                propositionallogic.push("*");
                difficulty = 2;
                console.log(difficulty);
		startGame(mathnumber1,mathnumber2,difficulty);
 	}
	createjs.Ticker.addEventListener("tick", handleTick);
 	function handleTick(event) {
            stage.update();
	}
	function startGame(mn1,mn2,df) {
            var amountcorrect = 0;
            inputHandler(amountcorrect);
                createjs.Ticker.addEventListener("tick", animationTick);
                function animationTick(event) {
                    endragon.x += 2;
                    if (endragon.x+28 >= ship.x){
                        $('input').remove();
                        $('#sumbox').html('Game Over');
                        event.remove();
                        gameoverScreen(event,difficulty);
                        createjs.Ticker.addEventListener("tick", function(event){
                            ship.scaleX -= 0.01;
                            ship.scaleY -= 0.01;
                            ship.y += 2;
                            aniexplosion.visible = true;
                            aniexplosion.play('run');
                            if (ship.y >= 260) {
                                ship.visible = false;
                                event.remove();
                                aniexplosion.visible = false;
                                aniexplosion.stop('run');
                            }
                            else if (ship.y >=200) {
                                aniexplosion.stop('run');
                                aniexplosion.visible = false; 
                            }
                        });
                        console.log(endragon.x+28,ship.x);
                    }
                    stage.update();
                }
                function gameoverScreen(event,df) {
                    event.remove();
                    switch (df){
                        case 1:
                            console.log('easy highscore');
                        break;
                        case 2:
                            console.log('medium highscore');
                        break;
                    }
                }
                function inputHandler(ac) {
                    $('input').trigger('focus').val('').css({'color':'#0CF'}).prop('disabled', false);;
                    $('body').click(function(){
                        $('input').trigger('focus');
                    });
                    var numberone = Math.floor(Math.random() * mn1) + 1;
                    var numbertwo = Math.floor(Math.random() * mn2) + 1;
                    var rsymbol = propositionallogic[Math.floor(Math.random()*propositionallogic.length)];
                    answersum = eval(Math.max(numberone,numbertwo) + rsymbol + Math.min(numberone,numbertwo));
                        if(df == 1) {
                            switch(ac){
                                case 10:
                                    mn1 = 15;
                                    mn2 = 15;
                                    propositionallogic.push("-");
                                break;
                                
                                case 20:
                                    mn1 = 20;
                                    mn2 = 20;
                                break;
                                
                                case 30:
                                    mn1 = 30;
                                    mn2 = 30;
                                break;
                            }
                        }
                        if (df == 2) {
                            switch(ac){
                                case 10:
                                    mn1 = 8;
                                    mn2 = 8;
                                break;
                            case 20:
                                mn1 = 10;
                                mn2 = 10;
                                break;
                            case 30:
                                mn1 = 12;
                                mn2 = 12;
                            break;
                            }
                        }
                    $('#sumbox').html('');
                    if (rsymbol == '*') {
                        rsymbol = '&times;';
                    }
                    $('#sumbox').append('<span>'+Math.max(numberone,numbertwo)+rsymbol+Math.min(numberone,numbertwo)+'</span>');
                    $('#scorebox').html('<span>Score: '+score+'</span>');
                    
                                      
                    $('input[type=text]').on('keydown', function(e) {
                            if (e.which == 13 && $('input').val() != '') {
                                var answeruser = $('input').val();
                                    if (answeruser == answersum) {
                                        console.log('correct');
                                        endragon.x -= 70;
                                        score += 10;
                                        $('#scorebox').html('<span>Score: '+score+'</span>');
                                        $('input').val('');
                                        ac ++;
                                        console.log(ac);
                                        inputHandler(ac);
                                    }
                                    else {
                                        console.log('wrong');
                                        $('input').css({'color':'red'}).prop('disabled', true);
                                        setTimeout(inputHandler, 1000);
                                    }
                            }
                    });
                }	
	}
	
});