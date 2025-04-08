import { posts } from '../../../premadeSets/data';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

// src/routes/game/[slug]/+page.server.js
export function load({ params }) {
	if (params.slug === 'custom') {
	  return {
		post: {
		  slug: 'Custom Game',
		  set: {}
		}
	  };
	}
  
	const post = posts.find((post) => post.slug === params.slug);
	if (!post) error(404);

	return {
		post
	};
}