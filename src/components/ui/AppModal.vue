<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>

    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
});

const emit = defineEmits(["close"]);
</script>

<style scoped></style>
