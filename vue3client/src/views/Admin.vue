<script setup>
import UsersListTable from "@/components/tables/UsersListTable.vue";
import { ref } from "vue";
// import NewUserForm from "@/components/tables/NewUserForm.vue";
// import AlertTestDatabase from "@/utils/AlertTestDatabase.vue";

let trigger = ref(false);

const triggerTab = () =>{
	return trigger.value = !trigger.value;
}
</script>

<template>
	<div class="container">
		<!-- <AlertTestDatabase /> -->
		<h2 class="fs-3 fw-bold mt-4 mb-4">Administrasjon</h2>
		<ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
			<li class="nav-item" role="presentation">
				<button @click="triggerTab()" class="nav-link active" id="users-tab" data-bs-toggle="tab" 
				data-bs-target="#userlist" type="button" role="tab" aria-controls="Bruker" aria-selected="false">
					Brukere
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="newuser-tab" data-bs-toggle="tab" 
				data-bs-target="#newuser" type="button" role="tab" aria-controls="Ny bruker" aria-selected="true">
					<i class="fas fa-plus-circle"></i>
					Ny bruker
				</button>
			</li>
		</ul>
	    <div class="tab-content mb-5" id="myTabContent">
			<UsersListTable  :triggerProp="trigger" />
			<!-- <NewUserForm /> -->
		</div>
	</div>
</template>
