$(window).on('scroll',function() {
	console.log($(document).scrollTop());
	if($(document).scrollTop() > 400){
		$('.toTop').attr('style','display: block');
	}else{
		$('.toTop').attr('style','display: none');
	}
});

	$('a.uwu,a.toTop').on('click',function(){
		let hash = this.hash;
		$('html').animate({
			scrollTop: $(hash).offset().top
		},800,function(){
			window.location.hash = hash;
		})
	});
