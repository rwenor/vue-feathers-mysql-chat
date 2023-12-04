<script setup>
import { useFhApiStore } from '../stores/FhApiStore';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Spinner from '../utils/SpinnerSmall.vue';

import ErrorMessage from '../components/ErrorMessage.vue';

const fhApiStore = useFhApiStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id


let errorMessage = ref({});
let loadingSpinner = ref(false);
let showPassword = ref(true);
let userId = ref('')
let inputName = ref('');
let inputEmail = ref('');
let inputPassword = ref('');
let inputNewPassword = ref('');
let inputLastName = ref('');
let selectUserRights = ref('5');
let selectUserOptions = ref([
  { id: 5, name: 'Normal bruker' },
  { id: 1, name: 'Administrator' },
])

onMounted(async () => {
  // Deny to see others usersinfo using the adresselinje 
  if (id != fhApiStore.user.id && fhApiStore.user.accessLevelId != 1) return router.push("/noaccess");

  await fhApiStore.getUsers()

  let user = fhApiStore.users.find(item => item.id == id);
  if (!user && id != 100) return router.push("/error")


  setUserDetailsForm();
  showHidePassword();

})


const setUserDetailsForm = () => {
  if (id == fhApiStore.user.id) {
    createUserRefs(fhApiStore.user);
  } else if (id != fhApiStore.user.id && id != 100) {
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
  return fhApiStore.user.accessLevelId == 1 ? true : false;
});

const setSelectUserRight = (event) => {
  selectUserRights.value = event.target.value;
}

const submitUserForm = async (userId, inputName, inputLastName, inputEmail, inputPassword, inputNewPassword, selectUserRights) => {
  errorMessage.value = {};
  let credentials = {
    id: Number(userId),
    name: inputName,
    lastName: inputLastName,
    email: inputEmail,
    password: inputPassword,
    accessLevelId: Number(selectUserRights)
  }
  // Using this flag to show and hide password input.
  if(showPassword.value == false) delete credentials.password;

  // Returning if passwords are not the samme
  if (!isPasswordEqual(inputPassword, inputNewPassword)) return errorMessage.value = { ok: false, statusText: 'Passord er ikke like' };

  if (id == 100) { // Using 100 as params as flag
    return createUser(credentials).then(res => {
      if (res.email) {
        errorMessage.value = { ok: true, statusText: `Opprettet: ${res.email}` };
      } else {
        errorMessage.value = { ok: false, statusText: res };
      }
    })
  }

  // Updating user and displaying right info
  return updateUser(credentials).then(res => {
    if (res.id) {
      errorMessage.value = { ok: true, statusText: `Oppdatert: ${res.email}` };
    } else {
      errorMessage.value = { ok: false, statusText: res };
    }
  })
}

const updateUser = async (credentials) => {
  loadingSpinner.value = true;
  return fhApiStore.patchUser(credentials).then((res) => {
    loadingSpinner.value = false;
    return res;
  });
}

const isPasswordEqual = (inputPassword, inputNewPassword) => {
  return inputPassword === inputNewPassword ? true : false;
}

const createUser = (credentials) => {
  delete credentials.id;
  loadingSpinner.value = true;
  return fhApiStore.createUser(credentials).then((res) => {
    loadingSpinner.value = false;
    return res;
  });
}

const showHidePassword = () => {
  if(id == 100) return showPassword.value = true;
  showPassword.value = !showPassword.value;
}

</script>

<template>
  <div class="container">
    <!-- <AlertTestDatabase /> -->
    <h2 class="fs-3 fw-bold mt-4 mb-4">{{id == 100 ? 'Opprett bruker' : 'Bruker detaljer' }}
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
        <input :disabled="id != 100"  type="email" v-model="inputEmail" class="form-control" id="inputEmail"
          placeholder="eks.john@doe.com" />

      </div>
      <div class="col-md-6">
        <label for="rettigheter" class="form-label">Rettigheter</label>
        <select :disabled="!isUserAdmin" required class="form-select" aria-label="Rettigheter" name="rettigheter"
          @change="setSelectUserRight($event)">
          <option v-for="(selectUserOption, index) in selectUserOptions" :value="selectUserOption.id" :key="index"
            :selected="selectUserOption.id == selectUserRights">
            {{ selectUserOption.id }} - {{ selectUserOption.name }}
          </option>
        </select>
      </div>

      <button v-if="id != 100" @click="showHidePassword()" type="button" class="btn btn-dark">Bytt passord</button>

      <div class="col-md-6" v-if="showPassword">
        <label for="inputPassword" class="form-label text-success">Nytt passord</label>
        <input autocomplete="new-password" type="password" minLength="6" required v-model="inputPassword"
          class="form-control" id="inputPassword" />
      </div>
      <div class="col-md-6"  v-if="showPassword">
        <label for="inputPassword" class="form-label">Gjenta passord</label>
        <input autocomplete="new-password" type="password" minLength="6" required v-model="inputNewPassword"
          class="form-control" id="inputNewPassword" />
      </div>

      <div class="col-12">
        <button v-if="id != 100" type="submit" class="mt-2 btn btn-success">Send
          <Spinner :loadingSpinner="loadingSpinner" />
        </button>

        <button v-if="id == 100" type="submit" class="ms-2 mt-2 btn btn-primary">Opprett
          <Spinner :loadingSpinner="loadingSpinner" />
        </button>
      </div>
      <ErrorMessage :message="errorMessage" />
    </form>
  </div>
</template>
  
<style  scoped></style>
  