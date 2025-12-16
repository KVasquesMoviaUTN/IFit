<template>
	<div v-if="product" class="my-5 flex max-w-[1200px] flex-grow flex-col justify-center gap-5 rounded-2xl bg-white p-5 shadow-lg lg:flex-row">
		<div class="flex w-full flex-col justify-start lg:w-2/6">
			<div v-if="product.discount > 0"
				class="text-md ml-auto h-fit w-fit rounded-bl-xl rounded-tr-xl bg-red-700 px-3 py-2 font-semibold tracking-wide text-white shadow lg:px-5 lg:text-lg lg:tracking-widest">
				-{{ product.discount }}%
			</div>
			<img v-if="product.id !== undefined && product.id !== null" :src="getImage(product)" class="" type="image/webp" loading="lazy"
				:alt="`Imagen de ${product.name}`">
		</div>
		<div class="flex w-full flex-col gap-5 border-t p-5 lg:w-3/6 lg:border-l-2 lg:border-t-0">
			<h1 class="text-center text-3xl font-bold font-serif">
				{{ product.selectedPresentation ? product.selectedPresentation.name : product.name }}</h1>
			<p class="border-b p-1 text-justify">{{ product.description }}</p>

			<div class="flex justify-center gap-5 text-2xl font-sans">
				<template v-if="product.discount > 0 || product.selectedQuantity > 4">
					<span class="text-red-600 line-through">
						${{ formattedBasePrice(product) }}
					</span>
					<span class="font-semibold text-green-600">
						${{ formattedFinalPrice(product) }}
					</span>
				</template>
				<span v-else class="flex justify-center font-semibold">
					${{ formattedBasePrice(product) }}
				</span>
			</div>

			<div class="flex flex-col justify-center gap-5 lg:flex-row">
				<select v-if="product.presentation?.length > 0" v-model="product.selectedPresentation"
					class="flex h-10 w-full rounded-full border border-slate-500 bg-white text-center text-sm tracking-wide shadow lg:w-56">
					<option v-for="presentation in product.presentation" :key="presentation.id" :value="presentation">
						{{ presentation.flavour }}
					</option>
				</select>
				<select id="cantidad" v-model="product.selectedQuantity"
					class="flex h-10 w-full rounded-full border border-slate-500 bg-white text-center text-lg tracking-wide shadow lg:w-56">
					<option v-for="n in 100" :key="n" :value="n" class="mx-auto flex lg:mx-0">
						{{ formatQuantity(n * product.unidad_venta, product.unidad) }}
					</option>
				</select>
			</div>

			<div class="flex justify-center gap-5">

				<button @click="addToCart(product)"
					class="flex h-12 w-full items-center justify-center rounded-full border border-transparent bg-primary hover:bg-primary/90 text-xl font-semibold text-white shadow-md transition-all duration-300 lg:w-80">
					<span>Agregar al Carrito 🛍️</span>
				</button>
			</div>

			<div class="border-t" v-if="product.informacion_nutricional" v-html="generateNutritionalTable(product.informacion_nutricional)"></div>
		</div>
	</div>
	<div v-else>
		Cargando producto...
	</div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';

const route = useRoute();
const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

// SSR Data Fetching
const { data: pageData } = await useAsyncData(`product-${route.params.id}`, async () => {
	const [productRes, configRes] = await Promise.all([
		$fetch(`${apiBase}/products/${route.params.id}`),
		$fetch(`${apiBase}/config`)
	]);

	// Initialize product defaults
	const product = productRes;
	product.selectedQuantity = 1;
	product.selectedPresentation = product.presentation.length > 0 ? product.presentation[0] : null;
	product.presentation.forEach(presentation => {
		presentation.selectedQuantity = 1;
	});

	return {
		product,
		config: configRes
	};
});

const product = ref(pageData.value?.product || null);
const config = ref(pageData.value?.config || {});

// SEO
useHead({
	title: () => product.value?.name ? `${product.value.name} | Modo Fit` : 'Producto | Modo Fit',
	meta: [
		{
			name: 'description',
			content: () => product.value?.description || 'Detalles del producto en Modo Fit.',
		},
		{
			property: 'og:title',
			content: () => product.value?.name ? `${product.value.name} | Modo Fit` : 'Producto | Modo Fit',
		},
		{
			property: 'og:description',
			content: () => product.value?.description || 'Detalles del producto en Modo Fit.',
		},
		{
			property: 'og:image',
			content: () => product.value?.image ? getImage(product.value) : '',
		},
	],
	script: [
		{
			type: 'application/ld+json',
			children: () => {
				if (!product.value?.name) return '';
				return JSON.stringify({
					'@context': 'https://schema.org/',
					'@type': 'Product',
					name: product.value.name,
					image: product.value.image ? getImage(product.value) : [],
					description: product.value.description,
					sku: product.value.id,
					offers: {
						'@type': 'Offer',
						url: `https://modofit.shop/product/${product.value.id}`,
						priceCurrency: 'ARS',
						price: product.value.selectedPresentation ? product.value.selectedPresentation.price : product.value.price,
						availability: 'https://schema.org/InStock',
						itemCondition: 'https://schema.org/NewCondition',
						priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
						hasMerchantReturnPolicy: {
							'@type': 'MerchantReturnPolicy',
							applicableCountry: 'AR',
							returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
							merchantReturnDays: 30,
							returnMethod: 'https://schema.org/ReturnByMail',
							returnFees: 'https://schema.org/FreeReturn',
						},
						shippingDetails: {
							'@type': 'OfferShippingDetails',
							shippingRate: {
								'@type': 'MonetaryAmount',
								value: 0,
								currency: 'ARS',
							},
							shippingDestination: {
								'@type': 'DefinedRegion',
								addressCountry: 'AR',
							},
							deliveryTime: {
								'@type': 'ShippingDeliveryTime',
								handlingTime: {
									'@type': 'QuantitativeValue',
									minValue: 0,
									maxValue: 1,
									unitCode: 'DAY',
								},
								transitTime: {
									'@type': 'QuantitativeValue',
									minValue: 1,
									maxValue: 5,
									unitCode: 'DAY',
								},
							},
						},
					},
				});
			},
		},
	],
});

function basePrice(product) {
	return product.presentation?.length > 0 ? product.selectedPresentation.price : product.price;
}

function formattedBasePrice(product) {
	return Intl.NumberFormat("es-AR").format(Math.ceil(basePrice(product) * product.selectedQuantity));
}

function formattedFinalPrice(product) {
	let price = Math.floor(basePrice(product) * (1 - product.discount / 100) * product.selectedQuantity);
	return Intl.NumberFormat("es-AR").format(Math.floor(product.selectedQuantity > 4 ? price * (1 - config.value.descuento) : price));
}

function formatQuantity(value, unit) {
	if (unit === 'u') return `${value}`;
	if (unit === 'kg') return `${value} kg`;
	return value > 999 ? `${value / 1000} kg` : `${value} gr`;
}

function getImage(product) {
	return `https://res.cloudinary.com/daid9xytm/image/upload/q_auto:best,f_auto/v1740248697/${product.presentation?.length > 0 && product.selectedPresentation
		? product.selectedPresentation.image
		: product.image
		}.webp`
}

function addToCart(product) {
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

		// Visual feedback logic if needed
		// The original code used event.target which is not directly available here unless passed
	}
}

function generateNutritionalTable(nutritionalJson) {
	if (!nutritionalJson) {
		return '<p>No hay información nutricional disponible.</p>';
	}

	let data;
	try {
		data = JSON.parse(nutritionalJson);
	} catch (e) {
		return '<p>Error al leer la información nutricional.</p>';
	}

	if (!data.nutritional_values || !Array.isArray(data.nutritional_values)) {
		return '<p>Información nutricional incompleta.</p>';
	}

	let html = `<h3 style="margin-bottom: 4px; opacity: 0.75;">Información Nutricional</h3>`;
	html += `<p><strong>Tamaño de la porción:</strong> ${data.portion}</p>`;

	html += `
    <table style="
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #000;
      font-family: Arial, sans-serif;
    ">
      <thead style="font-size: 14px; line-height: 1.25rem;">
        <tr>
          <th style="border: 1px solid #000; padding: 8px; text-align: left;">Nutriente</th>
          <th style="border: 1px solid #000; padding: 8px; text-align: left;">Cantidad</th>
          <th style="border: 1px solid #000; padding: 8px; text-align: center;">% Valor Diario</th>
        </tr>
      </thead>
      <tbody style="font-size: 12px; line-height: 1rem;">
  `;

	data.nutritional_values.forEach(item => {
		const dailyValue = item.daily_value_percent !== null ? item.daily_value_percent + '%' : '-';
		html += `
      <tr>
        <td style="border: 1px solid #000; padding: 8px;">${item.nutrient}</td>
        <td style="border: 1px solid #000; padding: 8px;">${item.amount}</td>
        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${dailyValue}</td>
      </tr>
    `;
	});

	html += `
      </tbody>
    </table>
    <p style="font-style: italic; font-size: 0.8em; margin-top: 8px;">${data.daily_value_note}</p>
  `;

	return html;
}
</script>
