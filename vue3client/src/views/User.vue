<script setup>
import { useFhApiStore } from '../stores/FhApiStore';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'

const fhApiStore = useFhApiStore();
const route = useRoute()
const id = route.params.id


let error = ref('');
let loadingSpinner = ref(false);
let message = ref({});
let userId = ref(fhApiStore.user.id)
let inputName = ref(fhApiStore.user.name);
let inputEmail = ref(fhApiStore.user.email);
let inputPassword = ref('');
let inputNewPassword = ref('');
let inputLastName = ref(fhApiStore.user.lastName);
let selectUserRights = ref(fhApiStore.user.accessLevelId);
let selectUserOptions = ref([
	{ id: 5, name: 'Normal bruker' },
	{ id: 1, name: 'Administrator' },
])

// TODO need to fix it 
onMounted(() => {
	if(id != fhApiStore.user.id){
		let user = fhApiStore.users.find(item => item.id == id); 
		inputName.value = user.name;
		inputLastName.value = user.lastName;
		selectUserRights.value = user.accessLevelId;
		inputEmail.value = user.email;
	}
})

const isUserAdmin = computed(() => {
	return fhApiStore.user.accessLevelId == 1 ? true: false; 
});

const setSelectUserRight = (event) => {
	selectUserRights.value = event.target.value;
}

const submitUserForm = async (userId, inputName, inputLastName, inputEmail, inputPassword, inputNewPassword, selectUserRights) => {
	let credentials = {
		userId,
		inputName, 
		inputLastName, 
		inputEmail, 
		inputPassword, 
		inputNewPassword, 
		selectUserRights
	}

	if (isPasswordEqual(credentials)) {
		updateUser(credentials)
	} else {
		message.value = { ok: false, statusText: 'Passord er ikke like' };
	}
}

const updateUser = async (credentials) => {
	fhApiStore.updateUser(credentials);
}

const isPasswordEqual = (credentials) => {
  return credentials.inputPassword === credentials.inputNewPassword ? true : false;
}

</script>

<template>
	<div class="container">
		<!-- <AlertTestDatabase /> -->
		<h2 class="fs-3 fw-bold mt-4 mb-4">Bruker detaljer
			<!-- <Spinner :loadingSpinner="this.loadingSpinner" /> -->
		</h2>

		<form autocomplete="off" class="row g-3"
			@submit.prevent="submitUserForm(userId, inputName, inputLastName, inputEmail, inputPassword, inputNewPassword, selectUserRights)">
			<div class="col-6">
				<label for="inputName" class="form-label">Navn</label>
				<input type="text" :disabled="!isUserAdmin" v-model="inputName" minLength="3" class="form-control" id="inputName"
					placeholder="eks.John" />
			</div>
			<div class="col-6">
				<label for="inputLastName" class="form-label">Etternavn</label>
				<input name="inputLastName" autocomplete="new-password" type="text" :disabled="!isUserAdmin"
					v-model="inputLastName" minLength="3" class="form-control" id="inputLastName" placeholder="eks.Doe" />
			</div>
			<div class="col-md-6">
				<label for="inputEmail" class="form-label">Epost</label>
				<input type="email" disabled v-model="inputEmail" class="form-control" id="inputEmail"
					placeholder="eks.john@doe.com" />

			</div>
			<div class="col-md-6">
				<label for="inputPassword" class="form-label text-success">Nytt passord</label>
				<input autocomplete="new-password" type="password" minLength="6" required v-model="inputPassword"
					class="form-control" id="inputPassword" />
			</div>
			<div class="col-md-6">
				<label for="rettigheter" class="form-label">Rettigheter</label>
				<select :disabled="!isUserAdmin" required class="form-select" aria-label="Rettigheter"
					name="rettigheter" @change="setSelectUserRight($event)">
					<option v-for="(selectUserOption, index) in selectUserOptions" :value="selectUserOption.id" :key="index"
						:selected="selectUserOption.id == selectUserRights ">
						{{ selectUserOption.id }} - {{ selectUserOption.name }}
					</option>
				</select>
			</div>

			<div class="col-md-6">
				<label for="inputPassword" class="form-label">Gjenta passord</label>
				<input autocomplete="new-password" type="password" minLength="6" required v-model="inputNewPassword"
					class="form-control" id="inputNewPassword" />
			</div>

			<div class="col-12">
				<button type="submit" class="mt-2 btn btn-success">Send
					<!-- <Spinner :loadingSpinner="loadingSpinner" /> -->
				</button>
			</div>
			<div class="pt-3">
				<div v-if="message.ok == true" class="alert alert-success alert-dismissible fade show" role="alert">
					Passord oppdatert. {{ message.statusText }}
					<button type="button" class="btn-close" @click="message={}" aria-label="Close"></button>
				</div>

				<div v-if="message.ok == false" class="alert alert-danger alert-dismissible fade show" role="alert">
					Error: {{ message.statusText }}
					<button type="button" class="btn-close" @click="message={}" aria-label="Close"></button>
				</div>
			</div>
		</form>
	</div>
</template>
  
<style  scoped></style>
  