<template>
  <div class="grid-body">
<div class="grid-header">

    <div
      class="grid-headings"
      v-for="(category, index) in categories"
      v-bind:key="index"
    > {{ category.category_name }}
    </div>
  </div>
<div class="grid-clues-container">
    <div class="grid-clues" v-for="category in categories" v-bind:key="category.category_id">
      <CategoryClues gamescore="game.game_score" :categoryid="category.category_id" :catname="category.category_name" />
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryClues from "./CategoryClues.vue";


export default {

  name: "CategoryHeader",
  props: {
    gameid: String,

  },
  components: {
     CategoryClues
  },
  created() {
    this.$store.dispatch("fetchAllCat", this.gameid)

  },
computed: {

},
  data() {
    return {
      getResponse: false,

      categories: axios
        .get(`${this.$store.state.url}/api/games/${this.gameid}/categories`)
        .then((res) => {
          this.getResponse = true;
          console.log("Get categories info " + JSON.stringify(res.data));
          return (this.categories = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),

  //     clues: axios
  //       .get(`${this.$store.state.url}/api/allclues`)
  //       .then((res) => {
  //         this.getResponse = true;
  //         console.log("category header file call for allclues")
  //         return (this.clues = res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.getResponse = false;
  //       }),

    };
  },
  methods: {

    modalToggle() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
    },

  },

};
</script>

<style>

</style>
