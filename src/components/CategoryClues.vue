<template>
  <div v-for="clue in clues" v-bind:key="clue.id">
    <div v-for="clue_info in clue" v-bind:key="clue_info.clue_id">
      <!-- <div
        :class="[
          `buttonbox_${clue_info.clue_id} answeredCorrect_${clue_info.answered}`
        ]"
      > -->
      <div
        :class="[
          `buttonbox_${clue_info.clue_id}`
        ]"
      >
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
          </div>
          <p></p>
          <div v-if="showMessage === true">
            <div v-if="answeredCorrect">You are correct!</div>
            <div v-if="!answeredCorrect">No, that is incorrect.</div>
            <p></p>
            <p></p>
          </div>
          <div v-if="showMessage === false" class="modal-body">
            {{ clueText }}
            <p></p>
            <form
              v-on:submit.prevent="updateScoreAndClue(form.name, answer, clue[0].clue_id)"
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
        .get(`${this.$store.state.url}/api/category-clues/${this.categoryid}`)
        .then((res) => {
          if (res.data === "") {
            console.log(
              "game clues data response is empty " + this.$store.state.url
            );
          } else {
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

      if (input !== answer) {
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

      } else if (input === answer) {

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
}
div[class^="buttonbox_"] {
  border: 1px solid #000;
}

div[class^="buttonbox_"].answeredCorrect_1  {
  background-color: greenyellow !important;
}

div[class^="buttonbox_"].answeredCorrect_0 {
  background-color: rgb(220, 27, 146);
}

div[class^="buttonbox_"].answeredCorrect_null {
  background-color: #417dff;
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
