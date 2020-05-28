<template>
  <div>
    <el-header>
      <el-row>
        <el-col :offset="10" :span="6"><h3 >库存查询</h3></el-col>
      </el-row>
      
     
    </el-header>
    <el-main>
      <el-table :data="tableData" border style="width: 90%" class="tableStyle">
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="num" label="当前库存"></el-table-column>
        <el-table-column prop="poNum" label="采购在途数"></el-table-column>
        <el-table-column prop="soNum" label="预销售数"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            
            <el-select v-model="scope.row.stockType" placeholder size="mini" style="margin-bottom:6px">
              <el-option
                v-for="item in stockType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                
              ></el-option>
            </el-select>

            <el-dialog :title="`${alterRecord.stockType==1?'入库记录信息':'出库记录信息'}`" :visible.sync="dialogFormVisible">
              <el-table :data="changestock" border style="width: 90%" class="tableStyle">
                <el-table-column prop="stockTime" :label="`${alterRecord.stockType==1?'入库记录信息':'出库记录信息'}`"></el-table-column>
                <el-table-column prop="orederCode" :label="`${alterRecord.stockType==1?'相关采购单号':'相关销售单号'}`">
                  <template slot-scope="scope">
                    <span v-show="scope.row.stockType==1">{{scope.row.orderCode}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createUser" :label="`${alterRecord.stockType==1?'入库经手人':'出库经手人'}`"></el-table-column>
                <el-table-column prop="stockNum" :label="`${alterRecord.stockType==1?'入库数量':'出库数量'}`"></el-table-column>
                <el-table-column prop="stockType" :label="`${alterRecord.stockType==1?'入库类型':'出库类型'}`">
                  <template slot-scope="scope">
                    <span v-show="alterRecord.stockType==1">{{scope.row.stockType==1?'采购入库':'盘点入库'}}</span>
                    <span v-show="alterRecord.stockType==2">{{scope.row.stockType==3?'销售出库':'盘点出库'}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                layout="prev,pager,next,sizes,jumper,total"
                :total="total2"
                @current-change="changePage2"
                :page-size="10"
              ></el-pagination>
            </el-dialog>

            <el-button @click="handleEdit(scope.row)" size="mini">查询记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev,pager,next,jumper,total"
        :total="total"
        @current-change="changePage"
        :page-size="10"
        style="margin-left:30%;"
      ></el-pagination>
    </el-main>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      title:'',
      dialogFormVisible: false,
      changestock: [],
      tableData: [],
      total: 1,
      total2:1,
      alterRecord: {},

      stockType: [
        { value: "1", label: "入库" },
       { value: "2", label: "出库" }
       ]
    };
  },
  methods: {
    changePage(val) {
      axios
        .post("/api/main/stock/query", qs.stringify({ page: val }))
        .then(resp => {
          // console.log(resp);
          this.tableData = resp.data.list;
          this.total = resp.data.total;
        });
    },
    changePage2(val){
      this.alterRecord.page=val
      axios
        .post("/api/main/stock/alterRecord", qs.stringify(this.alterRecord))
        .then(resp => {
          let result = resp.data;
          console.log(result);
          this.changestock = result.data.list;
          this.total2=result.data.total
        });
    },
    //更新
    handleEdit(row) {
      
      this.alterRecord.productCode = row.productCode;
      this.alterRecord.stockType = row.stockType;
      // console.log(this.title)
      if(this.alterRecord.stockType){
        this.dialogFormVisible = !this.dialogFormVisible;
      }
      axios
        .post("/api/main/stock/alterRecord", qs.stringify(this.alterRecord))
        .then(resp => {
          let result = resp.data;
          console.log(result);
          this.changestock = result.data.list;
          this.total2=result.data.total
          console.log(this.alterRecord)
        });
    }
  },
  beforeMount() {
    axios
      .post("/api/main/stock/query", qs.stringify({ page: 1 }))
      .then(resp => {
        let result = resp.data;
        // console.log(result);
        this.tableData = result.list;
        this.total = resp.data.total;
        console.log(this.tableData)
        
      });
  }
};
</script>
<style scoped>
.el-main {
  width: 1280px;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
}
.el-main {
  width: 1280px !important;
  margin: auto;
}
</style>