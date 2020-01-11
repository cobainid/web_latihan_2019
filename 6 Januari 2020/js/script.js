$(window).on('scroll',function() {
	console.log($(document).scrollTop());
	if($(document).scrollTop() > 400){
		$('.toTop').attr('style','display: block');
		$('nav').attr('class','navbar fixed');
	}else{
		$('.toTop').attr('style','display: none');
		$('nav').attr('class','navbar');
	}
});

	$('a').on('click',function(){
		let hash = this.hash;
		$('html').animate({
			scrollTop: $(hash).offset().top
		},800,function(){
			window.location.hash = hash;
		})
	});
