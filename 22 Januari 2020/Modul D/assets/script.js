let c = document.querySelector('#canvas'),
	ctx = c.getContext('2d'),
	btnMulai = document.querySelector('#btnMulai'),
	livesshow = document.querySelector('#livesshow'),
	scoreshow = document.querySelector('#scoreshow'),
	bannerMulai = document.querySelector('.bannerMulai'),
	bannerUlangi = document.querySelector('.bannerUlangi'),
	btnUlangi = document.querySelector('#btnUlangi'),
	title = document.querySelector('#title');


let bAtas = 0, bKiri = 0, bKanan = 280, bBawah = 130;

let lives = 10, score = 0;

ship = {
	x: bKanan/2,
	y: bBawah
}

let imgShip = new Image(), imgMusuh = new Image();

imgShip.src = 'assets/ship.png';
imgMusuh.src = 'assets/musuh.png';

let peluru = [], musuh = [];

for(i=0;i<5;i++){
	musuh[i] = {
		x: (1+i)*45,
		y: 0,
		status: 'live'
	}
}
for(i=0;i<3;i++){
	peluru[i] = {
		x: ship.x+7,
		y: ship.y+5,
		status: 'ready',
		inScr: true
	}
}



let drawPeluru = function(){
	if(!peluru[0].inScr && !peluru[1].inScr && !peluru[2].inScr){
		for(i=0;i<3;i++){
			peluru[i] = {
				x: ship.x+7,
				y: ship.y+5,
				status: 'ready',
				inScr: true
			}
		}		
	}
	for(i=0;i<peluru.length;i++){
		if(peluru[i].inScr){
			if(peluru[i].status == 'used'){
				peluru[i].y -= 1;
			}
			if(peluru[i].y < -10){
				peluru[i].inScr = false
			}


			ctx.fillStyle = 'red';
			ctx.fillRect(peluru[i].x, peluru[i].y, 2, 6)
		}
	}
}


let crash = function() {
	for(i = 0;i< musuh.length; i++){
		for(j=0; j < peluru.length; j++){
			if(peluru[j].status == 'used' && musuh[i].status == 'live'){

				if((musuh[i].y <  peluru[j].y && musuh[i].y+(imgMusuh.height/3) > peluru[j].y ) &&
					(musuh[i].x <  peluru[j].x && musuh[i].x+(imgMusuh.width/3) > peluru[j].x )){
					musuh[i].status = 'die';
					score += 10;
					peluru[j] = -10;

					musuh[i] = {
						x: (Math.random()*5)*45,
						y: -10,
						status: 'live'
					}
				}

			}
		}
	}
}

let drawMusuh = function () {
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){

			ctx.drawImage(imgMusuh, 0, 0,
				imgMusuh.width, imgMusuh.height,
				musuh[i].x, musuh[i].y,
				imgMusuh.width/3, imgMusuh.height/3);
			}

			musuh[i].y += 1;
			if(musuh[i].y > bBawah+20){
				musuh[i].y = -10;
			}

		}
}



let drawBoard = function(){
	livesshow.innerHTML = lives
	scoreshow.innerHTML = score
	if(score >= 50 && lives > 0){
		clearInterval(app);
		title.innerHTML = "Anda Menang";
		bannerUlangi.style.display = 'block';
	}
	else if(score < 50 && lives <= 0){
		clearInterval(app);
		title.innerHTML = "Anda Kalah";
		bannerUlangi.style.display = 'block';
	}
}

let drawShip = function(){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if((musuh[i].x-(imgMusuh.width/3) < ship.x && musuh[i].x+(imgMusuh.width/3) > ship.x) &&
				(musuh[i].y-(imgMusuh.height/3) < ship.y && musuh[i].y+(imgMusuh.height/3) > ship.y)){
				lives -= 1;
				musuh[i] = {
					x: (Math.random()*5)*45,
					y: -10,
					status: 'live'
				}
			}
		}
	}

	ctx.drawImage(imgShip, 0, 0, imgShip.width, imgShip.height, 
			ship.x, ship.y, 
			imgShip.width/3, imgShip.height/3)
}



let draw = function(){
	ctx.clearRect(0,0,c.width,c.height);
	drawShip()
	drawPeluru()
	drawMusuh()
	drawBoard()
	crash()
}


let init = function(){
	app = setInterval(function(){
		draw();
	},100) 
}

document.addEventListener('keydown',(key) => {
	// console.log(key.code);
	switch(key.code){
		case 'ArrowUp':
			if(ship.y > bAtas){
				ship.y -= 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y -= 1
					}
				}
			}
			break;
		case 'ArrowDown':
			if(ship.y < bBawah){
				ship.y += 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y += 1
					}
				}
			}
			break;
		case 'ArrowLeft':
			if(ship.x > bKiri){
				ship.x -= 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x -= 1
					}
				}
			}
			break;
		case 'ArrowRight':
			if(ship.x < bKanan){
				ship.x += 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x += 1
					}
				}
			}
			break;
		case 'Space':
			for(i=0;i<peluru.length;i++){
				if(peluru[i].status == 'ready'){
					peluru[i].status = 'used';
					return;
				}
			}
			break;
		default:
			break;
	}
});


btnMulai.addEventListener('click',function() {
	bannerMulai.style.display = 'none';
	init()
})

btnUlangi.addEventListener('click',function(){

	bannerUlangi.style.display = 'none';

	lives = 10, score = 0;

	ship = {
		x: bKanan/2,
		y: bBawah
	}

	for(i=0;i<5;i++){
		musuh[i] = {
			x: (1+i)*45,
			y: 0,
			status: 'live'
		}
	}
	for(i=0;i<3;i++){
		peluru[i] = {
			x: ship.x+7,
			y: ship.y+5,
			status: 'ready',
			inScr: true
		}
	}

	init()

})
