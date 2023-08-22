<template>
  <div v-for="clue in cluesAxios" v-bind:key="clue.id">
    <div  v-for="(clue_info) in clue" v-bind:key="clue_info.clue_id">

  <div :class="[`buttonbox_${clue_info.clue_id} answeredCorrect_${clue_info.answered}`]">
   <button
       :class="`button_${clue_info.clue_id}`"
        @click="
          modalToggle(clue_info.clue_id);
          // getClue(clue_info.clue_id);
          getClue(7);
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
            <div v-if="answeredCorrect">You are correct!</div>
            <div v-if="!answeredCorrect">No, that is incorrect.</div>
            <p></p>
            <p></p>
          </div>
          <div v-if="showMessage === false" class="modal-body">
            {{ clue[0].clue }}
            <p></p>
            <form
              v-on:submit.prevent="
                updateScoreAndClue(form.name, clue[0].answer, clue[0].clue_id)
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
      cluesAxios: axios
        .get(`${this.$store.state.url}/api/category-clues/${this.categoryid}`)
        .then((res) => {

          if(res.data === "") {
            console.log('game categories data response is empty ' + this.$store.state.url);
          } else {
            this.$store.state.clues = res.data;
            return (this.cluesAxios = res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        }),
    };
  },

computed: {
  //  clues() {
  //     return this.$store.state.clues;
  //   },
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
    }
  },
  methods: {
    getClues(catid) {
  console.log('getClues method in CatClues file');
    this.clues = this.$store.dispatch("fetchAllClues", catid);
},
    getClue(clueid) {
      console.log('getClue method in CatClues file');
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

      this.$store.commit("setSCORE");

      if(input !== answer) {
        this.answeredCorrect = 0;

      document.querySelector(`.button_${clueid}`).disabled = true;
      document.querySelector(`.buttonbox_${clueid}`).classList.remove('answeredCorrect_1');
      document.querySelector(`.buttonbox_${clueid}`).classList.remove('answeredCorrect_null');
      document.querySelector(`.buttonbox_${clueid}`).classList.add('answeredCorrect_0');

      let clue_payload = {
        clueid: clueid,
        answeredCorrect: this.answeredCorrect
      };
        this.$store.dispatch("updateClue", clue_payload);

      } else if (input === answer) {
        document.querySelector(`.buttonbox_${clueid}`).classList.remove('answeredCorrect_0');
        document.querySelector(`.buttonbox_${clueid}`).classList.remove('answeredCorrect_null');
      document.querySelector(`.buttonbox_${clueid}`).classList.add('answeredCorrect_1');

        this.answeredCorrect = 1;
        console.log("this answeredCorrect value is " + this.answeredCorrect)
        let clue_payload = {
        clueid: clueid,
        answeredCorrect: this.answeredCorrect,
      };
      this.$store.dispatch("updateClue", clue_payload);
        const score_payload = {
          gameid: 1,
          score: this.$store.state.score,
        };

        this.$store.dispatch("setScore", score_payload);

      }
         console.log(input + " vs " + answer + " means answeredCorrect is " + this.answeredCorrect)
      // document.querySelector(`.button_${clueid}`).disabled = true;
    },
  },
  // beforeMount() {
  //   this.getClues()
  // }
};
</script>

<style>

div[class^="buttonbox_"] {
  border: 1px solid #000;
}
div[class^="buttonbox_"].answeredCorrect_1 {
  background-color: greenyellow;
}

div[class^="buttonbox_"].answeredCorrect_0 {
  background-color: rgb(220, 27, 146);
}

div[class^="buttonbox_"].answeredCorrect_null {
  background-color: #417dff;
}

button:disabled,
button[disabled] {
  border: 1px solid #cb3333;
  background-color: #cccccc;
  color: #666666;
}
</style>
