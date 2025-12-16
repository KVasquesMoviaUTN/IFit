<template>
	<div class="p-6">
		<h1 class="text-3xl font-bold text-primary mb-6 font-serif">Gestión de Empleados</h1>

		<!-- Add Employee Form -->
		<div class="bg-white p-6 rounded-lg shadow-md mb-8">
			<h2 class="text-xl font-bold mb-4 text-secondary">Agregar Nuevo Empleado</h2>
			<form @submit.prevent="createEmployee" class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<input v-model="newEmployee.name" placeholder="Nombre" class="border p-2 rounded" required />
				<input v-model="newEmployee.surname" placeholder="Apellido" class="border p-2 rounded" required />
				<input v-model="newEmployee.mail" type="email" placeholder="Email" class="border p-2 rounded" required />
				<input v-model="newEmployee.phone" placeholder="Teléfono" class="border p-2 rounded" required />
				<input v-model="newEmployee.password" type="password" placeholder="Contraseña" class="border p-2 rounded" required />
				<button type="submit" class="bg-primary text-white p-2 rounded hover:bg-opacity-90 transition">
					Crear Empleado
				</button>
			</form>
		</div>

		<!-- Employee List -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
				<h2 class="text-xl font-bold mb-4 text-secondary">Lista de Empleados</h2>
				<ul class="space-y-2">
					<li v-for="employee in employees" :key="employee.id" @click="selectEmployee(employee)"
						class="p-3 border rounded cursor-pointer hover:bg-gray-50 transition flex justify-between items-center"
						:class="{ 'border-primary bg-green-50': selectedEmployee?.id === employee.id }">
						<div>
							<p class="font-bold">{{ employee.name }} {{ employee.surname }}</p>
							<p class="text-sm text-gray-500">{{ employee.mail }}</p>
						</div>
						<span class="text-primary">➔</span>
					</li>
				</ul>
			</div>

			<!-- Shift Scheduler Component -->
			<div class="lg:col-span-2">
				<ShiftScheduler v-if="selectedEmployee" :employee="selectedEmployee" />
				<div v-else class="bg-gray-100 p-10 rounded-lg text-center text-gray-500">
					Selecciona un empleado para ver y gestionar sus turnos.
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import ShiftScheduler from '~/components/ShiftScheduler.vue';

definePageMeta({
	middleware: ['auth']
});

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;

const employees = ref([]);
const selectedEmployee = ref(null);
const newEmployee = ref({
	name: '',
	surname: '',
	mail: '',
	phone: '',
	password: '',
	address: {},
	role: 'employee'
});

const fetchEmployees = async () => {
	try {
		const response = await $fetch(`${apiBase}/users`);
		// Filter users with role 'employee'
		employees.value = response.filter(u => u.role === 'employee');
	} catch (error) {
		console.error('Error fetching employees:', error);
	}
};

const createEmployee = async () => {
	try {
		await $fetch(`${apiBase}/auth/register`, {
			method: 'POST',
			body: newEmployee.value
		});
		alert('Empleado creado exitosamente');
		newEmployee.value = { name: '', surname: '', mail: '', phone: '', password: '', address: {}, role: 'employee' };
		fetchEmployees();
	} catch (error) {
		console.error('Error creating employee:', error);
		alert('Error al crear empleado');
	}
};

const selectEmployee = (employee) => {
	selectedEmployee.value = employee;
};

onMounted(fetchEmployees);
</script>
