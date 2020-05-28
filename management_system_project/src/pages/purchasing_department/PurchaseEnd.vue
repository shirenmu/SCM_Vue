<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#334257"
      active-text-color="#ffd04b"
      style="margin-bottom:60px;font-weight:500"
    >
      <el-menu-item index="1" class="topCss">货到付款</el-menu-item>
      <!--处理状态 3 -->
      <el-menu-item index="2" class="topCss">款到发货</el-menu-item>
      <!--处理状态 2 -->
      <el-menu-item index="3" class="topCss">预收款发货</el-menu-item>
      <!--处理状态 3 -->
    </el-menu>

    <el-table
      ref="multipleTable"
      :data="mockData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="采购单编号">
        <template slot-scope="scope">{{ scope.row.poId }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="供应商名称">
        <template slot-scope="scope">{{ scope.row.venderName }}</template>
      </el-table-column>
      <el-table-column label="创建用户" width="100">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="附加费用" width="100">
        <template slot-scope="scope">{{ scope.row.tipFee }}</template>
      </el-table-column>
      <el-table-column label="采购产品总价" width="120">
        <template slot-scope="scope">{{ scope.row.productTotal }}</template>
      </el-table-column>
      <el-table-column label="采购单总价" width="100">
        <template slot-scope="scope">{{ scope.row.poTotal }}</template>
      </el-table-column>
      <el-table-column label="付款方式" width="100">
        <template slot-scope="scope">{{ scope.row.payType }}</template>
      </el-table-column>
      <el-table-column label="处理状态" width="100">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="最低预付款金额" width="118">
        <template slot-scope="scope">{{ scope.row.prePayFee }}</template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="delEnd(scope.row)" class="btnDel">了结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
    <div style="float:right; margin:20px 200px 20px auto">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeIndex: "1",

      mockData: [],
      total: 0,
      page: 1,

      type: 2,
      payType: 1
    };
  },

  created() {
    axios
      .get(
        `api/main/purchase/pomain/show?type=${this.type}&payType=${this.payType}&${this.page}`
      )
      .then(resp => {
        this.changeData(resp);
      });
  },

  methods: {
    // 公共修改状态
    changeData(resp) {
      this.mockData = resp.data.list;
      this.total = resp.data.total;
      this.page = resp.data.pageNum;
    },
    // 筛选
    handleSelect(key) {
      if (key == 1) {
        axios
          .get(
            `api/main/purchase/pomain/show?type=2&payType=${key}&${this.page}`
          )
          .then(resp => {
            // this.type = 3;
            // this.payType = 1;
            this.changeData(resp);
            console.log(`key:${key}`);
          });
      } else if (key == 2) {
        axios
          .get(
            `api/main/purchase/pomain/show?type=2&payType=${key}&${this.page}`
          )
          .then(resp => {
            // this.type = 2;
            // this.payType = 2;
            this.changeData(resp);
            console.log(`key:${key}`);
          });
      } else if (key == 3) {
        axios
          .get(
            `api/main/purchase/pomain/show?type=3&payType=${key}&${this.page}`
          )
          .then(resp => {
            // this.type = 3;
            // this.payType = 2;
            this.changeData(resp);
            console.log(`key:${key}`);
          });
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 了结
    delEnd(row) {
      this.$confirm("此操作将了结此采购单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .get(
              `api/main/purchase/pomain/end?poId=${row.poId}&type=${row.status}&page=${this.page}`
            )
            .then(resp => {
              this.changeData(resp);
              location.reload();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消了结"
          });
        });
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 显示分页
      new Promise((resolve, reject) => {
        axios
          .get(
            `api/main/purchase/pomain/show??type=${this.type}&payType=${this.payType}&page=${this.page}`
          )
          .then(resp => {
            this.changeData(resp);
          });
      }).catch(err => {
        console.log(err);
      });
    },

  }
};
</script>


<style scope>
</style>