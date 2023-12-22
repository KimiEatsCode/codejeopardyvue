import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      categories: [],
      gameid: "1",
      clue: "",
      clueText: "",
      question: "",
      answer: "",
      clues: [],
      clueid: "",
      currClueId:"",
      score: 0,
      value: "",
      answeredCorrect: null,
      url: "https://codejeopardy-api.onrender.com",
      // url: "http://localhost:3306",
      //mock url 3001 to help with too many connection issue
      // url: "http://localhost:3001",
      getResponse: true,

    };
  },
  getters: {},
  actions: {
    async fetchAllCat({ commit }) {
      axios
        .get(`${this.state.url}/api/game-categories`)
        .then((res) => {
          console.log("header categories call " + res.data);
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
              "fetch clues in store index js file"
          );
          commit("setClues", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchClue({ commit }, clueid) {
      axios
        .get(`${this.state.url}/api/category-clue/${clueid}`)
        .then((res) => {
          console.log("This is clueid for fetchClue is " + clueid);

          commit("setClue", res.data);
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
      // commit("refreshClues");
    },
    async resetClues({ commit }) {
      axios
        .patch(`${this.state.url}/api/category-clue/newgame`)
        .then((res) => {
          console.log("reset game");
          // commit("resetAllClues", res);
          commit("fetchCategories", res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async setScore({ commit }, state) {
      axios
        .patch(`${this.state.url}/api/game/1&${state.score}`)
        .then((res) => {
          commit("setScore", res);
          console.log("state score is " + state.score);
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
    setScore(state) {
      state.score = state.score + state.value;
      console.log("setScore total = " + state.score);
      return state.score;
    },
    setClues(state, payload) {
      console.log("From mutation clues ", payload);
      state.clues = payload;
      state.getResponse = true;
    },
    setClue(state, clue) {
      console.log("find not function error " + JSON.stringify(clue))
      let x = clue;

      state.clue = clue; //this is the whole object not just the clue text
      console.log("store " + clue)
     let clueText = x["clue"];
      state.clueText = clueText.charAt(0).toUpperCase() + clueText.slice(1);
      state.question = x["question"];
      state.answer = x["answer"];
      state.clueid = x["clueid"];
      state.answeredCorrect = x["answered"];
      state.value = x["value"];
      return clue;
    },
    showModalMutation(state, payload) {
      state.currClueId = payload.clueid;
     return state.currClueId;
    }
  },

  modules: {},
});
