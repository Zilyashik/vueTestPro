<template>
  <div class="update_author">
    <navbar />
    <form @submit.prevent="onSubmit" class="update_author-form">
      <input type="text" v-model="name" class="update_author-item">
      <textarea v-model="bio" class="update_author-item"></textarea>
      <input type="date" v-model="birth_date" class="update_author-item">
      <button type="submit" class="update_author-save">Сохранить</button>
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
      id: '',
      name: '',
      bio: '',
      birth_date: ''
    }
  },
  mounted() {
    HTTP.get('api/authors/' + this.$route.params.id)
        .then(responce => {
          let author = responce.data.data;
          this.id = author.id;
          this.name = author.name;
          this.bio = author.bio;
          this.birth_date = author.birth_date;
        })
        .catch(e => {
          console.error(e);
        })
  },
  methods: {
    onSubmit() {
      let body = {
        "name": this.name,
        "bio": this.bio,
        "birth_date": this.birth_date
      };

      HTTP.patch('api/authors/' + this.id, body)
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
.update_author{
  background-color: rgba(171, 188, 223, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
}
.update_author-form{
  display: flex;
  flex-direction: column;
  background-color: lemonchiffon;
  margin: 30px auto;
  border-radius: 0;
}
.update_author-item{
  width: 250px;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px;
  line-height: inherit;
  box-shadow: 0 0 4px rgba(0,0,0,0.3);
  transition: 0.3s box-shadow;
}
.update_author-save{
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
.update_author-save:hover{
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
.update_author-save:active{
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