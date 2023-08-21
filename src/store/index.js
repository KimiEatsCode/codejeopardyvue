import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      categories: [],
      gameid: "1",
      clue: [],
      question: "",
      answer: "",
      clues: [],
      clueid: "",
      score: 0,
      value: "",
      answeredCorrect: 0,
      url: "https://codejeopardy-2399c55e116b.herokuapp.com",
      // url: "http://localhost:3306",
      getResponse: true,
    };
  },
  getters: {},
  actions: {
    async fetchAllCat({ commit }) {
      axios
        .get(`${this.state.url}/api/game-categories`)
        .then((res) => {
          console.log("header categories call " + JSON.stringify(res.data));
          // this.categories = res.data;

          commit("fetchCategories", res.data);
        })
        .catch((error) => {
          console.log(error + " fetch cat error");
        });
    },
    async fetchAllClues({ commit }, categoryid) {
      axios
        .get(`${this.state.url}/api/category-clues/${categoryid}`)
        .then((res) => {
          console.log(
            this.state.url +
              " this is from for fetch clues in store index js file"
          );
          commit("setClues", res);
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
    //updateClue trying to do 2 things patch db and call a mutation method
    async updateClue({ commit }, payload) {
      console.log("update clue payload " + JSON.stringify(payload));
      axios
        .patch(
          `${this.state.url}/api/category-clue/${payload.clueid}&${payload.answeredCorrect}`
        )
        .then((res) => {
          console.log(
            "update clue " + payload.answeredCorrect + " " + payload.clueid
          );
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
      commit("answeredCorrect", payload);
      commit("refreshClues");
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
    fetchCategories(state, payload) {
      state.categories = payload;
      console.log("categories " + state.categories);
      return state.categories;
    },
    answeredCorrect(state, payload) {
      console.log("commit answeredCorrect " + payload.answeredCorrect);
      state.answeredCorrect = payload.answeredCorrect;
      return state.answeredCorrect;
    },
    confirmScore(state) {
      return state.score;
    },
    setSCORE(state) {
      state.score = state.score + state.value;
      console.log("setSCORE " + state.score);
      return state.score;
    },
    setClues(state, payload) {
      console.log("From mutation clues ", payload);
      state.clues = payload;
      state.getResponse = true;
    },
    setClue(state, clue) {
      let x = clue.find((clue) => {
        return clue;
      });

      state.clue = clue;
      state.question = x["question"];
      state.answer = clue["answer"];
      state.clueid = x["clueid"];
      state.answeredCorrect = x["answered"];
      state.value = x["value"];
      return clue;
    },
  },

  modules: {},
});
