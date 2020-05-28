<template>
  <div>
    <el-header>
      <el-row>
        <el-col :offset="10" :span="6">
          <h3>库存盘点</h3>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" border style="width: 90%" class="tableStyle">
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="num" label="当前库存"></el-table-column>
        <el-table-column prop="poNum" label="采购在途数"></el-table-column>
        <el-table-column prop="soNum" label="预销售数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover placement="right" width="500" trigger="click">
              <el-form :model="checkstock" ref="form" style="padding:40px" label-width="100px">
                <el-form-item label="变化数量">
                  <el-input v-model="checkstock.num"></el-input>
                </el-form-item>
                <el-form-item label="变化类型">
                  <el-select v-model="checkstock.type" placeholder>
                    <el-option
                      v-for="item in type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="损益原因">
                  <el-input v-model="checkstock.description"></el-input>
                </el-form-item>
              </el-form>
              <el-col :offset="20" style="margin-top:-40px;padding-bottom:20px;">
                 <el-button @click="handleClick(scope.row)" size="small" class="btnDel">确定</el-button>
              </el-col>
             
              <el-button slot="reference" @click="handleEdit(scope.row)" size="mini">更新</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev,pager,next,jumper,total"
        :total="this.total"
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
      type: [
        { value: "损耗", label: "损耗" },
        { value: "盘余", label: "盘余" }
      ],
      tableData: [],
      total: 1,
      checkstock: {
        productCode: "",
        originNum: "",
        num: "",
        type: "",
        description: ""
      }
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
    handleClick(row) {
      this.checkstock.productCode = row.productCode;
      this.checkstock.originNum = row.num;
      axios
        .post("/api/main/stock/checkstock", qs.stringify(this.checkstock))
        .then(resp => {
          let result = resp.data;
          console.log(result);
        });
    },
    //更新
    handleEdit(row) {}
  },
  beforeMount() {
    axios
      .post("/api/main/stock/query", qs.stringify({ page: 1 }))
      .then(resp => {
        let result = resp.data;
        console.log(result);
        this.tableData = result.list;
        this.total = resp.data.total;
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

</style>