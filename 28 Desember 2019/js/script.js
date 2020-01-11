$(window).on('scroll',function(){
	if($(document).scrollTop() >= 400){
		$('.navbar').attr('class','navbar bg-black pd-20 fixed');
	}else {
		$('.navbar').attr('class','navbar bg-black pd-20');
	}
	console.log($(document).scrollTop())
})