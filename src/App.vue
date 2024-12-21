<template>
  <div class="container-fluid">

<router-view>
</router-view>
</div>
</template>

<script>
import axios from "axios";


export default {
  name: 'App',

  data() {
    return {
    gameInfo: axios
      .get(`${this.$store.state.url}/api/games`)
        .then((res) => {
          this.getResponse = true;
          console.log("Get game info call " + JSON.stringify(res.data));
          return (this.gameInfo = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),
  }
},
  methods: {

  }
}

</script>


<style>
html, body {
    width: 100%;
    height: 100%;
}

#app {
  display:grid;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

footer {
  display:fixed;
  text-align:center;
  bottom:0px;
  height:50px;
  padding:50px 15%;
  font-size: 16px;
  line-height:22px;
}


.links {
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px 0px 40px 0px;
}

.links > a{
padding-left:20px;
}


</style>



