function getOffset(element) {
	return {
		top: element.el.getBoundingClientRect().top,
		left: element.el.getBoundingClientRect().left
	};
}

function drawEffect(
	element,
	x,
	y,
	lightColor,
	gradientSize,
	cssLightEffect = null
) {
	let lightBg;

	if (cssLightEffect === null) {
		lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`;
	} else {
		lightBg = cssLightEffect;
	}

	element.el.style.backgroundImage = lightBg;
}

function preProcessElements(elements) {
	const res = [];

	elements.forEach(el => {
		res.push({
			oriBg: getComputedStyle(el)["background-image"],
			el: el
		});
	});

	return res;
}

function isIntersected(element, cursor_x, cursor_y, gradientSize) {
	const cursor_area = {
		left: cursor_x - gradientSize,
		right: cursor_x + gradientSize,
		top: cursor_y - gradientSize,
		bottom: cursor_y + gradientSize
	}

	const el_area = {
		left: element.el.getBoundingClientRect().left,
		right: element.el.getBoundingClientRect().right,
		top: element.el.getBoundingClientRect().top,
		bottom: element.el.getBoundingClientRect().bottom
	}

	function intersectRect(r1, r2) {
		return !(
			r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top
		)
	}


	const result = intersectRect(cursor_area, el_area)

	return result
}

export { preProcessElements, getOffset, drawEffect, isIntersected };
