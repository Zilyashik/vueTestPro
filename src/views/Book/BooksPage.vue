<template>
  <div class="btnCreate">
    <navbar />
    <router-link :to="{name: 'bookCreatePage'}" class="createBtn">Создать</router-link>
    <ul class="book_page">
      <bookItem
          v-for="book in books"
          :key = "book.id"
          v-bind:book = "book"
      />
    </ul>
  </div>
</template>

<script>
import {HTTP} from "@/api/http-common";
import bookItem from "@/components/BookItem"
import navbar from "@/components/navbarComponent"

export default {
  components: {
    bookItem,
    navbar
  },
  data() {
    return {
      books: []
    }
  },
  mounted() {
    HTTP.get('api/books')
    .then(responce => {
      this.books = responce.data.data;
    })
    .catch(e => {
      console.error(e);
    });
  }
}
</script>

<style scoped>
.btnCreate{
  background-color: rgba(171, 188, 223, 1);
}
  .book_page{
    margin-top: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(171, 188, 223, 0.5);
    background-color: rgba(171, 188, 223, 0.5);
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