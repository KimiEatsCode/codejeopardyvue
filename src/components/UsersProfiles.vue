<template>
  <div>
    <h1>Users</h1>

    <div v-for="user in users" v-bind:key="user.userid">

   <router-link :to="{ name:'gameslist', params: { userid: user['userid'] }}">{{user['username']}}</router-link>
    </div>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "UsersProfiles",
  mounted() {
    this.$store.dispatch("fetchAllUsers");
  },
  computed: {
   users() {
    return this.$store.state.users;
   }
  },
  data() {
    return {
      getResponse: false,

    };
  },
};
</script>
