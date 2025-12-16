<template>
	<div class="flex flex-col items-center justify-center h-screen bg-gray-50">
		<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
		<h2 class="mt-6 text-xl font-semibold text-gray-700">Iniciando sesión con Google...</h2>
		<p class="mt-2 text-gray-500">Por favor espere un momento.</p>
	</div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

onMounted(async () => {
	const queryToken = route.query.token;
	const token = Array.isArray(queryToken) ? queryToken[0] : queryToken;

	if (token) {
		try {
			// Store token temporarily to make the request
			localStorage.setItem('token', token);

			// Fetch user profile
			const user = await $fetch(`${apiBase}/auth/profile`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			// Update store
			authStore.token = token;
			authStore.user = user;

			// Persist to localStorage
			localStorage.setItem('user', JSON.stringify(user));

			// Redirect to home
			router.push('/');

		} catch (error) {
			console.error('SSO Login failed:', error);
			localStorage.removeItem('token');
			router.push('/login?error=sso_failed');
		}
	} else {
		router.push('/login');
	}
});
</script>
