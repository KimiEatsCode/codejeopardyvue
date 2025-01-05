<template>
  <div>

    <h1>Users</h1>

    <div v-for="user in users" v-bind:key="user.userid">
      <div class="d-flex flex-column flex-md-row p-4 gap-4  align-items-center justify-content-center">

<div class="list-group">
  <div class=" gap-2 w-200 justify-content-between list-group-item-action gap-3" aria-current="true">
      <h4 class="page-title">
   <router-link :to="{ name:'gameslist', params: { userid: user['userid'] }}">{{user['username']}} - user id: {{  user['userid'] }}</router-link>
  </h4>

  <hr>
  </div>
    </div>
    </div>
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
