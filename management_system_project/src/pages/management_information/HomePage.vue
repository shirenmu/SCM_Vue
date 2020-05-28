<template>
  <div class="homePage">
    <h1>{{name}}早上好，欢迎登录</h1>
  </div>
</template>

<script>

import Cookies from 'js-cookie'
export default {

  data(){
    return{
      name: Cookies.get('name'),
    }
  }
  
}
</script>

<style scoped>
  .homePage{
    background-color: #2c3b3b;
    text-align: center;
    color:rgb(235, 235, 235);
    font-weight: 300;
    padding: 10px
  }
</style>