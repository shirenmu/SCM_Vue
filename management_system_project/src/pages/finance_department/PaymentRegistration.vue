<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#334257"
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

    <el-table
      ref="multipleTable"
      :data="mockData"
      tooltip-effect="dark"
      style="width: 100%"
    >
   
      <el-table-column v-for="col in columns"  :key="col.id" :label="col.label" :prop="col.id">
      </el-table-column>
      
    

      <el-table-column label="付款" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="delEnd(scope.row)" class="btnDel">付款</el-button>
        </template>
      </el-table-column>
      
    </el-table>

     <el-pagination
        @current-change="currentChange"
        :total="total"
        background
        layout="prev, pager, next"
        :page-size="10"
        :current-page.sync="page"


      ></el-pagination>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",


      mockData: [],
      total:0,
      page:1,
      payType:1,
      type:3,

      columns:[
        {id:'poId',label:'采购单编号'},
        {id:'createTime',label:'创建时间'},
        {id:'venderName',label:'供应商名称'},
        {id:'account',label:'创建用户'},
        {id:'tipFee',label:'附加费用'},
        {id:'productTotal',label:'采购产品总价'},
        {id:'poTotal',label:'采购单总价'},
        {id:'payType',label:'付款方式'},
        {id:'status',label:'处理状态'},
        {id:'prePayFee',label:'最低预付金额'},
      ]
    };
  },
  methods: {
     // 公共修改状态
    changeData(resp) {
      this.mockData = resp.data.list;
      this.total = resp.data.total;
      this.page = resp.data.pageNum;
    },



    load(page =1) {
      axios.get(`api/main/purchase/pomain/show?type=4&payType=${this.payType}&page=${page}`).then(resp => {
        const result = resp.data;

        this.mockData = result.list.map(data => {
          // 遍历组件请求结果数组，
          let obj = {};
          // 每次新建一个空对象
          this.columns.map(col => {
            // 遍历父组件传递过来的数组，对象的所有键名 ： 对象所有的键值
            Object.assign(obj, { [col.id]: data[col.id] });
            // 重新保存在obj中
          });
          return obj;
          // 返回 obj
        });
        this.total = result.total
        this.page = result.pageNum
        
      });
    },




    // 筛选
    handleSelect(key) {
      if (key == 1) {
        this.payType = key          
        this.load()
      } else if (key == 2) {
        this.payType = key
        this.load()
      } else if (key == 3) {
        this.payType = key
        this.load()
      }
    },

    // 付款
   
    delEnd(row) {
      console.log(row.payType,row.status)
      this.$confirm("支付这笔采购单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if(row.payType == 3 &&row.status==2 || row.payType == 1 &&row.status==2 || row.payType == 2 &&row.status==1){
            axios
            .get(
              `api/main/finance/pay?poId=${row.poId}&type=1`
            )
            .then(resp => {
              this.changeData(resp);
              location.reload();
            });
          }else{
            axios
            .get(
              `api/main/finance/pay?poId=${row.poId}&type=2`
            )
            .then(resp => {
              this.changeData(resp);
              location.reload();
            });
          }
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消付款操作"
          });
        });
    },

    currentChange(page){
      this.load(page)
    }
  },
   created() {
     this.load()
   
  },
};
</script>