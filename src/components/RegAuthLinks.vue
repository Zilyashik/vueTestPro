<template>
  <div class="link">
    <router-link :to="{name: 'login'}" class="main">Вход</router-link>
    <router-link :to="{name: 'registration'}" class="main">Регистрация</router-link>
  </div>
</template>

<script>
</script>

<style scoped>
.link{
  display: flex;
  flex-direction: column;
  margin-right: 150px;
}
.main {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin: 10px;
  padding: 10px 15px;
  color: black;
  font-size: 20px;
  line-height: 10px;
  text-align: center;
  font-weight: 600;
  border-radius: 15px;
}
.main:hover{
  background-color: #9696ea;
}
</style>