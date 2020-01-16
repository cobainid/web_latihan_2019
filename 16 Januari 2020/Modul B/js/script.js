$('.count').each(function(){
	$(this).prop('tambah',0).animate({
		tambah: $(this).text()
	},{
		duration: 800,
		easing:'swing',
		step: (num) => {
			$(this).text(Math.ceil(num))
		}
	})
})

$('li a').on('click',function(){
	let hash = this.hash;
	if(hash !== ""){
		$('html,body').animate({
			scrollTop: $(hash).offset().top
		},800);
	}
})
