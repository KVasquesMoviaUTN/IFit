<template>
	<footer class="bg-primary text-white mt-auto p-6 h-52 lg:h-28 shadow-inner border-t border-secondary/20">
		<div class="flex justify-center space-y-2 lg:space-y-0 lg:space-x-12 flex-col lg:flex-row font-medium">
			<NuxtLink to="/" class="hover:text-secondary transition-colors">Inicio</NuxtLink>
			<NuxtLink to="/about" class="hover:text-secondary transition-colors">Sobre nosotros</NuxtLink>
			<NuxtLink to="/contact" class="hover:text-secondary transition-colors">Contacto</NuxtLink>
		</div>
		<div class="text-center text-sm mt-6 text-gray-300">
			<p>&copy; 2025 Modo Fit. Todos los derechos reservados.</p>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'FooterComponent',
}
</script>
