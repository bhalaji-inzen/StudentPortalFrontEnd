<template>
  <nav class="navbar navbar-expand" style="background-color: #fffdde;">
    <div class="container-fluid">
        <div class="navbar-brand"><h1>Student Portal</h1></div>
        <ul class="navbar-nav">
          <li class="nav-item"><RouterLink class="nav-link text-decoration-underline" to="/">Home</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link text-decoration-underline" to="/students">Students</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link text-decoration-underline" to="/courses">Courses</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link text-decoration-underline" to="/enrollments">Enrollments</RouterLink></li>
        </ul>
    </div>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<script>
  import { RouterLink ,RouterView } from 'vue-router'
  
  export default {
    name :'App'
  }
</script>

<style scoped>
  main{
    display: grid;
  }
</style>

