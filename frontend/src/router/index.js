import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/views/TaskList.vue'
import AddTask from '@/views/AddTask.vue'
import EditTask from '@/views/EditTask.vue'

router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'TaskList', component: TaskList },
    { path: '/add-task', name: 'AddTask', component: AddTask },
    { path: '/edit-task/:id', name: 'EditTask', component: EditTask, props: true },
  ]
})
export default router
