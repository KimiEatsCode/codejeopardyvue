import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/HomePage.vue";
import NotFound from "../components/NotFound.vue";
import GamesList from "../components/GamesList.vue";
import GameBoard from "../components/GameBoard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/gameslist/:userid",
    name: "gameslist",
    component: GamesList,
    props: true,
  },
  {
    path: "/gamelist/:userid/:gameid",
    name: "gameboard",
    component: GameBoard,
    props: true,
  },

  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
