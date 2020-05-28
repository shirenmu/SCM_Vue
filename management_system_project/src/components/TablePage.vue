<template>
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
    ></el-pagination>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["visible", "title", "columns", "url"],
  data() {
    return {
      selectData: {},
      dialData: [],
      total: 1
    };
  },
  mounted() {
    this.api();
  },
  methods: {
    api(page = 1) {
      axios.get(`/api${this.url}?page=${page}`).then(resp => {
        const result = resp.data;
        this.dialData = result.list.map(data=>{
            let obj = {}
            this.columns.map(col=>{
                Object.assign(obj, {[col.id]:data[col.id]})
            })
            return obj;
        })
        
        this.total = result.total;
      });
    },
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
      this.api(page);
    }
  }
};
</script>

<style scoped>
</style>
