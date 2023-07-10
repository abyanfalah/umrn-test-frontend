import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/posts',
			name: 'posts',
			component: () => import('../views/PostsView.vue')
		},
		{
			path: '/posts/:id',
			name: 'post',
			component: () => import('../views/PostSingleView.vue')
		},
		{
			path: '/posts/new',
			name: 'post-new',
			component: () => import('../views/PostCreateView.vue')
		},
		{
			path: '/posts/:id/edit',
			name: 'post-edit',
			component: () => import('../views/PostEditView.vue')
		},
	]
});

export default router;
