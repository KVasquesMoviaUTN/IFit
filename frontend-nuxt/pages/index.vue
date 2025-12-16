<template>
	<div class="flex w-full flex-col">
		<div class="bg-secondary flex h-10 w-full text-center text-xs shadow-md lg:text-base text-primary font-medium items-center justify-center">
			<ClientOnly>
				<swiper :modules="[Autoplay]" :autoplay="{ delay: 3000, disableOnInteraction: false }" :loop="true" class="mySwiper w-full">
					<swiper-slide class="tracking-wide lg:tracking-wider" v-for="(msg, index) in messages" :key="index">
						{{ msg }}
					</swiper-slide>
				</swiper>
			</ClientOnly>
		</div>

		<h1 class="my-6 text-center text-3xl lg:text-5xl font-bold tracking-wider text-primary font-serif">
			PRODUCTOS SALUDABLES
		</h1>

		<template v-if="inputString == '' && newProducts.length > 0">
			<h2
				class="m-2 text-left text-xl font-bold tracking-wide text-primary lg:mx-[88px] lg:my-6 lg:text-3xl font-serif border-b-2 border-secondary/30 pb-2 w-fit">
				Productos Nuevos ✨</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:mx-20 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				<ProductCard :config="config" :key="product.id" :product="product" @add-to-cart="addToCart" v-for="product in newProducts"
					@update-product="updateProduct" :select-id-prefix="'cantidadNuevos'" />
			</div>
		</template>

		<template v-if="inputString == '' && highlightedProducts.length > 0">
			<h2
				class="m-2 text-left text-xl font-bold tracking-wide text-primary lg:mx-[88px] lg:my-6 lg:text-3xl font-serif border-b-2 border-secondary/30 pb-2 w-fit">
				Los Más Elegidos ⭐</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:mx-20 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				<ProductCard :config="config" :key="product.id" :product="product" @add-to-cart="addToCart" @update-product="updateProduct"
					v-for="product in highlightedProducts" :select-id-prefix="'cantidadDestacados'" />
			</div>
		</template>

		<template v-if="inputString == '' && discountedProducts.length > 0">
			<h2
				class="m-2 text-left text-xl font-bold tracking-wide text-primary lg:mx-[88px] lg:my-6 lg:text-3xl font-serif border-b-2 border-secondary/30 pb-2 w-fit">
				Descuentos 🔥</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:mx-20 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				<ProductCard :config="config" :key="product.id" :product="product" @add-to-cart="addToCart" @update-product="updateProduct"
					v-for="product in discountedProducts" :select-id-prefix="'cantidadDestacados'" />
			</div>
		</template>

		<h2
			class="my-2 ml-2 text-left text-xl font-bold tracking-wide text-primary lg:mx-[88px] lg:my-6 lg:text-3xl font-serif border-b-2 border-secondary/30 pb-2 w-fit">
			Todos los Productos 🛒</h2>
		<div v-if="isLoading" class="loading-overlay my-20 flex justify-center">
			<div class="spinner border-primary"></div>
		</div>
		<div v-else class="grid grid-cols-2 md:grid-cols-3 lg:mx-20 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
			<ProductCard :config="config" :key="product.id" :product="product" @add-to-cart="addToCart" :select-id-prefix="'cantidad'"
				@update-product="updateProduct" v-for="product in filteredProducts" />
		</div>
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useParamsStore } from '~/stores/params';
import { useCartStore } from '~/stores/cart';

useHead({
	title: 'Catálogo de Productos | Modo Fit',
	meta: [
		{ name: 'description', content: 'Descubrí los mejores productos naturales al mejor precio.' },
		{ name: 'keywords', content: 'tienda fitness, suplementos, salud, nutrición, gimnasio, dietética' },
		{ property: 'og:title', content: 'Modo Fit - Catálogo de Productos' },
		{ property: 'og:description', content: 'Catálogo con los mejores suplementos al mejor precio.' }
	],
	script: [
		{
			type: 'application/ld+json',
			children: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: 'Modo Fit',
				url: 'https://modofit.shop',
				logo: 'https://modofit.shop/modofit.png',
				contactPoint: {
					'@type': 'ContactPoint',
					telephone: '+54-11-3927-6499',
					contactType: 'customer service',
					areaServed: 'AR',
					availableLanguage: 'Spanish'
				},
				sameAs: [
					'https://www.instagram.com/modofit_ok',
				]
			})
		}
	]
});

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const cart = ref([]);
const products = ref([]);
const newProducts = ref([]);
const discountedProducts = ref([]);
const highlightedProducts = ref([]);
const messages = ref([
	"🔥 Aprovechá los descuentos de esta semana 💥 🛒",
	"🥗 Tu estilo de vida saludable empieza acá. 🌿💚",
	"🎁 ¡Envío gratis en compras mayores a $60,000! 🛒🚀",
	"📦 Envíos expréss en AMBA y despachos a todo el país. 🚚💨",
	"✨ ¡Bienvenido! ✨ Descubrí lo mejor para tu bienestar. 🏋️‍♂️🚴‍♀️",
	"🎉 10% de descuento comprando 5 unidades de cualquier producto! 🛒✨",
]);
const isLoading = ref(false); // Initial load handled by SSR

const paramsStore = useParamsStore();
const inputString = computed(() => paramsStore.sharedString);

const initializeProductDefaults = (productsList) => {
	if (!productsList) return;
	productsList.forEach(product => {
		product.selectedQuantity = 1;
		product.selectedPresentation = product.presentation.length > 0 ? product.presentation[0] : null;
		product.presentation.forEach(presentation => {
			presentation.selectedQuantity = 1;
		});
	});
};

// SSR Data Fetching
const { data: homeData } = await useAsyncData('home-data', async () => {
	const [newRes, highlightedRes, discountedRes, productsRes, configRes] = await Promise.all([
		$fetch(`${apiBase}/products/new`),
		$fetch(`${apiBase}/products/highlighted`),
		$fetch(`${apiBase}/products/discounted`),
		$fetch(`${apiBase}/products?page=1`),
		$fetch(`${apiBase}/config`)
	]);

	return {
		newProducts: newRes.products,
		highlightedProducts: highlightedRes.products,
		discountedProducts: discountedRes.products,
		products: productsRes.products,
		config: configRes,
		hasNextPage: productsRes.hasNextPage
	};
});

// Hydrate state from SSR data
if (homeData.value) {
	initializeProductDefaults(homeData.value.newProducts);
	newProducts.value = homeData.value.newProducts;

	initializeProductDefaults(homeData.value.highlightedProducts);
	highlightedProducts.value = homeData.value.highlightedProducts;

	initializeProductDefaults(homeData.value.discountedProducts);
	discountedProducts.value = homeData.value.discountedProducts;

	initializeProductDefaults(homeData.value.products);
	products.value = homeData.value.products;
}

const config = computed(() => homeData.value?.config || {});

// Client-side pagination (load remaining products)
onMounted(async () => {
	const cartStore = useCartStore();
	cartStore.initializeCart();

	if (homeData.value?.hasNextPage) {
		isLoading.value = true;
		let page = 2;
		let hasMore = true;
		try {
			while (hasMore) {
				const response = await $fetch(`${apiBase}/products?page=${page}`);
				initializeProductDefaults(response.products);
				products.value = [...products.value, ...response.products];
				hasMore = response.hasNextPage;
				page++;
			}
		} catch (error) {
			console.error('Error fetching remaining products:', error);
		} finally {
			isLoading.value = false;
		}
	}
});

const updateProduct = (updateData) => {
	const updateProductInArray = (productsList) => {
		const product = productsList.find(p => p.id === updateData.productId);
		if (product) {
			product.selectedQuantity = updateData.selectedQuantity;
			product.selectedPresentation = updateData.selectedPresentation;
		}
	};

	updateProductInArray(products.value);
	updateProductInArray(newProducts.value);
	updateProductInArray(discountedProducts.value);
	updateProductInArray(highlightedProducts.value);
};

const addToCart = (product) => {
	if (process.client && window.gtag) {
		window.gtag('event', 'add_to_cart', {
			currency: 'ARS',
			value: product.price || 0,
			items: [{
				item_id: product.id,
				item_name: product.name,
				price: product.price || 0,
				discount: product.discount,
				quantity: product.selectedQuantity || 1
			}]
		});
	}

	AnalyticsService.track('ADD_TO_CART', {
		productId: product.id,
		productName: product.name,
		price: product.price,
		quantity: product.selectedQuantity || 1,
		presentationId: product.selectedPresentation ? product.selectedPresentation.id : null
	});

	const cartStore = useCartStore();

	if (product.selectedPresentation) {
		const productToAdd = {
			...product,
			presentationId: product.selectedPresentation.id
		};
		cartStore.addToCart(productToAdd);
	} else {
		cartStore.addToCart({
			...product
		});
	}

	if (process.client) {
		const audio = new Audio('/added.mp3');
		audio.volume = 0.25;
		audio.play();
	}
};

const normalize = (string) => {
	return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '');
};

const filteredProducts = computed(() => {
	let search = normalize(inputString.value);
	return products.value.filter(item =>
		normalize(item.name).includes(search) ||
		normalize(item.category).includes(search)
	);
});
</script>

<style scoped>
.slider-container {
	color: white;
	text-align: center;
	font-size: 18px;
	z-index: 1000;
}

.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
}

@keyframes blink {

	0%,
	100% {
		opacity: 1;
	}

	50% {
		opacity: 0;
	}
}

.button-blink {
	animation: blink 0.5s ease-in-out;
}

.loading-overlay {
	inset: 0;
	display: flex;
	z-index: 1000;
	position: fixed;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 204px);
	background: rgba(239, 255, 239, 0.7);
}

.spinner {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border-top: 4px solid #000;
	animation: spin 1s linear infinite;
	border: 4px solid rgba(255, 255, 255, 0.3);
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
