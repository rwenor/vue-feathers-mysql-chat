<script setup>
import { ref, onMounted, watch } from 'vue'
import {useFhApiStore} from './stores/FhApiStore'
import router from './router/index.js'
import { storeToRefs } from 'pinia';

const fhApiStore = useFhApiStore();
const { user } = storeToRefs(useFhApiStore());

const handleLogout = async () => {
  await fhApiStore.logout().then(() => router.push('/login')
    )
}

</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient px-0 py-0">
      <div class="container-fluid">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand" href="#">
          <img class="logo" src="./assets/Axicon-logo-light.png" alt="Logo Axicon">
        </router-link>
        <!-- Navbar toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <!-- Nav -->
          <div class="navbar-nav mx-lg-auto">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/">Mamut </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/rackbeat">RackBeat </router-link>
              </li>
              <li class="nav-item" v-if="user.accessLevelId == 1">
                <router-link class="nav-link" to="/deler/4">Delerplan</router-link>
              </li>
              <li class="nav-item" v-if="user.accessLevelId == 1">
                <router-link class="nav-link" to="/deler/6">Produktoversikt</router-link>
              </li>

              <li class="nav-item" v-if="user.accessLevelId == 1">
                <router-link class="nav-link" to="/gqlfilter">GqlFilter</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/systemlist">System list</router-link>
              </li> -->
              <li class="nav-item" v-if="user.accessLevelId == 1">
                <router-link class="nav-link" to="/adminpage">Admin</router-link>
              </li>
            </ul>
          </div>
          <!-- Right navigation -->
          <ul class="d-flex navbar-nav">
            <li class="nav-item" v-if="user">
              <!-- <SearchConfig /> -->
            </li>
            <div class="dropdown-divider mt-4 mb-3"></div>
            <li id="loginUser" class="text-light px-3 py-2 nav-item" v-if="user">
              <a class="nav-link user-link" :href="`/userpage/${user.id}`" title="Bruker detaljer">
                <i class="fas fa-user"></i>
                   {{user.name }}
              </a>

              <a class="ms-2 link-danger" @click.prevent="handleLogout" href="#" title="Log ut">
                <i class="fas fa-sign-out-alt fa-lg"></i>
              </a>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link text-primary" title="Logg inn i Axicon" to="/login">
                Logg inn
                <i class="fas fa-sign-out-alt fa-lg"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
    <footer>
      <!-- TODO Better footer -->
      <!-- <p class="foot">&copy; Copyright 2019 Axicon AS</p> -->
    </footer>
  </div>

  <!-- <RouterView /> -->
</template>

<style scoped>
.logo {
  height: 55px;
  
  width: auto;
  padding: 3px 15px 5px 10px;
}
#loginUser{
  color: blueviolet;
}

.user-link{
  display: contents !important;
}

nav .router-link-exact-active{
  color: #fff !important;
  font-weight: bold;
}
</style>
