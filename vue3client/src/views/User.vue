<script setup>
import { useFhApiStore } from '../stores/FhApiStore';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Spinner from '../utils/Spinner.vue';

const fhApiStore = useFhApiStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id


let error = ref('');
let loadingSpinner = ref(false);
let message = ref({});
let userId = ref('')
let inputName = ref('');
let inputEmail = ref('');
let inputPassword = ref('axaxax');
let inputNewPassword = ref('axaxax');
let inputLastName = ref('');
let selectUserRights = ref('5');
let selectUserOptions = ref([
	{ id: 5, name: 'Normal bruker' },
	{ id: 1, name: 'Administrator' },
])

onMounted(async () => {
	// Deny to see others usersinfo using the adresselinje 
  if(id != fhApiStore.user.id && fhApiStore.user.accessLevelId != 1 ) return router.push("/noaccess");
  
  await fhApiStore.getUsers()
  
  let user  = fhApiStore.users.find(item => item.id == id);
  if (!user) return router.push("/error")


	setUserDetailsForm();

})


const setUserDetailsForm = () => {
	if(id == fhApiStore.user.id){
		createUserRefs(fhApiStore.user);
	} else if (id != fhApiStore.user.id){
		let storedUser = fhApiStore.users.find(item => item.id == id); 
		createUserRefs(storedUser);
	}

}

const createUserRefs = (user) => {
		userId.value = user.id
		inputName.value = user.name;
		inputLastName.value = user.lastName;
		selectUserRights.value = user.accessLevelId;
		inputEmail.value = user.email;
}

const isUserAdmin = computed(() => {
	return fhApiStore.user.accessLevelId == 1 ? true: false; 
});

const setSelectUserRight = (event) => {
	selectUserRights.value = event.target.value;
}

const submitUserForm = async (userId, inputName, inputLastName, inputEmail, inputPassword, inputNewPassword, selectUserRights) => {
	let credentials = {
		id: Number(userId),
		name: inputName, 
		lastName: inputLastName, 
		email: inputEmail, 
		password: inputPassword,  
		accessLevelId: Number(selectUserRights)
	}

	if (isPasswordEqual(inputPassword, inputNewPassword)) {
		updateUser(credentials).then(()=> {
		message.value = { ok: true, statusText: 'Bruker oppdatert' };
		})
	} else {
		message.value = { ok: false, statusText: 'Passord er ikke like' };
	}
}

const updateUser = async (credentials) => {
	loadingSpinner.value = true;
	fhApiStore.patchUser(credentials).then(() => {
		loadingSpinner.value = false;
	});
}

const isPasswordEqual = (inputPassword, inputNewPassword) => {
  return inputPassword === inputNewPassword ? true : false;
}

</script>

<template>
	<div class="container">
		<!-- <AlertTestDatabase /> -->
		<h2 class="fs-3 fw-bold mt-4 mb-4">Bruker
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
					<Spinner :loadingSpinner="loadingSpinner" />
				</button>
			</div>
			<div class="pt-3">
				<div v-if="message.ok == true" class="alert alert-success alert-dismissible fade show" role="alert">
					{{ message.statusText }}
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
  