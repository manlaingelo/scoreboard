<template>
  <div class="container">
    <div class="header-container">
      <span
        >Нэвтэрсэн:
        <span v-if="isLoggedIn">
          {{ currentUser.displayName }}
        </span>
        <span v-else> Guest </span>
      </span>

      <button v-if="isLoggedIn" @click="logOut">logout</button>
      <button v-else @click="logIn">login</button>
    </div>
    <div class="matches">
      <div class="match-list">
        <div class="matches-list-header">
          <h3>Тоглолтын түүхүүд</h3>
          <button v-if="isLoggedIn" @click="goCreate()">+</button>
        </div>
        <!-- <p>{{tableData}}</p> -->
        <table>
          <thead>
            <tr>
              <th>Эзэн</th>
              <th>Оноо</th>
              <th>:</th>
              <th>Оноо</th>
              <th>Зочин</th>
              <th v-if="isLoggedIn">Эхлэх</th>
              <th>Харах</th>
              <th v-if="isLoggedIn">Устгах</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in matches" :key="data.id">
              <td>{{ data.home }}</td>
              <td>{{ data.homeScore }}</td>
              :
              <td>{{ data.guestScore }}</td>
              <td>{{ data.guest }}</td>
              <!-- <td >{{data.date}}</td> -->
              <td v-if="isLoggedIn">
                <span v-if="data.isStarted">Дууссан</span>
                <button
                  v-else
                  :disabled="data.isStarted"
                  @click="startMatch(data)"
                >
                  Эхлүүлэх
                </button>
              </td>
              <td><button @click="lookMatch(data)">Харах</button></td>
              <td v-if="isLoggedIn">
                <button  @click="deleteMatch(data)">
                  Устгах
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="match-detail-container" v-if="currentMatch !== {}">
        <h3>Тоглолтын дэлгэрэнгүй</h3>
        <div class="match-detail">
          <p>
            {{ currentMatch.home }}
            <img :src="currentMatch.imgHome" alt="home" />
            =
            <img :src="currentMatch.imgGuest" alt="guest" />
            {{ currentMatch.guest }}
          </p>
          <hr />
          <h1>{{ currentMatch.homeScore }} | {{ currentMatch.guestScore }}</h1>
          <hr />
          <h1>Эзэн = Зочин</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
require("../firebase.js");
const database = firebase.database();
export default {
  name: "HistoryTable",

  data() {
    return {
      matches: [],
      currentMatch: {},
      currentUser: {},
      isLoggedIn: false,
    };
  },
  methods: {
    lookMatch: function (match) {
      this.currentMatch = match;
    },
    deleteMatch: function (match) {
      database
        .ref("matches/" + match.id)
        .remove()
        .then((result) => {
          this.getData();
        });
    },
    startMatch: function (match) {
      this.$router.push("/score/" + match.id);
    },
    goCreate: function () {
      this.$router.push("/create");
    },
    logOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("logged out"))
        .catch((err) => console.log(err.message));
      localStorage.removeItem("isLoggedIn");
      window.location.reload(false);
    },
    logIn: function () {
      this.$router.push("/login");
    },
    getData: function () {
      database
        .ref("matches")
        .once("value")
        .then((data) => {
          const matches = [];
          const obj = data.val();
          for (let key in obj) {
            this.currentMatch = obj[key];
            matches.push({
              id: key,
              guest: obj[key].guest,
              guestScore: obj[key].guestScore,
              home: obj[key].home,
              homeScore: obj[key].homeScore,
              imgGuest: obj[key].imgGuest,
              imgHome: obj[key].imgHome,
              isStarted: obj[key].isStarted,
            });
          }
          this.matches = matches;
          console.log(matches)
          this.currentUser = firebase.auth().currentUser;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  created() {
    this.isLoggedIn = this.$store.state.isLoggedIn;
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  border-radius: 15px 15px 15px 15px;
  color: #1a1a1a;
}
span {
  color: #2c3e50;
  margin: 4vh;
}
h3 {
  margin: 1rem 0rem 1rem 2rem;
  display: flex;
  justify-content: flex-start;
}
h1 {
  word-spacing: 4.5vw;
}
p {
  font-size: 1.8vw;
  font-weight: bold;
}
hr {
  border-bottom: 1px solid #2c3e50;
  border-radius: 0;
}
img {
  width: 7vh;
  height: 4vh;
  border-radius: 2px;
}
button {
  width: 5vh;
  background: #0d2669;
  border: 0px solid #fff;
  border-radius: 7px;
  color: #d3d3d3;
}
h3 button {
  border-radius: 2px;
  margin-right: 1vh;
}
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #eeeeee;
  max-height: 85vh;
  min-height: 80vh;
  position: relative;
  color: #d3d3d3;

  /* overflow: hidden; */
}
.matches {
  position: absolute;
  top: 10vh;
  margin: 1em;
  /* padding: 0rem 2rem 5rem 2rem; */
  display: flex;
  flex-direction: row;
  width: 100%;
}
.match-list {
  padding: 1rem;
  margin-right: 2rem;
  background: #f7f7f7;
  min-width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 5px 5px 20px -7px #141414;
}

.matches-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #2c3e50;
  border-radius: 0;
  margin-bottom: 1vh;
}
.match-detail-container {
  min-width: 35%;
  min-height: 65vh;
  background: #f7f7f7;
  box-shadow: 5px 5px 20px -7px #141414;
  /* display: none; */
}
.match-detail {
  margin: 2rem;
  display: inline-block;
  width: 90%;
  height: 90%;
  margin: 0;
  padding: 0;
  justify-content: center;
}
.header-container {
  height: 10vh;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.header-container button {
  width: 7vh;
  height: 4vh;
}
</style>
