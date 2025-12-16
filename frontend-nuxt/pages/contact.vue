<template>
	<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-12">
				<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
					<span class="block text-primary">Contáctanos</span>
				</h1>
				<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
					Estamos acá para ayudarte. Escribinos o visitanos en nuestro local.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
				<!-- Contact Cards Column -->
				<div class="flex flex-col gap-6 justify-center">

					<!-- Instagram Card -->
					<div @click="openInstagram"
						class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-transparent hover:border-pink-500 relative overflow-hidden">
						<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
							<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_80/v1740248697/instagram_color.webp"
								class="w-24 h-24" alt="Instagram BG">
						</div>
						<div class="flex items-center relative z-10">
							<div class="flex-shrink-0 bg-pink-50 rounded-full p-4 group-hover:bg-pink-100 transition-colors">
								<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_80/v1740248697/instagram_color.webp"
									class="w-8 h-8" alt="Instagram">
							</div>
							<div class="ml-5">
								<h3 class="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">Instagram</h3>
								<p class="text-gray-500">Seguinos para novedades y tips</p>
								<span class="mt-2 inline-flex items-center text-sm font-medium text-pink-600 group-hover:translate-x-1 transition-transform">
									Ver perfil &rarr;
								</span>
							</div>
						</div>
					</div>

					<!-- WhatsApp Card -->
					<div @click="redirectToWhatsApp"
						class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-transparent hover:border-green-500 relative overflow-hidden">
						<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
							<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_80/v1740248697/WhatsApp.webp"
								class="w-24 h-24" alt="WhatsApp BG">
						</div>
						<div class="flex items-center relative z-10">
							<div class="flex-shrink-0 bg-green-50 rounded-full p-4 group-hover:bg-green-100 transition-colors">
								<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_80/v1740248697/WhatsApp.webp"
									class="w-8 h-8" alt="WhatsApp">
							</div>
							<div class="ml-5">
								<h3 class="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">WhatsApp</h3>
								<p class="text-gray-500">Chateá con nosotros directamente</p>
								<span class="mt-2 inline-flex items-center text-sm font-medium text-green-600 group-hover:translate-x-1 transition-transform">
									Enviar mensaje &rarr;
								</span>
							</div>
						</div>
					</div>

					<!-- Email Card -->
					<div @click="openGmail"
						class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-transparent hover:border-blue-500 relative overflow-hidden">
						<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
							<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_80/v1740248697/gmail.webp"
								class="w-24 h-24" alt="Gmail BG">
						</div>
						<div class="flex items-center relative z-10">
							<div class="flex-shrink-0 bg-blue-50 rounded-full p-4 group-hover:bg-blue-100 transition-colors">
								<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_80/v1740248697/gmail.webp"
									class="w-8 h-8" alt="Gmail">
							</div>
							<div class="ml-5">
								<h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Email</h3>
								<p class="text-gray-500">Envianos tu consulta por correo</p>
								<span class="mt-2 inline-flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
									Escribir correo &rarr;
								</span>
							</div>
						</div>
					</div>

				</div>

				<!-- Map Column -->
				<div class="bg-white rounded-3xl shadow-xl overflow-hidden h-[400px] lg:h-auto min-h-[400px] relative">
					<iframe class="absolute inset-0 w-full h-full border-0"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.703277247966!2d-58.42042018749903!3d-34.636937972829564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccba81bb182c1%3A0x5a1776727fcdb275!2sCastro%20Barros%202085%2C%20C1237ABS%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1737666492507!5m2!1sen!2sar"
						allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación de Modo Fit en Castro Barros 2085, Boedo">
					</iframe>
					<div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100">
						<div class="flex items-start gap-3">
							<div class="bg-primary/10 p-2 rounded-full text-primary">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
							<div>
								<h4 class="font-bold text-gray-900">Visitanos en el local</h4>
								<p class="text-sm text-gray-600">Castro Barros 2085, Boedo, CABA</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
useHead({
	title: 'Contacto | Modo Fit',
	meta: [
		{
			name: 'description',
			content: 'Contactá con Modo Fit: visitanos en nuestro local en Boedo, escribinos por WhatsApp, mail o seguinos en Instagram. ¡Estamos para ayudarte!'
		},
		{
			property: 'og:title',
			content: 'Modo Fit - Contacto'
		},
		{
			property: 'og:description',
			content: 'Contactanos por redes o visitanos en Castro Barros 2085. Productos saludables, atención personalizada y asesoramiento gratuito.'
		},
		{
			property: 'og:image',
			content: 'https://modofit.shop/modofit.png'
		},
		{
			property: 'og:url',
			content: 'https://modofit.shop/contact'
		},
		{
			name: 'keywords',
			content: 'contacto, modo fit, castro barros 2085, boedo, whatsapp, instagram, tienda saludable, productos naturales'
		}
	]
})

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;
const config = ref({});

const fetchConfig = async () => {
	try {
		const response = await $fetch(`${apiBase}/config`);
		config.value = response;
	} catch (error) {
		// console.error('Error fetching config:', error);
	}
};

const openGmail = () => {
	const recipient = config.value.mail;
	const subject = 'Consulta';
	const body = 'Hola, quisiera más información sobre productos saludables';

	const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	window.open(url, '_blank');
};

const redirectToWhatsApp = () => {
	const phoneNumber = config.value.whatsappNumber
	const message = encodeURIComponent(`Hola, estoy buscando productos saludables!`);
	const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
	window.location.href = whatsappURL;
};

const openInstagram = () => {
	const url = 'https://www.instagram.com/modofit_ok';
	window.open(url, '_blank');
};

onMounted(() => {
	fetchConfig();
});
</script>
