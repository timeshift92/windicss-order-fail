export let active = false

export function clickout(node, options?: { callback?(node: any): void, active?: any }) {
	function handle(e) {
		if (!node.contains(e.target)) {
			node.dispatchEvent(new CustomEvent('clickout'))
		}
	}
	if (options && options.callback) {
		options.callback(node)
	}
	document.addEventListener('mousedown', handle)
	return {
		update(active) {
			if (active) {
				document.addEventListener('mousedown', handle);
			}
			else document.removeEventListener('mousedown', handle)
		},
		destroy() {
			document.removeEventListener('mousedown', handle)
		}
	};
}

export function pannable(node) {
	const eventHandlerOptions = { passive: false };
	let x = 0, y = 0

	function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

	function handleMousedown(e) {
		e.stopPropagation()
		// e.preventDefault()
		x = unify(e).clientX;
		y = unify(e).clientY;

		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
		}));

		window.addEventListener('mousemove', handleMousemove, eventHandlerOptions);
		window.addEventListener('mouseup', handleMouseup, eventHandlerOptions);
		window.addEventListener('touchmove', handleMousemove, eventHandlerOptions);
		window.addEventListener('touchend', handleMouseup, eventHandlerOptions);
	}

	function handleMousemove(e) {
		e.stopPropagation()
		e.preventDefault()
		const dx = unify(e).clientX - x;
		const dy = unify(e).clientY - y;
		x = unify(e).clientX;
		y = unify(e).clientY;
		if (dy !== 0) {
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}

		node.dispatchEvent(new CustomEvent('panmove', {
			detail: { x, y, dx, dy }
		}));
	}

	function handleMouseup(e) {
		e.stopPropagation()
		e.preventDefault()
		x = unify(e).clientX;
		y = unify(e).clientY;

		node.dispatchEvent(new CustomEvent('panend', {
			detail: { x, y }
		}));
		// @ts-ignore
		window.removeEventListener('mousemove', handleMousemove, eventHandlerOptions);
		// @ts-ignore
		window.removeEventListener('mouseup', handleMouseup, eventHandlerOptions);
		// @ts-ignore
		window.removeEventListener('touchmove', handleMousemove, eventHandlerOptions);
		// @ts-ignore
		window.removeEventListener('touchend', handleMouseup, eventHandlerOptions);
	}

	node.addEventListener('mousedown', handleMousedown, eventHandlerOptions);
	node.addEventListener('touchstart', handleMousedown, eventHandlerOptions);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown, eventHandlerOptions);
			node.removeEventListener('touchstart', handleMousedown, eventHandlerOptions);
		}
	};
}
