<template >
  <form class="card" @submit.prevent="onSubmit" >
    <h1 >Войти в систему</h1 >

    <div :class="['form-control', {invalid: eError}]" >
      <label for="email" >Email</label >
      <input id="email" type="email" v-model="email" @blur="eBlur" />
      <small v-if="eError" >{{ eError }}</small >
    </div >
    <div :class="['form-control', {invalid: pError}]" >
      <label for="password" >Пароль</label >
      <input id="password" type="password" v-model="password" @blur="pBlur" />
      <small v-if="pError" >{{ pError }}</small >
    </div >

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts" >Войти</button >
    <br >
    <span class="text-danger"
          v-if="isTooManyAttempts" >Слишком много попыток входа в систему.  Попробуйте позже.</span >
  </form >
</template >

<script >
import {useLoginForm} from "../use/login-form.js";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {error} from "../utils/error.js";

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    if (route.query.message) {

      store.commit('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return {
      ...useLoginForm()
    }
  }
}

</script >


<style scoped >

</style >