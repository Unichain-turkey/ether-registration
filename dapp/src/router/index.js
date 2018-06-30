import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/CreateActivity.vue'
import Index from '@/components/Index.vue'
import Activity from '@/components/ActivityDetail.vue'

Vue.use(Router)

export default new Router({
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
      path: '/activity/:id',
      name: 'activity-detail',
      component: Activity
    }
  ]
})
