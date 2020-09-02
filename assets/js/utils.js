function getHTML(selector, mode = 0) {
	if (typeof selector === 'string') {
		if (!mode) return document.querySelector(selector);
		
		return document.querySelectorAll(selector);
	}

	if (typeof selector === 'object') {
		return selector.map(el => document.querySelector(el))
	}
}

const getWindowWidth = () => window.innerWidth;

const getBoundingHeight = (target) => {
	return target.getBoundingClientRect()
			         .height;
} 

const getScrollHeight = () => {
	return Math.max(
 	 document.body.scrollHeight, 
 	 document.documentElement.scrollHeight,
   document.body.offsetHeight, 
   document.documentElement.offsetHeight,
   document.body.clientHeight, 
   document.documentElement.clientHeight
	);
}