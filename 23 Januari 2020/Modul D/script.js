let c = document.querySelector('#canvas'),
	ctx = c.getContext('2d'),
	livesshow = document.querySelector('#livesshow'),
	scoreshow = document.querySelector('#scoreshow'),
	btnMulai = document.querySelector('#btnMulai'),
	btnUlangi = document.querySelector('#btnUlangi'),
	title = document.querySelector('#title'),
	bannerMulai = document.querySelector('.bannerMulai'),
	bannerUlangi = document.querySelector('.bannerUlangi');


let lives = 10,score = 0;

let imgShip = new Image(),
	imgMusuh = new Image(),
	audio = new Audio();


audio.src = 'assets/laser.m4a';
imgShip.src = 'assets/ship.png';
imgMusuh.src = 'assets/musuh.png';

speedMusuh = 2, speedShip = 1, speedPeluru =2;


let bAtas = 0, bKiri = 0, bKanan = 280, bBawah = 130;

// console.log(imgShip)

let peluru = [], musuh = [];

let ship = {
	x: bKanan/2,
	y: bBawah
};

// console.log(ship.x)

for(i=0;i<5;i++){
	musuh[i] = {
		x: (45*i)+45,
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




let board = function(){
	livesshow.innerHTML = lives;
	scoreshow.innerHTML = score;
	if(lives > 0 && score > 40){
		clearInterval(app)
		title.innerHTML = 'Anda Menang';
		bannerUlangi.style.display = 'block'
	}else if( lives <= 0 && score <= 40){
		clearInterval(app)
		title.innerHTML = 'Anda Kalah';
		bannerUlangi.style.display = 'block'
	}
}



let drawPeluru = function(){
	// console.log(!peluru[0].inScr && !peluru[1].inScr && !peluru[2].inScr)
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
		if(peluru[i].status == 'used'){
			peluru[i].y -= speedPeluru;
		}
		if(peluru[i].y < bAtas-10){
			peluru[i].inScr = false;
		}
		ctx.fillStyle = 'red';
		ctx.fillRect(peluru[i].x, peluru[i].y, 2, 6);
	}
}

let drawMusuh = function (){
	// console.log("uwu")
	for(i=0;i<musuh.length;i++){
		musuh[i].y += speedMusuh;
		if(musuh[i].y > bBawah+10){
			musuh[i] = {
				x: (15*Math.random()*10)+45,
				y: -10,
				status: 'live'
			}
		}
		if(musuh[i].status == 'live'){

			ctx.drawImage(imgMusuh, 0 , 0,
				imgMusuh.width, imgMusuh.height, 
				musuh[i].x, musuh[i].y,
				imgMusuh.width/3, imgMusuh.height/3);
		}

	}
}

let crash = function(){
	for(i=0;i<musuh.length;i++){
		for(j=0;j<peluru.length;j++){
			if(musuh[i].status == 'live' && peluru[j].status == 'used'){
				if( (musuh[i].x-(imgMusuh.width/3) < peluru[j].x && musuh[i].x+(imgMusuh.width/3) > peluru[j].x) &&
					(musuh[i].y-(imgMusuh.width/3) < peluru[j].y && musuh[i].y+(imgMusuh.width/3) > peluru[j].y)){
					musuh[i].status = 'die';
					score += 10;
					peluru[j].y = -10;
					musuh[i]  ={
						x: (25*Math.random()*i)+45,
						y: -10,
						status: 'live'
					}
				}
			}
		}
	}
}



let drawShip = function (){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if((musuh[i].x-(imgMusuh.width/3) < ship.x && musuh[i].x+(imgMusuh.width/3) > ship.x) &&
					(musuh[i].y-(imgMusuh.width/3) < ship.y && musuh[i].y+(imgMusuh.width/3) > ship.y)){
					lives -= 1;
					musuh[i]  ={
						x: (25*Math.random()*i)+45,
						y: -10,
						status: 'live'
					}
			}
		}
	}
	ctx.drawImage(imgShip, 0, 0, 
		imgShip.width, imgShip.height, ship.x, ship.y, 
		imgShip.width/3,imgShip.height/3);
}



let draw = function(){
	ctx.clearRect(0, 0, c.width, c.height);

	drawShip()
	drawMusuh()
	drawPeluru()
	crash()
	board()

}

document.addEventListener('keydown',(key) => {
	// console.log(key.code)
	switch(key.code) {
		case 'ArrowUp':
			if(ship.y > bAtas ){
				ship.y -= speedShip;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y -= speedShip;
					}
				}
			}
			break;
		case 'ArrowDown':
			if(ship.y < bBawah ){
				ship.y += speedShip;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y += speedShip;
					}
				}
			}
			break;
		case 'ArrowLeft':
			if(ship.x > bKiri ){
				ship.x -= speedShip;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x -= speedShip;
					}
				}
			}
			break;
		case 'ArrowRight':
			if(ship.x < bKanan ){
				ship.x += speedShip;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x += speedShip;
					}
				}
			}
			break;
		case 'Space':
			for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].status = 'used';
						audio.play()
						break;
					}
				}
			break;
		default:
			break;
	}
})


let init = function(){
	app = setInterval(function() {
		draw();
	},100);
}

btnMulai.addEventListener('click',function(){
	bannerMulai.style.display = 'none'
	init();
})


btnUlangi.addEventListener('click',function(){
	bannerUlangi.style.display = 'none'
	ship = {
		x: bKanan/2,
		y: bBawah
	};

	lives = 10, score = 0;

	for(i=0;i<5;i++){
		musuh[i] = {
			x: (45*i)+45,
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



	init();
})
