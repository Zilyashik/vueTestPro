<template>
  <div class="create_author">
    <navbar />
    <form @submit.prevent="onSubmit" class="create_author-form">
      <input type="text" v-model="name" class="create_author-item" placeholder="ФИО">
      <textarea v-model="bio" class="create_author-item" placeholder="">Биография</textarea>
      <input type="date" v-model="birth_date" placeholder="Дата рождения" class="create_author-item">
      <button type="submit" class="create_author-save">Сохранить</button>
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
      name: '',
      bio: '',
      birth_date: ''
    }
  },
  methods: {
    onSubmit() {
      let body = {
        "name": this.name,
        "bio": this.bio,
        "birth_date": this.birth_date
      };

      HTTP.post('api/authors', body)
      .then(responce => {
        this.$router.push({name: 'authorPage', params: {id: responce.data.data.id}});
      })
      .catch(e => {
        console.error(e)
      })
    }
  }
}
</script>

<style scoped>
.create_author{
  background-color: rgba(171, 188, 223, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
}
.create_author-form{
  display: flex;
  flex-direction: column;
  background-color: lemonchiffon;
  margin: 30px auto;
  border-radius: 0;
}
.create_author-item{
  width: 250px;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px;
  line-height: inherit;
  box-shadow: 0 0 4px rgba(0,0,0,0.3);
  transition: 0.3s box-shadow;
}
.create_author-save{
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
.create_author-save:hover{
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
.create_author-save:active{
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