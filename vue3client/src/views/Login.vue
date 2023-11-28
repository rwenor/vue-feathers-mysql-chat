<script setup>
import {useFhApiStore} from '../stores/FhApiStore'
import { ref } from 'vue'
import Spinner from '../utils/Spinner.vue'
import router from '../router/index.js'

const fhApiStore = useFhApiStore()
let error = ref('');
let email = ref('');
let password = ref('');
let loadingSpinner = ref(false);



const login = async () => {
  error = "";
  loadingSpinner.value = true;

  await fhApiStore.login(email.value, password.value)
    .then(user => {
      loadingSpinner.value = false;

      if (!user.id) {
        error = user;
        return error;
      } else {
        router.push('/');
        return user;
      }
    }
    );
}
</script>

<template>
  <div id="login-body" class="text-center">
    <main class="form-signin mt-5">
      <form  @submit.prevent="login()">
        <img src="iconAxicon.png" id="icon" alt="Axicon logo">
        <h1 class="h3 my-3 fw-normal">Axicon</h1>

        <div class="form-floating mb-2">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
            required="required" v-model="email" >
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
          required="required" v-model="password">
          <label for="floatingPassword">Password</label>
        </div>
       
        <button class="w-100 btn btn-lg btn-primary mt-4" type="submit" value="Logg inn">
          Logg inn
          <Spinner :loadingSpinner="loadingSpinner"  />   
        </button>
        <div class="alert alert-danger mt-2" v-if="error">{{error}}</div>
      </form>
    </main>
  </div>
</template>


<style scoped>
#login-body{
    background-color:#f2f2f2;
    height: calc(100vh - 66px);
    display: flex;
    align-items:flex-start;
    justify-content: center;
}

.form-signin {
    background-color: white;
    width: 100%;
    max-width: 400px;
    padding: 50px 50px;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-floating>.form-control {
    padding: 1rem rem 0.75rem;
}

.form-floating>.form-control, .form-floating>.form-select {
    height: calc(3.5rem + 2px);
    line-height: 1.25;
}
.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>