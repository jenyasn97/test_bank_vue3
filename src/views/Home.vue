<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter" />
    <request-table :requests="requests" />

    <teleport to="body">
      <app-modal title="Создать заявку" v-if="modal" @close="modal = false">
        <request-modal @create="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage.vue";
import RequestTable from "../components/request/RequestTable.vue";
import AppModal from "../components/ui/AppModal.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import RequestFilter from "../components/request/RequestFilter.vue";
import { computed, onMounted, ref } from "vue";
import RequestModal from "../components/request/RequestModal.vue";
import { useStore } from "vuex";

export default {
  setup() {
    const modal = ref(false);
    const store = useStore();
    const loading = ref(false);
    const filter = ref({});

    const requests = computed(() =>
      store.getters["request/requests"]
        .filter((request) => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name);
          }
          return request;
        })
        .filter((request) => {
          if (filter.value.status) {
            return filter.value.status === request.status;
          }
          return request;
        })
    );

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/load");
      loading.value = false;
    });
    return { modal, requests, loading, filter };
  },
  name: "Home",
  components: {
    RequestModal,
    AppModal,
    RequestTable,
    AppPage,
    AppLoader,
    RequestFilter,
  },
};
</script>
