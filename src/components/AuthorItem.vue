<template>
  <div class="author" @click="toAuthor">
    <img class="author_img" v-if="author.image !== null" v-bind:src=author.image alt="author">
    <img class="author_img" v-else v-bind:src=authorImage alt="author">
    <hr>
    <div class="author_item"><strong>Имя:</strong> {{ author.name }}</div>
    <div class="author_item"><strong>Биография:</strong> {{author.bio}}</div>
    <div class="author_item"><strong>Дата рождения:</strong> {{author.birth_date}}</div>
    <div class="author_item"><strong>Дата смерти:</strong> {{author.died_date}}</div>
    <router-link :to="{name: 'authorPage', params: {id: this.author.id}}" class="author_item-more">Подробнее</router-link>
  </div>
</template>

<script>
import authorImage from "@/assets/writer.png";

export default {
  props: ['author'],
  data() {
    return {
      authorImage: authorImage,
      image: {}
    }
  }
}
</script>

<style scoped>
.author{
  display: flex;
  flex-direction: column;
  margin: 35px 30px 10px 35px;
  padding: 20px;
  background-color: lavenderblush;
  width: 700px;
  border-radius: 15px;
  cursor: pointer;
}
.author_img {
  width: 50px;
  height: 50px;
}
.author_item {
  line-height: 25px;
}
.author_item-more{
  text-decoration: none;
  color: black;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  width: 150px;
  margin-left: 40%;
}
.author_item-more:hover{
  text-decoration: underline;
}
.author_item-more:active{
  color: white;
  background-color: #6f5c77;
  text-decoration: none;
}
</style>