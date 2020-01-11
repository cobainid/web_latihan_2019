/** 

write your code here
for page order.html

**/


let detail = document.getElementById('detail');
let total = document.getElementById('total');
let price = 0;


let list = JSON.parse(window.localStorage.getItem('list'));

list = [{id:0,pesanan:0}].concat(list);
list.push({id:1,pesanan:1});

console.log(list);



detail.innerHTML = "";
total.innerHTML = "";

list.forEach((key) => {
	data = getItem(key.pesanan);
	price = price + data.cost;
	let tr = "<tr><td>"+data.name+"</td><td>$"+data.cost+"</td></tr>";
	detail.innerHTML += tr;
});

let trtotal = "<tr><td>Total</td><td>$"+price+"</td></tr>";

total.innerHTML = trtotal;