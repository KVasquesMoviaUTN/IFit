<template>
	<div class="bg-white p-6 rounded-lg shadow-md">
		<h2 class="text-xl font-bold mb-4 text-secondary">
			Turnos de {{ employee.name }} {{ employee.surname }}
		</h2>

		<!-- Add Shift Form -->
		<div class="mb-6 p-4 border rounded bg-gray-50">
			<h3 class="font-bold mb-2 text-sm uppercase text-gray-600">Asignar Nuevo Turno</h3>
			<form @submit.prevent="addShift" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
				<div>
					<label class="block text-xs font-bold mb-1">Inicio</label>
					<input v-model="newShift.startTime" type="datetime-local" class="w-full border p-2 rounded" required />
				</div>
				<div>
					<label class="block text-xs font-bold mb-1">Fin</label>
					<input v-model="newShift.endTime" type="datetime-local" class="w-full border p-2 rounded" required />
				</div>
				<button type="submit" class="bg-secondary text-white p-2 rounded hover:bg-opacity-90 transition h-10">
					Asignar Turno
				</button>
			</form>
		</div>

		<!-- Shifts List -->
		<div class="space-y-3">
			<div v-if="shifts.length === 0" class="text-center text-gray-500 py-4">
				No hay turnos asignados.
			</div>
			<div v-for="shift in shifts" :key="shift.id" class="flex justify-between items-center p-3 border-l-4 border-primary bg-white shadow-sm rounded">
				<div>
					<p class="font-bold text-gray-800">
						{{ formatDate(shift.startTime) }}
					</p>
					<p class="text-sm text-gray-600">
						{{ formatTime(shift.startTime) }} - {{ formatTime(shift.endTime) }}
					</p>
				</div>
				<button @click="deleteShift(shift.id)" class="text-red-500 hover:text-red-700 text-sm font-bold">
					Eliminar
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	employee: {
		type: Object,
		required: true
	}
});

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const shifts = ref([]);
const newShift = ref({
	startTime: '',
	endTime: ''
});

const fetchShifts = async () => {
	if (!props.employee) return;
	try {
		const response = await $fetch(`${apiBase}/shifts/user/${props.employee.id}`);
		shifts.value = response;
	} catch (error) {
		console.error('Error fetching shifts:', error);
	}
};

const addShift = async () => {
	try {
		await $fetch(`${apiBase}/shifts`, {
			method: 'POST',
			body: {
				userId: props.employee.id,
				startTime: new Date(newShift.value.startTime).toISOString(),
				endTime: new Date(newShift.value.endTime).toISOString(),
				notes: ''
			}
		});
		fetchShifts();
		newShift.value = { startTime: '', endTime: '' };
	} catch (error) {
		console.error('Error adding shift:', error);
		alert('Error al asignar turno');
	}
};

const deleteShift = async (id) => {
	if (!confirm('¿Estás seguro de eliminar este turno?')) return;
	try {
		await $fetch(`${apiBase}/shifts/${id}`, {
			method: 'DELETE'
		});
		fetchShifts();
	} catch (error) {
		console.error('Error deleting shift:', error);
	}
};

const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const formatTime = (dateString) => {
	return new Date(dateString).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
};

watch(() => props.employee, fetchShifts);
onMounted(fetchShifts);
</script>
