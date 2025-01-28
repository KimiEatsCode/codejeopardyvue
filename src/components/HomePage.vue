<template>
    <div>
    <UserFormLogin></UserFormLogin>
    </div>

    </template>

    <script>
    // import UsersProfiles from "./UsersProfiles.vue";
    import UserFormLogin from "./UserFormLogin.vue";

    export default {
        name: "HomePage",
        components: {
            UserFormLogin
        }
    }
    </script>