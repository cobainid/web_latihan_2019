$(document).ready(function(){
	$('.nav a').on('click',function(e){
		e.preventDefault();
		let hash = this.hash;
		if(hash !== ""){
			$('html,body').animate({
				scrollTop: $(hash).offset().top
			},800,function(){
				window.location.hash = hash;
			})
		}
	})
	$('a.toTop').on('click',(e) => {
		e.preventDefault();
		let hash = '#header';
		console.log(hash);
		if(hash !== ""){
			$('html,body').animate({
				scrollTop: $(hash).offset().top
			},800,function(){
				window.location.hash = hash;
			})
		}
	})

	$(document).on('scroll',() => {
		if($(document).scrollTop() > 300){
			$('.toTop').attr('class','toTop d-block');
		}else {
			$('.toTop').attr('class','toTop');
		}
	})
})

