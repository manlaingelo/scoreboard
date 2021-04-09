<template>
  <div class="container">
    <div class="header-container">
      <small
        >Нэвтэрсэн:
        <span v-if="isLoggedIn">
          {{ currentUser.displayName }}
        </span>
        <span v-else> Guest </span>
      </small>

      <button v-if="isLoggedIn" @click="logOut">logout</button>
      <button v-else @click="logIn">login</button>
    </div>
    <div class="matches">
      <div class="match-list">
        <div class="match-list-header">
          <h3>Тоглолтын түүхүүд</h3>
          <button v-if="isLoggedIn" @click="goCreate()">+</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Эзэн</th>
              <th>Оноо</th>
              <th>:</th>
              <th>Оноо</th>
              <th>Зочин</th>
              <th v-if="isLoggedIn">Төлөв</th>
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
      <div class="match-detail-container">
        <div class="match-list-header">
          <h3>Тоглолтын дэлгэрэнгүй</h3>
        </div>
        <div class="match-detail">
          <div class="team-img">
            <img :src="currentMatch.imgHome" alt="home"/>
            <h1> {{ currentMatch.home }}</h1>
           
          </div>
          <div class="team-img">
            <h1>{{ currentMatch.homeScore }} : {{ currentMatch.guestScore }}</h1>
            <span>Төлөв: {{currentMatch.isStarted ? 'Дууссан' : 'Эхлээгүй' }}</span>
          </div>
          <div class="team-img">
            <img :src="currentMatch.imgGuest" alt="guest" />
            <h1>{{ currentMatch.guest }}</h1>
            
          </div>
        </div>
        <div class="match-footer">
            <span>Хөтөлсөн: {{currentMatch.startedUser ? currentMatch.startedUser : 'Эхлээгүй'}} </span>
            <span>Бүртгэсэн: {{currentMatch.createdUser}} </span>
        </div>
        <button @click="updateMatch(currentMatch)">Засах</button>
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
    updateMatch: function (match) {
      // console.log(match);
      this.$router.push("/update/" + match.id);
    },
    goCreate: function () {
      this.$router.push("/create");
    },
    logOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => this.$notify({
          group: "foo",
          type: "success",
          text: "Logged out",
        }))
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
            this.currentMatch = {id: key, ...obj[key]}
            matches.push({
              id: key,
              guest: obj[key].guest,
              guestScore: obj[key].guestScore,
              home: obj[key].home,
              homeScore: obj[key].homeScore,
              imgGuest: obj[key].imgGuest,
              imgHome: obj[key].imgHome,
              startedUser: obj[key].startedUser,
              createdUser: obj[key].createdUser,
              isStarted: obj[key].isStarted,
            });
          }
          this.matches = matches;
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

<style scoped>
* {
  border-radius: 15px 15px 15px 15px;
  color: #2c3e50;
}
small {
  margin: 4vh 4vh 0vh 4vh;
}
h3 {
  margin: 1rem 0rem 1rem 2rem;
  display: flex;
  justify-content: flex-start;
  
}
p {
  font-size: 1.8vw;
  font-weight: bold;
  word-spacing: 3vw;
}
hr {
  border-bottom: 1px solid #2c3e50;
  border-radius: 0;
}
img {
  width: 20vh;
  height: 20vh;
  border-radius: 50%;
}
button {
  color: #d3d3d3;
  border-radius: 5px ;
  display: inline-block;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #f7f7ff;
  max-height: 85vh;
  min-height: 80vh;
  position: relative;
  color: #d3d3d3;
  /* overflow: auto; */
}
.matches {
  position: absolute;
  top: 10vh;
  bottom: 5vh;
  margin: 1em;
  /* padding: 0rem 0rem 1rem 0rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
.match-list {
  padding: 1rem;
  /* margin-right: 2rem; */
  background: #fff;
  min-width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 5px 5px 20px -7px #141414;
  position: relative;
  top: 0;
  background: #fff;
  overflow: auto;
}
.match-detail-container {
  /* min-width: 35%; */
  background: #f7f7f7;
  box-shadow: 5px 5px 20px -7px #141414;
  position: relative;
  background: #fff;
  top: 0;
}
.match-detail {
  margin: 2rem;
  display:flex;
  flex-direction: row;
  justify-content: center;
  width: 90%; 
  /* margin: 0; */
  padding: 0;
}
.match-detail button {
  margin: 2rem;
}
.match-list-header button {
  width: 5vh;
  height: 5vh;
  margin: 0;
  border-radius: 50%;
}
.match-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid 2px #c0c0c0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #fff;
  margin-bottom: 2vh;
}


.team-img{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.match-footer{
  display: flex;
  flex-direction: column;
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

::-webkit-scrollbar {
  width: 10px;
  border-radius: 5px;
  margin: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
  background: #888; 
}
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
@media only screen and (max-width:500px) {
  /* For mobile phones: */
  .match-detail-container {
    display: none;
  }
  .match-list{
    margin-right: 2rem;
    padding: 0;
  }
  .matches{
    display: flex;
    flex-direction: column;
  }
  span{
    font-size: 10px;
    word-break: break-all;
    overflow-wrap: break-word;
    margin-top: 5vw;
    word-spacing: 1px;
  }
}
</style>
