<template>
  <div class="grid-body">
    <h2>Code Jeopardy</h2>
    <div class="scorebox">Score: {{ $store.state.score }}</div>

    <button @click="newGameReset()" class="reset-button, button-3d-style">Reset Game</button>
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
      <clue-column :categoryid="category.category_id" :catname="category.name" />
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
          this.$store.dispatch("resetClues");
          // return (this.clues = res.data.rows.rows[0]);
          console.log("get clues in header file " + res.data)
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
    },
  },

};
</script>

<style>

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
  padding:10px;
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

.reset-button {
  width:500px;
  text-decoration: underline;
  font-size:1.2em;
  padding: 10px;
  margin-bottom: 20px;
}

/*reset button styles*/
.button-3d-style {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  width:70%;
  margin: 20px auto;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-3d-style:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-3d-style:hover {
  box-shadow: hsl(330, 100%, 71%) 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, hsl(330, 96%, 41%) 0 -3px 0 inset;
  background-color:hsl(330, 100%, 71%);
  width:70%;
}

.button-3d-style:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
}

/*end reset button styles*/

.scorebox {
  font-weight: bold;
  font-size:1.3em;
  background-color:rgb(255, 214, 112);
  padding:5px;
  margin-bottom:5px;
}
</style>
