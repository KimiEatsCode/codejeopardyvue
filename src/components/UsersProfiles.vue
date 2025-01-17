<template>
  <div>

    <h1>Users</h1>

    <div v-for="user in users" v-bind:key="user.userid">


   <router-link :to="{ name:'gameslist', params: { userid: user['userid'] }}">
    <div class="container px-5 py-2">
  <div class=" gap-2 w-200 justify-content-between list-group-item-action gap-3" aria-current="true">
      <h4 class="page-title">

{{ user['username'] }}
  </h4>
<!-- <GamesList :userid="user['userid']"></GamesList> -->
</div>
</div>
  </router-link>

    </div>
  </div>


</template>

<script>
//import axios from "axios";
//  import GamesList from "./GamesList.vue";


export default {
  name: "UsersProfiles",
  mounted() {
    this.$store.dispatch("fetchAllUsers");
  },
  components: {
  // GamesList
},
  computed: {
   users() {
    return this.$store.state.users;
   },

  },
  data() {
    return {
      getResponse: false,

    };
  },
};
</script>
