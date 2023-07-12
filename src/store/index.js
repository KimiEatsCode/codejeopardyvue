import { createStore } from "vuex";
import axios from "axios";

const url = "https://codejeopardy-7116bb4be6a5.herokuapp.com/";
// const url = '';

export default createStore({
  state() {
    return {
      gameid: "1",
      clue: [],
      question: "",
      answer: "",
      clues: [],
      categoryid: "",
      clueid: "",
      score: 0,
      value: "",
      answeredClue: "",
      answered: "",
      url: url
    };
  },
  getters: {},
  actions: {
    async fetchAllClues({ commit }, categoryid) {
      axios
        .get(`${url}/category-clues/${categoryid}`)
        .then((res) => {
          //  return (this.clues = res.data);

          commit("refreshAllClues", res.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchClue({ commit }, clueid) {
      axios
        .get(`${url}/category-clue/${clueid}`)
        .then((res) => {
          console.log(res);
          commit("setClue", res.data.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateClue({ commit }, payload) {
      console.log(payload.answeredClue);
      axios
        .patch(`${url}/category-clue/${payload.clueid}&${payload.answeredClue}`)
        .then((res) => {
          console.log(
            "update clue " + payload.answeredClue + " " + payload.clueid
          );
          commit("answeredClue", res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async resetClues({ commit }) {
      axios
        .patch(`${url}/category-clue/newgame`)
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
        .get(`${url}/category-clues/${categoryid}`)
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
        .patch(`${url}/game/1&${state.score}`)
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
      let x = clue.find((y) => {
        return y.clue;
      });
      state.clue = x.clue;
      state.question = x.question;
      state.answer = x.answer;
      state.clueid = x.clue_id;
      state.answered = x.answered;
      state.value = x.value;
    },
  },

  modules: {},
});
