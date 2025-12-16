<template>
	<div class="flex flex-col bg-feta-100 rounded-[20px] shadow-lg h-fit p-7 lg:p-9 lg:m-3 max-w-2xl mx-auto my-8">
		<ClientOnly>
			<div class="flex justify-center m-3">
				<img class="flex justify-center w-16 lg:w-20" src="~/assets/user.svg">
			</div>
			<div class="pb-2 lg:pb-4">
				<div class="flex justify-center text-xl font-bold m-1">Contanos sobre vos</div>
				<form class="flex  flex-col justify-center" @submit.prevent="registerUser">
					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow w-80" type="text" v-model="name" placeholder="Nombre 🙋" required />
					</div>
					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow w-80" type="text" v-model="surname" placeholder="Apellido 💁" required />
					</div>
					<div class="flex justify-center m-3">
						<input class="p-2 px-4 rounded-full shadow w-80" type="mail" v-model="mail" placeholder="Correo Electrónico 📬" required />
					</div>
					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow w-80" type="number" v-model="phone" placeholder="Teléfono 📞" required />
					</div>

					<div class="flex justify-center flex-col my-1">
						<div id="map" class="flex mx-auto my-1 rounded-xl w-80 lg:w-[400px] h-60 lg:h-[300px] lg:mx-5"></div>

						<div class="flex justify-center w-full items-center my-1">
							<input type="text" v-model="address" placeholder="Dirección 🏠" class="flex w-[232px] lg:w-[312px] p-2 px-3 mx-1 rounded-full shadow" />
							<button type="button" @click="searchAddress"
								class="flex justify-center items-center w-20 h-9 px-2 mx-1 font-bold rounded-full shadow bg-gradient-to-b from-green-400 to-green-500 text-white">Buscar</button>
						</div>
						<div v-if="shippingCost" class="flex justify-center">
							<p>Costo de envío para tu región: ${{ shippingCost }}</p>
						</div>
					</div>

					<div class="flex m-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow w-80" type="password" v-model="password" placeholder="Contraseña 🔑" required />
					</div>
					<div class="flex mt-3 justify-center">
						<input class="p-2 px-4 rounded-full shadow w-80" type="password" v-model="password2" placeholder="Repita su Contraseña 🔁" required />
					</div>
					<div v-if="passwordMatchMessage" class="flex justify-center text-green-950 m-1">{{ passwordMatchMessage }}</div>
					<div class="flex m-5 justify-center">
						<button type="submit"
							class="flex justify-center w-80 p-2 m-2 lg:m-3 font-bold rounded-full shadow bg-gradient-to-b from-green-400 to-green-500 text-white">Registrate!</button>
					</div>
				</form>
				<div v-if="errorMessage" class="flex justify-center m-2 text-red-700 font-bold">
					<p>{{ errorMessage }}</p>
				</div>
				<div v-if="successMessage" class="flex justify-center m-2 text-green-700 font-bold">
					<p>{{ successMessage }}</p>
				</div>
			</div>
		</ClientOnly>
	</div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';

useHead({
	title: 'Registrate | Modo Fit',
	meta: [
		{
			name: 'description',
			content: 'Creá tu cuenta en Modo Fit y empezá a disfrutar de beneficios exclusivos. Comprá más fácil, seguí tus pedidos y obtené descuentos especiales.'
		},
		{
			property: 'og:title',
			content: 'Modo Fit - Registro de Usuario'
		},
		{
			property: 'og:description',
			content: 'Unite a Modo Fit y accedé a productos saludables con atención personalizada y promociones exclusivas.'
		},
		{
			property: 'og:image',
			content: 'https://modofit.shop/og-register.png'
		},
		{
			property: 'og:url',
			content: 'https://modofit.shop/register'
		},
		{
			name: 'keywords',
			content: 'registro, crear cuenta, modo fit, tienda saludable, productos naturales, beneficios, boedo'
		}
	]
})

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;
const router = useRouter();

const mail = ref('');
const name = ref('');
const phone = ref('');
const surname = ref('');
const address = ref('');
const password = ref('');
const password2 = ref('');
const shippingCost = ref('');
const errorMessage = ref('');
const addressObject = ref('');
const successMessage = ref('');
const passwordMatchMessage = ref('');
const map = ref(null);
const marker = ref(null);
const userIcon = ref({});

const registerUser = async (event) => {
	if (!addressObject.value) {
		await searchAddress();
		// Don't recursively call registerUser here, just return if address is still missing
		if (!addressObject.value) {
			passwordMatchMessage.value = 'Confirma tu direccion 🏚️';
			return;
		}
	}

	const button = event?.target?.querySelector('button[type="submit"]');

	if (button) {
		button.classList.add('button-blink');

		setTimeout(() => {
			button.classList.remove('button-blink');
		}, 500);
	}

	const user = {
		mail: mail.value,
		name: name.value,
		phone: phone.value,
		surname: surname.value,
		password: password.value,
		address: addressObject.value,
	};

	if (password.value !== password2.value) {
		passwordMatchMessage.value = 'las contraseñas deben coincidir';
		return;
	}

	try {
		await $fetch(`${apiBase}/users`, {
			method: 'POST',
			body: user
		});

		errorMessage.value = '';
		passwordMatchMessage.value = '';
		successMessage.value = 'Usuario registrado con éxito!';

		setTimeout(() => {
			successMessage.value = '';
			router.push('/login');
		}, 2000);
	}
	catch (error) {
		if (error.response) {
			if (error.response.status === 400) {
				if (Array.isArray(error.response._data.message)) {
					errorMessage.value = error.response._data.message.join(', ');
				} else {
					errorMessage.value = error.response._data;
				}
			} else {
				errorMessage.value = 'Error al registrar usuario. Intente más tarde.';
			}
		}
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

	map.value.on("click", (e) => {
		const { lat, lng } = e.latlng;
		// address.value = { lat, lng }; // This line in original code seems wrong if address is string bound to input. 
		// But original code had address as string in data() but assigned object here? 
		// Let's keep it consistent with searchAddress which expects string for input but sets addressObject.

		L.marker([lat, lng], { icon: userIcon.value })
			.addTo(map.value)
			.bindPopup(`Mis coordenadas son ${lat.toFixed(5)}, ${lng.toFixed(5)}!!`)
			.openPopup();

		// We probably want to reverse geocode here too if the user clicks on map, 
		// but original code didn't seem to do it on click, only on search.
		// Wait, original code: this.address = { lat, lng }; 
		// But input v-model="address". So input would show [object Object].
		// I'll stick to searchAddress logic which seems more robust in Login page.
	});
};

const searchAddress = async () => {
	try {
		const response = await $fetch("https://nominatim.openstreetmap.org/search", {
			params: {
				q: address.value,
				format: "json",
				addressdetails: 1,
				limit: 1,
			},
		}
		);

		if (response.length > 0) {
			const { lat, lon } = response[0];
			const L = (await import('leaflet')).default;

			map.value.setView([lat, lon], 15);

			if (marker.value)
				map.value.removeLayer(marker.value);

			marker.value = L.marker([lat, lon], { icon: userIcon.value })
				.addTo(map.value)
				.bindPopup(`Mi direccion es: ${address.value}!`)
				.openPopup();

			addressObject.value = response[0].address;

			shippingCost.value = await $fetch(`${apiBase}/sales/shipping`, {
				method: 'POST',
				body: addressObject.value
			});
		}
	} catch (error) {
		alert("Revisá que la dirección esté bien!");
	}
};

onMounted(async () => {
	await nextTick();
	setTimeout(() => {
		const mapContainer = document.getElementById('map');
		if (mapContainer) {
			mapRender();
		}
	}, 100);
});
</script>

<style>
@keyframes blink {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.5;
	}

	100% {
		opacity: 1;
	}
}

.button-blink {
	animation: blink 0.5s ease-in-out;
}
</style>
