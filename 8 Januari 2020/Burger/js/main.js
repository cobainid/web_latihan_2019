let num = 100;
let price = 0;
let list = [];


$(document).ready(function(){
	$("img#2").parent(".slide").css("display", "block").addClass("act");
	$("table#detail").html("<tr>");
	$("table#detail").find("tr").text(item());
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";
	// $("#order").html(bott+topp);
	$(".slide").click(function(){
		// let src = $(this).find("img").attr("src");
		let target = $('#order');
		let table = $('#detail');
		let total = $('#total');
		let topp = "<img src='img/bread-top.png'>";
		let bott = "<img src='img/bread-bottom.png'>";
		let id = $(this).find("img").attr("id");

		num = num + 1;


		target.empty();
		table.empty();
		total.empty();
		price = 0;

		list.push({id:num,pesanan:id});

		target.append(bott);

		list.forEach((key) => {
			let src = document.getElementById(key.pesanan).src;
			let data = getItem(key.pesanan);
			let img = "<img src='"+src+"' draggable='true' ondragstart='drag(event)' id='"+key.id+"'>"
			let tr = "<tr><td>"+data.name+"</td><td>$"+data.cost+"</td></tr>";

			price = price + data.cost;

			target.append(img);
			table.append(tr);

		});


		let trtotal = "<tr><td>Total</td><td>$"+price+"</td></tr>";

		total.append(trtotal);
		target.append(topp);

	}).promise().done(function(){
		// let src = $(this).find("img").attr("src");
		// let data = $("#order").html();
		// let rw = $("#order").html();
		$("#order").html(bott+topp);
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


function drag(ev){

	ev.dataTransfer.setData('id',ev.target.id);}

function drop(ev){
	let target = $('#order');
	let table = $('#detail');
	let total = $('#total');
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";
	let id = ev.dataTransfer.getData('id');

	num = num + 1;


	target.empty();
	table.empty();
	total.empty();
	price = 0;

	list.push({id:num,pesanan:id});

	target.append(bott);

	list.forEach((key) => {
		let src = document.getElementById(key.pesanan).src;
		let data = getItem(key.pesanan);
		let img = "<img src='"+src+"' draggable='true' ondragstart='drag(event)' id='"+key.id+"'>"
		let tr = "<tr><td>"+data.name+"</td><td>$"+data.cost+"</td></tr>";

		price = price + data.cost;

		target.append(img);
		table.append(tr);

	});


	let trtotal = "<tr><td>Total</td><td>$"+price+"</td></tr>";

	total.append(trtotal);
	target.append(topp);

}





function deleteitem(ev){
	let target = $('#order');
	let table = $('#detail');
	let total = $('#total');
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";
	let id = ev.dataTransfer.getData('id');



	target.empty();
	table.empty();
	total.empty();
	price = 0;

	let deletedItem = list.find((e) => {
		if(e.id == id){
			return e;
		}
	});

	// console.log(list.indexOf(deletedItem));
	list.splice(list.indexOf(deletedItem),1);

	target.append(bott);

	list.forEach((key) => {
		let src = document.getElementById(key.pesanan).src;
		let data = getItem(key.pesanan);
		let img = "<img src='"+src+"' draggable='true' ondragstart='drag(event)' id='"+num+"'>";
		let tr = "<tr><td>"+data.name+"</td><td>$"+data.cost+"</td></tr>";

		price = price + data.cost;

		target.append(img);
		table.append(tr);

	});


	let trtotal = "<tr><td>Total</td><td>$"+price+"</td></tr>";

	total.append(trtotal);
	target.append(topp);


}









function orderC(){
	window.localStorage.setItem('list',JSON.stringify(list));
	let link = window.location.href;

	link = link.replace('main.html','order.html');

	console.log(link);

	window.location.href = link;
}



















