<template>
  <div class="container">
    <h1>Тоглолт засах</h1>
    <label for="home">Эзэн багын нэр:</label>
    <input type="text" name="home" v-model="match.home" placeholder="Эзэн" />
    <br />
    <label for="homeScore">Эзэн багын оноо:</label>
    <input
      type="text"
      name="home"
      v-model="match.homeScore"
      placeholder="Эзэн"
    />
    <br />
    <label for="imgHome">Эзэн багын зураг оруулах:</label>
    <input type="file" name="imgHome" v-on:change="onChange" />
    <br />
    <label for="guest">Зочин багын нэр:</label>
    <input type="text" name="guest" v-model="match.guest" placeholder="Зочин" />
    <br />
    <label for="guestScore">Эзэн багын оноо:</label>
    <input
      type="text"
      name="home"
      v-model="match.guestScore"
      placeholder="Эзэн"
    />
    <br />
    <label for="imgGuest">Зочин багын зураг оруулах:</label>
    <input type="file" name="imgGuest" v-on:change="onChange" />
    <br />
    <label for="isStarted">Төлөв:</label>
    <select v-model="match.isStarted" name="isStarted">
      <option v-bind:value="false">Эхлээгүй</option>
      <option v-bind:value="true">Дууссан</option>
    </select>
    <button @click="updateMatch">Засах</button>
  </div>
</template>

<script>
import firebase from "firebase";
require("../firebase.js");
export default {
  name: "score",
  data() {
    return {
      match: {},
      img: {
        home: "",
        guest: "",
      },
    };
  },
  methods: {
    updateMatch: function () {
      const matchRef = firebase
        .database()
        .ref("matches/" + this.$route.params.slug);
      matchRef
        .update({
          homeScore: this.match.homeScore,
          guestScore: this.match.guestScore,
          isStarted: this.match.isStarted,
          home: this.match.home,
          guest: this.match.guest,
        })
        .then(() => {
        //   console.log(result);
          this.$notify({
          group: "foo",
          type: "success",
          text: "Тоглолт Засагдлаа",
        });
          this.$router.push("/");
        });
    },
    onChange(e) {
      if (e.target.name === "imgHome") {
        this.img.home = e.target.files[0];
      } else {
        this.img.guest = e.target.files[0];
      }
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
  color: #646464;
  border: none;
  outline: none;
}

label {
  margin-bottom: 0.5vw;
  display: flex;
  justify-content: flex-start;
}
select {
  margin: 1vh;
}
input {
  margin: 1vh;
}
button {
  width: 15vh;
  height: 5vh;
  color: #d3d3d3;
  align-self: center;
}
.container {
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  margin: 1rem;
  padding: 2rem;
}
</style>
