<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white"
      >Вернуться к списку заявок</router-link
    >
  </div>
  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="header" />
    </h1>

    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  back: {
    type: Boolean,
    required: false,
  },
});
document.title = `${props.title} | Клон Банка`;
</script>

<style scoped></style>
