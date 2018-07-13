var barra1;
var barra2;
var barraCentral;
var bola;
var wallTop;
var wallBottom;
var ponto1;
var ponto2;
var versus = false;
var ia = false;
var iaMoved = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  barra1 = createSprite(50, innerHeight / 2, 16, 64);
  barra1.shapeColor = color(255);
	barra1.immovable = true;
  barra2 = createSprite(innerWidth - 50, innerHeight / 2, 16, 64);
  barra2.shapeColor = color(255);
	barra2.immovable = true;
  wallTop = createSprite(width/2, -30/2, width, 30);
  wallTop.immovable = true;
  wallBottom = createSprite(width/2, height+30/2, width, 30);
  wallBottom.immovable = true;
	barraCentral = createSprite(width/2, height/2, 8, height);
	barraCentral.shapeColor = color('white');
	bola = createSprite(innerWidth/2, innerHeight/2, 16, 16);
	bola.shapeColor = color('white');
	ponto1 = 0;
	ponto2 = 0;
}

function draw() {
  background('black');

	if(versus){
		moveBall();
		moveBarKey();
		drawSprites();
    if(keyIsDown(27)){
      versus = false;
      $("#menu").css('display', 'inline');
  		$('#p1, #p2').css('display', 'none');
      ponto1 = 0;
      ponto2 = 0;
      document.getElementById('p1').innerHTML = 0;
      document.getElementById('p2').innerHTML = 0;
      bola.position.x = innerWidth/2;
  		bola.position.y = innerHeight/2;
  		bola.setVelocity(0, 0);
      barra1.position.x = 50;
      barra1.position.y = height/2;
      barra2.position.x = width - 50;
      barra2.position.y = height/2;
    }
	}

  if(ia){
		moveBall();
		moveBarKey();
    moveBarIA();
		drawSprites();
    if(keyIsDown(27)){
      ia = false;
      $("#menu").css('display', 'inline');
  		$('#p1, #p2').css('display', 'none');
      ponto1 = 0;
      ponto2 = 0;
      document.getElementById('p1').innerHTML = 0;
      document.getElementById('p2').innerHTML = 0;
      bola.position.x = innerWidth/2;
  		bola.position.y = innerHeight/2;
  		bola.setVelocity(0, 0);
      barra1.position.x = 50;
      barra1.position.y = height/2;
      barra2.position.x = width - 50;
      barra2.position.y = height/2;
    }
	}

  if(!versus && !ia){
    bola.position.x = innerWidth/2;
    bola.position.y = innerHeight/2;
    bola.setVelocity(0, 0);
  }
}

function moveBarMouse() {
    barra1.position.y = constrain(mouseY, barra1.height/2, height-barra1.height/2);
}

function moveBarKey() {
    var y = 0;
    if(keyIsDown(87) && barra1.position.y >= barra1.height/2)
        y = -12;
    if(keyIsDown(83) && barra1.position.y <= innerHeight - barra1.height/2)
        y = 12;
    barra1.velocity.y = y;
    if(versus){
  	  y = 0;
      if(keyIsDown(UP_ARROW) && barra2.position.y >= barra2.height/2)
          y = -12;
      if(keyIsDown(DOWN_ARROW) && barra2.position.y <= innerHeight - barra2.height/2)
          y = 12;
      barra2.velocity.y = y;
    }
}

function moveBarIA() {
  if(bola.velocity.x == 0 && bola.position.x == width/2){
    if(bola.position.y > barra2.position.y){
      barra2.velocity.y = 4;
    } else if(barra2.position.y < bola.position.y){
      barra2.velocity.y = -4;
    } else {
      barra2.velocity.y = 0;
    }
  }

  if(barra2.position.y <= height - 32 && barra2.position.y >= 32){
    if(bola.velocity.x > 0 && bola.position.x >= width/2 || bola.position.x > width - 150){
      if(bola.position.y > barra2.position.y){
        barra2.velocity.y = 4;
      } else {
        barra2.velocity.y = -4;
      }
      iaMoved = true;
    } else if(iaMoved){
      iaMoved = false;
      setTimeout(function(){
        barra2.velocity.y = 0;
      }, 500);
    }
  } else {
    if(barra2.position.y > height/2)
      barra2.velocity.y = -4;
    else
      barra2.velocity.y = 4;
    setTimeout(function() {
      barra2.velocity.y = 0;
    }, 500);
  }
}

function moveBall() {
	bola.bounce(wallTop);
	bola.bounce(wallBottom);
	bola.overlap(barra1, function(){
		if(bola.position.x >= barra1.position.x && bola.velocity.x < 0){
			bola.velocity.x = Math.abs(bola.velocity.x);
			bola.setVelocity(bola.velocity.x*1.05, bola.velocity.y*1.075);
		} else if(bola.velocity.x < 0){
			bola.velocity.y = -bola.velocity.y;
			bola.setVelocity(bola.velocity.x*1.05, bola.velocity.y*1.075);
		}
	});
	bola.overlap(barra2, function(){
		if(bola.position.x <= barra2.position.x && bola.velocity.x > 0){
			bola.velocity.x = -Math.abs(bola.velocity.x);
			bola.setVelocity(bola.velocity.x*1.05, bola.velocity.y*1.075);
		} else if(bola.velocity.x > 0){
			bola.velocity.y = -bola.velocity.y;
			bola.setVelocity(bola.velocity.x*1.05, bola.velocity.y*1.075);
		}
	});

	if(bola.position.x <= 0){
		ponto2++;
		document.getElementById('p2').innerHTML = ponto2;
		bola.position.x = innerWidth/2;
		bola.position.y = innerHeight/2;
		bola.setVelocity(0, 0);
		setTimeout(function(){
			bola.velocity.x = -7;
			if(random(1, -1) >= 0)
				bola.velocity.y = random(5, 3);
			else
				bola.velocity.y = random(-3, -5);
		}, 800);
	}
	if(bola.position.x >= innerWidth){
		ponto1++;
		document.getElementById('p1').innerHTML = ponto1;
		bola.position.x = innerWidth/2;
		bola.position.y = innerHeight/2;
		bola.setVelocity(0, 0);
		setTimeout(function(){
			bola.velocity.x = 7;
			if(random(1, -1) >= 0)
				bola.velocity.y = random(5, 3);
			else
				bola.velocity.y = random(-3, -5);
		}, 800);
	}
}
