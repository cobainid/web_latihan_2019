
$(window).on('scroll',function(){
	if($(window).scrollTop() > 400){
		$('.navbar').attr('class','navbar fixed bg-blue')
	}else {
		$('.navbar').attr('class','navbar')
	}
})


$('a').on('click',function () {
	let hash = this.hash;
	if(hash !== "#"){
		console.log(hash);
		$('html,body').animate({
			scrollTop: $(hash).offset().top
		},800);
	}
})