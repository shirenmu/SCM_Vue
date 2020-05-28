<template>
  <div>
    <!-- 搜索采购单 satrt-->

    <el-row style="margin:20px auto">
      <el-col :span="9" :offset="5">
        <el-input
          placeholder="查找采购单编号"
          v-model="query.poId"
          size="small"
          @keyup.enter.native="filterVender"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button class="el-icon-search btnDel" @click="filterVender" style="margin:0 4px"></el-button>
      </el-col>

      <el-col :xs="9" :sm="8" :md="7" :lg="6" :xl="5">
        <el-popover placement="right" width="600" trigger="click">
          <!-- 供应商选择框 -->
          <FilterVender class="alertAdd" @transmit="transmitA" />

          <el-button
            slot="reference"
            class="btnEdit"
            size="mini"
            @click="changeAlert"
            style="float:left"
          >供应商选择</el-button>
        </el-popover>
        <p class="showCode">{{query.venderCode}}</p>
      </el-col>
    </el-row>

    <el-row>
      <!-- 根据付款方式 -->
      <el-col :span="4" :offset="2">
        <el-select v-model="query.payType" placeholder="请选择付款方式" size="mini">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <!-- 根据处理状态 -->

      <el-col :span="4">
        <el-select v-model="query.status" placeholder="请选择处理状态" size="mini">
          <el-option
            v-for="item in statusType"
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


    <!-- 搜索采购单 end-->

    <el-table
      ref="multipleTable"
      :data="mockData"
      tooltip-effect="dark"
      style="width: 100%;margin-top:40px;"
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
      <el-table-column label="产品总价" width="100">
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

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-popover width="1200">
            <el-form
              :model="lookPur"
              prop="lookPur"
              ref="form"
              label-width="100px"
              class="alertAdd"
            >
              <el-row>
                <el-col :span="16">
                  <h4
                    style="font-weight:700;margin: 0 auto;color:#334257;width:200px;height:60px;font-size:18px"
                  >
                    <i class="el-icon-menu"></i>查看采购单
                  </h4>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="采购单编号" prop="poId" label-width="100px">
                    <el-input v-model="lookPur.poId"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createTime" label-width="100px">
                    <el-input v-model="lookPur.createTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" label-width="100px">
                  <el-form-item label="供应商名称" prop="venderName">
                    <el-input v-model="lookPur.venderName" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="创建用户" prop="account" label-width="100px">
                    <el-input v-model="lookPur.account"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="附加费用" prop="tipFee" label-width="100px">
                    <el-input v-model="lookPur.tipFee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="产品总价" prop="productTotal" label-width="100px">
                    <el-input v-model="lookPur.productTotal" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="12">
                  <el-form-item label="采购单总价" label-width="100px" prop="poTotal">
                    <el-input v-model="lookPur.poTotal" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="付款方式" prop="payType" label-width="100px">
                    <el-input v-model="lookPur.payType" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="最低预付款金额" prop="prePayFee" label-width="120px">
                    <el-input v-model="lookPur.prePayFee" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                

              <el-row class="tabel_style" type="flex" justify="space-between">
                <el-col :span="4">产品编号</el-col>
                <el-col :span="3">产品名称</el-col>
                <el-col :span="2">数量单位</el-col>
                <el-col :span="2">产品单价</el-col>
                <el-col :span="2">产品数量</el-col>
                <el-col :span="2">明细总价</el-col>
              </el-row>

             

              <el-row
                v-for="(item,index) in poitems"
                :key="index"
                style="margin:10px 0"
                type="flex"
                justify="space-between"
              >
               

                <el-col :span="4">
                  <el-input v-model="item.poId" size="small" disabled></el-input>
                </el-col>
                <el-col :span="3">
                  <el-input v-model="item.productName" size="small" disabled></el-input>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="item.unitName" size="small" disabled></el-input>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="item.unitPrice" size="small" @input="sum(item)"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="item.num" size="small" @input="sum(item)"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="item.itemPrice" size="small" disabled></el-input>
                </el-col>
              </el-row>
            </el-form>

            <el-button slot="reference" size="mini" class="btnEdit" @click="lookOpen(scope.row)">查看</el-button>
          </el-popover>
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

      statusType: [
        { value: 1, label: "新增" },
        { value: 2, label: "已收货" },
        { value: 3, label: "已付款" },
        { value: 4, label: "已了结" },
        { value: 5, label: "已预付" }
      ],

      searchVender: "", // 筛选

      poitems: [],

      query: {
        poId: "", // 采购单编号
        venderCode: "", // 供应商编号
        payType: "", // 付款方式
        startDate: "", // 开始日期
        endDate: "", // 截止日期
        status: "", // 处理状态
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
      this.query.page = 1
      if(this.query.page = 1){
        new Promise((resolve, reject) => {
        axios
          .post(`api/main/purchase/pomain/query`, qs.stringify(this.query))
          .then(resp => {
            this.changeData(resp);
            // location.reload();
          });
      }).catch(err => {
        console.log(err);
      });
      }else{
        this.query.page = 1
      }

      
    },

    lookPoitems(row) {
      
    },

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

 



   