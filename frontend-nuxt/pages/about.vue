<template>
	<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">

			<!-- Hero Section -->
			<div class="text-center mb-16">
				<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
					<span class="block text-primary">Sobre Nosotros</span>
				</h1>
				<div class="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto aspect-video">
					<img src="~/assets/store.webp" alt="Local Modo Fit" class="w-full h-full object-cover">
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
						<p class="text-white text-xl md:text-2xl font-medium max-w-2xl">
							"Democratizar la salud, porque estar en forma no debería ser caro ni complicado."
						</p>
					</div>
				</div>
			</div>

			<!-- Story Section -->
			<div class="max-w-3xl mx-auto text-center mb-20">
				<h2 class="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
				<p class="text-lg text-gray-600 leading-relaxed mb-6">
					Modo Fit es una empresa familiar dedicada a personas de todas las edades que buscan mejorar su bienestar y rendimiento físico.
				</p>
				<p class="text-lg text-gray-600 leading-relaxed">
					Creemos que no necesitás ser un experto en nutrición para comer bien. Nuestro objetivo es acercarte productos de calidad, ricos y
					accesibles, para que cuidarte sea un placer y no una obligación.
				</p>
			</div>

			<!-- Values Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
				<!-- Quality Card -->
				<div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-transform duration-300">
					<div class="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">Calidad Premium</h3>
					<p class="text-gray-600">
						Solo trabajamos con productos de primerísima calidad porque somos tan exigentes como vos.
					</p>
				</div>

				<!-- Advice Card -->
				<div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-transform duration-300">
					<div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">Asesoramiento</h3>
					<p class="text-gray-600">
						¿Tenés dudas? Te brindamos asesoramiento personalizado para que elijas lo mejor para vos.
					</p>
				</div>

				<!-- Shipping Card -->
				<div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-transform duration-300">
					<div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">Envíos y Local</h3>
					<p class="text-gray-600">
						Envíos a todo el país o retiro en nuestro local en <span class="font-semibold text-primary">Castro Barros 2085</span>.
					</p>
				</div>
			</div>

			<!-- CTA Section -->
			<div class="text-center">
				<h3 class="text-2xl font-bold text-gray-900 mb-6">¿Listo para empezar tu cambio?</h3>
				<NuxtLink to="/">
					<button
						class="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center gap-2 mx-auto">
						<span>Ver Productos</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</button>
				</NuxtLink>
			</div>

		</div>
	</div>
</template>

<script setup>
useHead({
	title: 'Sobre Nosotros | Modo Fit',
	meta: [
		{
			name: 'description',
			content: 'Conocé Modo Fit: una tienda familiar que te acompaña a mejorar tu bienestar físico con productos saludables, atención personalizada y envío a todo el país.'
		},
		{
			property: 'og:title',
			content: 'Modo Fit - Sobre Nosotros'
		},
		{
			property: 'og:description',
			content: 'Descubrí la historia de Modo Fit y nuestro compromiso con la salud accesible y de calidad.'
		},
		{
			property: 'og:image',
			content: 'https://modofit.shop/modofit.png'
		},
		{
			property: 'og:url',
			content: 'https://modofit.shop/about'
		},
		{
			name: 'keywords',
			content: 'sobre nosotros, modo fit, quienes somos, tienda saludable, local en boedo, tienda fitness, nutrición'
		}
	]
})
</script>
