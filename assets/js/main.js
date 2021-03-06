const menu = getHTML('.burger-menu');
const headerRight = getHTML('.header-right');
const headerNav = getHTML('.header-nav');
const linkUp = getHTML('.link-up');

let viewBurgerMenu = false;


const links = Array.from(getHTML('.header-nav__link', 1));

const reviewsHeight = 
	getBoundingHeight(getHTML('.section-reviews'));			
const sliderHeight = 
	getBoundingHeight(getHTML('.top-slider'));

let windowWidth = getWindowWidth();
let scrollHeight = getScrollHeight();
let scrollPoint = window.pageYOffset;
let scrollDirection = null;

const addClass = (target, str) => target.classList.add(str);
const delClass = (target, str) => target.classList.remove(str);
const hasClass = (target, str) => target.className.includes(str);

const sections = [
	...getHTML('[data-scroll]', 1)
];

let coords = [
	...sections.map(getCoords)
];


const showMenu = () => menu.classList.toggle('active');

const clearHeaderSelection = () => links.forEach(el => delClass(el, 'active'));


function showByOffsetY(height, target, clas) {
	if (window.pageYOffset > height) {
		addClass(target, clas);
	} else {
		delClass(target, clas);
	}
}

function headerSelection(e) {
	if (hasClass(e.target, 'header-nav__link')) {
		clearHeaderSelection();
		addClass(e.target, 'active');
		delClass(menu, 'active');
	}
}

function selectHeaderLink(idx) {
	clearHeaderSelection();
	addClass(links[idx], 'active');
}

function watchHeader() {
	coords.forEach(({top, bottom}, idx) => {
		if (scrollPoint > top - 50 && scrollPoint < bottom) {
			selectHeaderLink(idx);
		}
		if ((idx === coords.length - 1 && 
				 scrollPoint > bottom) ||
				window.innerHeight + scrollPoint >= scrollHeight) {
			selectHeaderLink(idx + 1);
		}
	})
}

function setScrollDirection() {
	if (windowWidth <= 889 && !viewBurgerMenu) return;

	if (window.pageYOffset > scrollPoint && 
		  scrollDirection !== 'down') {
		scrollDirection = 'down';
	} 
	if (window.pageYOffset < scrollPoint && 
		  scrollDirection !== 'up') {
		scrollDirection = 'up';
	}
		scrollPoint = window.pageYOffset;

		watchHeader();
}

function getCoords(section) {
	let coords = {};
	let { top, height } = section.getBoundingClientRect();

	top = top + window.pageYOffset;
	coords.top = top;
	coords.bottom = top + height;

	if (hasClass(section, 'section-pricing')) {
		coords.bottom = top + height + reviewsHeight;
	}
	if (section.tagName === 'HEADER') {
		coords.bottom = top + height + sliderHeight;
	}

	return coords;
}

function menuHandler() {
	viewBurgerMenu = !viewBurgerMenu;
	showMenu();
	setScrollDirection();
}

menu.onclick = () => menuHandler();

document.onscroll = () => {
	showByOffsetY(window.innerHeight, linkUp, 'active');
	showByOffsetY(200, headerNav, 'fixed');
	setScrollDirection();
}

headerNav.onclick = (e) => headerSelection(e);

window.onresize = () => {
	coords = [...sections.map(getCoords)];
	windowWidth = getWindowWidth();
	scrollHeight = getScrollHeight();
	setScrollDirection();
}