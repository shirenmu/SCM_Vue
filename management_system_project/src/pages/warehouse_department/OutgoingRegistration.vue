<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#232a34"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="margin-bottom:40px"
    >
      <el-menu-item index="1" class="topCss">货到付款</el-menu-item>
      <!--处理状态 1 -->
      <el-menu-item index="2" class="topCss">款到发货</el-menu-item>
      <!--处理状态 3 -->
      <el-menu-item index="3" class="topCss">预收款发货</el-menu-item>
      <!--处理状态 5 -->
    </el-menu>

    <el-table ref="multipleTable" :data="mockData" tooltip-effect="dark" style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="销售单编号">
        <template slot-scope="scope">{{ scope.row.soId }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="客户名称">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="创建用户" width="100">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="附加费用" width="100">
        <template slot-scope="scope">{{ scope.row.tipFee }}</template>
      </el-table-column>
      <el-table-column label="产品总价" width="120">
        <template slot-scope="scope">{{ scope.row.productTotal }}</template>
      </el-table-column>
      <el-table-column label="销售单总价" width="100">
        <template slot-scope="scope">{{ scope.row.soTotal }}</template>
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

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showPoDetails(scope.row)" class="btnDel">明细</el-button>
          <el-button size="mini" type="primary" @click="delEnd(scope.row)" class="btnDel">出库</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="明细信息" :visible="visible" @close="handleClose">
      <el-table :data="columns" border highlight-current-row >
        <el-table-column label="销售单编号" prop="soId"></el-table-column>
        <el-table-column label="产品名称" prop="productName"></el-table-column>
        <el-table-column label="产品数量单位" prop="unitName"></el-table-column>
        <el-table-column label="产品数量" prop="num"></el-table-column>
        <el-table-column label="采购单价" prop="unitPrice"></el-table-column>
        <el-table-column label="产品明细总价" prop="itemPrice"></el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>




<script>
import axios from "axios";

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",

      mockData: [],
      total: 0,
      page: 1,
      payType: 1,
      type: 3,

      columns: [
        { id: "soid", label: "产品编号" },
        { id: "createTime", label: "产品名称" },
        { id: "pay_time", label: "产品数量单位" },
        { id: "pay_price", label: "产品数量" },
        { id: "account", label: "采购单价" },
        { id: "status", label: "产品明细总价" }
      ],

      visible: false,
      dialData:[]
    };
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
            `api/main/sell/somain/show?type=3&payType=${key}&${this.page}`
          )
          .then(resp => {
            this.type = 3;
            this.payType = 1;
            this.changeData(resp);
            console.log(`key:${key}`);
          });
      } else if (key == 2) {
        axios
          .get(
            `api/main/sell/somain/show?type=3&payType=${key}&${this.page}`
          )
          .then(resp => {
            this.type = 2;
            this.payType = 2;
            this.changeData(resp);
            console.log(`key:${key}`);
            console.log(resp.data);
          });
      } else if (key == 3) {
        axios
          .get(
            `api/main/sell/somain/show?type=3&payType=${key}&${this.page}`
          )
          .then(resp => {
            this.type = 3;
            this.payType = 2;
            this.changeData(resp);
            console.log(`key:${key}`);
          });
      }
    },

    // 出库
    delEnd(row) {
      this.$confirm("此操作将此采购单出库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .get(
              `api/main/stock/outstock?soId=${row.soId}&type=${row.status}&page=${this.page}`
            )
            .then(resp => {
              this.changeData(resp);
              location.reload();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消出库操作"
          });
        });
    },

    // 收款明细
    showPoDetails(row) {
      this.visible = true;
      axios.get(`api/main/sell/somain/queryItem?soId=${row.soId}`).then(resp => {
        console.log(resp.data)
        this.columns = resp.data;

      })

  
       
    },
      handleClose(){
        this.visible = false;
      }
  },
  created() {
    axios
      .get(
        `api/main/sell/somain/show?type=${this.type}&payType=${this.payType}&${this.page}`
      )
      .then(resp => {
        this.changeData(resp);
        console.log(resp.data)
      });
  }
};
</script>