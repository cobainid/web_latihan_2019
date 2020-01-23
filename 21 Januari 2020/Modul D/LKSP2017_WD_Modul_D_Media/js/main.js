let num = 1000;
let price = 0;
let arr = [];

$(document).ready(function(){
	$("img#2").parent(".slide").css("display", "block").addClass("act");
	$("table#detail").html("<tr>");
	$("table#detail").find("tr").text(item());
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";
	$("#order").html(bott);
	$(".slide").click(function(){
		// let data = $("#order").html();
		// let im = "<img src='"+src+"'>";
		// $("#order").html(data+im);
		num += 1;

		let id = $(this).find("img").attr("data-class");
		// id = ev.dataTransfer.getData('id');

		arr.push({id:num,isi:parseInt(id)});

		update();
	}).promise().done(function(){
		// let src = $(this).find("img").attr("src");
		// let data = $("#order").html();
		// let im = "<img src='"+src+"'>";
		// $("#order").html(data+im);
		let rw = $("#order").html();
		$("#order").html(rw+topp);
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
	window.localStorage.setItem('list',JSON.stringify(arr));	
	link = window.location.href;
	window.location.href = link.replace('main.html','order.html');
}

function reset(){
	arr = [];
	update();
}

function update(){
	let table = $('#detail');
	let target = $('#order');
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";
	target.empty();
	table.empty();

	target.append(bott)
	price = 0;

	arr.forEach(data => {
		src = $('#'+data.isi).attr('src');
		pesanan = getItem(data.isi);
		img = "<img src='"+src+"' id='"+data.id+"' draggable='true' ondragstart='drag(event)'>";
		tr = "<tr><td>"+pesanan.name+"</td><td>"+pesanan.cost+"</td></tr>";
		price += pesanan.cost;

		target.append(img);
		table.append(tr);

	})
	if(price > 0){
		trtotal = "<tr><td>Total</td><td>"+price+"</td></tr>";
		table.append(trtotal)
	}

	target.append(topp)
}


function drop(ev){
	num += 1;

	id = ev.dataTransfer.getData('id');

	arr.push({id:num,isi:parseInt(id)});

	update();

	

}

function drag(ev){
	ev.dataTransfer.setData('id',ev.target.id)
}

function deleteItem(ev){

	id = ev.dataTransfer.getData('id');

	deleted = arr.find(res => res.id == id);
	
	arr.splice(arr.indexOf(deleted),1);
	
	update();

}



















