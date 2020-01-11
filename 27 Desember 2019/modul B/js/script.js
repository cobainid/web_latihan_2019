$(window).on('scroll',function(){
	if($(window).scrollTop() >= 500){
		$('nav').attr('class','navbar full-black');
	}else {
		$('nav').attr('class','navbar');
	}
})