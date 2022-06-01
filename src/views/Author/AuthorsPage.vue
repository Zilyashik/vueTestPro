<template>
  <div class="btnCreate">
    <navbar />
    <router-link :to="{name: 'createAuthor'}" class="createBtn">Создать</router-link>
    <ul class="author_page">
      <author
        v-for="author of authors"
        :key="author.id"
        v-bind:author="author"
      />
    </ul>
  </div>
</template>

<script>
import author from "@/components/AuthorItem"
import navbar from "@/components/navbarComponent"
import {HTTP} from "@/api/http-common";

export default {
  components: {
    author,
    navbar
  },
  data() {
    return {
      authors: []
    }
  },
  mounted() {
    HTTP.get('api/authors')
    .then(responce => {
      this.authors = responce.data.data;
    })
    .catch(e => {
      console.error(e)
    })
  }
}
</script>

<style scoped>
.btnCreate{
  background-color: rgba(171, 188, 223, 1);
}
.author_page{
  margin-top: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.createBtn{
  position: absolute;
  top: 70px;
  left: 45%;
  text-decoration: none;
  color: black;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 15px;
  width: 150px;
  background-color: rgba(141,120,150,0.5);
}
.createBtn:hover{
  text-decoration: underline;
}
.createBtn:active{
  color: white;
  background-color: #6f5c77;
  text-decoration: none;
}
</style>