import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/CreateActivity.vue'
import Index from '@/components/Index.vue'
import Activity from '@/components/ActivityDetail.vue'
import Admin from '@/components/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/activity/:id',
      name: 'activity-detail',
      component: Activity
    },
    { path: '*', redirect: '/' }
  ]
})
