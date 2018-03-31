import Vue from 'vue'
import Router from 'vue-router'
import RegistrationDapp from '@/components/RegistrationDapp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'registration-dapp',
      component: RegistrationDapp
    }
  ]
})
