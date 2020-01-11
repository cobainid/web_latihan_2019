
$(window).on('scroll',function(){
	if($(document).scrollTop() >= 100){
		console.log($(document).scrollTop());
		$('nav').attr('class','navbar pd-20 pd-s-40 nav-fixed bg-white');
	}else{
		$('nav').attr('class','navbar pd-20');
	}
})