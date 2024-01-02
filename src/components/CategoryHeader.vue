<template>
  <div class="grid-body">
    <div class="links"><a href="https://github.com/stars/KimiEatsCode/lists/code-jeopardy-workspace"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
</svg>Code Work in Progress</a></div>
    <h2 class="page-title">Code Jeopardy</h2>
    <div class="scorebox">Score: ${{ $store.state.score }}</div>

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

.page-title {
  margin-top:10px;
}

.links {
  display:flex;
  
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
