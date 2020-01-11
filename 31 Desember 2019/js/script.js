
$(window).on('scroll',function(){
	if($(document).scrollTop() >= 80){
		console.log($(document).scrollTop());
		$('nav').attr('class','navbar pd-20 pd-s-40 nav-fixed nav-hovered');
	}else{
		$('nav').attr('class','navbar pd-20 pd-s-40 nav-fixed');
	}
})