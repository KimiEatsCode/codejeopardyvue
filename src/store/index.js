import { createStore } from "vuex";
import axios from "axios";

const apiClient = axios.create({
  // baseURL: 'http://localhost:3000', // Not required due to proxy

  withCredentials: false,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // },
});

export default createStore({
  state() {
    return {
      categories: "",
      gameid: "1",
      clue: "",
      clueText: "",
      question: "",
      answer: "",
      answer_alternatives: "",
      clues: "",
      clueid: "",
      currClueId: "",
      score: 0,
      value: "",
      answeredCorrect: null,
      url: "https://codejeo-7137663a4c65.herokuapp.com",
      // url: "http://localhost:3000",
      getResponse: true,
    };
  },
  actions: {
    async fetchGameInfo({ commit }) {
      apiClient
        .get(`${this.state.url}/api/games`)
        .then((res) => {
          console.log("game info from games call " + res.data);
          commit("fetchGameInfo", res.data);
        })
        .catch((error) => {
          console.log(error + " fetch game info error");
        });
    },
    async fetchAllCat({ commit }) {
      apiClient
        .get(`${this.state.url}/api/game-categories`)
        .then((res) => {
          // console.log(" header categories call " + res.data);
          commit("fetchCategories", res.data);
        })
        .catch((error) => {
          console.log(error + " fetch cat error");
        });
    },
    async fetchAllClues({ commit }, categoryid) {
      apiClient
        .get(`${this.state.url}/api/category-clues/${categoryid}`)
        .then((res) => {
          // console.log(this.state.url + "fetch clues in store index js file");
          commit("setClues", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchClue({ commit }, clueid) {
      apiClient
        .get(`${this.state.url}/api/category-clue/${clueid}`)
        .then((res) => {
          console.log(
            "This is clueid for fetchClue is " + JSON.stringify(res.data)
          );

          commit("setClue", res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //updateClue trying to do 2 things put db and call a mutation method
    async updateClue({ commit }, payload) {
      console.log("update clue payload " + JSON.stringify(payload));
      apiClient
        .put(
          `${this.state.url}/api/category-clue/`,

          {
            // params: {
              clueid: payload.clueid,
              answeredCorrect: payload.answeredCorrect,
          //  },
            // headers: {
            //   "Access-Control-Allow-Origin": "*",
            //   "Content-Type": "application/json",
            // },
          }
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
    async resetClues() {
      apiClient
        .get(`${this.state.url}/api/category-clue/newgame`)
        .then((res) => {
          console.log("reset game " + JSON.stringify(res));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async setScore({ commit }, state) {
      apiClient
        // .put(`${this.state.url}/api/game/1/:${state.score}`)
        .get(`${this.state.url}/api/game/`, {
          // params: {
            gameid: 1,
            score: state.score,
          // },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          commit("setScore", res);
          console.log("state score is testing " + state.score);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mutations: {
    fetchCategories(state, payload) {
      state.categories = payload;
      return state.categories;
    },
    answeredCorrect(state, payload) {
      console.log("commit answeredCorrect store " + payload.answeredCorrect);
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
      console.log("set clue in index file " + JSON.stringify(clue));

      state.clue = clue; //this is the whole object not just the clue text
      console.log("store " + clue);
      state.clueText = clue["clueText"];
      // state.clueText = clueText.charAt(0).toUpperCase() + clueText.slice(1);
      state.question = clue["question"];
      state.answer = clue["answer"];
      state.answer_alternatives = clue["answer_alternatives"];
      state.clueid = clue["clueid"];
      state.answeredCorrect = clue["answered"];
      state.value = clue["value"];
      return clue;
    },
    showModalMutation(state, payload) {
      state.currClueId = payload.clueid;
      return state.currClueId;
    },
  },

  modules: {},
});
