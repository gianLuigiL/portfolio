import { getHTMLData, getJSONData, handleInput, toggleFlex  } from "./utility/functions";

(function(){
	'use strict';
	
	/*THIS NEXT SNIPPET CHANGES THE COLOR OF THE FOOTER'S TEXT BASED ON THE WINDOWS'S SCROLLING POSITION**/
	//Store references to the position of each article element in the page
	const articlesPos = [];
	const articles = document.getElementsByTagName('article');
	for(const article of articles){
		articlesPos.push(article.offsetTop);
	}
	//If on mobile
	if(window.innerWidth <= 500) {
		//Every time the page is scrolled
		window.addEventListener('scroll', function(){
			//Get the ul in the footer
			const footerUl = document.getElementsByTagName('footer')[0].getElementsByTagName('ul')[0];
			//Get windows's height and position
			const windowHeight = parseInt(window.innerHeight);
			const windowTopPos = parseInt(window.pageYOffset);
			//Change the color of the font in the footer based on the position
			if(windowTopPos + windowHeight - 50  > document.body.clientHeight - 100){
				footerUl.style.color = '#CA4B41';
			} else if(windowTopPos + windowHeight - 110 > articlesPos[3]){
				footerUl.style.color = '#e88b8b';
			} else if(windowTopPos + windowHeight - 50 > articlesPos[2]){
				footerUl.style.color = '#9ae88b';
			} else {
				footerUl.style.color = '#12B6D9';
			}
		});
	}
	
	/**THIS NEXT SNIPPET HANDLES THE SETUP FOR THE MODAL WINDOW*/

	//Get the modal container
	const modalContainer = document.getElementById('modalContainer');
	//Set the height as long as the whole document
	modalContainer.style.height = document.body.clientHeight + 'px';
	
	
	modalContainer.addEventListener('click', function(event){
		//If the user clicks on the white background
		if(event.target === modalContainer){
			toggleFlex(modalContainer);
		}
	});
	
	
	/**THIS NEXT SNIPPET HANDES THE CLICKS ON THE NAV*/
	
	/*Get a reference to the nav elements (there are two but only one is displayed at a time)*/
	const navs = document.getElementsByTagName('nav');
	
	for(const nav of navs){
		//Add an event listener to each
		nav.addEventListener('click', async function(event){
			//Cache the target
			const target = event.target;
			//If the target is not the apropriate li element return
			if(target.className === 'contact'){

				let data;
				try{
					const formPromise = await getHTMLData('./modals/contact-form.html');
					if(!formPromise.ok && formPromise.status !== 200){
						throw 'Something went wrong'
					}
					data = await formPromise.text();
				} catch (e){
					console.log('Something went wrong', formPromise, data, e);
				}
				
				modalContainer.innerHTML = data;
		
				toggleFlex(modalContainer);
				const form = document.getElementsByTagName('form')[0];
					
				modalContainer.addEventListener('input', handleInput);
						
				//When the form is shown attach an event listener
				form.addEventListener('submit',async function(event){
					event.preventDefault();
					
					const elements = [...form.elements];
					const query = elements.map((el)=>{
						if(el.nodeName === 'BUTTON'){
							return "";
						}
						return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
					}).join("&");

					let data;
					try {
						const response = await getJSONData('./util/mailer.php', 'POST', query);
						data = await response.json();
						if(!response.ok && response.status !== 200){
							throw 'Something went wrong';
						}
					} catch (e){
						console.log('Something went wrong', formPromise, data, e);
					}

					form.parentElement.removeChild(form.previousElementSibling);
					if(!data.ok) {
						form.innerHTML = "<p class='responseError'>" + (data.error) + "</p>";
						return;
					} else {
						form.innerHTML = "<p class='response'>" + (data.success) + "</p>"; 
						return;
					}
				});
					
				//Get the X button
				const close = modalContainer.getElementsByClassName('close')[0];
				//Add an event listener and set the opacity to zero, after the transition, set display to none;
				close.addEventListener('click', function(){
					toggleFlex(modalContainer);
				});

			//If the button is related to the articles scroll to position
			} else if(target.className === 'works' || target.className === 'freebies'){
				//Get the target class
				const targetClass = target.className;
				//Get the article onto which to move
				const article = document.querySelector('article[id*='+ targetClass +']');
				window.scrollTo({
					top: article.offsetTop, 
					behavior: 'smooth'
				});
			}
		});
	}
	
	
	
})();