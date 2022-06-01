<template>
  <div class="form">
    <RegAuthLinks />
    <div>
     <h2>С возвращением(:</h2>
    <form @submit.prevent="onSubmit">
      <input class="form_inputs" type="email" v-model="email" placeholder="Введите Ваш e-mail">
      <input class="form_inputs" type="password" v-model="password" placeholder="Введите пароль">
      <input class="form_inputs" type="password" v-model="password_confirmation" placeholder="Повторите пароль">
      <button class="form_button" type="submit">Войти</button>
    </form>
    </div>
  </div>
</template>

<script>
  import {HTTP} from "@/api/http-common";
  import RegAuthLinks from '@/components/RegAuthLinks';

  export default {
    components: {
      RegAuthLinks
    },
    data() {
      return {
        email: '',
        password: '',
        password_confirmation: ''
      }
    },
    methods: {
      onSubmit() {
        let body = {
          "email": this.email,
          "password": this.password,
          "password_confirmation": this.password_confirmation
        };

        HTTP.post('api/login', body)
            .then(responce => {
              localStorage.setItem('token', responce.data.data.token);
              this.$router.push('/me');
            })
            .catch(e => {
              console.error(e);
            });
      }
    }
  }
</script>
