<template>
  <div v-for="clue in clues" v-bind:key="clue.id">
    <div v-for="clue_info in clue" v-bind:key="clue_info.clue_id">
      <button
       :class="`button_${clue_info.clue_id}`"
        @click="
          modalToggle(clue_info.clue_id);
          getClue(clue_info.clue_id);
        "
      >
        {{ clue_info.value }}
    </button>

    </div>
  </div>

  <div>
    <div
      ref="modal"
      class="modal fade"
      :class="{ show: active, 'd-block': active }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="modalToggle"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p></p>
          <div v-if="showMessage === true">
            <div v-if="answerCorrect">You are correct!</div>
            <div v-if="!answerCorrect">No, that is incorrect.</div>
            <p></p>
            <p></p>
          </div>
          <div v-if="showMessage === false" class="modal-body">
            {{ clue }}
            <p></p>
            <form
              v-on:submit.prevent="
                updateScore(form.name, clue[0].answer, clue[0].clueid)
              "
            >   <strong><label class="label">{{ question }}...  </label></strong
              >
              <input v-model="form.name" class="input" type="text" />


              {{ form.name }}
              <br>
              <br>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="modalToggle"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" value="form.name">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>
  </div>

  <!--cant use javascript of bootstrap with vue?-->
  <!--https://stackoverflow.com/questions/65547199/using-bootstrap-5-with-vue-3-->
</template>

<script>
import CategoryCluesModal from "./CategoryCluesModal.vue";
import axios from "axios";

export default {
  name: "CategoryClues",
  emits: ["modalToggle"],
  components: CategoryCluesModal,
  props: {
    categoryid: Number,
  },
  data() {
    return {
      showMessage: false,
      selectedItem: null,
      active: "",
      isActive: "",
      form: {
        name: "",
      },
      clues: axios
        .get(`${this.$store.state.url}/api/category-clues/${this.categoryid}`)
        .then((res) => {

          if(res.data === "") {
            console.log('game categories data response is empty ' + this.$store.state.url);
          } else {
            return (this.clues = res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        }),
    };
  },

computed: {
    clue() {
      return this.$store.state.clue;
    },
    question() {
      return this.$store.state.question;
    },
    answer() {
      return this.$store.state.answer;
    },

    clueid() {
      return this.$store.state.clueid;
    },
    value() {
      return this.$store.state.value;
    },
  },
  methods: {
    // onSelected(clueid) {
    //  return document.querySelector(`.button_${clueid}`).disabled = true;

    // },
    getClue(clueid) {
      this.clue = this.$store.dispatch("fetchClue", clueid);
    },
    modalToggle() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
      this.form.name = "";
      this.showMessage = false;

    },
    updateScore(input, answer, clueid) {
      this.showMessage = true;
      console.log(input + " vs " + answer)
      if (input === answer) {
        this.$store.commit("setSCORE");
        const score_payload = {
          gameid: 1,
          score: this.$store.state.score,
        };
        this.answerCorrect = true;
        this.$store.dispatch("setScore", score_payload);
      } else {
        this.answerCorrect = false;
      }
      const payload = {
        clueid: clueid,
        answeredClue: 1,
      };
      this.$store.dispatch("updateClue", payload);
      // document.querySelector(`.button_${payload.clueid}`).disabled = true;
      // this.refreshClues();
    },

    refreshClues(categoryid) {
      axios
        .get(`${this.$store.url}/api/category-clues/${categoryid}`)
        .then((res) => {
          return (this.$store.state.clues = res.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
};
</script>

<style>
.test {
  border: 2px solid yellow;
}

.test2 {
  border:2px solid fuchsia;
}

button:disabled,
button[disabled] {
  border: 1px solid #cb3333;
  background-color: #cccccc;
  color: #666666;
}
</style>
