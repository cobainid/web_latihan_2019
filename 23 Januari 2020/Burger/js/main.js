let list = [], price = 0,num= 1000;

$(document).ready(function(){
	$("img#2").parent(".slide").css("display", "block").addClass("act");
	$("table#detail").html("<tr>");
	$("table#detail").find("tr").text(item());
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";
	$("#order").html(bott);
	$(".slide").click(function(){
		let id = $(this).find("img").attr("id");

		num += 1;

		list.push({id:num,num:id})


		update();
	}).promise().done(function(){
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
	link = window.location.href;
	window.localStorage.setItem('list',JSON.stringify(list))

	link = link.replace('main.html','order.html')
	window.location.href = link


}

function update(){
	let target = $('#order'),table =$('#detail');
	let topp = "<img src='img/bread-top.png'>";
	let bott = "<img src='img/bread-bottom.png'>";

	target.empty()
	table.empty()

	target.append(bott)


	list.forEach(data => {
		let src = $('#'+data.num).attr('src');

		let pesanan = getItem(data.num);

		let mock = `<img src="`+src+`" draggable="true" ondragstart="drag(event)" id="`+data.id+`" >`;

		let tr = `<tr><td>`+pesanan.name+`</td><td>`+pesanan.cost+`</td></tr>`;

		price += pesanan.cost;

		target.append(mock)
		table.append(tr)

	})

	let trtable = `<tr><td>Total</td><td>`+price+`</td></tr>`;

	target.append(topp)
	table.append(trtable)



}

function order(ev){
	let id = ev.dataTransfer.getData('id');
	// console.log(id)


	num += 1;

	list.push({id:num,num:id})


	update();
}

function reset(){
	list = [];
	update();
}


function deleteditem(ev){
	let id = ev.dataTransfer.getData('id');
	// console.log(id)


	num += 1;

	let deleted = list.find(d => {
		if(d.id == id){
			return d;
		}
	})

	list.splice(list.indexOf(deleted),1)

	// list.push({id:num,num:id})


	update();	
}


function drag(ev){
	ev.dataTransfer.setData('id',ev.target.id);
}

















