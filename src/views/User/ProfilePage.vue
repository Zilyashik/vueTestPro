<template>
  <div class="profile">
    <navbar />
    <div class="credentials">
      <span><strong>Имя: </strong> {{ user.name }}</span>
      <span><strong>E-mail: </strong> {{ user.email }}</span>
    </div>
  </div>
</template>

<script>
import {HTTP} from "@/api/http-common";
import navbar from "@/components/navbarComponent"

export default {
  components: {
    navbar
  },
  data() {
    return {
      user: ''
    }
  },
  async mounted() {
    await HTTP.get('api/me')
    .then(responce => {
      this.user = responce.data.data;
    })
    .catch(e => {
      console.error(e);
    })
  }
}
</script>

<style scoped>
  .profile{
    background-color: rgba(171, 188, 223, 0.5);
    position: fixed;
    height: 100%;
    width: 100%;
  }
  .credentials {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: center;
    width: 500px;
    margin-top: 30px;
    margin-left: 30%;
    background-color: lavenderblush;
    border-radius: 15px;
  }
</style>