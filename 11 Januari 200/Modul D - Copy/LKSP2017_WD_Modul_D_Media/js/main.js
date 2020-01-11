$(document).ready(function(){
	$("img#2").parent(".slide").css("display", "block").addClass("act");
	$("table#detail").html("<tr>");
	$("table#detail").find("tr").text(item());
	var topp = "<img src='img/bread-top.png'>";
	var bott = "<img src='img/bread-bottom.png'>";
	$("#order").html(bott);
	$(".slide").click(function(){
		var src = $(this).find("img").attr("src");
		var data = $("#order").html();
		var im = "<img src='"+src+"'>";
		$("#order").html(data+im);
	}).promise().done(function(){
		var src = $(this).find("img").attr("src");
		var data = $("#order").html();
		var im = "<img src='"+src+"'>";
		$("#order").html(data+im);
		// var rw = $("#order").html();
		// $("#order").html(rw+topp);
	});
	
});

function prev(){
	if($("img#2").parent(".slide").hasClass("act")){
		$("img#8").parent(".slide").css("display", "block").addClass("act");
		$("img#2").parent(".slide").css("display", "none").removeClass("act");
		
	}
	
	else if($("img#8").parent(".slide").hasClass("act")){
		$("img#7").parent(".slide").css("display", "block").addClass("act");
		$("img#8").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#7").parent(".slide").hasClass("act")){
		$("img#6").parent(".slide").css("display", "block").addClass("act");
		$("img#7").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#6").parent(".slide").hasClass("act")){
		$("img#5").parent(".slide").css("display", "block").addClass("act");
		$("img#6").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#5").parent(".slide").hasClass("act")){
		$("img#4").parent(".slide").css("display", "block").addClass("act");
		$("img#5").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#4").parent(".slide").hasClass("act")){
		$("img#3").parent(".slide").css("display", "block").addClass("act");
		$("img#4").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#3").parent(".slide").hasClass("act")){
		$("img#2").parent(".slide").css("display", "block").addClass("act");
		$("img#3").parent(".slide").css("display", "none").removeClass("act");
	}
}

function next(){
	if($("img#2").parent(".slide").hasClass("act")){
		$("img#3").parent(".slide").css("display", "block").addClass("act");
		$("img#2").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#3").parent(".slide").hasClass("act")){
		$("img#4").parent(".slide").css("display", "block").addClass("act");
		$("img#3").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#4").parent(".slide").hasClass("act")){
		$("img#5").parent(".slide").css("display", "block").addClass("act");
		$("img#4").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#5").parent(".slide").hasClass("act")){
		$("img#6").parent(".slide").css("display", "block").addClass("act");
		$("img#5").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#6").parent(".slide").hasClass("act")){
		$("img#7").parent(".slide").css("display", "block").addClass("act");
		$("img#6").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#7").parent(".slide").hasClass("act")){
		$("img#8").parent(".slide").css("display", "block").addClass("act");
		$("img#7").parent(".slide").css("display", "none").removeClass("act");
	}
	
	else if($("img#8").parent(".slide").hasClass("act")){
		$("img#2").parent(".slide").css("display", "block").addClass("act");
		$("img#8").parent(".slide").css("display", "none").removeClass("act");
	}
}

function orderC(){
	
}



















