$(window).on('scroll',function{
	if($(document).scrollTop() > 400){
		$('nav').attr('navbar','navbar fixed')
	}
})