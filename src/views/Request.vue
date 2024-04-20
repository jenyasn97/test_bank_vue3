<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца:</strong> {{ request.fio }}</p>
    <p><strong>Телефон владельца:</strong> {{ request.phone }}</p>
    <p><strong>Суммма:</strong> {{ currency(request.amount) }}</p>
    <p>
      <strong>Статус:</strong>
      <app-status :type="request.status"></app-status>
    </p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>

  <div class="card" v-else>
    <h3 class="text-center">Заявки с id {{ $route.params.id }} нет</h3>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import AppStatus from "../components/ui/AppStatus.vue";
import { currency } from "../utils/currency.js";

const router = useRouter();

const route = useRoute();
const loading = ref(true);
const store = useStore();
const request = ref({});
const status = ref();
const hasChanges = computed(() => request.value.status !== status.value);

async function remove() {
  await store.dispatch("request/remove", route.params.id);
  router.push("/");
}

async function update() {
  const data = {
    ...request.value,
    status: status.value,
    id: route.params.id,
  };
  await store.dispatch("request/update", data);
  request.value.status = status.value;
}

onMounted(async () => {
  loading.value = true;
  request.value = await store.dispatch("request/loadOne", route.params.id);
  status.value = request.value?.status;
  loading.value = false;
});
</script>

<style scoped></style>
