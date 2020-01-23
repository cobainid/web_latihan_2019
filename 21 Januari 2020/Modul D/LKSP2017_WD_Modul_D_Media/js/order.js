/** 

write your code here
for page order.html

**/


table = document.getElementById('detail');
console.log(table)

table.innerHTML = "";
list = JSON.parse(window.localStorage.getItem('list'));
price = 0;


list.forEach(data => {
	// src = $('#'+data.isi).attr('src');
	pesanan = getItem(data.isi);
	// img = "<img src='"+src+"' id='"+data.id+"' draggable='true' ondragstart='drag(event)'>";
	tr = "<tr><td>"+pesanan.name+"</td><td>"+pesanan.cost+"</td></tr>";
	price += pesanan.cost;
	// target.append(img);	
	table.innerHTML += tr;
})
tr = "<tr><td>Total</td><td>"+price+"</td></tr>";
// price += pesanan.cost;
table.innerHTML += tr;
