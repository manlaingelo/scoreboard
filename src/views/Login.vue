<template>
  <div>
    <h1>Login</h1>
    <button @click="login">Facebook login</button>
  </div>
</template>

<script>
import firebase from "firebase";
require("../firebase.js");
export default {
  name: "login",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        currentUser: {},
      },
    };
  },
  methods: {
    login: async function () {
      try {
        var provider = new firebase.auth.FacebookAuthProvider();
        const user = await firebase.auth().signInWithPopup(provider);
        this.currentUser = user;
        this.$store.commit("setIsLoggedIn");
        this.$router.push("/");
        this.$notify({
          group: "foo",
          type: "success",
          text: "Амжилттай нэвтэрлээ!!!",
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  beforeCreate() {
    const user = firebase.auth().currentUser;
    if (this.$store.state.isLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped></style>
