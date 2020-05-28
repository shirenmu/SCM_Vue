<template>
  <div style="padding:20px">
    
    <el-row>
      <div class="marginTb">

        <el-col :span="22">
          <el-input placeholder="查找编号和名称" v-model="searchVender" size="small">
           <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="el-icon-search btnDel" @click="filterVender" style="margin:0 4px"></el-button>
        </el-col>

      </div>
    </el-row>


    <el-row>
       <el-table :data="vender" tooltip-effect="dark" style="width: 100% "  >
      <el-table-column label="编号" width="200">
          <template slot-scope="scope">{{scope.row.venderCode}}</template>
      </el-table-column>
      <el-table-column label="名称" width="200">
          <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="操作" >
         <template slot-scope="scope"><el-button class="btnEdit" @click="returnIfo(scope.row,flagChild)">确认</el-button></template>
        
      </el-table-column>

    </el-table>

    <div style="float:right; margin:30px 180px 20px auto">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total='total'
        ></el-pagination>
      </div>
    </div>

    </el-row>

   
    
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data(){
    return{
      vender:[],
      searchVender:'', // 筛选供应商,
      page:1,
      total:0,
      flagChild:this.$props.flag
        
      
    }
  },

  methods:{

    // 公共修改数据方法
    changeData(resp) {
      this.vender = resp.data.list;
      this.total = resp.data.total;
      this.page = resp.data.pageNum;
    },
     
    returnIfo(data,flagChild){ // 把编号和名称显示在新增采购单上
      this.$emit('transmit',data)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 显示分页
      new Promise((resolve, reject) => {
        if(isNaN(Number(this.searchVender))){
          axios.get(`api/main/purchase/vender/show?page=${val}&name=${this.searchVender}`).then(resp => {
            this.changeData(resp);
          });
        }else{
          axios.get(`api/main/purchase/vender/show?page=${val}&venderCode=${this.searchVender}`).then(resp => {
            this.changeData(resp);
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 筛选供应商
    filterVender(){
      new Promise((resolve, reject) => {
        if(isNaN(Number(this.searchVender))){
          axios.get(`api/main/purchase/vender/show?page=${this.page}&name=${this.searchVender}`).then(resp => {
            this.changeData(resp) 
          });
        }else{
          axios.get(`api/main/purchase/vender/show?page=${this.page}&venderCode=${this.searchVender}`).then(resp => {
            this.changeData(resp) 
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
  },
  created() {
    new Promise((resolve, reject) => {
      axios.get(`api/main/purchase/vender/show`).then(resp => {
        this.changeData(resp) 
      });
    }).catch(err => {
      console.log(err);
    });
  },
  props: ['flag'], // 无用
}
</script>