<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-primary">Ventas</h1>
			<p class="text-gray-500 mt-2">Registre ventas en el local.</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Product Search & List -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Search -->
				<div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
					<div class="relative">
						<input v-model="searchQuery" @input="searchProducts" type="text" placeholder="Buscar productos por nombre..."
							class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none" />
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
				</div>

				<!-- Results -->
				<div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
					<div class="p-4 border-b border-gray-100 bg-gray-50">
						<h3 class="font-semibold text-gray-700">Productos Disponibles</h3>
					</div>
					<div class="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
						<div v-if="loading" class="p-8 text-center text-gray-500">
							Cargando productos...
						</div>
						<div v-else-if="products.length === 0" class="p-8 text-center text-gray-500">
							No se encontraron productos.
						</div>
						<div v-for="product in products" :key="product.id" class="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
							<div class="flex items-center gap-4">
								<div class="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
									<img v-if="getImage(product)" :src="getImage(product)" :alt="product.name" class="h-full w-full object-cover">
									<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<div>
									<h4 class="font-medium text-gray-900">{{ product.name }}</h4>

									<!-- Presentation Selector -->
									<div v-if="product.presentation && product.presentation.length > 0" class="mt-1 mb-1">
										<select v-model="product.selectedPresentation"
											class="text-sm border-gray-300 rounded-md shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 p-1">
											<option v-for="pres in product.presentation" :key="pres.id" :value="pres">
												{{ pres.name }}
											</option>
										</select>
									</div>

									<div class="text-sm text-gray-500">
										Stock: <span
											:class="(product.selectedPresentation ? product.selectedPresentation.stock : product.stock) < 0 ? 'text-red-600 font-bold' : (product.selectedPresentation ? product.selectedPresentation.stock : product.stock) < 5 ? 'text-orange-500 font-bold' : 'text-green-600'">
											{{ product.selectedPresentation ? product.selectedPresentation.stock : product.stock }}
										</span> |
										Precio: <span class="font-semibold text-primary">${{ product.selectedPresentation ? product.selectedPresentation.price :
											product.price }}</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<input type="number" min="1" v-model.number="product.manualQuantity"
									class="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-secondary/50 outline-none"
									placeholder="1">
								<button @click="addToCart(product)"
									:disabled="(product.selectedPresentation ? product.selectedPresentation.stock : product.stock) <= -50"
									class="px-4 py-2 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium">
									Agregar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Cart & Summary -->
			<div class="lg:col-span-1">
				<div class="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">
					<div class="p-6 border-b border-gray-100 bg-primary text-white rounded-t-xl">
						<h3 class="text-xl font-bold flex items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							Carrito de Venta
						</h3>
					</div>

					<div class="p-6 space-y-6">
						<!-- Cart Items -->
						<div v-if="cart.length === 0" class="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
							El carrito está vacío
						</div>
						<div v-else class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
							<div v-for="(item, index) in cart" :key="item.id" class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
								<div class="flex-1">
									<h5 class="font-medium text-sm text-gray-900 line-clamp-1">{{ item.name }}</h5>
									<div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
										<input type="number" v-model.number="item.price"
											class="w-20 px-1 py-0.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-secondary/50 outline-none" min="0">
										<span>x {{ item.quantity }}</span>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<input type="number"
										class="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-secondary/50 outline-none"
										v-model.number="item.quantity" min="1">
									<input type="number"
										class="w-20 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-secondary/50 outline-none"
										v-model.number="item.discountPercent" min="0" max="100" placeholder="%" @input="validateDiscount(item)">
									<div class="flex flex-col items-end mr-2">
										<span v-if="item.discountPercent > 0" class="text-xs text-gray-400 line-through">
											${{ formatPrice(item.price * item.quantity) }}
										</span>
										<span class="font-bold text-primary text-sm">
											${{ formatPrice((item.price * item.quantity) * (1 - (item.discountPercent || 0) / 100)) }}
										</span>
									</div>
									<button @click="removeFromCart(index)" class="text-red-400 hover:text-red-600 transition-colors">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd" />
										</svg>
									</button>
								</div>
							</div>
						</div>

						<!-- Totals -->
						<div class="border-t border-gray-100 pt-4 space-y-2">
							<div class="flex justify-between text-gray-600">
								<span>Subtotal</span>
								<span>${{ formatPrice(subtotal) }}</span>
							</div>
							<div class="flex justify-between text-gray-600">
								<span>Envío</span>
								<span>${{ formatPrice(shippingCost) }}</span>
							</div>
							<div class="flex justify-between text-xl font-bold text-primary pt-2">
								<span>Total</span>
								<div class="flex flex-col items-end">
									<span v-if="totalNoDiscount > subtotal" class="text-sm text-gray-400 line-through font-normal">
										${{ formatPrice(totalNoDiscount + shippingCost) }}
									</span>
									<span>${{ formatPrice(total) }}</span>
								</div>
							</div>
						</div>

						<!-- Payment Method & Channel -->
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<label class="block text-sm font-medium text-gray-700">Método de Pago</label>
								<div class="relative">
									<button @click="togglePaymentMethodDropdown"
										class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary flex items-center justify-between">
										<span class="block truncate flex items-center gap-2">
											<svg v-if="paymentMethodId" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
												stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													:d="paymentMethodsList.find(m => m.value === paymentMethodId)?.icon" />
											</svg>
											{{ paymentMethodId || 'Seleccionar' }}
										</span>
										<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
												aria-hidden="true">
												<path fill-rule="evenodd"
													d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
													clip-rule="evenodd" />
											</svg>
										</span>
									</button>

									<!-- Dropdown Panel -->
									<div v-if="isPaymentMethodDropdownOpen"
										class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
										<ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
											<li v-for="method in paymentMethodsList" :key="method.value" @click="selectPaymentMethod(method.value)"
												class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 transition-colors cursor-pointer"
												role="option">
												<div class="flex items-center">
													<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24"
														stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon" />
													</svg>
													<span class="font-normal block truncate" :class="{ 'font-semibold': paymentMethodId === method.value }">
														{{ method.label }}
													</span>
												</div>

												<span v-if="paymentMethodId === method.value" class="text-secondary absolute inset-y-0 right-0 flex items-center pr-4">
													<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
														<path fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd" />
													</svg>
												</span>
											</li>
										</ul>
									</div>

									<!-- Backdrop to close -->
									<div v-if="isPaymentMethodDropdownOpen" @click="isPaymentMethodDropdownOpen = false" class="fixed inset-0 z-0 cursor-default"></div>
								</div>
							</div>

							<div class="space-y-2">
								<label class="block text-sm font-medium text-gray-700">Medio de Pago</label>
								<select v-model="paymentChannel"
									class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary">
									<option v-for="channel in paymentChannelsList" :key="channel" :value="channel">
										{{ channel }}
									</option>
								</select>
							</div>
						</div>

						<!-- Shipping Cost -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">Costo de Envío</label>
							<div class="relative">
								<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
								<input type="number" v-model.number="shippingCost" min="0"
									class="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none bg-white"
									placeholder="0.00">
							</div>
						</div>

						<!-- Date Selection -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">Fecha de Venta</label>
							<input type="date" v-model="customDate"
								class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none bg-white">
						</div>

						<!-- Known Client -->
						<div class="space-y-2 flex items-end pb-2">
							<label class="flex items-center space-x-3 cursor-pointer">
								<input type="checkbox" v-model="knownClient"
									class="form-checkbox h-5 w-5 text-secondary rounded border-gray-300 focus:ring-secondary">
								<span class="text-sm font-medium text-gray-700">Cliente Conocido</span>
							</label>
						</div>

						<!-- Actions -->
						<button @click="confirmSale" :disabled="cart.length === 0 || processing"
							class="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow-md hover:bg-secondary/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2">
							<svg v-if="processing" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span v-else>Confirmar Venta</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { AnalyticsService } from '~/utils/analytics';
import { fuzzyMatch } from '~/utils/stringUtils';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
	middleware: ['auth']
});

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;
const authStore = useAuthStore();

const PAYMENT_METHODS = {
	EFECTIVO: 'Efectivo',
	TRANSFERENCIA: 'Transferencia',
	QR: 'QR',
	DEBITO: 'Débito',
	CREDITO: 'Crédito',
	MERCADO_PAGO: 'Mercado Pago',
	MERCADO_LIBRE: 'Mercado Libre',
};

const products = ref([]);
const searchQuery = ref('');
const cart = ref([]);
const loading = ref(false);
const processing = ref(false);
const paymentMethodId = ref(PAYMENT_METHODS.EFECTIVO);
const debounceTimer = ref(null);
const customDate = ref(new Date().toISOString().split('T')[0]);
const knownClient = ref(false);
const isPaymentMethodDropdownOpen = ref(false);
const paymentMethodsList = [
	{ label: 'Efectivo', value: 'Efectivo', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }, // Cash/Coin
	{ label: 'Transferencia', value: 'Transferencia', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' }, // Arrows
	{ label: 'QR', value: 'QR', icon: 'M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 6h2v2H6V6zm0 8h2v2H6v-2zm8-8h2v2h-2V6zm-8 4h2v2H6v-2zm4-4h2v2h-2V6zm0 4h2v2h-2v-2zm0 8h2v2h-2v-2zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z' }, // QR-ish
	{ label: 'Débito', value: 'Débito', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }, // Card
	{ label: 'Crédito', value: 'Crédito', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }, // Card
	{ label: 'Mercado Pago', value: 'Mercado Pago', icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11' }, // Handshake/Payment
	{ label: 'Mercado Libre', value: 'Mercado Libre', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' } // Shopping Bag
];
const paymentChannel = ref('Local');
const paymentChannelsList = ['Mercado Libre', 'Local', 'Conocidos', 'Página Web', 'Redes'];
const shippingCost = ref(0);

const user = computed(() => authStore.user);

const subtotal = computed(() => {
	return cart.value.reduce((sum, item) => {
		const discountAmount = (item.price * (item.discountPercent || 0)) / 100;
		return sum + ((item.price - discountAmount) * item.quantity);
	}, 0);
});

const total = computed(() => {
	return subtotal.value + (shippingCost.value || 0);
});

const totalNoDiscount = computed(() => {
	return cart.value.reduce((sum, item) => {
		return sum + (item.price * item.quantity);
	}, 0);
});

const formatPrice = (value) => {
	let val = (value / 1).toFixed(2).replace('.', ',')
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
};

const getImage = (product) => {
	const imagePath = (product.presentation && product.presentation.length > 0) ? product.presentation[0].image : product.image;
	if (!imagePath) return null;
	return `https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_224/v1740248697/${imagePath}.webp`;
};

const togglePaymentMethodDropdown = () => {
	isPaymentMethodDropdownOpen.value = !isPaymentMethodDropdownOpen.value;
};

const selectPaymentMethod = (method) => {
	paymentMethodId.value = method;
	isPaymentMethodDropdownOpen.value = false;
};

const validateDiscount = (item) => {
	if (item.discountPercent < 0) item.discountPercent = 0;
	if (item.discountPercent > 100) item.discountPercent = 100;
};

const fetchProducts = async () => {
	loading.value = true;
	try {
		const response = await $fetch(`${apiBase}/products`, {
			params: {
				page: 1,
				pageSize: 500
			}
		});

		if (!response || !response.products) {
			console.error("Invalid API response:", response);
			products.value = [];
			return;
		}

		let allProducts = response.products.map(p => ({
			...p,
			manualQuantity: 1,
			selectedPresentation: (p.presentation && p.presentation.length > 0) ? p.presentation[0] : null
		}));
		if (searchQuery.value) {
			allProducts = allProducts.filter(p => fuzzyMatch(p.name, searchQuery.value));
		}

		products.value = allProducts;
	} catch (error) {
		console.error("Error fetching products:", error);
	} finally {
		loading.value = false;
	}
};

const searchProducts = () => {
	clearTimeout(debounceTimer.value);
	debounceTimer.value = setTimeout(() => {
		fetchProducts();
	}, 300);
};

const addToCart = (product) => {
	const quantityToAdd = product.manualQuantity || 1;
	const isPresentation = product.selectedPresentation !== null;

	const itemName = isPresentation ? `${product.name} - ${product.selectedPresentation.name}` : product.name;
	const itemPrice = isPresentation ? product.selectedPresentation.price : product.price;
	const itemStock = isPresentation ? product.selectedPresentation.stock : product.stock;
	const presentationId = isPresentation ? product.selectedPresentation.id : null;

	const existingItem = cart.value.find(item =>
		item.productId === product.id && item.presentationId === presentationId
	);

	if (existingItem) {
		if (existingItem.quantity + quantityToAdd <= itemStock + 50) {
			existingItem.quantity += quantityToAdd;
		} else {
			alert('No hay suficiente stock disponible (Límite: -50).');
		}
	} else {
		if (quantityToAdd <= itemStock + 50) {
			cart.value.push({
				productId: product.id,
				presentationId: presentationId,
				id: isPresentation ? `${product.id}-${presentationId}` : `${product.id}`,
				name: itemName,
				price: itemPrice,
				quantity: quantityToAdd,
				maxStock: itemStock,
				discountPercent: 0
			});
		} else {
			alert('No hay suficiente stock disponible (Límite: -50).');
		}
	}
	product.manualQuantity = 1;
};

const removeFromCart = (index) => {
	cart.value.splice(index, 1);
};

const confirmSale = async () => {
	if (!confirm('¿Confirmar venta y descontar stock?')) return;

	processing.value = true;
	try {
		const saleData = {
			userId: user.value ? user.value.id : undefined,
			paymentMethod: paymentMethodId.value,
			paymentChannel: paymentChannel.value,
			shipping: shippingCost.value,
			date: customDate.value ? new Date(customDate.value).toISOString() : undefined,
			known_client: knownClient.value,
			address: { state: 'Local' },
			details: cart.value.map(item => {
				const discountAmount = (item.price * (item.discountPercent || 0)) / 100;
				return {
					productId: item.productId,
					quantity: item.quantity,
					presentationId: item.presentationId,
					discount: parseFloat(discountAmount.toFixed(2)),
					price: item.price
				};
			})
		};

		await $fetch(`${apiBase}/sales/manual`, {
			method: 'POST',
			body: saleData
		});

		AnalyticsService.track('MANUAL_SALE', {
			total: total.value,
			itemCount: cart.value.length,
			paymentMethod: paymentMethodId.value
		});

		alert('Venta registrada exitosamente!');
		cart.value = [];
		fetchProducts();
	} catch (error) {
		console.error("Error creating sale:", error);
		alert('Error al registrar la venta. Verifique el stock e intente nuevamente.');
	} finally {
		processing.value = false;
	}
};

onMounted(() => {
	fetchProducts();
});
</script>
