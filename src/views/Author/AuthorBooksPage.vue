<template>
  <div>
    <navbar />
    <ul class="book_page" v-if="books.length > 0">
      <bookItem
          v-for="book in books"
          :key = "book.id"
          v-bind:book = "book"
      />
    </ul>
    <div class="no_books" v-else>
      У данного автора пока что нет книг
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
    HTTP.get('api/authors/'+ this.$route.params.id +'/books')
        .then(responce => {
          this.books = responce.data.data;
        })
        .catch(e => {
          console.error(e);
        })
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
.no_books {
  background-color: rgba(171, 188, 223, 0.5);
  height: 100vh;
  text-align: center;
  padding-top: 30px;
}
</style>