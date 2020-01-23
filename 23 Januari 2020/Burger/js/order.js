/** 

write your code here
for page order.html

**/


detail  = document.querySelector('#detail');


detail.innerHTML = "";


list  = JSON.parse(window.localStorage.getItem('list')) 

price = 0;

list.forEach(data =>  {
	let pesanan = getItem(data.num);
	let tr = `<tr><td>`+pesanan.name+`</td><td>`+pesanan.cost+`</td></tr>`;

	price += pesanan.cost;

	detail.innerHTML += tr;
})

detail.innerHTML += `<tr><td>Total</td><td>`+price+`</td></tr>`;


