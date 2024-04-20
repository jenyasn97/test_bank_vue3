<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, idx) in requests" :key="request.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ request.fio }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ currency(request.amount) }}</td>
        <td>
          <app-status :type="request.status" />
        </td>
        <td>
          <router-link
            custom
            v-slot="{ navigate }"
            :to="`/request/${request.id}`"
          >
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppStatus from "../../components/ui/AppStatus.vue";
import { currency } from "../../utils/currency.js";

const props = defineProps(["requests"]);
</script>

<style scoped></style>
