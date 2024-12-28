import { createStore } from "vuex";
import axios from "axios";

const apiClient = axios.create({
  withCredentials: false,
});

export default createStore({
  state() {
    return {
      categories: "",
      gameid: "",
      gameScore: "",
      gameName:"",
      clue: "",
      clueText: "",
      question: "",
      answer: "",
      answer_alternatives: "",
      clues: "",
      clueid: "",
      currClueId: "",
      score: "",
      clueValue: "",
      answeredCorrect: null,
    //  url: "https://codejeo-7137663a4c65.herokuapp.com",
      url: "http://localhost:3000",
      getResponse: true,
    };
  },
  actions: {
    async fetchAllGames({ commit }) {
      apiClient
        .get(`${this.state.url}/api/games`)
        .then((res) => {
          // console.log("all games from fetchAllGames call in store " + res.data);
          commit("setAllGames", res.data);
        })
        .catch((error) => {
          console.log(error + " fetch all game info error");
        });
    },
    async fetchGameInfo({ commit }, gameid ) {
      apiClient
        .get(`${this.state.url}/api/games/${gameid}`)
        .then((res) => {
          console.log("fetchGameInfo call in store " + JSON.stringify(res.data));

          commit("setGameInfo", res.data);
        })
        .catch((error) => {
          console.log(error + " fetch game info error");
        });
    },
    async fetchAllCat({ commit }, gameid) {
      apiClient
        .get(`${this.state.url}/api/games/${gameid}/categories`)
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
        .get(`${this.state.url}/api/category-clues/allclues/${clueid}`)
        .then((res) => {
          // console.log(
          //   "This is clueid for fetchClue is " + JSON.stringify(res.data)
          // );

          commit("setClue", res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //updateClue trying to do 2 things put db and call a mutation method
    async updateClue({ commit }, payload) {
      apiClient
        .patch(
          `${this.state.url}/api/category-clues/allclues/${payload.clueid}/${payload.answeredCorrect}`
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
        .patch(`${this.state.url}/api/games/newgame/${this.state.gameid}`)
        .then(() => {
          console.log("reset game " + JSON.stringify());
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async setScoreAction({ commit }, payload) {
      apiClient
        .patch(`${this.state.url}/api/games/${payload.gameid}/${payload.score}`)
        .then(() => {
          console.log("set score patch action " + JSON.stringify(payload.gameid));
          // console.log("set score patch action " + JSON.stringify(res));
          commit("setScore", payload.score);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mutations: {
    setAllGames(state, allGamesInfo) {
    state.games = allGamesInfo
    console.log("setAllGames mutation in store " + JSON.stringify(state.games))
    return state.games;
    },
    setGameInfo(state, gameInfo) {
      console.log("game info score " + JSON.stringify(gameInfo))
      state.game = gameInfo
      state.gameid = gameInfo['game_id'];
      state.gameScore = gameInfo['game_score'];
      console.log("setGameInfo mutation in store " + state.gameid + " and " + state.gameScore)
      state.gameName = gameInfo['game_name'];
      return gameInfo;
      },
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
    setScore(state, score) {
      state.gameScore = score;
      console.log("setScore total mutation = " + state.gameScore);
      return state.gameScore;
    },
    setClues(state, payload) {
      console.log("From mutation clues ", payload);
      state.clues = payload;
      state.getResponse = true;
      return state.clues
    },
    setClue(state, clue) {
      console.log("set clue in index file " + JSON.stringify(clue));

      state.clue = clue; //this is the whole object not just the clue text

      state.clueText = clue["clueText"];
      // state.clueText = clueText.charAt(0).toUpperCase() + clueText.slice(1);
      state.question = clue["question"];
      state.answer = clue["answer"];
      state.answer_alternatives = clue["answer_alternatives"];
      state.clueid = clue["clueid"];
      state.answeredCorrect = clue["answered"];
      state.clueValue = clue["value"];
      return clue;
    },
    showModalMutation(state, payload) {
      state.currClueId = payload.clueid;
      return state.currClueId;
    },
  },

  modules: {},
});
