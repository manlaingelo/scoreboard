<template>
  <div class="container">
    <h1>Score Board</h1>
    <hr>
    <div class="score-container">
      <div class="home">
        <h1>Team1</h1>
        <p class="score">{{home}}</p>
        <button @click="home+=1">+</button>
        <button @click="home-=1">-</button>
      </div>
      <div class="timer">
        <h2> {{ countDown }}</h2>
        <h2>{{ timerCount }}</h2>
        <button @click="startTimer">Эхлэх</button>
        <button @click="saveMatch">Хадгалах</button>
      </div>
      <div class="guest">
        <h1>Team2</h1>
        <p class="score">{{guest}}</p>
        <button @click="guest+=1">+</button>
        <button @click="guest-=1">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
require("../firebase.js");
export default {
  name: 'score',
  data(){
    return{
      countDown : 10,
      home: 0,
      guest: 0,
      timerCount: 30
    }
  },
  methods:{
    saveMatch: function(){
      const  matchRef = firebase.database().ref("matches/"+this.$route.params.slug);
      console.log("saving");
      matchRef
              .update({
                homeScore: this.home,
                guestScore: this.guest,
                startedUser: firebase.auth().currentUser.displayName,
                isStarted: true,
              })
              .then((result) => {
                console.log(result);
              });
    },
    startTimer: function(){
        setTimeout(() => {
          this.timerCount--;
        console.log(this.timerCount);

        }, 1000);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  background: #fff;
}
button{
  background: #2c3e50;
  display: inline-block;
  color: #fff;
}
.container{
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width:  100%;
  height: 100%;
}
.score-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.home{
  margin: 1vh 5vh 0 0;
  width: 40%;
}
.guest{
  margin: 1vh 5vh 0 0;
  width: 40%;
}
.score{
  font-size: 15vw;
  font-weight: bold;
  margin-top: 0;
}
.timer{
  display: flex;
  flex-direction: column;
}

</style>
