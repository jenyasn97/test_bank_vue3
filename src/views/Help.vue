<template>
  <app-page back title="Помощь">
    <question-item
      v-for="question in questions"
      :key="question.text"
      :question="question"
    />
  </app-page>
</template>

<script setup>
import AppPage from "../components/ui/AppPage.vue";
import QuestionItem from "../components/question/QuestionItem.vue";

const questions = [
  {
    title: "Что есть в данной системе?",
    text: "В данной системе вы можете создавать и редактировать список задач, а также смотреть статистику по задачам.",
  },
  {
    title: "Как создать задачу?",
    text: "Чтобы создать задачу, нееобходима нажать кнопку 'Создать' и заполнить нужные поля.",
  },
];
</script>

<style lang="scss" scoped></style>
