<template>
  <div v-for="(clue, index) in clues" v-bind:key="index">
      <div
        :class="[
          `buttonbox_${clue.clue_id}`
        ]"
      >
        <button
          :class="`button_${clue.clue_id}`"
          @click="
            modalToggle(clue.clue_id);
            getClue(clue.clue_id);
          "
        >
          {{ clue.clue }}
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
            <div
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="modalToggle"
            >
              <span aria-hidden="true">&times;</span>
            </div>
          </div><i class="bi bi-emoji-smile-fill"></i>
          <p></p>
          <div v-if="showMessage === true">

            <div v-if="answeredCorrect">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-emoji-smile-fill msg_text_correct" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
</svg>  <p>You are correct!</p>

            </div>
            <div v-if="!answeredCorrect">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-slash-circle-fill msg_text_incorrect" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708l6-6z"/>
</svg>
              <p>No, that is incorrect.</p>
              <p><strong> Correct answer is: {{  answer  }}</strong></p>
          </div>
            <p></p>
            <p></p>
          </div>
          <div v-if="showMessage === false" class="modal-body">
            {{ clueText }}
            <p></p>
            <form
              v-on:submit.prevent="updateScoreAndClue(form.name, answer, clue.clue_id)"
            >
              <label class="label">{{ question }}...</label>
              <input
                id="modalInput"
                v-model="form.name"
                class="input"
                type="text"
              />
              <br />
              <br />
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
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryClues",
  emits: ["modalToggle"],
  props: {
    categoryid: Number,
  },
  data() {
    return {
      showMessage: false,
      selectedItem: null,
      active: "",
      form: {
        name: "",
      },
      clues: axios
        .get(`${this.$store.state.url}/api/category-clues/${this.categoryid}`).then((res) => {
          console.log("game clues " + JSON.stringify(res.data))
          if (res.data === "") {
            console.log(
              "game clues data response is EMPTY " + this.$store.state.url
            );
          } else {
            console.log("game clues is NOT empty " + JSON.stringify(res.data))
            this.$store.state.clues = res.data;
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
    clueText() {
      return this.$store.state.clueText;
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
    getClues(catid) {
      console.log("getClues method in CatClues file");
      this.clues = this.$store.dispatch("fetchAllClues", catid);
    },
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
    updateScoreAndClue(input, answer, clueid) {
      this.showMessage = true;

      if (input.toLowerCase() !== answer.toLowerCase()) {
        this.answeredCorrect = 0;

        const clue_payload = {
          clueid: clueid,
          answeredCorrect: this.answeredCorrect,
        };

        this.$store.dispatch("updateClue", clue_payload);

      //trigger vuex action
        const buttonCSS_payload = {
          clueid: clueid,
          answeredCorrect: this.answeredCorrect,
        }

        this.$store.commit('showModalMutation', buttonCSS_payload)
        console.log("clue id after mutation method runs = " + this.$store.state.currClueId)

        const buttonbox = document.querySelector(`.buttonbox_${this.$store.state.currClueId}`);
        buttonbox.classList.remove('answeredCorrect_1');
        buttonbox.classList.remove('answeredCorrect_null');
        buttonbox.classList.add('answeredCorrect_0');
        document.querySelector(`.button_${this.$store.state.currClueId}`).disabled = true;

      } else if (input.toLowerCase() === answer.toLowerCase()) {

        this.answeredCorrect = 1;

        const clue_payload = {
          clueid: clueid,
          answeredCorrect: this.answeredCorrect,
        };

        //update clue answered value and answeredCorrect state

        this.$store.dispatch("updateClue", clue_payload);

        //update score on db and in state
        const score_payload = {
          gameid: 1,
          score: this.$store.state.score,
        };

        this.$store.dispatch("setScore", score_payload);

        const buttonCSS_payload = {
          clueid: clueid,
          answeredCorrect: this.answeredCorrect,
        }

        this.$store.commit('showModalMutation', buttonCSS_payload)
        console.log("clue id after mutation method runs = " + this.$store.state.currClueId)

        const buttonbox = document.querySelector(`.buttonbox_${this.$store.state.currClueId}`);
        buttonbox.classList.remove('answeredCorrect_0');
        buttonbox.classList.remove('answeredCorrect_null');
        buttonbox.classList.add('answeredCorrect_1');

      }

      console.log(
        input +
          " vs " +
          answer +
          " means answeredCorrect is " +
          this.answeredCorrect
      );
    },
  },
  beforeMount() {
    this.clues;
  },
};
</script>

<style>
.green {
  border:2px dotted green;
}

div[class^="buttonbox_"] {
  border: 1px solid #000;
  background-color: #417dff;
  height:100%;
}

div[class^="buttonbox_"].answeredCorrect_null {
  background-color: #417dff;
}

div[class^="buttonbox_"].answeredCorrect_1  {
  background-color: greenyellow;
}

.msg_text_correct {
  color: #0ce74e;
  margin-bottom:10px;
}

div[class^="buttonbox_"].answeredCorrect_0 {
  background-color: rgb(220, 27, 146);
}

.msg_text_incorrect {
  color:rgb(220, 27, 146);
  margin-bottom: 10px;
}


button {
  color: #000;
  background: none;
  border: none;
  padding: 5%;
  width: 100%;
}

button:hover {
  width: 100%;
}

button:disabled,
button[disabled] {
  color: #999;
  border: none;
}

input {
  padding: 3px 10px;
}

label {
  font-weight: bold;
  margin-right: 5px;
}

.close {
  font-size: 40px;
}

.modal-header {
  padding: 0 20px !important;
}

.modal.show .modal-dialog {
  margin-top: 10%;
}

@media screen and (max-width: 767px) {
  .modal.show .modal-dialog {
    margin-top: 15%;
  }
}
</style>
