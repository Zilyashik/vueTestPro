<template>
  <div>
    <navbar />
    <div class="authorPage">
      <div class="author_about">
        <img class="author_img" v-if="author.image !== null" v-bind:src=author.image alt="author">
        <img class="author_img" v-else v-bind:src=authorImage alt="author">
        <input type="file" accept="image/*" @change="changeImage($event)" class="chose">
        <div class="author_item"><strong>Имя:</strong> {{ author.name }}</div>
        <div class="author_item"><strong>Биография:</strong> {{author.bio}}</div>
        <div class="author_item"><strong>Дата рождения:</strong> {{author.birth_date}}</div>
        <div class="author_item"><strong>Дата смерти:</strong> {{author.died_date}}</div>
        <router-link :to="{name: 'authorBooks', params: {id: this.author.id}}" class="nav_item">Другие книги этого автора</router-link>
        <router-link :to="{name: 'authorUpdatePage', params: {id: this.author.id}}" class="nav_item">Редактировать</router-link>
        <button @click="deleteAuthor" class="author_item-delete">Delete</button>
    </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbarComponent";
import {HTTP} from "@/api/http-common";
import authorImage from "@/assets/writer.png";

export default {
  components: {
    navbar
  },
  data() {
    return {
      author: {},
      authorImage: authorImage
    }
  },
  mounted() {
    HTTP.get('api/authors/' + this.$route.params.id)
        .then(responce => {
          this.author = responce.data.data;
        })
        .catch(e => {
          console.error(e);
        })
  },
  methods: {
    deleteAuthor() {
      HTTP.delete('api/authors/' + this.author.id)
          .then((responce) => {
            console.log(responce)
            this.$router.push({name: 'authors'});
          })
          .catch(e => {
            console.error(e.message);
          })
    },
    changeImage(event) {
      let data = new FormData();
      data.append('file', event.target.files[0]);

      let config = {
        header: {
          'Content-Type' : 'image/png'
        }
      };

      HTTP.post('api/authors/' + this.author.id + '/upload-image', data, config)
          .then(responce => {
            this.author.image = responce.data.data.image;
          })
          .catch(e => {
            console.error(e.message);
          })
    }
  }
}
</script>

<style scoped>
.authorPage{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(171, 188, 223, 0.5);
}
.author_about{
  display: flex;
  flex-direction: column;
  margin: 35px 30px 10px 35px;
  padding: 20px;
  background-color: lavenderblush;
  width: 700px;
  border-radius: 15px;
}
.author_item{
  line-height: 25px;
  margin-bottom: 15px;
}
.author_img{
  width: 100px;
  height: 100px;
}
.nav_item{
  text-decoration: none;
  color: black;
  text-align: center;
  width: 250px;
  font-size: 18px;
  margin-bottom: 15px;
  border-radius: 15px;
}
.author_item-delete{
  color: white;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 15px;
  width: 150px;
  background-color: rgba(141, 120,150, 0.5);
}
.author_item-delete:hover,
.nav_item:hover{
  text-decoration: underline;
}
.author_item-delete:active,
.nav_item{
  color: white;
  background-color: #6f5c77;
  text-decoration: none;
}
.chose{
  color: white;
  font-size: 14px;
  font-weight: 600;
  width: 250px;
  background-color: rgba(141, 120,150, 0.7);
  margin-top: 25px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 0;
  text-decoration: none;
}

</style>