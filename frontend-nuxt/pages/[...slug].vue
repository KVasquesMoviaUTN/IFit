<template>
	<div class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
		<h1 class="text-9xl font-bold text-primary opacity-20">404</h1>
		<div class="absolute mt-8">
			<h2 class="text-3xl font-bold text-gray-800 mb-4">Página no encontrada</h2>
			<p class="text-gray-600 mb-8 max-w-md mx-auto">
				Lo sentimos, la página que estás buscando no existe o ha sido movida.
			</p>
			<NuxtLink to="/"
				class="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-lg">
				Volver al Inicio
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
useHead({
	title: 'Página no encontrada | IFit',
	meta: [
		{ name: 'description', content: 'La página que buscas no existe.' }
	]
});
</script>
