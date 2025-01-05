<template>
    <div class="container-fluid mt-5">

 <h4>  {{ userGameInfo }}</h4>
<CategoryHeader :gameid = this.gameid></CategoryHeader>

<FooterLinks></FooterLinks>

</div>
  </template>

  <script>

import axios from "axios";

import CategoryHeader from "./CategoryHeader.vue";
import FooterLinks from "./Footer.vue"

  export default {
    name: 'GameBoard',
    props: {
     gameid: String,
      userid: String
    },
components: {
CategoryHeader,
FooterLinks
},
// this.$store.dispatch('yourActionName', {
//   param1: value1,
//   param2: value2
// });
//then in actions in the indexjs store file
//use pass payload and get params from payload as payload.param1, payload.param2

    data() {
      return {
        userGameInfo: axios
        .get(`${this.$store.state.url}/api/games/${this.userid}/${this.gameid}`)
        .then((res) => {
          // console.log("clues on category clues file " + JSON.stringify(res.data));
          if (res.data === "") {
            console.log(
              "Game clues data response is EMPTY "
            );
          } else {
            this.$store.state.userGameInfo = res.data;

            return (this.userGameInfo = res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        }),

      }
    },

    methods: {
      newGameReset() {
        console.log('test new game reset function gameboard clicked ' + this.$store.state.gameid)
        this.$store.dispatch("resetClues");
        this.$store.dispatch("setScoreAction", { gameid: this.gameid, score: 0 });
        location.reload();
      }
    }
  }

  </script>





