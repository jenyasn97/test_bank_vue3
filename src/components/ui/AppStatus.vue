<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(value) {
      return ["active", "cancelled", "done", "pending"].includes(value);
    },
  },
});

const classesMap = {
  active: "primary",
  cancelled: "danger",
  done: "primary",
  pending: "warning",
};
const className = ref(classesMap[props.type]);

const textMap = {
  active: "Активен",
  cancelled: "Отменен",
  done: "Завершен",
  pending: "Выполняется",
};
watch(props, () => {
  className.value = classesMap[props.type];
  text.value = textMap[props.type];
});

const text = ref(textMap[props.type]);
</script>

<style scoped></style>
