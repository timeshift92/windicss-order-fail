const sveltePreprocess = require('svelte-preprocess');

const production = !process.env.ROLLUP_WATCH
const {mdsvex} =  require('mdsvex')
const slug = require('remark-slug');

const { optimizeCarbonImports, } = require("carbon-components-svelte/preprocess");
const preprocessOptions = {
	sourceMap: true,
	defaults: {
		script: "typescript",
		style: "css",
	},


};

module.exports = {
	preprocess: [sveltePreprocess(preprocessOptions), optimizeCarbonImports(), mdsvex({ remarkPlugins: [slug], extensions: ['md','svx'], }),],
	// Export this to allow rollup.config.js to inherit the same preprocess options.
	preprocessOptions,
}

