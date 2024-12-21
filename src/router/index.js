import { createWebHistory, createRouter } from "vue-router";
//import App from "../App.vue";
import Home from "../components/HomePage.vue";
import NotFound from "../components/NotFound.vue";
import GamesList from "../components/GamesList.vue";
import GameBoard from "../components/GameBoard.vue";
//import CategoryHeader from "../components/CategoryHeader.vue";
//import CategoryClues from "../components/CategoryClues.vue";
//import FooterLinks from "../components/Footer.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/gameslist',
    name: 'gameslist',
    component: GamesList,
  },
{
       path: '/games/:gameid',
        name: 'game',
        component: GameBoard,
        props: true,
      },

  {
    path: '/:catchAll(.*)',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
