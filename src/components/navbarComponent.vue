<template>
  <nav>
    <router-link :to="{name: 'profile'}" class="nav_item">Профиль</router-link>
    <router-link :to="{name: 'books'}" class="nav_item">Книги</router-link>
    <router-link :to="{name: 'authors'}" class="nav_item">Авторы</router-link>
    <router-link :to="{name: 'favorite'}" class="nav_item">Избранное</router-link>
    <button @click="logout" class="nav_item">Выйти</button>
  </nav>
</template>

<script>
import {HTTP} from "@/api/http-common";

export default {
  methods: {
    logout() {
      HTTP.post('api/logout')
      .then(() => {
        localStorage.removeItem('token');
        this.$router.push('/login');
      })
      .catch(e => {
        console.error(e);
      });
    }
  }
}
</script>

<style scoped>
  nav {
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    background-color:  rgba(237, 194, 220, 0.5);
  }
  .nav_item {
    margin-right: 30px;
    text-decoration: none;
    color: black;
    font-weight: 600;
    width: 110px;
    text-align: center;
    border-radius: 15px;
    background-color: rgba(201, 160, 220, 0.5);
  }
  .nav_item:hover{
    background-color: rgba(201, 160, 220, 1);
  }
  .nav_item:active{
    background-color: #6f5c77;
    color: white;
  }
</style>