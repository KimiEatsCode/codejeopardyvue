<template>
  <div class="grid-body">
    <h2 class="page-title">{{  this.gameInfo.game_name }}</h2>
    <div class="scorebox">Score: ${{ $store.state.score }}</div>
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
      <clue-column :categoryid="category.category_id" :catname="category.category_name" />
    </div>
  </div>

  </div>


</template>

<script>
import axios from "axios";
import ClueColumn from "./CategoryClues.vue";

export default {
  name: "CategoryHeader",
  components: {
    "clue-column": ClueColumn,
  },
  beforeMount() {
    this.clues;
  },
  data() {
    return {
      getResponse: false,
      gameInfo: axios
      .get(`${this.$store.state.url}/api/games`)
        .then((res) => {
          this.getResponse = true;
          console.log("Get game info call " + JSON.stringify(res.data));
          return (this.gameInfo = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),
      categories: axios
        .get(`${this.$store.state.url}/api/game-categories`)
        .then((res) => {
          this.getResponse = true;
          // console.log("CategoryHeader vue file categories http call " + JSON.stringify(res.data));
          return (this.categories = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),
      clues: axios
        .get(`${this.$store.state.url}/api/allclues`)
        .then((res) => {
          this.getResponse = true;
          this.$store.dispatch("resetClues");
          // return (this.clues = res.data.rows.rows[0]);
          // console.log("get clues in header file " + res.data)
          return (this.clues = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),

    };
  },
  methods: {
    getCategories() {
      this.categories = this.$store.dispatch("fetchAllCat");
      console.log("getCat called" + JSON.stringify(this.categories));
      return this.categories;
    },

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

.page-title {
  margin-top:10px;
}

.grid-body {
  min-height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
}

.grid-header {
  display:inline-grid;
  grid-template-columns: auto auto auto auto;
}

.grid-headings {
  background-color: cadetblue;
  font-weight:bold;
  font-size: 1.2em;
  padding:10px 5px;
}

.grid-clues-container {
  display:grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: fit-content;
  overflow:none;

}

.grid-clues {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /*make 1 column responsive*/
  grid-template-rows: repeat(3,1fr); /*make rows responsive*/
  font-size: 1.2em;
}

.cluecolumn {
  background-color: rgb(65, 125, 255);
}

.grid-clues button {
  height:100%;
}

.scorebox {
  font-weight: bold;
  font-size:1.3em;
  background-color:rgb(255, 214, 112);
  padding:5px;
  margin-bottom:5px;
}

@media (min-width:768px) {
 

}


</style>
