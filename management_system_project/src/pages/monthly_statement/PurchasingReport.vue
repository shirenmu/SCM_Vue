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
      <el-table-column prop="totalnum" label="采购单总数"></el-table-column>
      <el-table-column prop="endtotalnum" label="已了结数"></el-table-column>
      <el-table-column prop="pototal" label="采购单总金额"></el-table-column>
      <el-table-column prop="totalpay" label="已付款金额"></el-table-column>

      <el-table-column label="操作">
        <el-button class="btnDel" @click="showPurDetails(true)">查看</el-button>
      </el-table-column>
    </el-table>

    <!-- 采购单详细 -->

    <Detailed
      url="/main/report/pomain/main"
      title="月度采购报表"
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
      purColumns: [
        { id: "poId", label: "采购单编号" },
        { id: "venderName", label: "供应商名称" },
        { id: "createTime", label: "创建日期" },
        { id: "account", label: "创建用户" },
        { id: "poTotal", label: "采购单总金额" },
        { id: "payType", label: "付款方式" },
        { id: "prePayFee", label: "最低预付款金额" },
        { id: "status", label: "采购单状态" }
      ],
      showPur: false
    };
  },
  components: {
    Detailed
  },
  watch: {
    timer(a, b) {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    // 采购单详情报表
    showPurDetails(show) {
      this.showPur = show;
      // 关闭对话框
    },
    getPurDetails(data) {
      console.log(data);
      this.showPur = false;
    },
    load() {
      axios
        .get(
          `/api/main/report/pomain/main?time=${this.timer}&page=${this.page}`
        )
        .then(resp => {
          let arr = [];
          arr.push(resp.data);
          this.users = arr;
        });
    }
  }
};
</script>

<style scoped>
</style>
