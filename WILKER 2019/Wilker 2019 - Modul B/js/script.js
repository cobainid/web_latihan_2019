$(document).ready(function(){
	// let preloader = document.getElementsByClassName('preloader')[0];
	// $('.preloader').attr('class','preloader hidden');

	// $('a.animate').on('click',function(e) {
	// 	e.preventDefault();
	// 	if(this.hash !== ""){
	// 		let hash = this.hash;

	// 		$('html,body').animate({
	// 			scrollTop: $(hash).offset().top
	// 		},800,function(){
	// 			window.location.hash = hash;
	// 		})
	// 	}
	// })
});



let preload = function (){
	let count = 0;
	app = setInterval(function(){
		// console.log(count);
		count +=1;
		if(count > 2){
			clearInterval(app);
			$('.preloader').attr('class','preloader hidden');
		}
	},1000)
}

preload();


$(window).on('scroll',function(){
	console.log($(window).scrollTop());
	if($(window).scrollTop() >= 350){
		$('.navbar')[0].style.background = "#000";
	}else{
		$('.navbar')[0].style.background = "rgba(0,0,0,.5)";
	}
})