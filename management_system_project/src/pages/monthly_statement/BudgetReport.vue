<template>
  <div>
    <el-row style="margin:10px 0 40px 0;">
      <div class="block">
        <el-date-picker
          v-model="timer"
          type="month"
          placeholder="选择月"
          size="small"
          value-format="yyyy-MM"
        ></el-date-picker>
      </div>
    </el-row>

    <el-table :data="users" border stripe>
      <el-table-column prop="receCount" label="收款次数"></el-table-column>
      <el-table-column prop="recePrice" label="收款总金额"></el-table-column>
      <el-table-column prop="payCount" label="付款次数"></el-table-column>
      <el-table-column prop="payPrice" label="付款总金额"></el-table-column>

      <el-table-column label="操作">

          <el-button class="btnDel" @click="showPurDetails(true)">查看收款明细</el-button>


          <el-button class="btnDel" @click="showPoDetails(true)">查看付款明细</el-button>


      </el-table-column>
    </el-table>



    

    <!-- 采购单详细 -->
    
    <Budget
      url="/main/report/payment/detail/receipt"
      title="收款明细"
      :columns="purColumns"
      :visible="showPur"
      :timer="timer"
      @showOrCloseDialog="showPurDetails"
      @getSelectData="getPurDetails"
    />

    <Budget
      url="/main/report/payment/detail/pay"
      title="付款明细"
      :columns="poColumns"
      :visible="showPo"
      :timer="timer"
      @showOrCloseDialog="getPoDetails"
      @getSelectData="getPurDetails"
    />

   
  </div>
</template>

<script>
import axios from "axios";
import Budget from "@/components/Budget";
import * as timer from "@/tools/DateTime";
export default {
  data() {
    return {
      total: 0,
      page: 1,

      // 所有信息
      users: [],
 
      // 详细信息
      timer: timer.MDate(),
      // 查看详细信息
      detailed: {},
      purColumns:[
        {id:'soid',label:'销售单编号'},
        {id:'createTime',label:'销售日期'},
        {id:'pay_time',label:'收款日期'},
        {id:'pay_price',label:'收款金额'},
        {id:'account',label:'经手人'},
        {id:'status',label:'处理状态'},
      ],
      showPur:false,
      poColumns:[
        {id:'poid',label:'采购单编号'},
        {id:'createTime',label:'采购日期'},
        {id:'pay_time',label:'付款日期'},
        {id:'pay_price',label:'付款金额'},
        {id:'account',label:'经手人'},
        {id:'status',label:'处理状态'},
      ],
      showPo:false
    };
  },
  components: {
    Budget
  },
  watch:{
    timer(a,b){
      this.load()
    }
  },
  created() {
   this.load()
  },
  methods: {
    // 收款明细
    showPurDetails(show){
      this.showPur = show
      // 关闭对话框
    },
    getPurDetails(data){
      console.log(data)
      this.showPur = false
    },




    // 付款明细
    showPoDetails(show){
      this.showPo = show
      // 关闭对话框
    },
    getPoDetails(data){
      console.log(data)
      this.showPo = false
    },

    load(){
       axios.get(`/api/main/report/payment/main?time=${this.timer}&page=${this.page}`)
      .then(resp => {
        let arr =[]
        arr.push(resp.data);
        this.users = arr
        console.log(resp.data)
      });
    }


  }
};
</script>

<style scoped>
</style>
