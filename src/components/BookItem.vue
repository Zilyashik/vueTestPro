<template>
  <div class="book">
    <img class="book_img" v-bind:src=image alt="be">
    <hr>
    <div class="book_item"><strong>Название:</strong> {{ book.name }}</div>
    <div class="book_item"><strong>Описание:</strong> {{book.desc}}</div>
    <div class="book_item">
      <strong>Автор: </strong>
      <router-link :to="{name: 'authorPage', params: {id: this.book.author_id}}" class="book_item-author">{{authorName}}</router-link>
    </div>
    <router-link :to="{name: 'bookPage', params: {id: this.book.id}}" class="book_item-more">Подробнее</router-link>
  </div>
</template>

<script>
import {HTTP} from "@/api/http-common";
import booksImage from "@/assets/books.png";

export default {
  props: ['book'],
  data() {
    return {
      authorName: '',
      image: '',
    }
  },
  mounted() {
    if (this.book.image === null) {
      this.image = booksImage;
    } else {
      this.image = this.book.image;
    }

    HTTP.get('api/authors/' + this.book.author_id)
        .then(responce => {
          this.authorName = responce.data.data.name;
        })
        .catch(e => {
          console.error(e);
        })
  }
}
</script>

<style scoped>
  .book{
    display: flex;
    flex-direction: column;
    margin: 35px 30px 10px 35px;
    padding: 20px;
    background-color: lavenderblush;
    width: 700px;
    border-radius: 15px;
  }
  .book_img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
  .book_item{
    line-height: 35px;
    text-align: left;
  }
  .book_item-author,
  .book_item-more{
    text-decoration: none;
    color: black;
  }
  .book_item-author:hover,
  .book_item-more:hover{
    text-decoration: underline;
  }
  .book_item-author:active,
  .book_item-more:active{
    color: white;
    background-color: #6f5c77;
    text-decoration: none;
  }
  .book_item-more{
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 600;
    width: 150px;
    margin-left: 40%;
  }
</style>