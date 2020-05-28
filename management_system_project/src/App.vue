<template>
  <div id="app">
    <div class="banner">
      <h1 class="logo" @click="toHome">
        <img src="./assets/logo.png" alt />
        <span>Power</span>
      </h1>
      <div class="login">
        <span>
          <router-link to="/login">
          <i class="el-icon-user"></i>&nbsp;&nbsp;Login
          </router-link>
        </span>

        <span @click="SignOut">
          <i class="el-icon-s-fold"></i>&nbsp;&nbsp;back
        </span>
        
        <p class="headerTime">{{timer | dateFormat}}</p>
      </div>
      
    </div>
    <router-view />
    <!-- 二级show-->
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "App",
  data() {
    return {
      timer: new Date()
    };
  },
  methods: {
    SignOut() {
      console.log("完成退出登录");
      axios.post("api/sys/logout");
      Cookies.set("account", "");
      Cookies.set("token", "");
      if (Cookies.get("token") == "") {
        this.$router.push({ name: "Login" });
      }
    },
    toHome() {
      this.$router.push({ name: "HomePage" });
      Cookies.set("index", "/HomePage");
    }
  },
  created() {
    axios.defaults.headers.common["Authorization"] = this.$store.state.token; //为了防止页面刷新时，token丢失
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.timer = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },

  filters: {
    // 定义私有过滤器  过滤器有两个 条件 【过滤器名称 和 处理函数】
    dateFormat: function(dateStr, pattern = "") {
      let dt = new Date(dateStr);

      // yyyy-mm-dd
      let y = dt.getFullYear();
      let m = (dt.getMonth() + 1).toString().padStart(2, "0");
      let d = dt
        .getDate()
        .toString()
        .padStart(2, "0");

      if (pattern.toLowerCase() === "yyyy-mm-dd") {
        return `${y}-${m}-${d}`;
      } else {
        let hh = dt.getHours();
        let mm = dt
          .getMinutes()
          .toString()
          .padStart(2, "0");
        let ss = dt
          .getSeconds()
          .toString()
          .padStart(2, "0");
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
      }
    }
  }
};
</script>

<style>
/*  不好意思 我在这里放了一些公共的样式和覆盖element-ul的类 */
.banner {
  background-color: #232a34;
  height: 78px;
}
body {
  margin: 0;
  padding: 0;
}
.logo {
  margin: 0;
  padding: 0;
  cursor: pointer;
}


.login a,
.login span,
.logo span{
  line-height: 48px;
  font-size: 18px;
  float: left;
  color: #fff;
  margin-left: 16px;
  text-decoration: none;
}
.logo span{
  line-height: 78px;
  font-size: 20px;
}
.logo img {
  width: 32px;
  margin-left: 26px;
  margin-right: 10px;
  margin-top: 22px;
  float: left;
}
.login{
  float: right;
  margin: 4px 20px 0 auto;
  cursor: pointer;
}
.login span {
  margin: 1px 20px 0 20px;
}
.login a:hover,
.login p:hover {
  color: rgb(71, 179, 152);
}
.el-menu {
  border-right: none;
}
.el-container {
  width: 100vw;
  box-sizing: border-box;
}

/* 表头居中 */
/* .el-table th {
    text-align: center;
  } */
.el-table td,
th.is-leaf {
  text-align: center;
}

.el-button {
  font-weight: 400;
}

.login .headerTime{
  height: 20px;
  width: 180px;
  font-size:14px;
  color:#fff;
  position: absolute;
  right: 36px;
  top: 40px;
  word-spacing:30px
}


.btnMain{
  margin: 4px 0;
  padding: 0;
  padding: 10px 15px;
  font-weight: 700;
  background-color: #fff;
  color: #334257;
  border: 1px solid #334257;
}
.btnMain:hover {
  color: #fff;
  background-color: #334257;
  border: 1px solid #334257;

}
.btnMain:focus {
  color: #fff;
  background-color: #334257;
  border: 1px solid #334257;
}


/* 弹出框编辑框类的修改 */
.alertAdd{
  padding: 0;
  margin: 0;
  box-shadow:0 0  4px 1px  #334257;
  padding: 30px;
  border-radius: 4px;
}

.alertAdd .el-form-item__label {
  color:#334257;
  font-weight: 555;
  
}
.el-popover {
  padding:0;
  border:0;
}

/* 因为懒 所以删除按钮和保存按钮都是这个类 */
.btnDel{
  margin: 10px 0;
  padding: 0;
  padding: 7px 15px;
  font-weight: 700;
  color: #fff;
  background-color: #334257;
  border: 1px solid #334257;
}
.btnDel:hover {
  color: #334257;
  background-color: #fff;
  border: 1px solid #334257;

}
.btnDel:focus {
  color: #334257;
  background-color: #fff;
  border: 1px solid #334257;
}


/* 这个是编辑按钮的类 */
.btnEdit{
  margin: 10px 0;
  padding: 0;
  padding: 7px 15px;
  font-weight: 700;
  color: #334257;
  background-color: #fff;
  border: 1px solid #334257;
}
.btnEdit:hover {
  color: #fff;
  background-color: #334257;
  border: 1px solid #334257;

}
.btnEdit:focus {
  color: #fff;
  background-color: #334257;
  border: 1px solid #334257;
}

/* 添加按钮 */
.btnAdd{
  margin: 10px 0;
  padding: 0;
  padding: 6px 6px;
  font-weight: 700;
  color: #334257;
  background-color: #fff;

  
  border: 0;
}
.btnAdd:hover {
  color: #fff;
  background-color: #335657;


}
.btnAdd:focus {
  color: #fff;
  background-color: #335657;

}

.hoverShow{
  color:#232a34;
  border:1px solid #4d5263;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}

.el-input__inner:focus,
.el-textarea__inner:focus{
    border-color: #334257;
    outline: 0;
}

.marginTb{
  margin: 30px 200px;
  margin-bottom: 100px;
}
</style>
