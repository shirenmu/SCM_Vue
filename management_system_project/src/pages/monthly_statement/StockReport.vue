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
      <el-table-column prop="totalNum" label="产品总库数"></el-table-column>

      <el-table-column label="操作">

          <el-button class="btnDel" @click="showPurDetails(true)">查看</el-button>

      </el-table-column>
    </el-table>


    

    <!-- 采购单详细 -->
    
    <Detailed
      url="/main/report/stock/main"
      title="月度库存报表"
      :columns="purColumns"
      :visible="showPur"
      :timer="timer"
      @showOrCloseDialog="showPurDetails"
      @getSelectData="getPurDetails"
    />

   
  </div>
</template>

<script>
import axios from "axios";
import Detailed from "@/components/Detailed";
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

        {id:'ProductCode',label:'产品编号'},
        {id:'name',label:'产品名称'},
        {id:'num',label:'库存数'},

      ],
      showPur:false
    };
  },
  components: {
    Detailed
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
    // 采购单详情报表
    showPurDetails(show){
      this.showPur = show
      // 关闭对话框
    },
    getPurDetails(data){
      console.log(data)
      this.showPur = false
    },

    load(){
       axios.get(`/api/main/report/stock/main?time=${this.timer}&page=${this.page}`)
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
