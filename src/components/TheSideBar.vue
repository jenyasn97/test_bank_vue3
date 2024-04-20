<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>
    <div class="sidebar-content">
      <p>Добро пожаловать в систему заявок</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const sidebar = computed(() => store.state.sidebar);
const close = () => {
  store.commit("closeSidebar");
};
</script>

<style scoped></style>
