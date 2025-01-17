<template>
    <div>

        <footer>
            <p><strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API</p>
<div class="links">
    <router-link :to="{ path:'/'}">Users</router-link>
 <p><a href="" @click="newGameReset(this.gameid, this.userid)">Start New Game</a></p>
</div>
</footer>
    </div>

    </template>

    <script>
    export default {
        name: "FooterLinks",
        props: {
     gameid: String,
     userid: String
    },
        methods: {
    
    }
}
    </script>

