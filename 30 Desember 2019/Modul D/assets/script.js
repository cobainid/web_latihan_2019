let c = document.getElementById('canvas'),
	livesshow = document.getElementById('livesshow'),
	scoreshow = document.getElementById('scoreshow'),
	title = document.getElementById('title'),
	bannerSelesai = document.getElementsByClassName('bannerSelesai')[0],
	bannerMulai = document.getElementsByClassName('bannerMulai')[0],
	btnMulai = document.getElementsByClassName('btn-start')[0],
	btnUlangi = document.getElementsByClassName('btn-ulangi')[0];


let ctx = c.getContext('2d');

let lives = 10,score = 0;

let musuh = [], peluru = [];

let imgShip = new Image(),
	imgMusuh = new Image(),
	laserAudio = new Audio();

imgShip.src = 'assets/ship.png';
imgMusuh.src = 'assets/musuh2.png';
laserAudio.src = 'assets/laser.m4a';

let bAtas = 0,bKiri = 0,bBawah = 130,bKanan = 280;

let ship = {
	x: bKanan/2,
	y: bBawah
};









for(i=0;i<5;i++){
	musuh[i] = {
		x : (.5+i)*55,
		y : 0,
		status : 'live'
	}
}


for(i=0;i<3;i++){
	peluru[i] = {
		x: ship.x+7,
		y: ship.y+10,
		inScr: true,
		status: 'ready'
	}
}







let board= function(){
	livesshow.innerHTML = lives;
	scoreshow.innerHTML = score;
	if(lives > 0 && score >= 50){
		clearInterval(app);
		bannerSelesai.style.display = 'block';
		title.innerHTML = "Anda Menang";
	}
	if(lives <= 0 && score < 50){
		clearInterval(app);
		bannerSelesai.style.display = 'block';
		title.innerHTML = "Anda Kalah";
	}
}


let crash = function(){
	for(i=0;i<musuh.length;i++){
		for(j=0;j<peluru.length;j++){
			if(musuh[i].status == 'live' && peluru[j].status == 'used'){
				// Crash function Here
				// 150/7,150/8

				// console.log((musuh[i].x <= peluru[j].x && musuh[i].x+(150/7) >= peluru[j].x) && (musuh[i].y <= peluru[j].y && musuh[i].y+(150/8) >= peluru[j].y));
				if( (musuh[i].x <= peluru[j].x && musuh[i].x+(150/7) >= peluru[j].x) &&
						(musuh[i].y <= peluru[j].y && musuh[i].y+(150/8) >= peluru[j].y))
				{
					// summing score
					score += 10;
					// buang peluru
					peluru[j].y = -10;
					// generate musuh
					musuh[i] = {
						x : (Math.random()*5)*55,
						y : -10,
						status : 'live'
					}

				}
			}
		}
	}
}


let drawPeluru =function(){
	if(peluru[0].inScr == false && peluru[1].inScr == false && peluru[2].inScr == false){
		for(i=0;i<3;i++){
			peluru[i] = {
				x: ship.x+7,
				y: ship.y+10,
				inScr: true,
				status: 'ready'
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


let drawMusuh = function(){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].y > bBawah+10){
			lives -=1;
			break ;
		}
	}

	for(i=0;i<musuh.length;i++){
		if(musuh[i].y > bBawah+10){
			musuh[i].y = -10;
		}
			musuh[i].y += 1;
		ctx.drawImage(imgMusuh,0,0,150,150,musuh[i].x,musuh[i].y,150/7,150/8);
	}
}

let drawShip = function(){
	for(i=0;i<musuh.length;i++){
		if(musuh[i].status == 'live'){
			if( (musuh[i].x-((150/7)/2+5) <= ship.x && musuh[i].x+(150/7) >= ship.x) &&
						(musuh[i].y-((150/8)/2+5) <= ship.y && musuh[i].y+(150/8) >= ship.y))
				{
					// mengurangi nyawa
					lives -= 1; 

					//  Generate musuh
					musuh[i] = {
						x : (Math.random()*5)*55,
						y : -10,
						status : 'live'
					}
				}
		}
	}
	ctx.drawImage(imgShip,0,0,50,57,ship.x,ship.y,50/3,57/3);
}




let draw = function(){
	ctx.clearRect(0,0,600,600);
	drawShip();
	drawMusuh();
	drawPeluru();
	crash();
	board();
}




let init = function(){
	app = setInterval(function(){
		draw();
	},100);
}


document.addEventListener('keydown',(ev) => {
	switch(ev.code){
		case 'ArrowLeft':
			if(ship.x > bKiri){
				ship.x -= 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x -= 1;
					}
				}
			}
			break;

		case 'ArrowUp':
			if(ship.y > bAtas){
				ship.y -= 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y -= 1;
					}
				}
			}
			break;

		case 'ArrowRight': 
			if(ship.x < bKanan){
				ship.x += 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].x += 1;
					}
				}
			}
			break;

		case 'ArrowDown': 
			if(ship.y < bBawah){
				ship.y += 1;
				for(i=0;i<peluru.length;i++){
					if(peluru[i].status == 'ready'){
						peluru[i].y += 1;
					}
				}
			}
			break;

		case 'Space':
			for(i=0;i<peluru.length;i++){
				if(peluru[i].status == 'ready'){
					peluru[i].status = 'used';
					laserAudio.play();
					break;
				}
			}
			break;

		default:
			break;
	}
	// console.log(ev.code);
})










btnMulai.addEventListener('click', () => {
	init();
	bannerMulai.style.display = 'none';
});
btnUlangi.addEventListener('click',() => {
	bannerSelesai.style.display = 'none';
		lives = 10, score = 0;
		for(i=0;i<5;i++){
			musuh[i] = {
				x : (.5+i)*55,
				y : 0,
				status : 'live'
			}
		}
		for(i=0;i<3;i++){
			peluru[i] = {
				x: ship.x+7,
				y: ship.y+10,
				inScr: true,
				status: 'ready'
			}
	}
	init();
})


