import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
const qs = require('querystring')

Vue.use(Vuex)

const store = new Vuex.Store({


  state:{
    token: Cookies.get('token'),
    account: Cookies.get('account'),
    name: Cookies.get('name'),
    userPower:'',  // 操作权限列表

    // userData:[], // 员工管理信息
    // total:'',// 员工数
    // pageNum:1 // 当前页码
  },


  mutations:{
    getPower(state,payload){ // 获得权限 和 存入token
      let result = payload.user.data.data
      state.userPower = result.user.models // 权限列表
      Cookies.set('token', result.token) //身份令牌缓存
      Cookies.set('account', result.user.account) //账号名
      Cookies.set('name', result.user.name) //姓名
      // state.token = Cookies.set('token', result.token) //身份令牌缓存
      // state.token = Cookies.set('account', result.user.account) //账号名
      // state.name = Cookies.set('name', result.user.name) //姓名

      axios.defaults.headers.common['Authorization'] =  Cookies.get("token")
      // 默认请求报头
    },

    // getStaff(state,payload){ // 获得员工信息
    //   state.userData = payload.staffList.data.list // 员工信息列表
    //   state.total = payload.staffList.data.total // 员工数
    //   state.pageNum = payload.staffList.data.pageNum // 当前页码
    // }

  },

  actions:{

    loginA({commit},payload){ // 登录账号
      return new Promise((resolve,reject)=>{
        axios.post('/api/sys/login', qs.stringify(payload)).then(resp=>{
          if(resp.data.code == 2){
            commit({type:'getPower',user:resp})
            resolve(resp.data.data.user.models)
            Cookies.set("index", "/HomePage");
          }else{
            reject(resp.data.message)
          }
        })
      })
    },


    // changePage({commit},payload){ // 显示分页
    //   return new Promise((resolve,reject)=>{
    //     axios.get(`api/main/system/user/show?page=${payload}`).then(resp=>{

    //         commit({type:'getStaff',staffList:resp})
    //         resolve(resp.data.list)

    //     })
    //   })
    // },



    // deleteStaff({commit},payload){ // 删除员工
    //   return new Promise((resolve,reject)=>{
    //     axios.post('api/main/system/user/delete',qs.stringify(payload)).then(resp=>{

    //       console.log(resp)

    //         commit({type:'getStaff',staffList:resp})
    //         resolve(resp)


    //     })
    //   })
    // },

    // addStaff({commit},payload){ // 添加员工
    //   return new Promise((resolve,reject)=>{
    //     axios.post('api/main/system/user/add',qs.stringify(payload)).then(resp=>{
    //       if(resp.data.code == 2){
    //         commit({type:'getStaff',staffList:resp})
    //         resolve(resp)
    //       }else{
    //         reject('添加员工出错')
    //       }
    //     })
    //   })
    // },


    // editStaff({commit},payload){ // 编辑员工
    //   return new Promise((resolve,reject)=>{
    //     axios.post('api/main/system/user/update',qs.stringify(payload)).then(resp=>{
    //       if(resp.data.code == 2){
    //         commit({type:'getStaff',staffList:resp})
    //         resolve(resp)
    //       }else{
    //         reject('添加员工出错')
    //       }
    //     })
    //   })
    // },





    

  },

  // this.aaa
  getters:{
    aaaaa(state){
      
    }
  }
  
})

export default store