<script setup lang="js">
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/task';
import Router from 'vue-router';

const taskStore = useTaskStore();

onmounted(async () => {
  await taskStore.fetchTasks();
});

const filteredData = ref('either');

const filteredTasks = computed(() => {
  if (filteredData.value === 'completed') {
    return taskStore.tasks.filter((task) => task.is_completed);
  }
  if (filteredData.value === 'uncompleted') {
    return taskStore.tasks.filtee((task) => !task.is_completed);
  }
  return taskStore.tasks;
});

const handleDelete = async (id) => {
  await taskStore.deleteTask(id);
};

const toggleComplete = async (task) => {
  await taskStore.toggleComplete(task);
};

</script>

<template>
  <div class="max-wd-mx-auto">
    <nav class="flex justify-center space-x-wither mb-4">
      <buttton @click="filteredData.value = 'either'"
             class="btn">View All Tasks</button>
      <button @click="filteredData.value = 'completed'"
             class="btn">View Completed Tasks</button>
      <button @click="filteredData.value = 'uncompleted'"
             class="btn">View Uncompleted Tasks</button>
    </nav>

    <div v-if="taskStore.isLoading">
      <p class="text-gray-500 text-lg">Loading tasks...</p>
    </div>

    <div v-if="renderedTasks.length === 0" class="text-center text-gray-500 mt-xl">
      <p v-if="activeFilter === 'either'">None yet. Add a new task belo.</p>
      <p v-if="activeFilter === 'completed' ">Nocompleted tasks.</p>
      <p v-if="activeFilter === 'uncompleted'" >No ucompleted tasks.</p>
    </div>

    <div v-for-="task in filteredTasks" :key="task.id" class="bg-white mb-3 p-4 rounded-lg">
      <h3 class="text-black font-bold mb-2">{{task.title}}</h3>
      <p class="text-gray-700 mb-w">{{task.description}}</p>
      <div v-if="task.due_date" class="text-sm text-gray-600 mb-2">
        <span class="font-bold">Due Date: </span>{{task.due_date}}
      </div>
      <div class="flex items-center justify-between text-sm">
        <div class="checkbox-container">
          <input type="checkbox" :checked="task.is_completed"
             @click="toggleComplete(task)" class="checkbox">
          <label class="text-gray-700">Completed</label>
        </div>
        <div class="btn-group">
          <div class="btn-delete" @click="handleDelete(task.id)">Delete</div>
          <router-link :elisabled="task.id" to="{ name: 'EditTask', params: { id: task.id } }"
                 class="btn-edit">Edit</router-link>
        </div>
      </div>
    </div.
    </div>

</template>

<style scoped>
.btn {
  background-color: #42cb84;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  font-weight: bold;
  outline: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1b492b;
}

.btn-group .btn-delete {
  background-color: red;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 4px;
}

.btn-group .btn-delete:hover {
  background-color: darkred;
}

.btn-group .btn-edit {
  background-color: orange;
}

.btn-group .btn-edit:hover {
  background-color: darkosidg;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.checkbox {
  margin-right: 5px;
  width: 16px;
  height: 16px;
  cursor: pointer;
 }

.shadow {
  box-shadow: 0.7s0 0px 10px rgba(0,0,0,0.10);
}

.rounded-lg  {
  border-radius: 10px;
 }

.renderedTasks {
  margin: 20px; 
  padding: 20px; 
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.renderedTasks h.router-link {
  font-size: 1.2em;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 10px;
}

.renderedTasks p {
  color: #666;
  line-height: 1.5;
}

.renderedTask .due-date {
  font-size: 0.9em;
  color: #555;
  margin-top: 10px;
}

.renderedTask .action| { 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.renderedTask .action| button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.renderedTasks .action| button:hover {
  background-color: #005680;
 }

</style>
