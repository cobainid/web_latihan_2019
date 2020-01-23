
$(window).on('scroll',function(){
	if($(window).scrollTop() > 400){
		$('.navbar').attr('class','navbar fixed bg-blue');
		$('.toTop').attr('style','display:block')
	}else {
		$('.navbar').attr('class','navbar');
		$('.toTop').attr('style','display:none')
	}
})


$('a').on('click' ,function(){
	let hash = this.hash;

	if(hash != ""){
		$('html,body').animate({
			scrollTop: $(hash).offset().top
		},800);
	}
})

// $('a').on('click',function () {
// 	let hash = this.hash;
// 	if(hash !== "#"){
// 		console.log(hash);
// 		$('html,body').animate({
// 			scrollTop: $(hash).offset().top
// 		},800);
// 	}
// })


function showImage(e){
	$('#modal__img').attr('src',e.src);
	$('#modal').attr('style','display: block');
	console.log();
}

function closeModal(){
	$('#modal').attr('style','display: none');
}

// $(document).on('click', () => {
// 	$('#modal').attr('style','display: none');
// })