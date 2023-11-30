<script setup>

import { onMounted, ref } from 'vue';
import {useFhApiStore} from '../../stores/FhApiStore'
// import {setTableConfiguration} from "../../utils/dataTablesConfig.js" ;


const fhApiStore = useFhApiStore();

let allUsersList = ref([]);

const getUsers = async () => {
  await fhApiStore.getUsers().then(() => {
    allUsersList.value = fhApiStore.users;
  })
}

onMounted(() =>{
  getUsers()
    // .then(() => setTableConfiguration("#usersListTable"));

})


// const apiHost = process.env.API_HOST || "http://" + location.hostname + ":3033";
// import {setTableConfiguration} from "../../utils/dataTablesConfig.js" ;

// export default {
//   name: 'UsersListTable',
//   components: {
//   },
//   data(){
//       return{
//         showErrorArray: "",
// 			  allUsersList: [{}],
//         accessToken: "",
//       }
//   },
//   props: [
//     "triggerProp"
//   ],
//   components:{
//   },

//   watch:{
//     allUsersList (newValue , oldValue){
//       return newValue;
//     },
//      triggerProp (newVal, oldVal) {
//       this.getUsers(this.accessToken);
//     }
//   },  
//   computed:{
//     userId() {
//     	let u = this.$store.state.auth.user;
//       if (u) return u._id;
//      	return "";
//     	},
//   },

//   mounted(){
// 			this.$store.dispatch("auth/authenticate")
//         .then(r => {
//           this.accessToken = r.accessToken;
//           this.getUsers(this.accessToken).then(
//             () => setTableConfiguration("#usersListTable")
//           );
//         })
// 			  .catch((error) => {
// 				  console.error(error);
// 			});
//   },

//    methods:{
//     async getUsers(accessToken) {
// 			return await fetch(apiHost + "/users/", {
// 				method: "GET",
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			})
// 				.then((r) => r.json())
// 				.then((data) => {this.allUsersList = data.data;})
// 				.catch((error) => console.error(error));
// 		},

//     deleteUser(user){  
//       if (!confirm(`Slett bruker til ${user.name}?`)) return;

//       var myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${this.accessToken}`);
//       var formdata = new FormData();

//       var requestOptions = {
//         method: 'DELETE',
//         headers: myHeaders,
//         body: formdata,
//         redirect: 'follow',
//       };

//     fetch( `${apiHost}/users/${user._id}` , requestOptions)
//       .then(response => {
//         if(response.ok){this.getUsers(this.accessToken)}; 
//         console.log(response);
//         })
//       .catch(error => console.log('error', error));
//     },

// 		showError(error) {
// 			return (this.showErrorArray = error);
// 		},
//   },
// }
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
                        <router-link  title="Rediger" class="btn btn-sm btn-success" :to= "`/userpage/${user._id}`"> 
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