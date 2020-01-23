$('a.nav-link').on('click',function(){
	let hash = this.hash;

	if(hash != ""){
		$('html,body').animate({
			scrollTop: $(hash).offset().top
		},800)
	}
})

$('a.toTop').on('click',function(){
	let hash = this.hash;

	if(hash != ""){
		$('html,body').animate({
			scrollTop: $(hash).offset().top
		},800)
	}
})

$(window).on('scroll',function(){
	if($(document).scrollTop() > 500){
		// console.log("uwu")
		$('.toTop').attr('class','toTop d-block')
	}else{
		$('.toTop').attr('class','toTop')
	}
})