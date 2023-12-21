<template>
  <div class="grid-body">
    <h2>Code Jeopardy</h2>
    <div class="scorebox">Score: {{ $store.state.score }}</div>

    <button @click="newGameReset()" class="reset-button">Reset Game</button>
<div class="grid-header">
    <div
      class="grid-headings"
      v-for="(category, index) in categories"
      v-bind:key="index"
    > {{ category.name }}

    </div>
  </div>
<div class="grid-clues-container">
    <div class="grid-clues" v-for="category in categories" v-bind:key="category.id">
      <clue-column :categoryid="category.category_id" />
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
          console.log("CategoryHeader vue file categories http call " + JSON.stringify(res.data));
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

          return (this.clues = res.data.rows.rows[0]);
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

.grid-header {
  display:inline-grid;
  grid-template-columns: auto auto auto auto;
  padding:10px;
}

.grid-headings {
  background-color: lightseagreen;
  font-size: 1.2em;
}

.grid-clues-container {
  display:grid;
  grid-template-columns: auto auto auto auto;
}

.grid-clues {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  font-size: 1.2em;
}

.cluecolumn {
  background-color: rgb(65, 125, 255);
}

.reset-button {
  text-decoration: underline;
  font-size:1.2em;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border:2px solid rgb(241, 221, 69);
}

footer {
  position:absolute;
  bottom:0px;
  grid-column: 1, 1fr;
  padding-top: 20px;
  font-size: 1.1em;

}

.scorebox {
  font-weight: bold;
  font-size:1.3em;
  background-color:rgb(255, 214, 112);
  padding:5px;
  margin-bottom:5px;
}
</style>
