<template>
  <div class="container">
    <h1>Score Board</h1>
    <hr />
    <div class="score-container">
      <div class="home">
        <img :src="match.imgHome" alt="home" />
        <h1>{{ match.home }}</h1>
        <p class="score">{{ home }}</p>
        <button @click="home += 1">+</button>
        <button v-if="home > 0" @click="home -= 1">-</button>
      </div>
      <div class="timer">
        <button @click="saveMatch">Хадгалах</button>
      </div>
      <div class="guest">
        <img :src="match.imgGuest" alt="guest" />
        <h1>{{ match.guest }}</h1>
        <p class="score">{{ guest }}</p>
        <button @click="guest += 1">+</button>
        <button v-if="guest > 0" @click="guest -= 1">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
require("../firebase.js");
export default {
  name: "score",
  data() {
    return {
      home: 0,
      guest: 0,
      match: {},
    };
  },
  methods: {
    saveMatch: function () {
      const matchRef = firebase
        .database()
        .ref("matches/" + this.$route.params.slug);
      matchRef
        .update({
          homeScore: this.home,
          guestScore: this.guest,
          startedUser: firebase.auth().currentUser.displayName,
          isStarted: true,
        })
        .then((result) => {
          console.log(result);
          this.$notify({
          group: "foo",
          type: "success",
          text: "Тоглолт дууслаа",
        });
          this.$router.push('/');
        });
    },
  },
  created() {
    firebase
      .database()
      .ref("matches/" + this.$route.params.slug)
      .on("value", (snapshot) => {
        this.match = snapshot.val();
      });
  },
};
</script>

<style scoped>
* {
  background: #fff;
}
button {
  background: #2c3e50;
  display: inline-block;
  color: #fff;
  height: 5vh;
}
.container {
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.score-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.home {
  margin: 1vh 5vh 0 0;
  width: 40%;
}
.guest {
  margin: 1vh 5vh 0 0;
  width: 40%;
}
.score {
  font-size: 15vw;
  font-weight: bold;
  margin: 0 0 7vw 0;
}
.timer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.img-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
img {
  width: 15vh;
  height: 7vh;
  border-radius: 2vw;
  padding: 2vh;
  margin-right: 20vh;
  margin-left: 20vh;
}
</style>
