<template>
  <div>
    <el-dialog :title="title" :visible="visible" @close="handleClose">
      <el-table :data="dialData" border highlight-current-row @current-change="selectRow">
        <el-table-column type="index"></el-table-column>

        <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>

      <el-pagination
        @current-change="currentChange"
        :total="total"
        background
        layout="prev, pager, next"
        :page-size="10"
        :current-page.sync="page"


      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectData: {},
      dialData: [],
      total: 1,
      page:1
    };
  },
  watch :{
    timer(a,b){
      this.load();
    }
  },

  props: ["visible", "title", "columns", "url","timer","poId"],

  mounted() {
    this.load();
  },

  methods: {
    //  api(page = 1) {
    //   axios.get(`/api${this.url}?page=${page}`).then(resp => {
    //     const result = resp.data;
    //     this.dialData = result.list.map(data => {
    //       let obj = {};
    //       this.columns.map(col => {
    //         Object.assign(obj, { [col.id]: data[col.id] });
    //       });
    //       return obj;
    //     });
    //     this.total = result.total;
    //   });
    // },
    load(page =1) {
      axios.get(`api${this.url}?page=${page}&time=${this.timer}`).then(resp => {
        const result = resp.data;

        this.dialData = result.list.map(data => {
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
        console.log(resp.data)
      });
    },


    // 关闭弹出框
    handleClose() {
      this.$emit("showOrCloseDialog", false);
    },
    // 确定
    sure() {
      // 将选中的数据传递给父组件
      this.$emit("getSelectData", this.selectData);
    },
    selectRow(currentRow) {
      this.selectData = currentRow;
    },
    currentChange(page) {
      this.load(page);
    },

   

  }
};
</script>