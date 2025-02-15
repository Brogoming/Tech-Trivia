import { posts } from '../premadeSets/data.js';

export function load() {
	return {
		games: posts.map((post) => ({
			slug: post.slug,
			set: post.set
		}))
	};
}
