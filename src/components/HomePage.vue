<template>
    <div>
    <UserFormLogin></UserFormLogin>
    </div>

    </template>

    <script>
    // import UsersProfiles from "./UsersProfiles.vue";
    import UserFormLogin from "./UserLoginForm.vue";

    export default {
        name: "HomePage",
        components: {
            UserFormLogin
        }
    }
    </script>