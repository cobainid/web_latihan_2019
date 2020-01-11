let c = document.getElementById('canvas'),
	btnMulai = document.getElementById('btnMulai'),
	btnUlangi = document.getElementById('btnUlangi'),
	livesShow = document.getElementById('livesShow'),
	scoreShow = document.getElementById('scoreShow'),
	h1 = document.getElementById('h1'),
	bannerMulai = document.getElementsByClassName('bannerMulai'),
	bannerSelesai = document.getElementsByClassName('bannerSelesai');

let ctx = c.getContext('2d');

let imgShip = new Image(),
	imgEnemy = new Image(),
	laserAudio = new Audio();

let bAtas = 0,
	bBawah = 135
	bKiri = 0,
	bKanan = 286;

let lives = 10,
	score = 80; 

let ship = {
	x: bKanan/2,
	y: bBawah
}

let musuh = [],
	peluru = [];









imgShip.src = 'assets/ship.png';
imgEnemy.src = 'assets/musuh.png';

laserAudio.src = 'assets/laser.m4a';



for(i=0;i<5;i++){
	musuh[i] = {
		x: (0.4+i)*60,
		y: 0,
		status: 'live'
	}
}

for(i=0;i<3;i++){
	peluru[i] = {
		x: ship.x+5,
		y: ship.y+5,
		status: 'ready',
		inScr: true
	}
}























let tembak = function(){
	for(i=0;i<musuh.length;i++){
		for(j=0;j<peluru.length;j++){
			if(musuh[i].status == 'live' && peluru[j].status == 'used'){
				if( (musuh[i].y < peluru[j].y && musuh[i].y+57/4 > peluru[j].y) &&
					(musuh[i].x < peluru[j].x && musuh[i].x+50/4 > peluru[j].x )){
					musuh[i].status = 'die';
					peluru[j].y = -5;
					score += 10;
				}
			}
		}
	}
}

let update = function(){
	livesShow.innerHTML = lives;
	scoreShow.innerHTML = score;
	if(lives > 0 && score >= 50){
		bannerSelesai[0].style.display = 'block';
		h1.innerHTML = "Selamat Anda Menang";
		clearInterval(app);
	}
	
	if(lives <= 0 && score < 50){
		bannerSelesai[0].style.display = 'block';
		h1.innerHTML = "Anda Kalah";
		clearInterval(app);
	}

}



let drawPeluru = function(){
	if(peluru[0].inScr == false && peluru[1].inScr == false && peluru[1].inScr == false){
		for(i=0;i<3;i++){
			peluru[i] = {
				x: ship.x+5,
				y: ship.y+5,
				status: 'ready',
				inScr: true
			}
		}
	}
	for(i=0;i<peluru.length;i++){
		if(peluru[i].y < bAtas-10){
			peluru[i].inScr = false;
		}
		if(peluru[i].status == 'used'){
			peluru[i].y -= 1;
		}
		ctx.fillStyle = 'red';
		ctx.fillRect(peluru[i].x,peluru[i].y,2,6);
	}
}


let drawEnemy = function (){
	if( musuh[0].status == 'die' && musuh[1].status == 'die' && musuh[2].status == 'die' && musuh[3].status == 'die' && musuh[4].status == 'die' ) {
		for(i=0;i<5;i++){
			musuh[i] = {
				x: (0.4+i)*60,
				y: 0,
				status: 'live'
			}
		}
	}
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if(musuh[i].y > bBawah+10){
				lives -= 1;

				break ;
			}

		}
	}
	for(i=0;i<musuh.length;i++){
		if(musuh[i].y > bBawah+10){
			musuh[i].y = -2;

		}
		musuh[i].y += 1;
		if(musuh[i].status == 'live'){
			ctx.drawImage(imgEnemy,0,0,50,38,musuh[i].x,musuh[i].y,50/4,38/4);
		}
	}
}


let drawShip = function (){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			// console.log(musuh[i].y < ship.y && musuh[i].y+38/4 > ship.y);
			if((musuh[i].y-12 < ship.y && musuh[i].y+38/4 > ship.y) &&
				(musuh[i].x-12 < ship.x && musuh[i].x+50/4 > ship.x) ){
				lives -= 1;
				musuh[0].y = 0;
				musuh[1].y = 0;
				musuh[2].y = 0;
				musuh[3].y = 0;
				musuh[4].y = 0;
				break;
			}
		}
	}
	ctx.drawImage(imgShip,0,0,50,57,ship.x,ship.y,50/4,57/4);
}



let draw = function(){
	ctx.clearRect(0,0,600,600);
	drawShip();
	drawEnemy();
	drawPeluru();
	update();
	tembak();
}

let init = function(){
	app = setInterval(function (){
		draw()
	},100);
}

document.addEventListener('keydown',key => {
	switch(key.code){
		case 'ArrowUp':
				if(ship.y > bAtas){
					ship.y -= 2;
					for(i=0;i<peluru.length;i++){
						if(peluru[i].status == 'ready'){
							peluru[i].y -= 2;
						}
					}
				}
			break;
		case 'ArrowDown':
				if(ship.y < bBawah){
					ship.y += 2;
					for(i=0;i<peluru.length;i++){
						if(peluru[i].status == 'ready'){
							peluru[i].y += 2;
						}
					}
				}
			break;
		case 'ArrowLeft':
				if(ship.x > bKiri){
					ship.x -= 2;
					for(i=0;i<peluru.length;i++){
						if(peluru[i].status == 'ready'){
							peluru[i].x -= 2;
						}
					}
				}
			break;
		case 'ArrowRight':
				if(ship.x < bKanan){
					ship.x += 2;
					for(i=0;i<peluru.length;i++){
						if(peluru[i].status == 'ready'){
							peluru[i].x += 2;
						}
					}
				}
			break;
		case 'Space':
					for(i=0;i<peluru.length;i++){
						if(peluru[i].status == 'ready'){
							laserAudio.play();
							peluru[i].status = 'used';
							return ;
						}
					}
			break;
		default:
			break;
	}
})




btnMulai.addEventListener('click', () => {
	bannerMulai[0].style.display = 'none';
	init();
})

btnUlangi.addEventListener('click', () => {
	bannerSelesai[0].style.display = 'none';

	lives = 10,
		score = 0; 

	ship = {
		x: bKanan/2,
		y: bBawah
	}
	for(i=0;i<5;i++){
		musuh[i] = {
			x: (0.4+i)*60,
			y: 0,
			status: 'live'
		}
	}

	for(i=0;i<3;i++){
		peluru[i] = {
			x: ship.x+5,
			y: ship.y+5,
			status: 'ready',
			inScr: true
		}
	}

	init();
})




