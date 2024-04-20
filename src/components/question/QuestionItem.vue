<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{ props.question.title }}</div>
    <div class="question-body" v-if="isOpen">{{ props.question.text }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  question: Object,
});

const isOpen = ref(false);
</script>

<style scoped></style>
