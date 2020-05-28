<template>
  <el-container>
    <el-aside width="160px" class="box">
      <el-menu
        :default-active="selIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="childMenu"
        background-color="#fff"
        :unique-opened="true"
        text-color="#323b49"
        active-text-color="#e7b835"
        router
      >
        <el-submenu index="1" :disabled="contrast(3)">
          <template slot="title">
            <i class="el-icon-loading"></i>
            <span>管理信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/HomePage">首页</el-menu-item>
            <el-menu-item index="/UserAdmin">用户管理</el-menu-item>
            <el-menu-item @click="back">退出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        
        <el-submenu index="2" :disabled="contrast(1)">
          <template slot="title">
            <i class="el-icon-shopping-cart-1"></i>
            <span>采购管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/supplier">供应商管理</el-menu-item>
            <el-menu-item index="/purchase">新添采购单</el-menu-item>
            <el-menu-item index="/purchaseEnd">采购单了结</el-menu-item>
            <el-menu-item index="/purchaseSearch">采购单查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" :disabled="contrast(5)">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span>仓库管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/warehousing">入库登记</el-menu-item>
            <el-menu-item index="/outgoingRegistration">出库登记</el-menu-item>
            <el-menu-item index="/stockInquiry">库存查询</el-menu-item>
            <el-menu-item index="/stockmanage">库存盘点</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" :disabled="contrast(2)">
          <template slot="title">
            <i class="el-icon-box"></i>
            <span>销售管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/product">产品列表</el-menu-item>
            <el-menu-item index="/productTypeList">产品分类列表</el-menu-item>
            <el-menu-item index="/peopleManage">客户管理</el-menu-item>
            <el-menu-item index="5-2">新添销售单</el-menu-item>
            <el-menu-item index="5-3">销售单了结</el-menu-item>
            <el-menu-item index="5-3">销售单查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" :disabled="contrast(4)">
          <template slot="title">
            <i class="el-icon-postcard"></i>
            <span>财务收支</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/registrationOfReceipts">收款登记</el-menu-item>
            <el-menu-item index="/paymentRegistration">付款登记</el-menu-item>
            <el-menu-item index="/budgetQuery">收支查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" :disabled="contrast(6)">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>月度报表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/purchasingReport">月度采购报表</el-menu-item>
            <el-menu-item index="/salesReport">月度销售报表</el-menu-item>
            <el-menu-item index="/outOfStockReport">月度出库报表</el-menu-item>
            <el-menu-item index="/warehousingReport">月度入库报表</el-menu-item>
            <el-menu-item index="/stockReport">月度库存报表</el-menu-item>
            <el-menu-item index="/budgetReport">月度收支报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Cookies from "js-cookie";
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      selIndex: Cookies.get("index"),
      models: Cookies.get("models")
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    childMenu(index) {
      Cookies.set("index", index);
    },
    contrast(a) {
      return this.models.indexOf(a) == -1;
      // 如果有值 等于-1 返回true disabled不生效
    },
    back() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$router.push('/login')
          axios.post("api/sys/logout");
          Cookies.set("account", "");
          Cookies.set("token", "");
          Cookies.set("models", "");
          Cookies.set("name", "");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  computed: {
    ...mapState(["userPower"])
  },
  created() {
    if (!Cookies.get("index")) {
      this.selIndex = "/HomePage";
    }
  }
};
</script>

<style scoped>
.box {
  min-height: 100vh;
  background-color: #2c3b3b;
  float: left;
  border-right: 3px solid #323b49;
}
</style>
