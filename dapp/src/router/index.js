import Vue from 'vue'
import Router from 'vue-router'
import RegistrationDapp from '@/components/RegistrationDapp'
import Index from '@/components/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'registration-dapp',
      component: Index
    },
    {
      path: '/activity/:id',
      name: 'activity-info',
      component: RegistrationDapp
    },
    {
      path: '/create',
      name: 'registration-dapp',
      component: RegistrationDapp
    }
  ]
})
