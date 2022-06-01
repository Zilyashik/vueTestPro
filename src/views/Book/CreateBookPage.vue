<template>
  <div class="create_book">
    <navbar />
    <form @submit.prevent="onSubmit" class="create_book-form">
      <input type="text" v-model="name" class="create_book-item" placeholder="ФИО">
      <select v-model="author_id" class="create_book-item" placeholder="Автор">
        <option
            v-for="author of authors"
            :key="author.id"
            v-bind:value=author.id
        >
          {{author.name}}
        </option>
      </select>
      <textarea v-model="desc" class="create_book-item"></textarea>
      <input type="date" v-model="publication_date" placeholder="Дата публикации" class="create_book-item">
      <button type="submit" class="create_book-save">Сохранить</button>
    </form>
  </div>
</template>

<script>
import navbar from "@/components/navbarComponent"
import {HTTP} from "@/api/http-common";

export default {
  components: {
    navbar
  },
  data() {
    return {
      authors: [],
      name: '',
      author_id: '',
      desc: '',
      publication_date: ''
    }
  },
  mounted() {
    HTTP.get('api/authors')
      .then(responce => {
        this.authors = responce.data.data;
      })
      .catch(e => {
        console.error(e.message)
      })
  },
  methods: {
    onSubmit() {
      let body = {
        "name": this.name,
        "author_id": this.author_id,
        "desc": this.desc,
        "publication_date": this.publication_date
      };

      HTTP.post('api/books', body)
          .then(responce => {
            this.$router.push({name: 'bookPage', params: {id: responce.data.data.id}});
          })
          .catch(e => {
            console.error(e)
          })
    }
  }
}
</script>

<style scoped>
.create_book{
  background-color: rgba(171, 188, 223, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
}
.create_book-form{
  display: flex;
  flex-direction: column;
  background-color: lemonchiffon;
  margin: 30px auto;
  border-radius: 0;
}
.create_book-item{
  width: 250px;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px;
  line-height: inherit;
  box-shadow: 0 0 4px rgba(0,0,0,0.3);
  transition: 0.3s box-shadow;
}
.create_book-save{
  text-decoration: none;
  color: white;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  width: 170px;
  background-color: salmon;
  border: none;
  height: 40px;
}
.create_book-save:hover{
  text-decoration: underline;
  color: white;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 600;
  width: 170px;
  background-color: salmon;
  border: none;
  height: 40px;
  box-shadow: 0 0 7px rgba(0,0,0,0.4);
}
.create_book-save:active{
  text-decoration: none;
  color: white;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 600;
  width: 170px;
  background-color: salmon;
  border: none;
  height: 40px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
}
</style>