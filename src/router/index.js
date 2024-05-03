import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '../views/StudentView.vue'
import CourseView from '../views/CourseView.vue'
import EnrollView from '../views/EnrollView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/students',
      name: 'students',
      component : StudentView
    },
    {
      path: '/courses',
      name: 'courses',
      component : CourseView
    },
    {
      path: '/enrollments',
      name: 'enrollments',
      component : EnrollView
    }
  ]
})

export default router
