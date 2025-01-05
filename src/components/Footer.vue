<template>
    <div>

        <footer>
            <p><strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API</p>
<div class="links">
    <router-link :to="{ path:'/'}">Games</router-link>
 <p><a href="" @click="newGameReset()">Start New Game</a></p>
</div>
</footer>
    </div>

    </template>

    <script>
    export default {
        name: "FooterLinks",

        methods: {
        newGameReset() {
      this.$store.dispatch("resetClues");
      this.$store.dispatch("resetGameScore", this.$store.state.gameid);
      location.reload();
    }

    }
}
    </script>

