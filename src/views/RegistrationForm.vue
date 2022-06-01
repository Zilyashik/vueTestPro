<template>
  <div class="form">
    <RegAuthLinks />
    <div>
    <h2>Добро пожаловать(:</h2>
    <form @submit.prevent="onSubmit">
      <input class="form_inputs" type="text" v-model="name" placeholder="Введите Ваше имя">
      <input class="form_inputs" type="email" v-model="email" placeholder="Введите Ваш e-mail">
      <input class="form_inputs" type="password" v-model="password" placeholder="Придумайте пароль">
      <input class="form_inputs" type="password" v-model="password_confirmation" placeholder="Повторите пароль">
      <button class="form_button" type="submit">Регистрация</button>
    </form>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/api/http-common';
import RegAuthLinks from "@/components/RegAuthLinks";

export default {
  components: {
    RegAuthLinks
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    onSubmit() {
      let body = {
        "name": this.name,
        "email": this.email,
        "password": this.password,
        "password_confirmation": this.password_confirmation
      };

      HTTP.post('api/register', body)
          .then(
              this.$router.push('/login')
          )
          .catch(e => {
            console.error(e);
          });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  .form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #abbcdf;
    position: fixed;
    height: 100%;
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    border-radius: 15px;
    background-color: lightskyblue;
  }
  h2 {
    text-align: center;
    font-size: 30px;
  }
  .form_inputs,
  .form_button {
    padding: 10px;
    margin: 10px 0;
    line-height: inherit;
    width: 270px;
    border: 0;
    box-shadow: 0 0 4px rgba(0,0,0,0.3);
    transition: 0.3s box-shadow;
    border-radius: 15px;
  }
  .form_inputs:hover {
    box-shadow:0 0 4px rgba(0,0,0,0.7);
  }
  .form_button{
    background-color: #d8a5db;
    font-size: 17px;
  }
  .form_button:hover{
    font-weight: 600;
    color: white;
    background-color: #9696ea;
  }
</style>

