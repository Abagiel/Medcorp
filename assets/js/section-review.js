const sectionReviews = getHTML('.section-reviews');

let reviews = Array.from(getHTML('.review-card', 1));
let currentReviewIdx = 1;

const reviewTime = 10000;
let reviewInterval = null;

autoChangeReview();

function autoChangeReview() {
	reviewInterval = setInterval(changeReview, reviewTime);
}

function changeReview() {
	let can = true;

	reviews.forEach((review, idx) => {
		if (review.className.includes('active') && can) {
			can = false;
			reviewDiactivate(idx);
			nextReview(idx);
		}
	});
}

function nextReview(idx) {
	if (idx !== reviews.length - 1) {
		currentReviewIdx = idx + 1;
		reviewActivate(idx + 1);
	} else {
		currentReviewIdx = 0;
		reviewActivate(0);
	}
}

function reviewHover(e) {
	const target = e.target.closest('.review-card');
	if (target === reviews[currentReviewIdx]) {
		freezeAutoChangeReview(target);
	}
}

const reviewActivate = (idx) => reviews[idx].classList.add('active');
const reviewDiactivate = (idx) => reviews[idx].classList.remove('active');

const freezeAutoChangeReview = (target) => {
	clearInterval(reviewInterval);
	target.onmouseleave = (target) => unfreezeAutoChangeReview(target);
};

const unfreezeAutoChangeReview = () => {
	autoChangeReview();
	nullListeners();
};
	
const nullListeners = () => reviews.forEach(el => el.onmouseleave = null);

sectionReviews.addEventListener('mouseover', reviewHover);
