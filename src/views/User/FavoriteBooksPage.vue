<template>
  <div class="page">
    <navbar />
    <ul class="book_page" v-if="books.length > 0">
      <bookItem
          v-for="book in books"
          :key = "book.id"
          v-bind:book = "book"
      />
    </ul>
    <div class="no_favorites" v-else>
      <div class="no_favorites-item">Нет избранных книг):</div>
      <br>
      <router-link :to="{name: 'books'}" class="add">Время добавить (тык) </router-link>
    </div>
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
    HTTP.get('api/favorite-books')
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
.book_page{
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(171, 188, 223, 0.5);
  background-color: rgba(171, 188, 223, 0.5);

}
.page {
  background-color: rgba(171, 188, 223, 0.5);
  height: 100vh;
  text-align: center;
}
.no_favorites{
  position: fixed;
  width: 100%;
  height: 100%;
}
.no_favorites-item{
  margin-top: 30px;
  font-size: 20px;

}
.add{
  text-decoration: none;
  text-align: center;
  width: 400px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 15px;
  color: black;
  font-weight: 600;
  margin-top: 40px;
}

.add:hover{
  text-decoration: underline;
}
.add:active{
  background-color: #6f5c77;
  color: white;
}
</style>