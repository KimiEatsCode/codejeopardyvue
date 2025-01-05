<template>

      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">

  <div class="list-group">

    <div v-for="game in userComputedGames" v-bind:key="game.game_id">
  
    <router-link :to="{ name:'gameboard', params: { userid: this.userid ,  gameid: game.game_id}}">


        <div class=" gap-2 w-100 justify-content-between list-group-item-action gap-3 py-3" aria-current="true">
        <div>
          <h4 class="page-title">{{  game.game_name }}</h4>

        </div>

        <h6 class="text-bold opacity-50 text-nowrap rounded-circle">{{ game.game_score}}</h6>

   <div class="col-8">
   <h6 class="description">
      {{  game.game_description }}
    </h6>
  </div>

  </div>
</router-link>
<hr>
</div>

  </div>

    </div>
    <FooterLinks></FooterLinks>
  </template>

  <script>
// import axios from "axios";
import FooterLinks from "./Footer.vue"

  export default {
    name: "GamesList",
    props: {
      userid: Number
  },
  mounted() {
  this.$store.dispatch("fetchUserGames", this.userid);
},

components: {
  FooterLinks
},
computed: {
userComputedGames() {
  return this.$store.state.userGames
}
  },
    data() {
      return {
        getResponse: false,
        id: this.userid,

    };
  },

    methods: {

}
  }
  </script>

  <style>
.description {
text-align:left;
}
  </style>
