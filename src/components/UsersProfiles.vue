<template>
  <div>
    <h1>Users</h1>
    {{ users.username }}
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "UsersProfiles",
  created() {
    this.$store.dispatch("fetchAllUsers");
  },
  data() {
    return {
      getResponse: false,
      users: this.$store.state.users[0],
    };
  },
};
</script>
