import adapter from '@sveltejs/adapter-static';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html' // may differ from host to host
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : '/TechTrivia'
		}
	}
	// preprocess: vitePreprocess()
};
export default config;
