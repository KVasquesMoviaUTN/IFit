<template>
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<div class="flex flex-col items-center mb-10">
			<h2 class="text-3xl md:text-4xl font-bold text-primary mb-2">Administrar Catálogo</h2>
			<div class="h-1 w-24 bg-secondary rounded-full"></div>
		</div>

		<ProductForm :product="productToEdit" @product-saved="fetchProducts" />

		<div v-if="loading" class="flex justify-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
		</div>

		<div v-else>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				<div v-for="product in products" :key="product.id"
					class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
					<div class="p-6 flex-grow">
						<div class="flex justify-between items-start mb-4">
							<span class="text-lg font-bold text-primary">
								${{ product.price }}
							</span>
						</div>

						<h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-1" :title="product.name">{{ product.name }}</h3>
						<p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ product.description }}</p>

						<div class="flex items-center text-sm text-gray-500 mb-4">
							<span class="mr-4 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
								Stock: {{ product.stock }}
							</span>
						</div>
					</div>

					<div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
						<button @click="editProduct(product)" class="text-primary hover:text-secondary font-medium text-sm flex items-center transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
							Editar
						</button>
						<button @click="deleteProduct(product.id)"
							class="text-red-500 hover:text-red-700 font-medium text-sm flex items-center transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							Eliminar
						</button>
					</div>
				</div>
			</div>

			<!-- Pagination -->
			<div class="flex justify-center items-center mt-10 space-x-4">
				<button @click="prevPage" :disabled="page === 1"
					class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd" />
					</svg>
					Anterior
				</button>

				<span class="text-gray-600 font-medium">
					Página {{ page }} de {{ totalPages }}
				</span>

				<button @click="nextPage" :disabled="!hasNextPage"
					class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center">
					Siguiente
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import ProductForm from '~/components/ProductForm.vue';

useHead({
	title: 'Catálogo de Productos | Modo Fit',
	meta: [
		{
			name: 'description',
			content: 'Explora nuestra amplia variedad de proteínas, vitaminas y suplementos deportivos. Encuentra lo que necesitas para tu entrenamiento.',
		},
		{
			property: 'og:title',
			content: 'Catálogo de Productos | Modo Fit',
		},
		{
			property: 'og:description',
			content: 'Explora nuestra amplia variedad de proteínas, vitaminas y suplementos deportivos.',
		},
	],
});

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const products = ref([]);
const productToEdit = ref(null);
const page = ref(1);
const pageSize = ref(9);
const totalPages = ref(1);
const hasNextPage = ref(false);
const loading = ref(false);

const fetchProducts = async () => {
	loading.value = true;
	try {
		const response = await $fetch(`${apiBase}/products`, {
			params: {
				page: page.value,
				pageSize: pageSize.value
			}
		});

		if (response.products) {
			products.value = response.products;
			totalPages.value = response.totalPages || 1;
			hasNextPage.value = response.hasNextPage || false;
		} else {
			products.value = response;
			totalPages.value = 1;
			hasNextPage.value = false;
		}
	} catch (error) {
		console.error("Error fetching products:", error);
	} finally {
		loading.value = false;
	}
};

const editProduct = (product) => {
	productToEdit.value = { ...product };
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteProduct = async (id) => {
	if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
		try {
			await $fetch(`${apiBase}/products/${id}`, {
				method: 'DELETE'
			});
			fetchProducts();
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	}
};

const nextPage = () => {
	if (hasNextPage.value) {
		page.value++;
		fetchProducts();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
};

const prevPage = () => {
	if (page.value > 1) {
		page.value--;
		fetchProducts();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
};

onMounted(() => {
	fetchProducts();
});
</script>
