const slider = getHTML('.top-slider');
let sliderItems = Array.from(getHTML('.top-slider__item', 1));
let sliderLength = 100 * (sliderItems.length - 1);

let currPosition = 0;

let interval = null;
let time = 10000;

autoSlide();

function getHTML(selector, mode = 0) {
	if (!mode) {
		return document.querySelector(selector);
	}

	return document.querySelectorAll(selector);
}

function moveSlider(e) {
	const classes = e.target.className;
	const direction = classes.includes('navi--right')
									? 'next' 
									: classes.includes('navi--left')
									? 'prev'
									: false;

	if (direction) {
		clearInterval(interval);
		moveSlide(direction);
		autoSlide();
	}
} 

function moveSlide(direction) {
	let can = true;

	sliderItems.forEach((item, idx) => {
		if (item.className.includes('active') && can) {
			can = false;
			diactivate(idx);

			if (direction === 'next') {
				nextBegin(idx)
			} else {
				prevEnd(idx);
			}
		}
	});
}

function nextBegin(idx) {
	if (idx !== sliderItems.length - 1) {
		activate(idx + 1);
	} else {
		startBegin();
	}
}

function prevEnd(idx) {
	if (idx !== 0) {
		activate(idx - 1);
	} else {
		startEnd();
	}
}

function startBegin() {
	diactivate(sliderItems.length - 1);
	activate(0);
}
function startEnd() {
	diactivate(0);
	activate(sliderItems.length - 1);
}

function diactivate(idx) {
	sliderItems[idx].classList.remove('active');
}
function activate(idx) {
	sliderItems[idx].classList.add('active');
}

function autoSlide() {
	interval = setInterval(moveSlide.bind(this, 'next'), 10000);
}

slider.addEventListener('click', moveSlider);