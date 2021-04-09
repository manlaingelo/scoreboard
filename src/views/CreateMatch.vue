<template>
  <div class="container">
    <h1>Шинээр тоглолт нэмэх</h1>
    <label for="home">Эзэн багын нэр:</label>
    <input type="text" name="home" v-model="home" placeholder="Эзэн" />
    <br />
    <label for="imgHome">Эзэн багын зураг оруулах:</label>
    <input type="file" name="imgHome" v-on:change="onChange" />
    <br />
    <label for="home">Зочин багын нэр:</label>
    <input type="text" name="guest" v-model="guest" placeholder="Зочин" />
    <br />
    <label for="imgGuest">Зочин багын зураг оруулах:</label>
    <input type="file" name="imgGuest" v-on:change="onChange" />
    <br />
    <button @click="createMatch">Нэмэх</button>
  </div>
</template>

<script>
import firebase from "firebase";
require("../firebase.js");
let matchesRef = firebase.database().ref("matches");
export default {
  name: "create",
  firebase: {
    matches: matchesRef,
  },
  data() {
    return {
      home: "",
      guest: "",
      img: {
        home: "",
        guest: "",
      },
    };
  },
  methods: {
    async uploadImg(file) {
      var storageRef = firebase.storage().ref();
      var pathReference = storageRef.child('images/'+file.name);
      await pathReference.put(file).then((snapshot)=>{
        console.log("uploaded")
      })
      return await pathReference
        .getDownloadURL()
        .then((url) => {
          return url;
        });
    },
    createMatch() {
      this.uploadImg(this.img.home).then((urlHome) => {
        this.uploadImg(this.img.guest).then((urlGuest) => {
          try {
            matchesRef
              .push({
                home: this.home,
                guest: this.guest,
                imgHome: urlHome,
                imgGuest: urlGuest,
                homeScore: 0,
                guestScore: 0,
                createdUser: firebase.auth().currentUser.displayName,
                isStarted: false,
              })
              .then((result) => {
                console.log(result);
                // this.home = "";
                // this.guest = "";
                // this.img = {
                //   home: "",
                //   guest: "",
                // };
              });
          } catch (error) {
            console.log("error", error);
          }
        });
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
};
</script>

<style scoped>
* {
  color: #646464;
}

label{
  margin-bottom: 0.5vw;
  display: flex;
  justify-content: flex-start;
}
button {
  width: 15vh;
  height: 5vh;
  color: #d3d3d3;
  margin-left: 50%;
}
.container{
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  margin: 1rem;
  padding: 2rem;
}
</style>
