<template>
  <div class="container">
    <h1>Let's create a new match!</h1>
    <input type="text" v-model="home" placeholder="Эзэн" />
    <br />
    <input type="file" name="home" v-on:change="onChange" />
    <br />
    <input type="text" v-model="guest" placeholder="Зочин" />
    <br />
    <input type="file" name="guest" v-on:change="onChange" />
    <br />
    <button @click="createMatch">Create</button>
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
      createdId: "",
      img: {
        home: "",
        guest: "",
      },
    };
  },
  methods: {
    async uploadImg(file) {
      console.log(file);
      var storageRef = firebase.storage().ref();
      var pathReference = storageRef.child('images/'+file.name);
      await pathReference.put(file).then((snapshot)=>{
        console.log("uploaded")
      })
      return pathReference
        .getDownloadURL()
        .then((url) => {
          return url;
        });
    },
    createMatch() {
      this.uploadImg(this.img.home).then((urlHome) => {
        this.uploadImg(this.img.guest).then((urlGuest) => {
          try {
            console.log("datas:::::", this.home, this.guest, urlGuest, urlHome);
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
      if (e.target.name === "home") {
        this.img.home = e.target.files[0];
      } else {
        this.img.guest = e.target.files[0];
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: #646464;
}
button {
  width: 15vh;
  margin-left: 50%;
}
.container{
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 2rem;
  margin: 1rem;
  padding: 2rem;
}
</style>
