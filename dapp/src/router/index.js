import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/CreateActivity.vue'
import Index from '@/components/Index.vue'
import Activity from '@/components/ActivityDetail.vue'
import Admin from '@/components/Admin.vue'
import Marketplace from '@/components/Marketplace.vue'
import Entry from '@/components/Entry.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/entry',
      name: 'entry',
      component: Entry
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/mp',
      name: 'marketplace',
      component: Marketplace
    },
    {
      path: '/activity/:id',
      name: 'activity-detail',
      component: Activity
    },
    { path: '*', redirect: '/' }
  ]
})
