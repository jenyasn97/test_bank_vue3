<template >
  <div v-if="message" :class="['alert', message.type]" >
    <p class="alert-title" v-if="title" >{{ title }}</p >
    <p >{{ message.value }}</p >
    <span class="alert-close" @click="closeMessage" >&times;</span >
  </div >
</template >

<script setup >
import {useStore} from "vuex";
import {computed} from "vue";

const TITLE_MAP = {
  'primary': 'Успех',
  'warning': 'Предупреждение',
  'danger': 'Ошибка'
}
const store = useStore()
const title = computed(() => message.value ? TITLE_MAP[message.value.type] : '')
const message = computed(() => store.state.message)

function closeMessage () {
  store.commit('clearMessage')
}

</script >

<style scoped >

</style >