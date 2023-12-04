<script setup>
import UsersListTable from "@/components/tables/UsersListTable.vue";
import { ref } from "vue";
// import NewUserForm from "@/components/tables/NewUserForm.vue";
// import AlertTestDatabase from "@/utils/AlertTestDatabase.vue";

let trigger = ref(false);

const triggerTab = () => {
  return trigger.value = !trigger.value;
}
</script>

<template>
  <div class="container">
    <!-- <AlertTestDatabase /> -->
    <router-link class="btn btn-success float-end" title="Lag en ny bruker"
      :to= "`/userpage/100`">
      <i class="fas fa-plus-circle"></i>
      Ny bruker
    </router-link>
    <h2 class="fs-3 fw-bold mt-4 mb-4">Administrasjon</h2>
    <ul class="nav nav-tabs mt-5 mb-3" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button  @click="triggerTab()" class="nav-link active" id="users-tab" data-bs-toggle="tab"
          data-bs-target="#userlist" type="button" role="tab" aria-controls="Bruker" aria-selected="false">
          Brukere
        </button>
      </li>
    </ul>
    <div class="tab-content mb-5" id="myTabContent">
      <UsersListTable :triggerProp="trigger" />
    </div>
  </div>
</template>
