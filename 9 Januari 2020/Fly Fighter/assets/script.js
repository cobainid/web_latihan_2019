let c = document.getElementById('canvas'),
	btnMulai = document.getElementById('btnMulai'),
	livesshow = document.getElementById('livesshow'),
	scoreshow = document.getElementById('scoreshow'),
	bannerMulai = document.getElementsByClassName('bannerMulai')[0],
	bannerSelesai = document.getElementsByClassName('bannerSelesai')[0],
	title = document.getElementById('title');

let ctx = c.getContext('2d');

let lives = 10,score = 0;



let shipImg = new Image(),	enemyImg = new Image(), laserAudio = new Audio();

shipImg.src = 'assets/ship.png';
enemyImg.src = 'assets/musuh.png';
laserAudio.src = 'assets/laser.m4a';


let musuh = [],
	peluru = [];

let bAtas = 0, bKiri =0, bBawah = 130,bKanan = 280;
let ship = {
	x: bKanan/2 ,y:bBawah
}


















// declare musuh
for(i=0;i<5;i++){
	musuh[i] = {
		x: (i+.8)*50,
		y: 0,
		status: 'live'
	}
}

// declare peluru
for(i=0;i<3;i++){
	peluru[i] = {
		x: ship.x+7,
		y: ship.y+6,
		status: 'ready',
		inScr: true
	}
}
























function init(){
	init = setInterval(function(){
		draw();
	},100);
}



let crash = function(){
	for(i=0;i<musuh.length;i++){
		for(j=0;j<peluru.length;j++){
			if(peluru[j].status == 'used' && musuh[i].status == 'live'){
				if( (musuh[i].x < peluru[j].x && musuh[i].x+57/3 >peluru[j].x) &&
					(musuh[i].y < peluru[j].y && musuh[i].y+50/3 >peluru[j].y)
					){
						musuh[i].status = 'die';
						musuh[i] = {
							x: (i+Math.random())*50,
							y: Math.random()*10,
							status: 'live'
						}
						peluru[j].y = -10;
						score += 10;
				}
			}
		}
	}
}





let drawPeluru = function (){
	if(peluru[0].inScr == false && peluru[1].inScr == false && peluru[2].inScr == false){
		// declare peluru
		for(i=0;i<3;i++){
			peluru[i] = {
				x: ship.x+7,
				y: ship.y+6,
				status: 'ready',
				inScr: true
			}
		}
	}
	for(i=0;i<peluru.length;i++){
		if(peluru[i].status == 'used'){
			peluru[i].y -= 1;
		}
		if(peluru[i].y < bAtas-10){
			peluru[i].inScr = false;
		}


		ctx.fillStyle = 'red';

		ctx.fillRect(peluru[i].x,peluru[i].y,2,6);

	}
}


let drawEnemy = function (){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if(musuh[i].y > bBawah+10){
				musuh[i] = {
					x: (i+Math.random())*50,
					y: Math.random()*10,
					status: 'live'
				}
				lives -= 1;
			}
			musuh[i].y += 1;
			ctx.drawImage(enemyImg,0,0,50,38,musuh[i].x,musuh[i].y,50/3,38/3);
		}
	}
}



let board=function(){
	livesshow.innerHTML = lives;
	scoreshow.innerHTML = score;
	if(score >= 50){
			clearInterval(init);
			bannerSelesai.style.display = 'block';
			title.innerHTML = "Anda Menang";
	}
	if(lives < 0) {
			clearInterval(init);
			bannerSelesai.style.display = 'block';
			title.innerHTML = "Anda kalah";
	}
}


let drawShip = function(){

	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			console.log
			if( (musuh[i].x-50/3 < ship.x && musuh[i].x+50/3 >ship.x) &&
				(musuh[i].y-38/3 < ship.y && musuh[i].y+38/3 >ship.y)
				){
					musuh[i].status = 'die';
					musuh[i] = {
						x: (Math.random()*10)*40,
						y: 0,
						status: 'live'
					};
					lives -= 1;
				}
			}
	}
	ctx.drawImage(shipImg,0,0,50,57,ship.x,ship.y,50/3,57/3);
}


let draw = function(){
	ctx.clearRect(0,0,600,600);
	drawShip();
	drawEnemy();
	drawPeluru();
	crash();
	board();
}


document.addEventListener('keydown',(key) => {
	// console.log(key.key);
	switch(key.code){
		case 'ArrowUp':
			if(ship.y > bAtas){
				ship.y -=1 ;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y -= 1;
					}
				}
			}
			break;
		case 'ArrowDown':
			if(ship.y < bBawah){
				ship.y += 1 ;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y += 1;
					}
				}
			}

			break;
		case 'ArrowLeft':
			if(ship.x > bKiri){
				ship.x -=1 ;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x -= 1;
					}
				}
			}

			break;
		case 'ArrowRight':
			if(ship.x < bKanan){
				ship.x +=1 ;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x += 1;
					}
				}
			}
			break;
		case 'Space':
			for(i=0;i<peluru.length;i++){
				if(peluru[i].status == 'ready'){
					laserAudio.play();
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
})

btnUlangi.addEventListener('click',() => {
	bannerSelesai.style.display = 'none';
	lives = 10,score = 0;
	ship = {
		x: bKanan/2 ,y:bBawah
	}
	// declare musuh
	for(i=0;i<5;i++){
		musuh[i] = {
			x: (i+.8)*50,
			y: 0,
			status: 'live'
		}
	}

	// declare peluru
	for(i=0;i<3;i++){
		peluru[i] = {
			x: ship.x+7,
			y: ship.y+6,
			status: 'ready',
			inScr: true
		}
	}

	init();
})


