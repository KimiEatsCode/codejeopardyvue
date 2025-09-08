<template>
    <div class="container-fluid mt-2">

 <h4>  {{ userComputedGame.game_name }}</h4>
 <h4>  {{ userComputedGame.userid_games }}</h4>
 <h4>  {{ userComputedGame.game_score}}</h4>

  <router-link :to="{ path:'/'}"><button type="button" class="btn btn-info mb-3">View List of Users</button></router-link>
<CategoryHeader :userid = "this.userid" :gameid = "this.gameid"  :gamescore = "userComputedGame.game_score"></CategoryHeader>

<!-- <FooterLinks :userid = "this.userid" :gameid = "this.gameid" ></FooterLinks> -->
<footer>
            <p><strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API</p>
<div class="links">

 <!-- <p><button type="button" class="btn btn-info" @click="newGameReset()">Reset Game Score</button></p> -->
 <p>Copyright (c) Sarah Kimi Rettig 2025</p>
</div>
</footer>
</div>
  </template>

  <script>

//import axios from "axios";
import CategoryHeader from "./CategoryHeader.vue";
// import FooterLinks from "./Footer.vue"

  export default {
    name: 'GameBoard',
    //props from the router links
    props: {
     gameid: String,
     userid: String,
     gamename: String,
     gamescore: String
    },
components: {
CategoryHeader,
},
// this.$store.dispatch('yourActionName', {
//   param1: value1,
//   param2: value2
// });
//then in actions in the indexjs store file
//use pass payload and get params from payload as payload.param1, payload.param2
//this is how you pass multiple params to an action

created() {
  this.$store.dispatch("fetchUserGameInfo", { userid: this.userid , gameid:this.gameid});
},

computed: {
userComputedGame() {
  return this.$store.state.userGameInfo;
},
gameName() {
  return this.$store.state.gameName;
},
gameScore() {
return this.$store.state.gameScore;
  },
},
    data() {
      return {


      }
    },

    methods: {
      newGameReset() {
      this.$store.dispatch("setScoreAction",{ userid: this.userid, gameid: this.gameid, score:0});

      this.$store.dispatch("resetUserClues",{ userid: this.userid, gameid: this.gameid });

      location.reload();
    }
  }
}
  </script>





