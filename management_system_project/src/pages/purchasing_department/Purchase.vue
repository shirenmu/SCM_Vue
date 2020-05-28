<template>
  <div>
    <!-- 新增采购单 satrt-->

    <el-button @click="addPurchase" class="btnMain" style="margin-bottom:60px">
      <i class="el-icon-plus" style="margin-right:8px"></i>添加采购单
    </el-button>
    <!-- 新增采购单 end-->

    <el-table
      ref="multipleTable"
      :data="mockData"
      tooltip-effect="dark"
      style="width: 100%"
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
      <el-table-column label="最低预付款金额" width="118">
        <template slot-scope="scope">{{ scope.row.prePayFee }}</template>
      </el-table-column>

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-popover width="1200">
            <el-form
              :model="purchaseInfo"
              prop="purchaseInfo"
              ref="form"
              label-width="100px"
              class="alertAdd"
            >
              <el-row>
                <el-col :span="16">
                  <h4
                    style="font-weight:700;margin: 0 auto;color:#334257;width:200px;height:80px;font-size:20px"
                  >
                    <i class="el-icon-menu"></i>修改采购单
                  </h4>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="采购单编号" prop="poId" label-width="100px">
                    <el-input v-model="purchaseInfo.poId"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createTime" label-width="100px">
                    <el-input v-model="purchaseInfo.createTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" label-width="100px">
                  <el-form-item label="供应商名称" prop="venderName">
                    <el-input v-model="purchaseInfo.venderName" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="创建用户" prop="account" label-width="100px">
                    <el-input v-model="purchaseInfo.account"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="附加费用" prop="tipFee" label-width="100px">
                    <el-input v-model="purchaseInfo.tipFee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="产品总价" prop="productTotal" label-width="100px">
                    <el-input v-model="purchaseInfo.productTotal" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="12">
                  <el-form-item label="采购单总价" label-width="100px" prop="poTotal">
                    <el-input v-model="purchaseInfo.poTotal" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item label="付款方式" prop="payType" label-width="100px">
                    <el-input v-model="purchaseInfo.payType" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="最低预付款金额" prop="prePayFee" label-width="120px">
                    <el-input v-model="purchaseInfo.prePayFee" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">

                  <el-form-item class="loginText" label-width="100px">
                <el-button type="primary" @click="addMore(scope.row)" class="btnDel">添加明细</el-button>
              </el-form-item>

                </el-col>
                <el-col :span="10">
                   <el-form-item class="loginText" label-width="100px">
                <el-button type="primary" @click="updatePur" class="btnDel">保存</el-button>
              </el-form-item>

                </el-col>
              
             
              </el-row>


        <el-row class="tabel_style" type="flex" justify="space-between">
          <el-col :span="4">产品选择</el-col>
          <el-col :span="4">产品编号</el-col>
          <el-col :span="3">产品名称</el-col>
          <el-col :span="2">数量单位</el-col>
          <el-col :span="2">产品单价</el-col>
          <el-col :span="2">产品数量</el-col>
          <el-col :span="2">明细总价</el-col>
          <el-col :span="2">操作</el-col>
          <p>{{state}}</p>
        </el-row>


              <el-row
                v-for="(item,index) in purchaseInfo.poitems"
                :key="index"
                style="margin:10px 0"
                type="flex"
                justify="space-between"
              >
                <el-col :span="4">
                  <el-autocomplete
                    :fetch-suggestions="querySearchAsync"
                    placeholder="修改产品编号"
                    @select="handleSelect"
                    @blur="seacrhBlur(index)"
                    size="small"
                  ></el-autocomplete>
                </el-col>

                <el-col :span="4">
                  <el-input v-model="item.productCode" size="small" disabled></el-input>
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
                <el-col :span="2">
                  <el-button class="btnEdit" @click="reomveItem(index,item)" style="margin:0">删除</el-button>
                </el-col>
              </el-row>

              

              
            </el-form>

            <el-button slot="reference" size="mini" class="btnEdit" @click="editOpen(scope.row)">编辑</el-button>
          </el-popover>
          <el-button size="mini" type="primary" @click="delVender(scope.row)" class="btnDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="float:right; margin:20px 200px 20px auto">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
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
export default {
  data() {
    return {
      // 新增采购单信息
      purchaseInfo: {
        poId: "",
        venderCode: "",
        account: "", //禁
        createTime: "",
        tipFee: "",
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "",
        status: 1,
        remark: "",
        poitems: [
          // {
          //   poId: "",
          //   productCode: "",
          //   productName: "",
          //   unitPrice: "",
          //   num: "",
          //   unitName: "",
          //   itemPrice: ""
          // }
        ]
      },

      total: 0,
      page: 1,
      mockData: [],


      // 选择产品的下标
      index: "",

      // 远程搜索状态值
      restaurants: [],
      state: "",
      timeout: null,

      // 总价计算
      priceAll: ""
    };
  },

  methods: {
    // 公共修改数据方法
    changeData(resp) {
      this.mockData = resp.data.list;
      this.total = resp.data.total;
      this.page = resp.data.pageNum;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 打开编辑
    editOpen(row) {
      this.purchaseInfo = row;
      new Promise((resolve, reject) => {
        axios
          .get(`api/main/purchase/pomain/queryItem?poId=${row.poId}`)
          .then(resp => {
            console.log(resp.data);
            this.purchaseInfo.poitems = resp.data;
            // location.reload();
          });

        axios.get(`api/main/sell/product/show`).then(resp => {
          let arr = resp.data.list;
          this.restaurants = arr.map(item => {
            return {
              value: item.productCode.toString(),
              name: item.name,
              remark: item.unitName
            };
          });
        });
      }).catch(err => {
        console.log(err);
      });
    },
    // 添加采购单
    addPurchase() {
      this.$router.push({ name: "AddPurchase" });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 显示分页
      new Promise((resolve, reject) => {
        axios.get(`api/main/purchase/pomain/query?page=${val}`).then(resp => {
          this.changeData(resp);
        });
      }).catch(err => {
        console.log(err);
      });
    },
    // 删除
    delVender(vender) {
      this.$confirm("此操作将永久删除该采购单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            axios.post(`api/main/purchase/pomain/delete`,qs.stringify({ poId: vender.poId,page: this.page })
          )
          .then(resp => {
            this.changeData(resp);
            location.reload();
          });
          })
          .catch((err) => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            console.log(err);
          });
    },
    // 查看明细
    lookPoitems(row) {
      
    },


        // 添加明细
    addMore() {
      let more = {
        poId: this.purchaseInfo.poId,
        productCode: "",
        productName: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice : ""
      };
      this.purchaseInfo.poitems.push(more);
    },

    // 修改
    updatePur() {
      new Promise((resolve, reject) => {
        axios
          .post(
            `api/main/purchase/pomain/update`,
            qs.stringify(this.editVender)
          )
          .then(resp => {
            this.changeData(resp);
            location.reload();
            // console.log(resp.data)
          });
      }).catch(err => {
        console.log(err);
      });
    },

    // 删除明细
    reomveItem(index, item) {
      this.purchaseInfo.poitems.splice(index, 1);
      // 本行产品总价
      let a = item.unitPrice * item.num;
      item.itemPrice = a;
      // 所有产品总价（不包含附加）   &  采购总价
      let b = 0;
      this.purchaseInfo.poitems.map(item => {
        b += item.itemPrice;
      });
      this.priceAll = b;
      this.purchaseInfo.poTotal =
        parseInt(this.purchaseInfo.tipFee) + parseInt(b); // 采购总价
      this.purchaseInfo.productTotal = b; // 所有产品总价（不包含附加）
    },

    sum(item) {
      // 本行产品总价
      let a = item.unitPrice * item.num;
      item.itemPrice = a;

      // 所有产品总价（不包含附加）   &  采购总价
      let b = 0;
      this.purchaseInfo.poitems.map(item => {
        b += item.itemPrice;
      });
      this.priceAll = b;
      this.purchaseInfo.poTotal =
        parseInt(this.purchaseInfo.tipFee) + parseInt(b); // 采购总价
      this.purchaseInfo.productTotal = b; // 所有产品总价（不包含附加）
    },

    tolSum() {
      this.purchaseInfo.poTotal =
        parseInt(this.priceAll) + parseInt(this.purchaseInfo.tipFee);
      this.purchaseInfo.productTotal = parseInt(this.priceAll);
    },

    // 远程搜索   -  start
    querySearchAsync(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(val) {
      this.purchaseInfo.poitems[this.index].productCode = val.value;
      this.purchaseInfo.poitems[this.index].productName = val.name;
      this.purchaseInfo.poitems[this.index].unitName = val.remark;
    },

    seacrhBlur(index) {
      this.index = index;
    },
    // 远程搜索   -  end



     // 保存采购单修改
    updatePur() {
      console.log(this.purchaseInfo)
      new Promise((resolve, reject) => {
        axios.post("api/main/purchase/pomain/update",JSON.stringify(this.purchaseInfo),
        {headers:{'Content-Type': 'application/json'}}
	            
        ).then(()=>{
          // this.$router.push('/purchase')
            location.reload();

        })
      }).catch(err => {
        console.log(err);
      });
    },
  },

  created() {
    new Promise((reslove, reject) => {
      axios
        .get(`api/main/purchase/pomain/query?page=${this.page}`)
        .then(resp => {
          this.changeData(resp);
        });
    }).catch(err => {
      console.log(err);
    });
  }
};
</script>


<style scope>

.tabel_style {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #334257;
  padding: 6px 0;
  border-radius: 2px;
}
  
</style>