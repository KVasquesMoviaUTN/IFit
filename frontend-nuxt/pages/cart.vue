<template>
	<div class="flex w-full flex-col min-h-screen bg-gray-50">
		<ClientOnly>
			<div v-if="cart.length > 0" class="flex flex-col lg:flex-row w-full justify-center gap-8 px-4 py-8 lg:px-12 max-w-7xl mx-auto">

				<!-- Left Column: Cart Items -->
				<div class="flex flex-col w-full lg:w-2/3">
					<div class="bg-white shadow-xl rounded-3xl overflow-hidden mb-6">
						<div class="p-6 border-b border-gray-100">
							<h2 class="text-3xl font-bold text-gray-800 tracking-tight flex items-center">
								Tu Carrito <span class="ml-3 text-2xl">🛒</span>
							</h2>
						</div>

						<ul class="divide-y divide-gray-100">
							<li v-for="item in cart" :key="item.productId" class="group transition-colors hover:bg-gray-50/50">
								<div class="p-4 sm:p-6 flex items-center gap-4 sm:gap-6 relative">

									<!-- Discount Badge -->
									<div v-if="item.discount > 0"
										class="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm z-10">
										-{{ item.discount }}%
									</div>

									<!-- Product Image -->
									<div
										class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl border border-gray-100 p-2 flex items-center justify-center shadow-sm">
										<img
											:src="`https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_96/v1740248697/${item.image}.webp`"
											class="max-h-full max-w-full object-contain" type="image/webp" :alt="`Imagen de ${item.name}`" loading="lazy">
									</div>

									<!-- Product Details -->
									<div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

										<!-- Name & Quantity -->
										<div class="flex flex-col gap-2">
											<h3 class="text-lg font-semibold text-gray-900 truncate pr-4">{{ item.name }}</h3>

											<div class="flex items-center gap-3">
												<div class="relative">
													<select v-model.number="item.quantity"
														class="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer font-medium transition-shadow"
														@change="updateCart(item)">
														<option v-for="n in 100" :key="n" :value="n">
															{{ formatQuantity(n * item.unidad_venta, item.unidad) }}
														</option>
													</select>
													<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
														<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
															<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
														</svg>
													</div>
												</div>
											</div>
										</div>

										<!-- Price & Actions -->
										<div class="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto mt-2 sm:mt-0">
											<div class="flex flex-col items-end">
												<div v-if="loadingPrices" class="spinner-container w-6 h-6">
													<div class="spinner border-t-primary"></div>
												</div>
												<template v-else>
													<template v-if="item.quantity > 4 || originalPrice(item) !== discountPrice(item)">
														<span class="text-xs text-gray-400 line-through mb-0.5">${{ formatPrice(originalPrice(item)) }}</span>
														<span class="text-lg font-bold text-green-600">${{ formatPrice(methodFinalPrice(item)) }}</span>
													</template>
													<span v-else class="text-lg font-bold text-gray-900">${{ formatPrice(originalPrice(item)) }}</span>
												</template>
											</div>

											<button @click="removeFromCart(item)"
												class="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 focus:outline-none"
												title="Eliminar producto">
												<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							</li>
						</ul>

						<div class="bg-blue-50 p-4 text-center text-blue-800 text-sm font-medium border-t border-blue-100">
							📢 ¡Tenés un <span class="font-bold">10% de descuento</span> comprando 5 unidades o más de un mismo producto!
						</div>
					</div>
				</div>

				<!-- Right Column: Summary (Sticky) -->
				<div class="flex flex-col w-full lg:w-1/3 relative">
					<div class="bg-white rounded-3xl shadow-xl p-6 sticky top-24 transition-all duration-300">
						<h3 class="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Resumen de Compra</h3>

						<div class="space-y-4 mb-6">
							<div class="flex justify-between items-center text-gray-600">
								<span>Subtotal ({{ cart.length }} productos)</span>
								<div v-if="loadingPrice" class="spinner-container w-4 h-4">
									<div class="spinner border-t-gray-600"></div>
								</div>
								<div v-else class="flex flex-col items-end">
									<span v-if="price != finalPrice" class="text-xs line-through text-gray-400">${{ formatPrice(price) }}</span>
									<span class="font-semibold text-gray-900">${{ formatPrice(finalPrice) }}</span>
								</div>
							</div>

							<!-- Shipping Toggle -->
							<div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
								<div class="flex justify-between items-center mb-3">
									<span class="text-sm font-medium text-gray-700">Método de entrega</span>
									<button @click="envio = !envio" :class="envio ? 'bg-green-500' : 'bg-gray-300'"
										class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
										<span aria-hidden="true" :class="envio ? 'translate-x-5' : 'translate-x-0'"
											class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
									</button>
								</div>

								<div class="text-sm text-gray-600 flex items-center gap-2">
									<span v-if="envio">🚚 Envío a domicilio</span>
									<span v-else>🏬 Retiro en Local (Boedo)</span>
								</div>

								<template v-if="envio">
									<div v-if="user" class="mt-3 pt-3 border-t border-gray-200">
										<p class="text-xs text-gray-500 mb-1">Enviando a:</p>
										<p class="text-sm font-medium text-gray-800 truncate">{{ user.address.road }} {{ user.address.house_number }}</p>
										<p class="text-xs text-gray-500 mt-1">{{ user.address.state_district }}</p>

										<div class="flex justify-between items-center mt-2">
											<span class="text-sm text-gray-600">Costo de envío:</span>
											<span v-if="finalShippingCost == 0" class="text-green-600 font-bold text-sm">¡Gratis!</span>
											<span v-else class="font-semibold text-gray-900">${{ shippingCost }}</span>
										</div>

										<button @click="redirectToEditUser" class="text-xs text-primary font-semibold mt-2 hover:underline">Cambiar dirección</button>
									</div>
									<div v-else class="mt-3 pt-3 border-t border-gray-200 text-center">
										<p class="text-sm text-gray-600 mb-2">Iniciá sesión para ver el costo de envío</p>
										<button @click="redirectToEditUser"
											class="text-xs bg-white border border-primary text-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
											Iniciar Sesión
										</button>
									</div>
								</template>
							</div>

							<div class="border-t border-gray-100 pt-4 flex justify-between items-end">
								<span class="text-lg font-bold text-gray-800">Total</span>
								<div class="flex flex-col items-end">
									<span class="text-2xl font-extrabold text-primary">${{ formatPrice(finalPrice + (envio ? finalShippingCost : 0)) }}</span>
									<span v-if="envio && finalShippingCost > 0" class="text-xs text-gray-400">incluye envío</span>
								</div>
							</div>
						</div>

						<button @click="redirectToWhatsApp"
							class="w-full bg-[#25D366] hover:bg-[#1da853] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group">
							<img src="https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_96/v1740248697/WhatsApp.webp"
								class="h-6 w-6 brightness-0 invert" alt="WhatsApp">
							<span class="text-lg">Finalizar Compra</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						</button>

						<p class="text-center text-xs text-gray-400 mt-4">
							Al finalizar, te redirigiremos a WhatsApp para coordinar el pago y la entrega.
						</p>
					</div>
				</div>
			</div>

			<!-- Empty State -->
			<div v-else class="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
				<div class="bg-white p-8 rounded-full shadow-xl mb-6 animate-float">
					<span class="text-6xl">🛒</span>
				</div>
				<h2 class="text-3xl font-bold text-gray-800 mb-3">Tu carrito está vacío</h2>
				<p class="text-gray-500 text-lg max-w-md mb-8">¡Parece que todavía no agregaste nada! Descubrí nuestros productos saludables y empezá a
					cuidarte
					hoy.</p>
				<NuxtLink to="/">
					<button
						class="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center gap-2">
						<span>Ver Productos</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</button>
				</NuxtLink>
			</div>
		</ClientOnly>
	</div>
</template>

<script setup>

import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';

useHead({
	title: 'Carrito | Modo Fit',
	meta: [
		{
			name: 'description',
			content: 'Revisá los productos que agregaste a tu carrito en Modo Fit. Aprovechá descuentos por cantidad y elegí envío a domicilio o retiro en Boedo.'
		},
		{
			property: 'og:title',
			content: 'Modo Fit - Carrito de Compras'
		},
		{
			property: 'og:description',
			content: 'Productos saludables, atención personalizada y descuentos especiales. Finalizá tu compra desde el carrito.'
		},
		{
			property: 'og:image',
			content: 'https://modofit.shop/modo-fit.png'
		},
		{
			property: 'og:url',
			content: 'https://modofit.shop/cart'
		},
		{
			name: 'keywords',
			content: 'modo fit, carrito, compra, tienda saludable, productos naturales, descuentos, boedo'
		}
	]
})

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const cartStore = useCartStore();
const authStore = useAuthStore();

const cart = computed(() => cartStore.cart);
const user = computed(() => authStore.user);

const price = ref(0);
const loadingPrice = ref(false);
const finalPrice = ref(0);
const shippingCost = ref(9999);
const loadingShippingCost = ref(false);
const finalShippingCost = ref(0);
const prices = ref({});
const discountPrices = ref({});
const originalPrices = ref({});
const loadingPrices = ref(false);
const config = ref({});
const address = ref('');
const envio = ref(false);

const formatQuantity = (value, unit) => {
	if (unit === 'u') return `${value}`;
	if (unit === 'kg') return `${value}kg`;
	return value > 999 ? `${value / 1000}kg` : `${value}gr`;
};

const formatPrice = (price) => {
	return Intl.NumberFormat("es-AR").format(Math.ceil(price));
};

const originalPrice = (item) => {
	return (originalPrices.value[item.presentationId || item.productId] || 0) * item.quantity;
};

const discountPrice = (item) => {
	return (discountPrices.value[item.presentationId || item.productId] || 0) * item.quantity;
};

const methodFinalPrice = (item) => {
	return prices.value[item.presentationId || item.productId] || 0;
};

const updateCart = (item) => {
	getPrices(item);
	getCartPrice();
};

const removeFromCart = (product) => {
	cartStore.removeFromCart(product.productId, product.presentationId ?? null);
};

const redirectToEditUser = () => {
	useRouter().push('/login');
};

const getShippingCost = async () => {
	if (!user.value?.address) return;

	loadingShippingCost.value = true;

	try {
		const response = await $fetch(`${apiBase}/sales/shipping`, {
			method: 'POST',
			body: user.value.address
		});
		shippingCost.value = response;
		finalShippingCost.value = finalPrice.value < 50000 ? shippingCost.value : 0;
		if (!envio.value) finalShippingCost.value = 0;
	} catch (error) {
		// console.error("Error fetching shipping cost:", error);
	} finally {
		loadingShippingCost.value = false;
	}
};

const redirectToWhatsApp = () => {
	const phoneNumber = config.value.whatsappNumber;

	const waitForFinalPrice = (callback) => {
		const interval = setInterval(() => {
			if (typeof finalPrice.value === 'number' && !isNaN(finalPrice.value)) {
				clearInterval(interval);
				callback();
			}
		}, 100);
	};

	waitForFinalPrice(() => {
		let allItems = cart.value.map(item => {
			const n = item.quantity;
			const total = n * item.unidad_venta;

			return `${item.name}: ${formatQuantity(total, item.unidad)}`;
		}).join('\n');

		const message = encodeURIComponent(
			`Hola Modo Fit! ${user.value ? `soy ${user.value.name}!` : ``} quiero realizar una compra de los siguientes productos:
        \n${allItems}
        \nTotal: $${finalPrice.value + finalShippingCost.value}
        ${envio.value ?
				(user.value ?
					`\npara enviar a ${user.value.address.road} ${user.value.address.house_number}, ${user.value.address.state_district}`
					: (address.value ?
						`\npara enviar a ${address.value}`
						: "\nTenemos que coordinar la entrega"))
				: "\nLo paso a buscar por el local!"}
    `);

		const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

		AnalyticsService.track('INITIATE_CHECKOUT', {
			method: 'WHATSAPP',
			total: finalPrice.value + finalShippingCost.value,
			itemCount: cart.value.length
		});

		window.location.href = whatsappURL;
	});
};

const fetchConfig = async () => {
	try {
		const response = await $fetch(`${apiBase}/config`);
		config.value = response;
	} catch (error) {
		// console.error('Error fetching config:', error);
	}
};

const getPrices = async (product) => {
	try {
		loadingPrices.value = true;

		const [priceRes, originalRes, discountRes] = await Promise.all([
			$fetch(`${apiBase}/products/price/${product.productId}`, {
				params: { quantity: product.quantity, presentationId: product.presentationId },
			}),
			$fetch(`${apiBase}/products/original-price/${product.productId}`, {
				params: { quantity: product.quantity, presentationId: product.presentationId },
			}),
			$fetch(`${apiBase}/products/discount-price/${product.productId}`, {
				params: { quantity: product.quantity, presentationId: product.presentationId },
			})
		]);

		prices.value[product.presentationId ? product.presentationId : product.productId] = priceRes;
		discountPrices.value[product.presentationId ? product.presentationId : product.productId] = discountRes;
		originalPrices.value[product.presentationId ? product.presentationId : product.productId] = originalRes;
	}
	catch (error) {
		// console.error("Error fetching price for product:", product, error);
	}
	finally {
		loadingPrices.value = false;
	}
};

const getCartPrice = async () => {
	try {
		loadingPrice.value = true;

		const [totalRes, finalTotalRes] = await Promise.all([
			$fetch(`${apiBase}/products/total`, { method: 'POST', body: { cart: cart.value } }),
			$fetch(`${apiBase}/products/finalTotal`, { method: 'POST', body: { cart: cart.value } })
		]);

		price.value = Number(totalRes);
		finalPrice.value = Number(finalTotalRes);
	}
	catch (error) {
		// console.error("Error fetching cart prices:", error);
	}
	finally {
		loadingPrice.value = false;
	}
};

watch(cart, () => {
	getCartPrice();
}, { deep: true });

watch(envio, () => {
	getShippingCost();
});

watch(finalPrice, () => {
	getShippingCost();
});

onMounted(async () => {
	cartStore.initializeCart();
	authStore.initializeAuth();

	if (user.value?.address) {
		await getShippingCost();
	}

	cart.value.forEach(product => {
		getPrices(product);
	});

	getCartPrice();
	fetchConfig();
});
</script>

<style>
.button-mercadopago:hover {
	box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
}

.button-mercadopago:active {
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.spinner-container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
}

.spinner {
	border: 3px solid transparent;
	border-top: 3px solid #16a34a;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 1s linear infinite;
}

.spinner-text {
	position: absolute;
	font-size: 14px;
	font-weight: bold;
	color: #16a34a;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes float {
	0% {
		transform: translateY(0px);
	}

	50% {
		transform: translateY(-10px);
	}

	100% {
		transform: translateY(0px);
	}
}

.animate-float {
	animation: float 3s ease-in-out infinite;
}
</style>
