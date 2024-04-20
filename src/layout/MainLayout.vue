<template>
  <the-nav-bar />
  <the-side-bar />
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script setup>
import TheNavBar from "../components/TheNavBar.vue";
import AppMessage from "../components/ui/AppMessage.vue";
import TheSideBar from "../components/TheSideBar.vue";
</script>

<style scoped></style>
