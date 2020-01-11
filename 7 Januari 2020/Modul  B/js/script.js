$(window).on('scroll',function(){
	if($(document).scrollTop() > 50){
		$('.navbar').attr('class','navbar color-green fixed');
	}else{
		$('.navbar').attr('class','navbar fixed');
	}

	if($(document).scrollTop() > 800){
		$('.toTop').attr('class','toTop showTop');
	}else{
		$('.toTop').attr('class','toTop');
	}
})


$('a').on('click',function(){
	let hash = this.hash;
	if(hash == ""){
		return 0;
	}else{
		$('html,body').animate({
			scrollTop: $(hash).offset().top
		},800,function(){
			window.location.hash = hash;
		})
	}
})

$('.modal__exit').on('click',function(){
	$('.modal').attr('style','display:none');
})

function show(anu){
	$('#img__modal').attr('src',anu.src);
	$('.modal').attr('style','');
}



function prev(){
	let anu = $('#img__modal').attr('src').split('assets/Img-0')[0];
	let getImgNow = $('#img__modal').attr('src').split('assets/Img-0')[1].replace('.png','');
	let numNow = parseInt(getImgNow,10)-1;
	if(numNow >= 1 ){
		$('#img__modal').attr('src',anu+'assets/Img-0'+numNow+'.png');
	}else{
		$('#img__modal').attr('src',anu+'assets/Img-06.png');
	}
	console.log(anu+'assets/Img-0'+getImgNow+'.png');
}
function next(){
	let anu = $('#img__modal').attr('src').split('assets/Img-0')[0];
	let getImgNow = $('#img__modal').attr('src').split('assets/Img-0')[1].replace('.png','');
	let numNow = parseInt(getImgNow,10)+1;
	if(numNow <= 6 ){
		$('#img__modal').attr('src',anu+'assets/Img-0'+numNow+'.png');
	}else{
		$('#img__modal').attr('src',anu+'assets/Img-01.png');
	}
	console.log(anu+'assets/Img-0'+getImgNow+'.png');
}











