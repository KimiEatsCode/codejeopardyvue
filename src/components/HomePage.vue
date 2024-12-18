<template>
    <div>
<GamesList></GamesList>
        <h1>Home</h1>

    </div>

    </template>

    <script>
    import GamesList from "./GamesList.vue";
    export default {
        name: "HomePage",
        components: {
            GamesList
        }
    }
    </script>