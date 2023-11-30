<script setup>

import { onMounted, ref } from 'vue';
import {useFhApiStore} from '../../stores/FhApiStore'
import {setTableConfiguration} from "../../utils/dataTablesConfig.js" ;

const fhApiStore = useFhApiStore();

let allUsersList = ref([]);

const getUsers = async () => {
  await fhApiStore.getUsers().then(() => {
    allUsersList.value = fhApiStore.users;
  })
}

const deleteUser = async () => {
  await fhApiStore.deleteUser()
}

onMounted(() =>{
  getUsers()
    .then(() => setTableConfiguration("#usersListTable"));
})

</script>

<template>
  <div class="tab-pane fade show active" id="userlist" role="tabpanel" aria-labelledby="userlist">
    <div class="table-responsive-lg">
        <table
            id="usersListTable"
            class="table table-striped"
            style="border: 1px solid lightgray"
        >
            <thead class="table-primary">
                <tr>
                    <th scope="col">Navn</th>                    
                    <th scope="col">Etternavn</th>
                    <th scope="col">Epost</th>
                    <th scope="col">Rettigheter</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in allUsersList" :key="index">
                    <td>{{ user.name }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.accessLevelId}}</td>
                    <td class="text-end">
                        <router-link  title="Rediger" class="btn btn-sm btn-success" :to= "`/userpage/${user.id}`"> 
                          <i class="fas fa-pen fa-xs"></i>
                        </router-link>          
                    </td>
                    <td  v-if="user.id !== fhApiStore.user.id">
                      <button @click="deleteUser(user)" title="Slett" type="button" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash fa-xs"></i>
                      </button>
                    </td>
                    <td v-else></td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>