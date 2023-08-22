<template>
  <h2>The Game of Code Jeopardy</h2>
<!-- <h3>Your Score is: {{ $store.state.score }}</h3> -->

<div>
  <button @click="newGameReset()" class="reset-button">Reset Game</button>

  <div
    class="grid-container"
    v-for="(category, index) in categories"
    v-bind:key="index"
  >cone on
  <div v-for="cat in category" v-bind:key="cat.id">
      <div class="grid-container-categories">
        {{ cat.name }}
      </div>
    </div>
    <ul class="cluecolumn" v-for="cat in category" v-bind:key="cat.id">
      <clue-column :categoryid="cat.category_id"/>
    </ul>
  </div>
</div>
</template>

<script>
import axios from "axios";
import ClueColumn from "./CategoryClues.vue";
export default {
  name: "CategoryHeader",
  components: {
    'clue-column':ClueColumn,
  },

  data() {
  return {
      getResponse: false,
      categories: axios
        .get(`${this.$store.state.url}/api/game-categories`)
        .then((res) => {
          this.getResponse = true;
          console.log("header categories call " + res.data)
          return (this.categories = res.data);

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
    console.log('getCat called' + JSON.stringify(this.categories))
    return this.categories;

    },
//     getClues(catid=2) {
//   console.log('before mounted');
//     this.clues = this.$store.dispatch("fetchAllClues", catid);
// },
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
 this.getCategories();
    }
    },
    // beforeMount() {
    //   this.getCategories();
    //   this.getClues();
    // }
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
}
.grid-container-categories {
  display: grid;
  grid-template-columns: repeat(1);
  grid-template-rows: repeat(1);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: orchid;
}
.grid-container-clues {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  background-color: #2196f3;
  padding: 10px;
}

.cluecolumn {
  background-color: rgb(65, 125, 255);
}

.reset-button {
  width:100%;
  padding:10px;
  margin-bottom: 20px;
}
</style>
