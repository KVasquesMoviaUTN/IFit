<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
		<div class="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
			<h1 class="text-2xl font-bold text-gray-800 mb-6">Finalizar Compra</h1>
			<p class="text-gray-600 mb-8">Total a pagar: <span class="font-bold text-primary text-xl">${{ total }}</span></p>

			<button @click="redirectToPayment" :disabled="loading"
				class="w-full flex items-center justify-center bg-[#009ee3] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all ease-in-out duration-300 hover:bg-[#007bb8] active:bg-[#005f85] disabled:opacity-70 disabled:cursor-not-allowed">
				<img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadopago/logo__large.png" alt="Mercado Pago"
					class="h-8 mr-3 filter brightness-0 invert">
				<span v-if="!loading">Pagar con Mercado Pago</span>
				<span v-else>Procesando...</span>
			</button>
		</div>
	</div>
</template>

<script setup>
const route = useRoute();
const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const total = ref(0);
const preference = ref(null);
const loading = ref(false);

onMounted(async () => {
	total.value = Number(route.query.total) || 0;
	await createPreference();
});

const createPreference = async () => {
	loading.value = true;
	try {
		const product = {
			id: "1", // TODO: Make dynamic if needed, currently matches original logic
			price: total.value,
		};
		const response = await $fetch(`${apiBase}/payment`, {
			method: 'POST',
			body: product
		});
		preference.value = response;
	} catch (error) {
		console.error('Error creating preference:', error);
		alert('Error al iniciar el pago con Mercado Pago');
	} finally {
		loading.value = false;
	}
};

const redirectToPayment = () => {
	if (preference.value && preference.value.init_point) {
		window.location.href = preference.value.init_point;
	}
};
</script>
