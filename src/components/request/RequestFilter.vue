<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Начинайте вводить имя" v-model="name" />
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue"]);

const name = ref();
const status = ref();

watch([name, status], (value) => {
  emit("update:modelValue", {
    name: value[0],
    status: value[1],
  });
});

const isActive = computed(() => {
  return name.value || status.value;
});

const reset = () => {
  name.value = "";
  status.value = null;
};
</script>

<style scoped></style>
