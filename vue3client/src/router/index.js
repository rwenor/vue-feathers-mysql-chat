import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import NoAccess from '../views/NoAccess.vue'
import User from '../views/User.vue'
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
      path: '/adminpage',
      name: 'adminpage',
      beforeEnter: isAdmin,
      component: Admin
    },
    {
      path: '/noaccess',
      name: 'noaccess',
      component: NoAccess
    },
    {
      path: '/userpage/:id', props: true,
      name: 'userpage',
      beforeEnter: isLoggedInn,
      component: User
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

async function isLoggedInn(to, from, next) {
  const fhApiStore = useFhApiStore()
  await fhApiStore.login().then(res => {
    if (res.user) {
      next();
    } else {
      next({
        name: 'login'
      })
    }
  });
}
async function isAdmin(to, from, next) {
  const fhApiStore = useFhApiStore()
  await fhApiStore.login().then(res => {
    if(!res.user) return next({name: 'login'})

    if (res.user?.accessLevelId == 1) {
      next();
    } else {
      next({
        name: 'noaccess'
      })
    }
  });


}