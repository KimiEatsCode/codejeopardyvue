import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      gameid: "1",
      clue: [],
      question: "",
      answer: "",
      clues: [],
      clueid: "",
      score: 0,
      value: "",
      answeredClue: "",
      answered: "",
      url: "https://codejeopardy-7116bb4be6a5.herokuapp.com",
      // url: "http://localhost:3000",
    };
  },
  getters: {},
  actions: {
    async fetchAllClues({ commit }, categoryid) {
      axios
        .get(`${this.state.url}/api/category-clues/${categoryid}`)
        .then((res) => {
          console.log(
            this.state.url +
              " this is from for fetch clues in store index js file"
          );
          commit("refreshAllClues", res.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchClue({ commit }, clueid) {
      axios
        .get(`${this.state.url}/api/category-clue/${clueid}`)
        .then((res) => {
          console.log("This is clueid for fetchClue" + clueid);

          commit("setClue", res.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //updateClue trying to do two things patch db and call a mutation method
    async updateClue({ commit }, payload) {
      console.log("update clue payload " + payload);
      const answered = payload.answeredClue;
      const clueID = payload.clueid;

      if (payload.answeredClue === 1) {
        axios
          .patch(
            `${this.state.url}/api/category-clue/${payload.clueid}&${payload.answeredClue}`
          )
          .then((res) => {
            console.log("update clue " + answered + " " + clueID);
            commit("answeredClue", res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async resetClues({ commit }) {
      axios
        .patch(`${this.state.url}/api/category-clue/newgame`)
        .then((res) => {
          console.log("reset game");
          commit("resetAllClues", res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async refreshClues({ commit }, categoryid) {
      axios
        .get(`${this.state.url}/api/category-clues/${categoryid}`)
        .then((res) => {
          // return (this.clues = res.data);
          commit("refreshAllClues", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async setScore({ commit }, state) {
      console.log("action " + state.score);

      axios
        .patch(`${this.state.url}/api/game/1&${state.score}`)
        .then((res) => {
          commit("confirmScore", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mutations: {
    refreshAllClues(state) {
      return state.clues;
    },
    resetAllClues(state) {
      return state.clues;
    },
    answeredClue(state) {
      return state.answeredClue;
    },
    confirmScore(state) {
      return state.score;
    },
    setSCORE(state) {
      state.score = state.score + state.value;
      console.log("setSCORE " + state.score);
      return state.score;
    },
    setClues(state, clues) {
      console.log("From mutation clues ", clues);
      state.clues = clues;
    },

    setClue(state, clue) {
      let x = clue.find((clue) => {
        return clue;
      });

      state.clue = clue;
      state.question = x["question"];
      state.answer = clue["answer"];
      state.clueid = x["clueid"];
      state.answered = x["answered"];
      state.value = x["value"];
      return clue;
    },
  },

  modules: {},
});
