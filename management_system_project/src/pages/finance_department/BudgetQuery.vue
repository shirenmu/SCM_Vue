<template>
  <div>
    <!-- 搜索采购单 satrt-->

    <el-row style="margin:20px auto">
      <el-col :span="12" :offset="5">
        <el-input
          placeholder="查找相关单据号"
          v-model="query.no"
          size="small"
          @keyup.enter.native="filterVender"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button class="el-icon-search btnDel" @click="filterVender" style="margin:0 4px"></el-button>
      </el-col>
    </el-row>

    <el-row>
      <!-- 根据付款方式 -->

      <el-col :span="4" :offset="2">
        <el-radio-group v-model="query.type">
          <el-radio :label="0">支出</el-radio>
          <el-radio :label="1">收入</el-radio>
        </el-radio-group>
      </el-col>
     
      <!-- 根据处理状态 -->


       <el-col :span="4" >
        <el-select v-model="query.payType" placeholder="请选择付款方式" size="mini">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>


      <!-- 根据日期范围 -->
      <el-col :span="4">
        <div class="block">
          <el-date-picker
            v-model="query.startDate"
            type="date"
            placeholder="开始日期"
            size="mini"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="block">
          <el-date-picker
            v-model="query.endDate"
            type="date"
            placeholder="截止日期"
            size="mini"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>

    <el-row></el-row>

    <!-- 搜索采购单 end-->

    <el-table
      ref="multipleTable"
      :data="mockData"
      tooltip-effect="dark"
      style="width: 100%;margin-top:40px;"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="收款(付款)日期">
        <template slot-scope="scope">{{ scope.row.payTime }}</template>
      </el-table-column>
      <el-table-column label="相关单据号" width="120">
        <template slot-scope="scope">{{ scope.row.ordercode }}</template>
      </el-table-column>
      <el-table-column label="收款(付款)金额">
        <template slot-scope="scope">{{ scope.row.payPrice }}</template>
      </el-table-column>
      <el-table-column label="经手人" width="100">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="单据付款方式" >
        <template slot-scope="scope">{{ scope.row.payType }}</template>
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
          :current-page.sync="query.page"
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
const qs = require("querystring");
import FilterVender from "@/pages/purchasing_department/FilterVender";
export default {
  components: {
    FilterVender
  },
  data() {
    return {
      // 新增采购单信息

      total: 0,
      mockData: [],

      lookPur: {},

      payType: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],


      searchVender: "", // 筛选

      poitems: [],

      query: {
        no: "", // 单据编号
        payType: "", // 付款方式
        startDate: "", // 开始日期
        endDate: "", // 截止日期
        type: 0, // 收支类型
        page: 1 // 显示页码
      }
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 公共修改数据方法
    changeData(resp) {
      this.mockData = resp.data.list;
      this.total = resp.data.total;
      this.query.page = resp.data.pageNum;
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 显示分页
      new Promise((resolve, reject) => {
        axios
          .post(`api/main/purchase/pomain/query`, qs.stringify(this.query))
          .then(resp => {
            console.log(resp.data);
            this.changeData(resp);
          });
      }).catch(err => {
        console.log(err);
      });
    },

    lookOpen(row) {
      new Promise((resolve, reject) => {
        axios
          .get(`api/main/purchase/pomain/queryItem?poId=${row.poId}`)
          .then(resp => {
            this.lookPur = row;
            this.poitems = resp.data;
          });
      }).catch(err => {
        console.log(err);
      });
    },

    // poId: "", // 采购单编号
    //   venderCode: "", // 供应商编号
    //   payType: "", // 付款方式
    //   startDate: "", // 开始日期
    //   endDate: "", // 截止日期
    //   status: "", // 处理状态
    //   page: 1 // 显示页码

    // 筛选 点击显示
    filterVender() {
      this.query.page = 1;
      if ((this.query.page = 1)) {
        new Promise((resolve, reject) => {
          axios
            .post(`api/main/finance/query`, qs.stringify(this.query))
            .then(resp => {
              this.changeData(resp);
              // location.reload();
              console.log(resp.data)
            });
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.query.page = 1;
      }
    },

    lookPoitems(row) {},

    transmitA(row) {
      this.query.venderCode = row.venderCode;
    },
    changeAlert() {
      // this.flagF = !this.flagF
    }
  }
};
</script>



<style scope>
.showCode {
  border-top: 1px solid #334257;
  border-right: 1px solid #334257;
  border-bottom: 1px solid #334257;
  height: 26px;
  width: 120px;
  border-radius: 4px;
  text-indent: 1em;
  font-size: 14px;
  line-height: 26px;
  margin-top: 10px;
  margin-left: 1px;
  float: left;
  color: #334257;
}

.el-table thead {
  font-weight: 300;
  color: #334257;
  font-size: 14px;
}

.tabel_style {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #334257;
  padding: 6px 0;
  border-radius: 2px;
  margin-top: 20px;
}
</style>

 



   