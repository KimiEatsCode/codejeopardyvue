<template>
    <div>

        <footer>
<strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API
<div class="links">
    <router-link :to="{ path:'/'}">Games</router-link>
 <a href="" @click="newGameReset()">Start New Game</a>
</div>
</footer>
    </div>

    </template>

    <script>
    export default {
        name: "FooterLinks",

    }
    </script>

   