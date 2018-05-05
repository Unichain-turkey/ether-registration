import Vue from 'vue'
import Router from 'vue-router'
import RegistrationDapp from '@/components/RegistrationDapp.vue'
import Index from '@/components/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'registration-dapp',
      component: RegistrationDapp
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/activity/:id',
      name: 'activity-info',
      component: RegistrationDapp
    }
  ]
})
