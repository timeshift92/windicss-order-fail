<picture use:obeserveElement class="lazy">
	<source srcset="{src}?width=1024&height=1024" media="(min-width: 1200px)" />
	<source srcset="{src}?width=640&height=640" media="(min-width: 740px)" />
	<img src="{src}?width=32&height=32" {alt} />
</picture>

<script>
	export let src
	export let params
	export let alt


	// Make it simple to swap parts of a URL attribute on an element
	function updateAttributeURL(element, attr, swapOut, swapIn) {
		var url = element.getAttribute(attr)
		url = url.replace(swapOut, swapIn)
		element.setAttribute(attr, url)
	}
	let observer

	// Update the image source on elements in the picture element
	function loadImage(picture) {
		var sources = picture.children
		var loadingPath = src + '?width=32&height=32'
		var sizes = ['?width=1024&height=1024', '?width=640&height=640', '?width=32&height=32']
		for (var s = 0; s < sources.length; s++) {
			// update the src or srcset urls
			if (sources[s].hasAttribute('srcset')) {
				updateAttributeURL(sources[s], 'srcset', loadingPath, src + sizes[s])
			} else {
				updateAttributeURL(sources[s], 'src', loadingPath, src + sizes[s])
			}

			// remove the lazy-initial class when the full image is loaded to unblur
			sources[s].addEventListener(
				'load',
				(image) => {
					image.target.closest('picture').classList.remove('lazy')
				},
				false
			)
		}
	}

	function obeserveElement(node) {
		observer = new IntersectionObserver(lazyLoad, options)
		observer.observe(node)

		// Stop observing this image and load its source
		function lazyLoad(elements) {
			elements.forEach((item) => {
				if (item.intersectionRatio > 0) {
					observer.unobserve(item.target)
					loadImage(item.target)
				}
			})
		}
	}

	// Set up the intersection observer to detect when to define
	// and load the real image source
	var options = {
		rootMargin: '100px',
		threshold: 1.0,
	}
</script>

<style>
	img {
		width: 100%;
		/* height: 200px; */
		/* transition: opacity 1200ms ease-out; */
	}
	.lazy {
		filter: blur(20px);
	}
	img.loaded {
		opacity: 1;
	}
</style>
