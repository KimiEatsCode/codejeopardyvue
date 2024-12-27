<template>
  <div class="container-fluid">

<router-view>
</router-view>
</div>
</template>

<script>
// import axios from "axios";


export default {
  name: 'App',

  data() {
    return {
 
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



