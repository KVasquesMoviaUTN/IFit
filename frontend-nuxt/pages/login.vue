<template>
	<div class="py-2 lg:py-4 w-fit mx-auto">
		<ClientOnly>
			<div v-if="user" class="flex flex-col w-fit lg:w-fit bg-white border border-gray-100 rounded-[20px] shadow-lg h-fit p-5">
				<div class="flex justify-center m-1 mt-2 lg:m-3">
					<img class="flex justify-center w-14 lg:w-20" src="~/assets/user.svg">
				</div>
				<div class="flex w-full flex-col justify-center">
					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow-sm border border-gray-200 w-80 lg:w-[400px] focus:outline-none focus:ring-1 focus:ring-primary"
							type="text" v-model="formData.name" placeholder="Nombre 🙋" />
					</div>
					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow-sm border border-gray-200 w-80 lg:w-[400px] focus:outline-none focus:ring-1 focus:ring-primary"
							type="text" v-model="formData.surname" placeholder="Apellido 💁" />
					</div>
					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow-sm border border-gray-200 w-80 lg:w-[400px] focus:outline-none focus:ring-1 focus:ring-primary"
							type="number" v-model="formData.phone" placeholder="Telefono 📞" />
					</div>

					<div class="flex justify-center flex-col my-1">
						<div id="map" class="flex mx-auto my-1 rounded-xl w-80 lg:w-[400px] h-60 lg:h-[300px] lg:mx-5"></div>

						<div class="flex justify-center w-full items-center my-1 relative">
							<input type="text" v-model="address" @input="searchAddress" placeholder="Escribe una dirección"
								class="flex w-[232px] lg:w-[312px] p-2 px-3 mx-1 rounded-full shadow" />

							<!-- Suggestions Dropdown -->
							<div v-if="showSuggestions && addressSuggestions.length > 0"
								class="absolute top-full left-0 right-0 mx-auto w-[232px] lg:w-[312px] bg-white border border-gray-200 rounded-lg shadow-xl z-[1000] max-h-60 overflow-y-auto mt-1">
								<ul>
									<li v-for="(suggestion, index) in addressSuggestions" :key="index" @click="selectAddress(suggestion)"
										class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-0">
										{{ suggestion.display_name }}
									</li>
								</ul>
							</div>
						</div>

						<div v-if="shippingCost" class="flex justify-center">
							<p>Costo de envío para tu región: ${{ shippingCost }}</p>
						</div>
					</div>


					<div v-if="editMessage" class="flex justify-center text-green-950 w-80 m-1">{{ editMessage }}</div>
					<div class="flex m-2 justify-center">
						<button class="flex justify-center w-80 p-2 font-bold rounded-full shadow-md bg-primary hover:bg-primary/90 text-white transition-colors">
							<div class="flex" @click="editUser()">Editar Datos ✏️</div>
						</button>
					</div>
				</div>

				<div class="flex justify-center items-center w-full">
					<button
						class="flex justify-center w-80 p-2 mx-7 m-5 font-bold rounded-full shadow-md bg-primary hover:bg-primary/90 text-white transition-colors"
						@click="close">
						<div class="flex">Cerrar sesión 👋</div>
					</button>
				</div>
			</div>
			<div v-else class="flex flex-col bg-white border border-gray-100 rounded-[20px] shadow-lg h-fit p-5">
				<div class="flex justify-center mb-3 lg:mb-5">
					<img class="flex justify-center w-16 lg:w-20" src="~/assets/user.svg">
				</div>
				<div class="border-b border-gray-500 pb-2 lg:pb-4">
					<div class="flex m-2 justify-center">
						<button @click="loginWithGoogle"
							class="flex justify-center items-center w-80 p-2 m-2 lg:m-3 font-bold rounded-full shadow bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors">
							<img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6 mr-2" alt="Google logo">
							Iniciar con Google
						</button>
					</div>

					<div class="flex justify-center items-center my-4">
						<div class="border-t border-gray-300 w-full mx-4"></div>
						<span class="text-gray-500 text-sm">O</span>
						<div class="border-t border-gray-300 w-full mx-4"></div>
					</div>

					<div v-if="!showManualLogin" class="flex justify-center m-2">
						<button @click="showManualLogin = true" class="text-primary hover:underline font-medium">
							Iniciar sesión con contraseña
						</button>
					</div>

					<form v-if="showManualLogin" class="flex flex-col justify-center transition-all duration-300" @submit.prevent="loginUser">
						<div class="flex justify-center m-2">
							<input class="p-2 px-4 rounded-full shadow-sm border border-gray-200 w-72 focus:outline-none focus:ring-1 focus:ring-primary"
								type="mail" id="mail" v-model="mail" placeholder="Ingresa tu correo electrónico 📬" required />
						</div>

						<div class="flex m-2 justify-center">
							<input class="p-2 px-4 rounded-full shadow-sm border border-gray-200 w-72 focus:outline-none focus:ring-1 focus:ring-primary"
								type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña 🔑" required />
						</div>
						<div class="flex m-2 justify-center">
							<button
								class="flex justify-center w-80 p-2 m-2 lg:m-3 font-bold rounded-full shadow bg-primary hover:bg-primary/90 text-white transition-colors">Iniciar
								Sesion 🚪</button>
						</div>
					</form>
					<div v-if="errorMessage" class="flex justify-center m-2 text-red-700 font-bold">
						<p>{{ errorMessage }}</p>
					</div>
					<div v-if="successMessage" class="flex justify-center m-2 text-green-700 font-bold">
						<p>{{ successMessage }}</p>
					</div>

					<div class="flex justify-center m-2">
						<NuxtLink to="/register" class="text-primary hover:underline font-medium text-sm">
							¿No tenés cuenta? Registrate acá
						</NuxtLink>
					</div>
				</div>

			</div>
		</ClientOnly>
	</div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import 'leaflet/dist/leaflet.css';

useHead({
	title: 'Mi Cuenta | Modo Fit',
	meta: [
		{
			name: 'description',
			content: 'Accedé a tu cuenta de Modo Fit: revisá tus pedidos, actualizá tus datos y gestioná tus direcciones. Todo en un solo lugar.'
		},
		{
			property: 'og:title',
			content: 'Modo Fit - Perfil de Usuario'
		},
		{
			property: 'og:description',
			content: 'Gestioná tu experiencia en Modo Fit: pedidos, datos personales y mucho más. Atención personalizada y productos saludables.'
		},
		{
			property: 'og:image',
			content: 'https://modofit.shop/og-user.png'
		},
		{
			property: 'og:url',
			content: 'https://modofit.shop/user'
		},
		{
			name: 'keywords',
			content: 'mi cuenta, perfil, modo fit, usuario, pedidos, dirección, tienda saludable, productos naturales'
		}
	]
})

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;
const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => authStore.user);

const formData = ref({
	name: '',
	phone: '',
	address: '',
	surname: '',
	password: '',
});

const mail = ref('');
const password = ref('');
const map = ref(null);
const address = ref('');
const marker = ref(null);
const userIcon = ref({});
const editMessage = ref('');
const shippingCost = ref('');
const errorMessage = ref('');
const addressObject = ref('');
const successMessage = ref('');
const showManualLogin = ref(false);
const addressSuggestions = ref([]);
const showSuggestions = ref(false);
const debounceTimeout = ref(null);

// Initialize user data
watch(user, (newUser) => {
	if (newUser) {
		formData.value.name = newUser.name || '';
		formData.value.phone = newUser.phone || '';
		formData.value.surname = newUser.surname || '';
		formData.value.password = newUser.password || '';

		if (newUser.address) {
			address.value = `${newUser.address.road ?? ''} ${newUser.address.house_number ?? ''}, ${newUser.address.state_district ?? ''}`.trim();
		}
	}
}, { immediate: true });

const close = () => {
	authStore.logout();
	window.location.reload();
};

const loginUser = async () => {
	const success = await authStore.login(mail.value, password.value);

	if (success) {
		errorMessage.value = '';
		successMessage.value = 'Inicio de sesión exitoso!';

		AnalyticsService.track('LOGIN', {
			userId: user.value.id,
			method: 'email'
		});

		setTimeout(() => {
			successMessage.value = '';
			router.push('/');
		}, 2000);
	} else {
		errorMessage.value = 'Credenciales incorrectas o error en el servidor.';
	}
};

const editUser = async () => {
	if (!addressObject.value) {
		await searchAddress();
	}

	formData.value.address = addressObject.value;

	const filteredData = Object.fromEntries(
		Object.entries(formData.value).filter(([, value]) => value !== null && value !== '')
	);

	try {
		const response = await $fetch(`${apiBase}/users/${user.value.id}`, {
			method: 'PUT',
			body: filteredData
		});

		editMessage.value = 'Información actualizada! 😉'

		authStore.setUser(response);

		// Refresh page or update state logic
		// window.location.reload();
	} catch (error) {
		console.error('Error updating user:', error);
	}
};

const mapRender = async () => {
	if (typeof window === 'undefined') return;

	const L = (await import('leaflet')).default;

	map.value = L.map("map").setView([-34.61433, -58.44644], 12);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 20,
		attribution:
			'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
	}).addTo(map.value);

	userIcon.value = L.icon({
		iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
		iconSize: [18, 30],
		iconAnchor: [9, 30],
		popupAnchor: [0, -28],
	});

	L.marker([-34.63698, -58.41779], { icon: userIcon.value })
		.addTo(map.value)
		.bindPopup("Modo Fit", { maxWidth: 30, minWidth: 10 })
		.openPopup();

	map.value.on("click", async (e) => {
		const { lat, lng } = e.latlng;

		if (marker.value) {
			map.value.removeLayer(marker.value);
		}

		marker.value = L.marker([lat, lng], { icon: userIcon.value })
			.addTo(map.value)
			.bindPopup("Buscando dirección...")
			.openPopup();

		try {
			const response = await $fetch('https://nominatim.openstreetmap.org/reverse', {
				params: {
					lat,
					lon: lng,
					format: 'json',
					addressdetails: 1
				}
			});

			if (response && response.address) {
				const addr = response.address;
				const formattedAddress = `${addr.road || ''} ${addr.house_number || ''}, ${addr.city || addr.town || addr.village || ''}`.trim();

				address.value = formattedAddress;
				addressObject.value = response.address;

				marker.value.setPopupContent(`Dirección: ${formattedAddress}`);
				await getShippingCost();
			}
		} catch (error) {
			console.error('Error reverse geocoding:', error);
			marker.value.setPopupContent("Error al obtener la dirección");
		}
	});
};

const searchAddress = async () => {
	if (typeof address.value === 'object' && address.value !== null) {
		return;
	}

	if (typeof address.value === 'string' && address.value.trim() !== '') {
		const query = address.value.trim();

		if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

		debounceTimeout.value = setTimeout(async () => {
			try {
				const response = await $fetch('https://nominatim.openstreetmap.org/search', {
					params: {
						q: query,
						format: 'json',
						addressdetails: 1,
						limit: 5,
						countrycodes: 'ar'
					},
				});

				addressSuggestions.value = response;
				showSuggestions.value = true;
			} catch (error) {
				console.error('Error fetching address suggestions:', error);
			}
		}, 500);
	}
};

const selectAddress = async (suggestion) => {
	const { lat, lon, address: addrObj, display_name } = suggestion;

	address.value = display_name;
	addressObject.value = addrObj;
	showSuggestions.value = false;
	addressSuggestions.value = [];

	const L = (await import('leaflet')).default;

	map.value.setView([lat, lon], 16);

	if (marker.value) {
		map.value.removeLayer(marker.value);
	}

	marker.value = L.marker([lat, lon], { icon: userIcon.value })
		.addTo(map.value)
		.bindPopup(`Dirección seleccionada: ${display_name}`)
		.openPopup();

	getShippingCost();
};

const getShippingCost = async () => {
	if (!addressObject.value) return;
	try {
		const response = await $fetch(`${apiBase}/sales/shipping`, {
			method: 'POST',
			body: addressObject.value
		});
		shippingCost.value = response;
	} catch (error) {
		// console.error('Error al obtener el costo de envío:', error);
	}
};

const loginWithGoogle = () => {
	window.location.href = `${apiBase}/auth/google`;
};

onMounted(async () => {
	authStore.initializeAuth();

	// Wait for DOM
	await nextTick();
	setTimeout(() => {
		const mapContainer = document.getElementById('map');
		if (mapContainer) {
			mapRender();
		}
	}, 100);
});
</script>
