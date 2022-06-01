<template>
  <div class="book_page">
      <navbar />
      <div class="book_about">
          <img class="book_img" v-bind:src=book.image alt="not">
          <input type="file" accept="image/*" @change="changeImage($event)" class="chose" >
          <hr>
          <div class="book_item"><strong>Название:</strong> {{ book.name }}</div>
          <div class="book_item"><strong>Описание:</strong> {{book.desc}}</div>
          <div class="book_item">
            <strong>Автор: </strong>
            <router-link :to="{name: 'authorPage', params: {id: this.book.author_id}}" class="book_about-author"> {{authorName}}</router-link>
          </div>
        <div class="buttons">
            <router-link :to="{name: 'bookUpdatePage', params: {id: this.book.id}}" class="nav_item">Редактировать</router-link>
            <button @click="deleteBook" class="book_item-delete">Удалить книгу</button>
            <button
                v-bind:class="{active: button.active}"
                @click="changeFavorite">
              {{ button.active ? 'Удалить из избранных' : 'Добавить в избранные'}}
            </button>
        </div>
      </div>
  </div>
</template>

<script>
import {HTTP} from "@/api/http-common";
import navbar from "@/components/navbarComponent";
import booksImage from "@/assets/books.png";

export default {
  components: {
    navbar
  },
  data() {
    return {
      book: {},
      authorName: '',
      button: {
        active: false
      }
    }
  },
  mounted() {
    HTTP.get('api/books/' + this.$route.params.id)
        .then(responce => {
          this.book = responce.data.data;
          if (this.book.image === null) {
            this.book.image = booksImage;
          }
          HTTP.get('api/authors/' + this.book.author_id)
              .then(responce => {
                this.authorName = responce.data.data.name;
              })
              .catch(e => {
                console.error(e);
              })
        })
        .catch(e => {
          console.error(e);
        })

    HTTP.get('api/favorite-books')
      .then(responce => {
        let book = responce.data.data.find(elem => elem.id === this.$route.params.id);
        this.button.active = !!book;
      })
      .catch(e => {
        console.error(e.message);
      })
  },
  methods: {
    changeFavorite() {
      if (this.button.active === false) {
        HTTP.post('api/books/' + this.book.id + '/add-to-favorites')
          .then()
          .catch(e => {
            console.error(e.message);
          })
      } else {
        HTTP.post('api/books/' + this.book.id + '/remove-from-favorites')
            .then()
            .catch(e => {
              console.error(e.message);
            })
      }

      this.button.active = !this.button.active;
    },
    deleteBook() {
      HTTP.delete('api/books/' + this.book.id)
        .then(() => {
          this.$router.push({name: 'books'});
        })
        .catch(e => {
          console.error(e.message)
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

      HTTP.post('api/books/' + this.book.id + '/upload-image', data, config)
          .then(responce => {
            this.book.image = responce.data.data.image;
          })
          .catch(e => {
            console.error(e.message);
          })
    }
  }
}
</script>

<style scoped>
.book_page{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(171, 188, 223, 0.5);
}
.book_about{
  display: flex;
  flex-direction: column;
  margin: 35px 30px 10px 35px;
  padding: 20px;
  background-color: lavenderblush;
  width: 700px;
  border-radius: 15px;
}
.book_item{
  line-height: 25px;
  margin-bottom: 15px;
}
.book_about-author{
  text-decoration: none;
  color: black;
}
.book_about-author:hover, button{
  text-decoration: underline;
}
.book_about-author:active{
  color: white;
  background-color: #6f5c77;
  text-decoration: none;
}
.book_img {
  width: 100px;
  height: 100px;
}
.book_item-delete{
  color: white;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 15px;
  width: 200px;
  background-color: rgba(141, 120,150, 0.5);
}
.book_item-delete:hover,
.nav_item:hover{
  text-decoration: underline;
}
.nav_item{
  text-decoration: none;
  color: white;
  text-align: center;
  width: 200px;
  font-size: 18px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: #6f5c77;
}
.buttons{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
button{
  color: white;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 15px;
  width: 190px;
  background-color: rgba(141, 120,150, 0.5);
  cursor: pointer;
  margin-bottom: 20px;
  text-decoration: none;
}
button:active{
  color: white;
  background-color: #6f5c77;
  text-decoration: none;
}
.active {
  color: white;
  background-color: salmon;
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
  text-decoration: none;
}
</style>