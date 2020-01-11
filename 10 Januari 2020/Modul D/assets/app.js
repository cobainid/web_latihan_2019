let c = document.getElementById('canvas'),
	ctx = c.getContext('2d'),
	livesshow = document.getElementById('livesshow'),
	btnMulai = document.getElementById('btnMulai'),
	btnSelesai = document.getElementById('btnSelesai'),
	scoreshow = document.getElementById('scoreshow'),
	title = document.getElementById('title'),
	bannerMulai = document.getElementsByClassName('bannerMulai')[0],
	bannerSelesai = document.getElementsByClassName('bannerSelesai')[0];



let bAtas= 0, bKiri= 0 , bKanan = 280,bBawah=130;

let lives = 10, score=0;


let ship = {
	x: bKanan/2,
	y: bBawah
};



let imgShip = new Image(),imgMusuh=new Image(),laser=new Audio();

let musuh = [], peluru = [];







imgShip.src = 'assets/ship.png';
imgMusuh.src = 'assets/musuh.png';





for(i=0;i<5;i++){
	musuh[i] = {
		x: (i+1)*45,
		y: 0,
		status: 'live'
	};
}

for(i=0;i<3;i++){
	peluru[i] = {
		x: ship.x+7,
		y: ship.y+5,
		status: 'ready',
		inScr: true
	};
}

















let init = function(){
	app = setInterval(function(){
		draw();
	},40);
}

let draw = function () {
	ctx.clearRect(0,0,600,600);
	drawShip();
	drawMusuh();
	drawPeluru();
	crash();
	board();
}


let drawShip = function(){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if( (musuh[i].x-50/3 < ship.x && musuh[i].x+50/3 > ship.x) &&
				(musuh[i].y-50/3 < ship.y && musuh[i].y+50/3 > ship.y)
			){
				musuh[i] = {
					x: (i+Math.random())*45,
					y: (Math.random()*10)-(Math.random()*100),
					status: 'live'
				};
				lives -= 1;
			}
		}
	}
	ctx.drawImage(imgShip,0,0,50,57,ship.x,ship.y,50/3,57/3);
}


let drawPeluru = function(){
	if(
		(peluru[0].inScr == false ) &&
		(peluru[1].inScr == false ) &&
		(peluru[2].inScr == false )
	){

		for(i=0;i<peluru.length;i++){
			peluru[i] = {
				x: ship.x+7,
				y: ship.y+5,
				status: 'ready',
				inScr: true
			};
		}

	}
	for(i=0;i<peluru.length;i++){
		if(peluru[i].y < bAtas-10){
			peluru[i].inScr = false;
		}
		if(peluru[i].status == 'used'){
			peluru[i].y -= 2;
		}
		ctx.fillStyle = 'red';
		ctx.fillRect(peluru[i].x,peluru[i].y,2,6);
	}
}


let drawMusuh=function(){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if(musuh[i].y > bBawah+30){
				musuh[i] = {
					x: (i+Math.random())*45,
					y: (Math.random()*10)-(Math.random()*100),
					status: 'live'
				};
				lives -= 1; // nyawa berkurang
			}
			musuh[i].y += 1;
			ctx.drawImage(imgMusuh,0,0,50,38,musuh[i].x,musuh[i].y,50/3,38/3);
		}
	}
}




let crash = function(){
	for(i=0;i<musuh.length;i++){
		for(j=0;j<peluru.length;j++){
			if(peluru[j].status == 'used' && musuh[i].status == 'live'){

				if( (musuh[i].x < peluru[j].x && musuh[i].x+50/3 > peluru[j].x) &&
					(musuh[i].y < peluru[j].y && musuh[i].y+38/3 > peluru[j].y) 
				){
					peluru[j].y = -10;
					musuh[i] = {
						x: (i+Math.random())*45,
						y: (Math.random()*10)-(Math.random()*100),
						status: 'live'
					};

					score += 10;
					break;
					//return;
				}
			}
		}
	}
}


let board = function(){
	livesshow.innerHTML = lives;
	scoreshow.innerHTML = score;
	if(score >= 50){
		bannerMulai.style.display = 'none';
		bannerSelesai.style.display = 'block';
		clearInterval(app);
		title.innerHTML = 'Anda Menang';
	}
	if(lives <= 0){
		bannerMulai.style.display = 'none';
		bannerSelesai.style.display = 'block';
		clearInterval(app);
		title.innerHTML = 'Anda Kalah';
	}
}









document.addEventListener('keydown',(key) => {
	//console.log(key.code);
	switch(key.code){
		case 'ArrowUp':
			if(ship.y > bAtas){
				ship.y -=2;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y -=2;
					}
				}
			}
			break;
		case 'ArrowDown':
			if(ship.y < bBawah){
				ship.y +=2;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y +=2;
					}
				}
			}
			break;
		case 'ArrowLeft':
			if(ship.x > bKiri){
				ship.x -=2;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x -=2;
					}
				}
			}
			break;
		case 'ArrowRight':
			if(ship.x < bKanan){
				ship.x +=2;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x +=2;
					}
				}
			}
			break;
		case 'Space':
			for(i=0;i<peluru.length;i++){
				if(peluru[i].status == 'ready'){
					peluru[i].status = 'used';
					break;
				}
			}
			break;
		default:
			break;
	}
})






btnMulai.addEventListener('click',() => {
	bannerMulai.style.display = 'none';
	init();
});

btnUlangi.addEventListener('click',() => {
	bannerSelesai.style.display = 'none';

	lives = 10,score = 0;

	ship = {
		x: bKanan/2,
		y: bBawah,
		status: 'live'
	}

	for(i=0;i<5;i++){
		musuh[i] = {
			x: (i+1)*45,
			y: 0,
			status: 'live'
		};
	}

	for(i=0;i<3;i++){
		peluru[i] = {
			x: ship.x+7,
			y: ship.y+5,
			status: 'ready',
			inScr: true
		};
	}

	init();
});






































