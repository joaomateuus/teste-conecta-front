import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/home',
			name: 'home',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/HomeView.vue'),
		},
	],
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach(async (to, from) => {
	const authStore = useAuthStore()
	const { authenticated } = storeToRefs(authStore)

	if (!authenticated.value && to.name !== 'login') {
		return { name: 'login' }
	}

	if (authenticated.value && to.name === 'login') {
		return { name: 'home' } // ou outra rota após login
	}
})
export default router
