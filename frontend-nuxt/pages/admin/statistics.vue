<template>
	<div class="container mx-auto px-4 py-8 relative min-h-screen">
		<h1 class="text-3xl font-bold mb-8 text-gray-800">Estadísticas de Ventas</h1>

		<!-- Loading Overlay -->
		<div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-75 z-50 flex flex-col items-center justify-center rounded-lg">
			<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
			<p class="text-xl font-semibold text-gray-700 animate-pulse">Cargando estadísticas...</p>
		</div>

		<!-- Filters -->
		<div class="bg-white p-6 rounded-lg shadow-md mb-8 transition-opacity duration-300" :class="{ 'opacity-50': isLoading }">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
					<input type="date" v-model="startDate" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
					<input type="date" v-model="endDate" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
					<input type="text" v-model="filters.category" placeholder="Ej: Suplementos"
						class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Producto</label>
					<input type="text" v-model="filters.productName" placeholder="Ej: Proteína"
						class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
					<div class="relative">
						<button @click="togglePaymentMethodDropdown"
							class="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm flex items-center justify-between">
							<span class="block truncate flex items-center gap-2">
								<svg v-if="filters.paymentMethod" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										:d="paymentMethodsList.find(m => m.value === filters.paymentMethod)?.icon" />
								</svg>
								<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
								{{ filters.paymentMethod || 'Todos' }}
							</span>
							<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon" />
										</svg>
										<span class="font-normal block truncate" :class="{ 'font-semibold': filters.paymentMethod === method.value }">
											{{ method.label }}
										</span>
									</div>

									<span v-if="filters.paymentMethod === method.value" class="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-4">
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
			</div>
			<div class="mt-4 flex justify-end">
				<button @click="fetchStatistics" :disabled="isLoading"
					class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
					<span v-if="isLoading" class="mr-2">
						<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</span>
					{{ isLoading ? 'Cargando...' : 'Filtrar' }}
				</button>
			</div>
		</div>

		<!-- Content Wrapper with opacity transition -->
		<div class="transition-opacity duration-300" :class="{ 'opacity-50 pointer-events-none': isLoading }">
			<!-- KPI Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
				<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 transform transition duration-300 hover:scale-105">
					<h2 class="text-sm font-semibold mb-2 text-gray-500 uppercase">Ingresos Totales</h2>
					<p class="text-3xl font-bold text-gray-800">{{ formatCurrency(statistics.totalRevenue) }}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 transform transition duration-300 hover:scale-105">
					<h2 class="text-sm font-semibold mb-2 text-gray-500 uppercase">Cantidad de Ventas</h2>
					<p class="text-3xl font-bold text-gray-800">{{ statistics.totalSalesCount }}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 transform transition duration-300 hover:scale-105">
					<h2 class="text-sm font-semibold mb-2 text-gray-500 uppercase">Peso Total Vendido</h2>
					<p class="text-3xl font-bold text-gray-800">{{ formatWeight(statistics.totalWeight) }}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 transform transition duration-300 hover:scale-105">
					<h2 class="text-sm font-semibold mb-2 text-gray-500 uppercase">Ganancia Total</h2>
					<p class="text-3xl font-bold text-gray-800">{{ formatCurrency(statistics.totalProfit) }}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 transform transition duration-300 hover:scale-105">
					<h2 class="text-sm font-semibold mb-2 text-gray-500 uppercase">Ganancia Neta</h2>
					<p class="text-3xl font-bold text-gray-800">{{ formatCurrency(statistics.netProfit) }}</p>
				</div>
			</div>

			<ClientOnly>
				<!-- Historic Charts Row -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Tendencia de Ventas por Categoría</h2>
						<div class="h-80">
							<LineChart v-if="historicCategorySalesChartData" :data="historicCategorySalesChartData" :options="chartOptions" />
						</div>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Ventas por Fecha (Total)</h2>
						<div class="h-80">
							<Bar v-if="salesByDateChartData" :data="salesByDateChartData" :options="chartOptions" />
						</div>
					</div>
				</div>

				<!-- Breakdown Row -->
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Por Categoría</h2>
						<div class="h-64 flex justify-center">
							<Doughnut v-if="salesByCategoryChartData" :data="salesByCategoryChartData" :options="doughnutOptions" />
						</div>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Productos Más Vendidos</h2>
						<div class="h-64">
							<Bar v-if="topSellingProductsChartData" :data="topSellingProductsChartData" :options="horizontalBarOptions" />
						</div>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Mayor Peso Vendido</h2>
						<div class="h-64">
							<Bar v-if="topProductsByWeightChartData" :data="topProductsByWeightChartData" :options="horizontalBarOptions" />
						</div>
					</div>
				</div>

				<!-- Payment Methods & Users Row -->
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Métodos de Pago</h2>
						<div class="h-64 flex justify-center">
							<Doughnut v-if="salesByPaymentMethodChartData" :data="salesByPaymentMethodChartData" :options="doughnutOptions" />
						</div>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Ventas por Cliente</h2>
						<div class="h-64 flex justify-center">
							<Doughnut v-if="salesByUserChartData" :data="salesByUserChartData" :options="doughnutOptions" />
						</div>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Ventas por Ubicación</h2>
						<div class="h-64">
							<Bar v-if="salesByLocationChartData" :data="salesByLocationChartData" :options="horizontalBarOptions" />
						</div>
					</div>
				</div>

				<!-- Neighborhood Row -->
				<div class="grid grid-cols-1 gap-8 mb-8">
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Ventas por Barrio</h2>
						<div class="h-64">
							<Bar v-if="salesByNeighborhoodChartData" :data="salesByNeighborhoodChartData" :options="horizontalBarOptions" />
						</div>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Rendimiento por Barrio (Burbujas)</h2>
						<div class="h-64">
							<Bubble v-if="salesByNeighborhoodBubbleChartData" :data="salesByNeighborhoodBubbleChartData" :options="chartOptions" />
						</div>
					</div>
				</div>

				<!-- Geographical Map Row -->
				<div class="mb-8">
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h2 class="text-xl font-semibold mb-4 text-gray-700">Mapa de Ventas (Geográfico)</h2>
						<div id="map" class="h-96 w-full rounded-lg z-0"></div>
					</div>
				</div>

				<!-- Sales Forecast Row -->
				<div class="mb-8" v-if="statistics.forecast">
					<h2 class="text-2xl font-bold mb-4 text-gray-800">Proyección de Ventas ({{ statistics.forecast.nextMonth }})</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Total Revenue Forecast Graph -->
						<div class="bg-white p-6 rounded-lg shadow-md">
							<h3 class="text-lg font-semibold text-gray-600 mb-2">Proyección de Ingresos</h3>
							<div class="h-64">
								<LineChart v-if="forecastChartData" :data="forecastChartData" :options="chartOptions" />
							</div>
							<p class="text-sm text-gray-500 mt-2 text-center">
								Estimado: <span class="font-bold text-indigo-600">{{ formatCurrency(statistics.forecast.forecastTotalRevenue) }}</span>
							</p>
						</div>

						<!-- Category Growth Forecast -->
						<div class="bg-white p-6 rounded-lg shadow-md">
							<h3 class="text-lg font-semibold text-gray-600 mb-4">Tendencia por Categoría</h3>
							<div class="overflow-x-auto">
								<table class="min-w-full divide-y divide-gray-200">
									<thead>
										<tr>
											<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
											<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyección</th>
											<th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crecimiento</th>
										</tr>
									</thead>
									<tbody class="bg-white divide-y divide-gray-200">
										<tr v-for="(cat, index) in statistics.forecast.forecastByCategory" :key="index">
											<td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{{ cat.category }}</td>
											<td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(cat.forecast) }}</td>
											<td class="px-4 py-2 whitespace-nowrap text-sm font-bold" :class="cat.growth >= 0 ? 'text-green-600' : 'text-red-600'">
												{{ cat.growth > 0 ? '+' : '' }}{{ cat.growth.toFixed(1) }}%
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</ClientOnly>

			<!-- Stock Semaphore Row -->
			<div class="mb-8">
				<h2 class="text-2xl font-bold mb-4 text-gray-800">Semáforo de Stock</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<!-- Red Card -->
					<div class="bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-500">
						<h3 class="text-lg font-semibold text-red-700 mb-2">Crítico (≤ 5)</h3>
						<p class="text-4xl font-bold text-red-800">{{ statistics.stockSemaphore.red }}</p>
						<p class="text-sm text-red-600 mt-1">Productos</p>
					</div>
					<!-- Yellow Card -->
					<div class="bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
						<h3 class="text-lg font-semibold text-yellow-700 mb-2">Alerta (6 - 20)</h3>
						<p class="text-4xl font-bold text-yellow-800">{{ statistics.stockSemaphore.yellow }}</p>
						<p class="text-sm text-yellow-600 mt-1">Productos</p>
					</div>
					<!-- Green Card -->
					<div class="bg-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-500">
						<h3 class="text-lg font-semibold text-green-700 mb-2">Normal (> 20)</h3>
						<p class="text-4xl font-bold text-green-800">{{ statistics.stockSemaphore.green }}</p>
						<p class="text-sm text-green-600 mt-1">Productos</p>
					</div>
				</div>

				<!-- Critical Products Table -->
				<div v-if="statistics.stockSemaphore.criticalProducts.length > 0" class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="text-xl font-semibold mb-4 text-red-600">Productos Críticos</h3>
					<div class="overflow-x-auto">
						<table class="min-w-full table-auto">
							<thead>
								<tr class="bg-red-50 text-red-700 uppercase text-sm leading-normal">
									<th class="py-3 px-6 text-left">Producto</th>
									<th class="py-3 px-6 text-right">Stock Actual</th>
								</tr>
							</thead>
							<tbody class="text-gray-600 text-sm font-light">
								<tr v-for="(product, index) in statistics.stockSemaphore.criticalProducts" :key="index"
									class="border-b border-gray-200 hover:bg-red-50">
									<td class="py-3 px-6 text-left font-medium">{{ product.name }}</td>
									<td class="py-3 px-6 text-right font-bold text-red-600">{{ product.stock }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</div>

		<!-- Inactive Customers Table -->
		<div v-if="statistics.inactiveCustomers.length >= 0" class="mb-8">
			<div class="bg-white p-6 rounded-lg shadow-md">
				<h2 class="text-xl font-semibold mb-4 text-gray-700">Clientes Inactivos (> 60 días)</h2>
				<div class="overflow-x-auto">
					<table class="min-w-full table-auto">
						<thead>
							<tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
								<th class="py-3 px-6 text-left">Cliente</th>
								<th class="py-3 px-6 text-left">Email</th>
								<th class="py-3 px-6 text-left">Teléfono</th>
								<th class="py-3 px-6 text-right">Última Compra</th>
							</tr>
						</thead>
						<tbody class="text-gray-600 text-sm font-light">
							<tr v-for="(customer, index) in statistics.inactiveCustomers" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
								<td class="py-3 px-6 text-left font-medium">{{ customer.name }}</td>
								<td class="py-3 px-6 text-left">{{ customer.mail }}</td>
								<td class="py-3 px-6 text-left">{{ customer.phone }}</td>
								<td class="py-3 px-6 text-right">{{ new Date(customer.lastPurchaseDate).toLocaleDateString() }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- Top Users Row -->
		<div class="grid grid-cols-1 gap-8 mb-8">
			<div class="bg-white p-6 rounded-lg shadow-md">
				<h2 class="text-xl font-semibold mb-4 text-gray-700">Mejores Clientes</h2>
				<div class="overflow-x-auto">
					<table class="min-w-full table-auto">
						<thead>
							<tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
								<th class="py-3 px-6 text-left">Cliente</th>
								<th class="py-3 px-6 text-center">Compras</th>
								<th class="py-3 px-6 text-right">Total Gastado</th>
							</tr>
						</thead>
						<tbody class="text-gray-600 text-sm font-light">
							<tr v-for="(user, index) in statistics.salesByUser" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
								<td class="py-3 px-6 text-left whitespace-nowrap font-medium">{{ user.userName }}</td>
								<td class="py-3 px-6 text-center">{{ user.count }}</td>
								<td class="py-3 px-6 text-right">{{ formatCurrency(user.total) }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	ArcElement,
	PointElement,
	LineElement
} from 'chart.js';
import { Bar, Doughnut, Line as LineChart, Bubble } from 'vue-chartjs';
import 'leaflet/dist/leaflet.css';

definePageMeta({
	middleware: ['auth']
});

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const startDate = ref('');
const endDate = ref('');
const filters = ref({
	category: '',
	productName: '',
	paymentMethod: ''
});
const isLoading = ref(false);
const isPaymentMethodDropdownOpen = ref(false);
const paymentMethodsList = [
	{ label: 'Todos', value: '', icon: 'M4 6h16M4 12h16M4 18h16' }, // List
	{ label: 'Efectivo', value: 'Efectivo', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }, // Cash/Coin
	{ label: 'Transferencia', value: 'Transferencia', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' }, // Arrows
	{ label: 'QR', value: 'QR', icon: 'M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 6h2v2H6V6zm0 8h2v2H6v-2zm8-8h2v2h-2V6zm-8 4h2v2H6v-2zm4-4h2v2h-2V6zm0 4h2v2h-2v-2zm0 8h2v2h-2v-2zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z' }, // QR-ish
	{ label: 'Débito', value: 'Débito', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }, // Card
	{ label: 'Crédito', value: 'Crédito', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }, // Card
	{ label: 'Mercado Pago', value: 'Mercado Pago', icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11' }, // Handshake/Payment
	{ label: 'Mercado Libre', value: 'Mercado Libre', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' } // Shopping Bag
];
const statistics = ref({
	totalRevenue: 0,
	totalProfit: 0,
	netProfit: 0,
	totalSalesCount: 0,
	totalWeight: 0,
	salesByPaymentMethod: [],
	salesByDate: [],
	topSellingProducts: [],
	topProductsByWeight: [],
	salesByCategory: [],
	salesByUser: [],
	historicCategorySales: [],
	salesByLocation: [],
	salesByNeighborhood: [],
	stockSemaphore: {
		red: 0,
		yellow: 0,
		green: 0,
		criticalProducts: []
	},
	inactiveCustomers: []
});
const chartOptions = {
	responsive: true,
	maintainAspectRatio: false
};
const horizontalBarOptions = {
	responsive: true,
	maintainAspectRatio: false,
	indexAxis: 'y'
};
const doughnutOptions = {
	responsive: true,
	maintainAspectRatio: false
};
const map = ref(null);

const salesByDateChartData = computed(() => {
	if (!statistics.value.salesByDate.length) return null;

	return {
		labels: statistics.value.salesByDate.map(item => {
			const date = new Date(item.date);
			return date.toLocaleDateString();
		}),
		datasets: [
			{
				label: 'Ingresos',
				backgroundColor: '#3b82f6',
				data: statistics.value.salesByDate.map(item => item.total)
			}
		]
	};
});

const salesByPaymentMethodChartData = computed(() => {
	if (!statistics.value.salesByPaymentMethod.length) return null;

	return {
		labels: statistics.value.salesByPaymentMethod.map(item => item.method),
		datasets: [
			{
				backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6366f1'],
				data: statistics.value.salesByPaymentMethod.map(item => item.count)
			}
		]
	};
});

const salesByCategoryChartData = computed(() => {
	if (!statistics.value.salesByCategory.length) return null;

	return {
		labels: statistics.value.salesByCategory.map(item => item.category),
		datasets: [
			{
				backgroundColor: ['#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b'],
				data: statistics.value.salesByCategory.map(item => item.total)
			}
		]
	};
});

const topSellingProductsChartData = computed(() => {
	if (!statistics.value.topSellingProducts.length) return null;

	return {
		labels: statistics.value.topSellingProducts.map(item => item.name),
		datasets: [
			{
				label: 'Cantidad Vendida',
				backgroundColor: '#6366f1',
				data: statistics.value.topSellingProducts.map(item => item.quantity)
			}
		]
	};
});

const topProductsByWeightChartData = computed(() => {
	if (!statistics.value.topProductsByWeight.length) return null;

	return {
		labels: statistics.value.topProductsByWeight.map(item => item.name),
		datasets: [
			{
				label: 'Peso Vendido (g)',
				backgroundColor: '#8b5cf6',
				data: statistics.value.topProductsByWeight.map(item => item.weight)
			}
		]
	};
});

const historicCategorySalesChartData = computed(() => {
	if (!statistics.value.historicCategorySales.length) return null;

	const dates = [...new Set(statistics.value.historicCategorySales.map(item => item.date))];
	const categories = [...new Set(statistics.value.historicCategorySales.map(item => item.category))];

	const colors = ['#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b', '#3b82f6', '#ef4444'];

	const datasets = categories.map((category, index) => {
		return {
			label: category,
			borderColor: colors[index % colors.length],
			backgroundColor: colors[index % colors.length],
			fill: false,
			tension: 0.1,
			data: dates.map(date => {
				const record = statistics.value.historicCategorySales.find(item => item.date === date && item.category === category);
				return record ? record.total : 0;
			})
		};
	});

	return {
		labels: dates.map(date => new Date(date).toLocaleDateString()),
		datasets
	};
});

const salesByLocationChartData = computed(() => {
	if (!statistics.value.salesByLocation.length) return null;

	return {
		labels: statistics.value.salesByLocation.map(item => item.location),
		datasets: [
			{
				label: 'Ventas por Ubicación',
				backgroundColor: '#10b981',
				data: statistics.value.salesByLocation.map(item => item.total)
			}
		]
	};
});

const salesByNeighborhoodChartData = computed(() => {
	if (!statistics.value.salesByNeighborhood.length) return null;

	return {
		labels: statistics.value.salesByNeighborhood.map(item => item.neighborhood),
		datasets: [
			{
				label: 'Ventas por Barrio',
				backgroundColor: '#f59e0b',
				data: statistics.value.salesByNeighborhood.map(item => item.total)
			}
		]
	};
});

const salesByUserChartData = computed(() => {
	if (!statistics.value.salesByUser.length) return null;

	return {
		labels: statistics.value.salesByUser.map(item => item.userName),
		datasets: [
			{
				backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'],
				data: statistics.value.salesByUser.map(item => item.total)
			}
		]
	};
});

const salesByNeighborhoodBubbleChartData = computed(() => {
	if (!statistics.value.salesByNeighborhood.length) return null;

	return {
		datasets: statistics.value.salesByNeighborhood.map((item, index) => {
			const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'];
			return {
				label: item.neighborhood,
				backgroundColor: colors[index % colors.length],
				data: [
					{
						x: item.count,
						y: item.total,
						r: Math.sqrt(item.total) / 10 // Scale radius
					}
				]
			};
		})
	};
});

const forecastChartData = computed(() => {
	if (!statistics.value.forecast || !statistics.value.forecast.graphData) return null;

	return {
		labels: statistics.value.forecast.graphData.labels,
		datasets: [
			{
				label: 'Histórico',
				borderColor: '#3b82f6',
				backgroundColor: '#3b82f6',
				data: statistics.value.forecast.graphData.historical,
				fill: false,
				tension: 0.1
			},
			{
				label: 'Proyección',
				borderColor: '#f59e0b',
				backgroundColor: '#f59e0b',
				data: statistics.value.forecast.graphData.forecast,
				borderDash: [5, 5],
				fill: false,
				tension: 0.1
			}
		]
	};
});

const setDefaultDates = () => {
	const now = new Date();
	const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
	const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

	startDate.value = firstDay.toISOString().split('T')[0];
	endDate.value = lastDay.toISOString().split('T')[0];
};

const togglePaymentMethodDropdown = () => {
	isPaymentMethodDropdownOpen.value = !isPaymentMethodDropdownOpen.value;
};

const selectPaymentMethod = (method) => {
	filters.value.paymentMethod = method;
	isPaymentMethodDropdownOpen.value = false;
};

const fetchStatistics = async () => {
	isLoading.value = true;
	try {
		const token = localStorage.getItem('token');
		const params = {
			startDate: startDate.value,
			endDate: endDate.value,
			...filters.value
		};

		// Remove empty filters
		Object.keys(params).forEach(key => {
			if (params[key] === '' || params[key] === null) {
				delete params[key];
			}
		});

		const response = await $fetch(`${apiBase}/sales/statistics`, {
			params,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		statistics.value = response;

		// Render map after data is loaded
		await nextTick();
		renderMap();
	} catch (error) {
		console.error('Error fetching statistics:', error);
		alert('Error al cargar las estadísticas');
	} finally {
		isLoading.value = false;
	}
};

const formatCurrency = (value) => {
	return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
};

const formatWeight = (grams) => {
	if (grams >= 1000) {
		return (grams / 1000).toFixed(2) + ' kg';
	}
	return grams.toFixed(0) + ' g';
};

const renderMap = async () => {
	if (typeof window === 'undefined') return;
	const L = (await import('leaflet')).default;

	// Initialize map if not already initialized
	if (map.value) {
		map.value.remove();
	}

	const mapContainer = document.getElementById('map');
	if (!mapContainer) return;

	// Default center (Buenos Aires)
	map.value = L.map('map').setView([-34.6037, -58.3816], 12);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map.value);

	// Geocode and plot neighborhoods
	for (const item of statistics.value.salesByNeighborhood) {
		if (!item.neighborhood || item.neighborhood === 'Desconocido') continue;

		try {
			// Add delay to respect API rate limits
			await new Promise(resolve => setTimeout(resolve, 1000));

			const query = `${item.neighborhood}, Buenos Aires, Argentina`;
			const response = await $fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);

			if (response && response.length > 0) {
				const { lat, lon } = response[0];

				// Scale radius based on total revenue (adjust divisor as needed)
				const radius = Math.sqrt(item.total) * 2;

				L.circle([lat, lon], {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: radius
				}).addTo(map.value)
					.bindPopup(`
					<b>${item.neighborhood}</b><br>
					Ventas: ${item.count}<br>
					Total: ${formatCurrency(item.total)}
				`);
			}
		} catch (error) {
			console.error(`Error geocoding ${item.neighborhood}:`, error);
		}
	}
};

onMounted(() => {
	setDefaultDates();
	fetchStatistics();
});
</script>
