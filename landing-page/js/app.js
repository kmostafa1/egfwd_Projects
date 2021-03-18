/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
 
/**Submitted by Karim Mohamed*/

/**
 * Define Global Variables
 *
 */


const navElements = document.querySelectorAll('section');               //Selection of all the section
const navList = document.getElementById('navbar__list');                //Selection of navbar elements
let navFragment = document.createDocumentFragment();                    //create a new empty fragment:
let currentActiveElem = document.querySelector('.active');              //Selection active section
const scrollToTopBtn = document.getElementById("toTop__btn");           //Scroll-to-Top Button
const responsiveBtn = document.getElementById("responsive__btn");           //Scroll-to-Top Button


/**
 * End Global Variables
 */

// Build menu by iterating through the nav elements
navElements.forEach(e => {
  let navlistElement = document.createElement('li');
  navlistElement.innerHTML = `<a href="#${e.id}">${e.dataset.nav}</a>`;
  navlistElement.setAttribute("class", "menu__link");
  navlistElement.setAttribute("data-section", e.id);
  navFragment.appendChild(navlistElement);
})

navList.appendChild(navFragment);


// Scroll to section on link click by listenting to the click-event in the navlist
navList.addEventListener('click', e => {
  e.preventDefault();
  const target = e.target.hasAttribute('data-section') ? e.target : e.target.parentElement;
  const elementToScrollTo = document.getElementById(target.dataset.section);
  elementToScrollTo.scrollIntoView({behavior: 'smooth', block: 'center' });
      
})



//scroll event listener
window.addEventListener('scroll', ()=> {
	//Detect the section inside the viewport 
	navElements.forEach(e => {
	const rect = e.getBoundingClientRect();
	const navListElement = document.querySelector(`.menu__link[data-section='${e.id}']`);
		
	if (rect.top >= -50 && rect.top <= 300) {
      navListElement.classList.add('active');
      e.classList.add('active');
    } else {
      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active')
      }

      if (e.classList.contains('active')) {
        e.classList.remove('active')
      }
    }
	})
	
	//Display or hide scrollToTopBtn
	let scrollPosition = window.pageYOffset;
	if (scrollPosition < 500) {
		scrollToTopBtn.style.display = "none";
     } else {		
		scrollToTopBtn.style.display = "block";
    }
	
});

//Click scrollToTopBtn
scrollToTopBtn.addEventListener("click", ()=> {
	let rootElement = document.documentElement;
	rootElement.scrollTo({
    top: 0,
	left: 0,
    behavior: "smooth"
  })
	
});


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
responsiveBtn.addEventListener("click", ()=> {
	 const dropDownMenu = document.querySelector('#navbar__list');
    	
	 if (dropDownMenu.classList.contains('show')) {
        dropDownMenu.classList.remove('show');
		dropDownMenu.classList.add('hide');
      } else if (dropDownMenu.classList.contains('hide')){
        dropDownMenu.classList.remove('hide');
		dropDownMenu.classList.add('show');
      } else {
		  dropDownMenu.classList.add('show');
	  }
	
});
	
