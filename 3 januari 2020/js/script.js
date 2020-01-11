$(window).on('scroll',function() {
	console.log($(document).scrollTop());
	if($(document).scrollTop() > 400){
		$('.navbar').attr('navbar','navbar fixed')
	}
})