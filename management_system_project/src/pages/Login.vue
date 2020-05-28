<template>
  <div class="box">
    
    <h2>登录</h2>
    <img src="../assets/loginRight.jpg" alt class="loginRight" />
    
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-form :rules="rules" :model="user" ref="form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="user.password" type="password" :show-message="true" @keyup.enter.native="login"></el-input>
            </el-form-item>

            <el-button round type="primary" @click="login">点击登录</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
const qs = require('querystring')
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        role:"member"
      },
      rules: {
        username: [
          {
            type: "string",
            required: true,
            message: "请输入账号",
            trigger: "blur"
          },
          { min: 3, max: 20, message: "账号长度在3~20位", trigger: "blur" }
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 3, max: 20, message: "账号长度在3~20位", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    login(){
      let promise = this.$store.dispatch('loginA',this.user)

      promise.then(data=>{
        this.$router.push({name: 'HomePage'})
        Cookies.set("index", "/HomePage");
        let models = []
        for(let item of data){
          models.push(item.modelCode)
        }
          Cookies.set('models',models)


      }).catch(err=>{
        console.log(err)
      })
        
          

    }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}
.loginRight{
  width: 120px;
  height: 120px;
  border-radius: 50%;

}
</style>
