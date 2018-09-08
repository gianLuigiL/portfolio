//This function retrieves JSON data from a specific url, optionally with a method and a query
function getJSONData(url, method = 'GET', query = ""){
	return fetch(url, {
		method: method, 
		body: query,
		headers: {
      		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    	}
	});
}
//This function retrieves HTML data from a specific url, optionally with a method and a query
function getHTMLData(url){
	return fetch(url);
}

function toggleFlex(el){
	const state = window.getComputedStyle(el, null).getPropertyValue("display");
	if(state === 'none'){
		el.style.display = 'flex';
		//The timeout only smooths the animation
		setTimeout(()=>{
			el.style.opacity = 1;
		},100);
	} else {
		el.style.opacity = '0';
		setTimeout(()=>{
			el.style.display = 'none';
		}, 300);
	}
}

function handleInput(event){
	const name = event.target.name;
	let value = [...event.target.value];
	let allowed;
	switch(name){
		case 'name':
		case 'surname':
			allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. -";
			break;
		case 'phone':
			allowed = "0123456789() -";
			break;
		case 'subject':
		case 'message':
			allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,;.:- _@#+*[]\\!\"£$%&/()=òàù'?ì^";
			break;
		case 'email':
			allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_@+*!£$%&";
			break;
	}
	event.target.value = value.filter((el)=>allowed.includes(el)).join("");
}

export { getHTMLData, getJSONData, handleInput, toggleFlex };