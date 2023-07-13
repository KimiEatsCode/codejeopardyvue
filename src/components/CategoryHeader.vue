<template>
  <h3>Code Jeopardy</h3>
<h2>Your Score is: {{ $store.state.score }}</h2>
<p><button @click="newgameReset">Reset</button></p>
  <h3 v-if="!getResponse">Sorry Content is not currently available.</h3>
  <div
    class="grid-container"
    v-for="(category, index) in categories"
    v-bind:key="index"
  >

  <div v-for="info in category" v-bind:key="info.id">
      <div class="grid-container-categories">
        {{ info.name }}
      </div>
    </div>
    <ul class="cluecolumn" v-for="info in category" v-bind:key="info.id">
      <ClueColumn :categoryid="info.category_id" />
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import ClueColumn from "./CategoryClues.vue";

export default {
  name: "CategoryHeader",
  components: {
    ClueColumn,
  },
  created() {

  },
  data() {
    return {
      apiUrl:this.$store.state.url,
      getResponse: false,
      categories: axios
        // .get(`${this.apiUrl}/game-categories`)
        .get(`${process.env.apiURL}/game-categories`)

        .then((res) => {
          this.getResponse = true;
          return (this.categories = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),
    };
  },
  computed: {
score() {
  return this.$store.state.score;
}
  },
  methods: {
    modalToggle() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
    },
  //   newgameReset() {
  //  this.$store.dispatch("resetClues")
  //   }
    }
};
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


</style>
