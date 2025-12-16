<template>
	<div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
		<div class="mb-6 border-b border-gray-100 pb-4">
			<h3 class="text-2xl font-bold text-primary">{{ product ? 'Editar Producto' : 'Agregar Nuevo Producto' }}</h3>
			<p class="text-gray-500 text-sm mt-1">Complete los detalles del producto a continuación.</p>
		</div>
		<form @submit.prevent="handleSubmit" class="space-y-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Name -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Nombre del Producto</label>
					<input
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none"
						v-model="name" type="text" placeholder="Ej. Proteína Whey" required />
				</div>

				<!-- Image Upload -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Imagen del Producto</label>
					<div class="flex items-center gap-4">
						<div v-if="imagePreview" class="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
							<img :src="imagePreview" alt="Preview" class="h-full w-full object-cover" />
						</div>
						<label
							class="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors shadow-sm">
							<span>{{ uploading ? 'Subiendo...' : 'Subir Imagen' }}</span>
							<input type="file" class="hidden" @change="handleFileUpload" accept="image/*" :disabled="uploading">
						</label>
					</div>
					<p v-if="uploadError" class="text-red-500 text-xs mt-1">{{ uploadError }}</p>
				</div>

				<!-- Purchase Price -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Precio de Compra ($)</label>
					<input
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none"
						v-model="purchase_price" type="number" step="1" placeholder="0.00" required />
				</div>

				<!-- Price -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Precio de Venta ($)</label>
					<input
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none"
						v-model="price" type="number" step="1" placeholder="0.00" required />
				</div>

				<!-- Stock -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Stock Disponible</label>
					<input
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none"
						v-model="stock" type="number" placeholder="0" required />
				</div>

				<!-- Unidad de Venta -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Unidad de Venta (Cantidad)</label>
					<input
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none"
						v-model="unidad_venta" type="number" placeholder="1" required />
				</div>

				<!-- Unidad (Select) -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Tipo de Unidad</label>
					<select
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none bg-white"
						v-model="unidad" required>
						<option value="" disabled>Seleccione una unidad</option>
						<option value="u">Unidad (u)</option>
						<option value="gr">Gramos (gr)</option>
						<option value="kg">Kilogramos (kg)</option>
					</select>
				</div>

				<!-- Category (Select) -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Categoría</label>
					<select
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none bg-white"
						v-model="category" required>
						<option value="" disabled>Seleccione una categoría</option>
						<option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
					</select>
				</div>
			</div>

			<!-- Description (Full Width) -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-700">Descripción</label>
				<textarea
					class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none h-24 resize-none"
					v-model="description" placeholder="Descripción detallada del producto..." required></textarea>
			</div>

			<!-- Informacion Nutricional (Full Width) -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-700">Información Nutricional</label>
				<textarea
					class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors outline-none h-24 resize-none"
					v-model="informacion_nutricional" placeholder="Información nutricional del producto..."></textarea>
			</div>

			<div class="flex justify-end pt-4">
				<button type="submit"
					class="px-6 py-2.5 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
					<span v-if="!product">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								clip-rule="evenodd" />
						</svg>
					</span>
					<span v-else>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd" />
						</svg>
					</span>
					{{ product ? 'Guardar Cambios' : 'Agregar Producto' }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
const props = defineProps({
	product: Object,
});

const emit = defineEmits(['product-saved']);

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const name = ref('');
const price = ref('');
const purchase_price = ref('');
const description = ref('');
const stock = ref('');
const unidad_venta = ref('');
const unidad = ref('');
const category = ref('');
const informacion_nutricional = ref('');
const categories = ref([
	"Aceites y Salsas",
	"Bebidas",
	"Cereales",
	"Chocolate",
	"Condimentos",
	"Especias",
	"Frutas Disecadas",
	"Frutos Secos",
	"Frutos Secos con Chocolate",
	"Harinas",
	"Lacteos",
	"Legumbres",
	"Porotos",
	"Repostería",
	"Semillas",
	"Snacks",
	"Suplementos",
	"Verduras Deshidratadas",
	"Yuyos y Hierbas"
]);
const image = ref('');
const imagePreview = ref(null);
const uploading = ref(false);
const uploadError = ref(null);

watch(() => props.product, (newProduct) => {
	if (newProduct) {
		name.value = newProduct.name;
		price.value = newProduct.price;
		purchase_price.value = newProduct.purchase_price;
		description.value = newProduct.description;
		stock.value = newProduct.stock;
		unidad_venta.value = newProduct.unidad_venta;
		unidad.value = newProduct.unidad;
		category.value = newProduct.category || '';
		informacion_nutricional.value = newProduct.informacion_nutricional || '';
		image.value = newProduct.image || '';
		if (image.value) {
			imagePreview.value = `https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_224/v1740248697/${image.value}.webp`;
		}
	} else {
		resetForm();
	}
}, { immediate: true });

const handleFileUpload = async (event) => {
	const file = event.target.files[0];
	if (!file) return;

	uploading.value = true;
	uploadError.value = null;

	const formData = new FormData();
	formData.append('file', file);

	try {
		const response = await $fetch(`${apiBase}/upload/file`, {
			method: 'POST',
			body: formData
		});

		image.value = response.public_id;

		const reader = new FileReader();
		reader.onload = (e) => {
			imagePreview.value = e.target.result;
		};
		reader.readAsDataURL(file);

	} catch (error) {
		console.error('Error uploading file:', error);
		uploadError.value = 'Error al subir la imagen. Intente nuevamente.';
	} finally {
		uploading.value = false;
	}
};

const handleSubmit = async () => {
	const productData = {
		name: name.value,
		price: price.value,
		purchase_price: purchase_price.value,
		description: description.value,
		stock: stock.value,
		unidad_venta: unidad_venta.value,
		unidad: unidad.value,
		category: category.value,
		informacion_nutricional: informacion_nutricional.value,
		image: image.value,
	};

	try {
		if (props.product) {
			await $fetch(`${apiBase}/products/${props.product.id}`, {
				method: 'PUT',
				body: productData
			});
		} else {
			await $fetch(`${apiBase}/products`, {
				method: 'POST',
				body: productData
			});
		}
		emit('product-saved');
		resetForm();
		imagePreview.value = null;
	} catch (error) {
		console.error('Error saving product:', error);
	}
};

const resetForm = () => {
	name.value = '';
	price.value = '';
	purchase_price.value = '';
	description.value = '';
	stock.value = '';
	unidad_venta.value = '';
	unidad.value = '';
	category.value = '';
	informacion_nutricional.value = '';
	image.value = '';
	imagePreview.value = null;
};
</script>
