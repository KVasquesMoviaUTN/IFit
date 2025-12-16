<template>
	<div class="flex min-h-screen flex-col">
		<NavBar />
		<div class="w-full h-full flex justify-center" style="min-height: calc(100vh - 204px);">
			<slot />
		</div>
		<FooterComponent class="mt-auto" />
	</div>
</template>

<script setup>
// Nuxt auto-imports components from ~/components
</script>

<style>
.placeholder-custom {
	padding-bottom: 2px;
	padding-left: 25px;
}

@media (min-width: 1024px) {
	.placeholder-custom {
		padding-left: 44px;
		padding-bottom: 0px;
	}
}

.placeholder-custom::placeholder {
	color: rgb(14 41 10);
	font-weight: 900;
	font-size: 10px;
}

@media (min-width: 1024px) {
	.placeholder-custom::placeholder {
		font-size: 12px;
	}
}
</style>
