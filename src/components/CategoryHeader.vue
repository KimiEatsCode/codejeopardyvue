<template>
  <div class="grid-body">
    <h2>Code Jeopardy</h2>
    <!-- <h3>Your Score is: {{ $store.state.score }}</h3> -->

    <button @click="newGameReset()" class="reset-button">Reset Game</button>

    <div
      class="grid-headings"
      v-for="(category, index) in categories"
      v-bind:key="index"
    >
      <div v-for="cat in category" v-bind:key="cat.id">
        {{ cat.name }}
      </div>
    </div>

    <!--using categories from data below instead of having it be part of the headings categories loop so that css grid can work and not repeat clue column as many categories there are -->

    <div  class="grid-clues"  v-for="category in categories" v-bind:key="category.id">
      <div v-for="cat in category" v-bind:key="cat.id">
        <clue-column :categoryid="cat.category_id" />
      </div>
    </div>
    <footer>Created by Kimi Rettig</footer>
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

  data() {
    return {
      getResponse: false,
      categories: axios
        .get(`${this.$store.state.url}/api/game-categories`)
        .then((res) => {
          this.getResponse = true;
          console.log("header categories call " + res.data);
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
          console.log("getting all clues " + JSON.stringify(res.data));
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
    newGameReset() {
      this.$store.dispatch("resetClues");
      location.reload();
      //  this.getCategories();
    },
  },
  beforeMount() {},
};
</script>

<style>
.grid-body {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}

.grid-headings {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: lightseagreen;
  font-size: 1.2em;
}

.grid-clues {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 1.2em;
}

.cluecolumn {
  background-color: rgb(65, 125, 255);
}

.reset-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

footer {
  grid-column: 1, 1fr;
  padding-top: 20px;
  font-size: 1.2em;
  color: rgb(65, 125, 255);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  letter-spacing: 0.5px;
}
</style>
