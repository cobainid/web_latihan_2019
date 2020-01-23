let c = document.querySelector('#canvas'),	
	ctx = c.getContext('2d'),
	width = c.width,
	height = c.height;


let images = new Image();
images.src = '/assets/sprite.png';

let dino = {
	x: 10,
	y: height/2-35
}

let awan = [];


for(i=0;i<5;i++){
	awan[i] = {
		x: Math.random()*1000+c.width,
		y: Math.random()*100
	}
}


let obstacleSpeed = 10;

kakiKanan = true,isJumping = false,isNdengkluk = false;


let obstacle = [];

jarakAntarObstacle = 400;
for(i=0;i<5;i++){
	obstacle[i] = {
		x: Math.random()*100+(i*jarakAntarObstacle)+c.width,
		y: height/2-20
	}
}


tinggiLompatan = 30,intervalLompatan = 4;


speedAwan = 15;
let drawAwan = function (){
	for(i=0;i<5;i++){
		ctx.drawImage(images,90,0,45,25,awan[i].x,awan[i].y,45,25);
		awan[i].x -= speedAwan;
		if(awan[i].x < 0){
			awan[i] = {
				x: Math.random()*1000+c.width,
				y: Math.random()*100
			}
		}
	}
}


let isNaik = true;
let val = 0;
let jump = function () {
	if(isJumping){
		if(isNaik){
			if(val < intervalLompatan){
				dino.y -= tinggiLompatan;
				val+=1;
			}else{
				isNaik = false;
			}
		}else {
			if(val > 0){
				dino.y += tinggiLompatan/2;
				val-=1/2;
			}else{
				isJumping = false;
				isNaik=true;
			}
		}
	}
}


ndengkluk = 0;

let drawDino = function(){


	if(isJumping){
		ctx.drawImage(images,808+45,0,45,50,dino.x,dino.y,45,50);
	}else{
		if(isNdengkluk){
			if(ndengkluk < 10){
				if(kakiKanan){
					ctx.drawImage(images,940,0,60,50,dino.x,dino.y,60,50);
					kakiKanan = false;
				}else{
					ctx.drawImage(images,940+59,0,60,50,dino.x,dino.y,60,50);
					kakiKanan = true;
				}
				ndengkluk += 1;
				console.log(ndengkluk);
			}else{
				ndengkluk = 0;
				isNdengkluk = false;
			}
		}else{
			if(kakiKanan){
				ctx.drawImage(images,808-45,0,45,50,dino.x,dino.y,45,50);
				kakiKanan = false;
			}else{
				ctx.drawImage(images,808,0,45,50,dino.x,dino.y,45,50);
				kakiKanan = true;
			}
		}

	}
	// ctx.drawImage(images,40,0,50,50,dino.x,dino.y,50,50);

}


let tanah = 0;
let drawTanah = function(){
	ctx.drawImage(images,tanah,52,images.width,18,0,height/2,images.width,18);

	ctx.drawImage(images,+tanah-c.width,50,c.width,18,0,height/2-2,c.width,18);
	
	if(tanah > 1204){
		tanah = 0;
	}
	tanah+= 10;
}

isDead = false;
let crash = function() {
	for(i=0;i<5;i++){
		// console.log((obstacle[i].x < dino.x && obstacle[i].x+19 > dino.x ))
		if((obstacle[i].x < dino.x+50/2 && obstacle[i].x+19 > dino.x+50/2 ) &&
			(obstacle[i].y-36/2 < dino.y+45 && obstacle[i].y+36 > dino.y+45 ) ){
			isDead = true;
		}
	}
}


function prefix(num,pref){
	let prefix = "";
	for(i=0;i<pref-num.toString().length;i++){
		prefix += "0";
	}
	prefix += num.toString();
	return prefix;
}

let score = 1;

let uwu = 0;

let drawScore= function(){
	num = prefix(score,6);
	// console.log(num);
	// console.log(num.length);
	for(i=0;i<num.length;i++){
		ctx.drawImage(images,483+(10*num.charAt(i)),0,10,15,0+(i*20),0,20,20);
		// ctx.drawImage(images,483+20,0,10,15,0,0,20,20);
		// ctx.drawImage(images,480+(i*num.charAt(i)),0,15,15,0+(i*15),0,20,20);
	}
	if(uwu > 4){
		score += 1;
		uwu = 0;
	}
	uwu++;
}


let drawObstacle = function(){
	for(i=0;i<5;i++){
		ctx.drawImage(images,244,0,19,36,obstacle[i].x,obstacle[i].y,19,36);
		if(obstacle[i].x < 0){
			obstacle[i] = {
				x: Math.random()*100+(i*jarakAntarObstacle)+c.width,
				y: height/2-20
			}
		}
		obstacle[i].x -= obstacleSpeed;
	}
}


let draw=function(){
	ctx.clearRect(0,0,c.width,c.height);
	drawTanah();
	drawDino();
	drawAwan();
	drawScore();
	drawObstacle();
	crash();
	if(isJumping){
		jump();
	}
	if(isDead){
		clearInterval(app);
	}
}

let init = function(){
	app = setInterval(function(){
		draw()
	},80);
}


document.addEventListener('keydown',(key) => {
	switch(key.code){
		case "Space":
			isJumping = true;
			break;
		case "ArrowUp":
			isJumping = true;
			break;
		case "ArrowDown":
			isNdengkluk = true;
			break;
		default:
		break;
	}
})





init();

