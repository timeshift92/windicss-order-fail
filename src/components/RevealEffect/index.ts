
import * as Helpers from './helpers'



function applyEffect(selector, options = {}) {

	let is_pressed = false

	let _options = {
		lightColor: "rgba(255,255,255,0.25)",
		gradientSize: 150,
		clickEffect: true,
		isContainer: true,
		children: {
			borderSelector: ".eff-reveal-border",
			elementSelector: ".eff-reveal",
			lightColor: "rgba(255,255,255,0.25)",
			gradientSize: 150
		}
	}

	// update options
	_options = Object.assign(_options, options)
	const els = Helpers.preProcessElements(document.querySelectorAll(selector))




	function clearEffect(element) {
		is_pressed = false
		element.el.style.backgroundImage = element.oriBg
	}


	function enableBackgroundEffects(element, lightColor, gradientSize) {

		//element background effect --------------------
		element.el.addEventListener("mousemove", (e) => {
			let x = e.pageX - Helpers.getOffset(element).left - window.scrollX
			let y = e.pageY - Helpers.getOffset(element).top - window.scrollY

			if (_options.clickEffect && is_pressed) {

				let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`

				Helpers.drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
			}
			else {
				Helpers.drawEffect(element, x, y, lightColor, gradientSize)
			}
		})


		element.el.addEventListener("mouseleave", (e) => {
			clearEffect(element)
		})
	}



	function enableClickEffects(element, lightColor, gradientSize) {
		element.el.addEventListener("mousedown", (e) => {
			is_pressed = true
			const x = e.pageX - Helpers.getOffset(element).left - window.scrollX
			const y = e.pageY - Helpers.getOffset(element).top - window.scrollY

			const cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`

			Helpers.drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
		})

		element.el.addEventListener("mouseup", (e) => {
			is_pressed = false
			const x = e.pageX - Helpers.getOffset(element).left - window.scrollX
			const y = e.pageY - Helpers.getOffset(element).top - window.scrollY

			Helpers.drawEffect(element, x, y, lightColor, gradientSize)
		})
	}




	//Children *********************************************
	if (!_options.isContainer) {

		//element background effect
		els.forEach(element => {
			enableBackgroundEffects(element, _options.lightColor, _options.gradientSize)

			//element click effect
			if (_options.clickEffect) {
				enableClickEffects(element, _options.lightColor, _options.gradientSize)
			}
		})

	}
	//Container *********************************************
	else {

		els.forEach(element => {

			// get border items list
			const childrenBorder = _options.isContainer ? Helpers.preProcessElements(document.querySelectorAll(_options.children.borderSelector)) : []


			//Container *********************************************
			//add border effect
			element.el.addEventListener("mousemove", (e) => {
				for (let i = 0; i < childrenBorder.length; i++) {
					const x = e.pageX - Helpers.getOffset(childrenBorder[i]).left - window.scrollX
					const y = e.pageY - Helpers.getOffset(childrenBorder[i]).top - window.scrollY

					if (Helpers.isIntersected(childrenBorder[i], e.clientX, e.clientY, _options.gradientSize)) {
						Helpers.drawEffect(childrenBorder[i], x, y, _options.lightColor, _options.gradientSize)
					}
					else {
						clearEffect(childrenBorder[i])
					}

				}

			})

			//clear border light effect
			element.el.addEventListener("mouseleave", (e) => {
				for (let i = 0; i < childrenBorder.length; i++) {
					clearEffect(childrenBorder[i])
				}
			})


			//Children *********************************************
			const children = Helpers.preProcessElements(element.el.querySelectorAll(_options.children.elementSelector))
			// console.log(children)

			for (let i = 0; i < children.length; i++) {

				//element background effect
				enableBackgroundEffects(children[i], _options.children.lightColor, _options.children.gradientSize)

				//element click effect
				if (_options.clickEffect) {
					enableClickEffects(children[i], _options.children.lightColor, _options.children.gradientSize)
				}
			}

		})

	}
}




export { applyEffect }
