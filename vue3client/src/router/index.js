import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import {useFhApiStore} from '../stores/FhApiStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: isLoggedInn,
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // beforeEnter: isLoggedInn,
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: isLoggedInn,

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router;

async function isLoggedInn (to, from, next) {
  const fhApiStore = useFhApiStore()
  await fhApiStore.login().then(res => {
    if(res.user){
      next();  
    } else {
      next({
        name: 'login'
      })
    }
    
  });

}