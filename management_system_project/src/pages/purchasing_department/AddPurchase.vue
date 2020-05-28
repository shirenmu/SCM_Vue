<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-button @click="back" class="borBtn" icon="el-icon-s-fold">返回</el-button>
      </el-col>
      <el-col :span="16">
        <h4 style="font-weight:700;margin: 0 auto;color:#334257;width:200px;height:40px">
          <i class="el-icon-edit-outline"></i>添加采购单
        </h4>
      </el-col>
      <el-col :span="4">
        <el-button class="borBtn" icon="el-icon-download" @click="addPur">保存</el-button>
      </el-col>
    </el-row>

    <div style="margin:30px 80px;min-width='500px' ">
      <el-form :model="purchaseInfo" ref="form" label-width="100px" :rules="rules">
        <el-row style="margin:20px 0">
          <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
            <el-form-item label="采购单编号" prop="pold">
              <el-input v-model="purchaseInfo.poId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
            <el-form-item label="创建时间" prop="pold">
              <el-input v-model="purchaseInfo.createTime" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="4" :sm="6" :md="8" :lg="7" :xl="6">
            <el-form-item label="创建用户" prop="account">
              <el-input v-model="purchaseInfo.account" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
            <el-form-item label="供应商名称" prop="venderName">
              <el-input v-model="purchaseInfo.venderName" size="medium"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
            <el-form-item label="供应商编号" prop="venderCode">
              <el-input v-model="purchaseInfo.venderCode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" :offset="1">
            <el-popover placement="right" width="600" trigger="click">
              <!-- 供应商选择框 -->
              <FilterVender class="alertAdd" @transmit="transmitA" :flag="flagF" />

              <el-button slot="reference" class="btnMain" size="mini">供应商选择</el-button>
            </el-popover>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
            <el-form-item label="附加费用" prop="tipFee">
              <el-input v-model="purchaseInfo.tipFee" size="small" @input="tolSum"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
            <el-form-item label="产品总价" prop="productTotal">
              <el-input v-model="purchaseInfo.productTotal" disabled size="medium"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
            <el-form-item label="采购总价" prop="poTotal">
              <el-input v-model="purchaseInfo.poTotal" disabled size="medium"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5" :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
            <el-form-item label="付款方式" prop="payType">
              <el-select v-model="purchaseInfo.payType" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in payType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5" :xs="10" :sm="9" :md="8" :lg="7" :xl="6" :offset="1">
            <el-form-item label="最低预付金额" prop="prePayFee">
              <el-input
                v-model="purchaseInfo.prePayFee"
                size="small"
                :disabled="purchaseInfo.payType!='3'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="17" style="margin: 10px 0;margin-bottom:0">
            <el-form-item label="备注:" prop="remark">
              <el-input
                v-model="purchaseInfo.remark"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-top:30px;">
          <el-col :xs="9" :sm="8" :md="7" :lg="6" :xl="5">
            <el-button class="btnAdd" @click="addMore" icon="el-icon-circle-plus-outline">
              <span style="font-size:14px;margin-left:7px">添加明细</span>
            </el-button>
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
              placeholder="查询产品名称"
              @select="handleSelect"
              @blur="seacrhBlur(index)"
              size="small"
            ></el-autocomplete>
            <!-- <i class="el-icon-search"></i> -->
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
    </div>
  </div>
</template>

<script>
import FilterVender from "@/pages/purchasing_department/FilterVender";
import axios from "axios";
import Cookies from "js-cookie";
const qs = require("querystring");
import * as timer from "@/tools/DateTime";

export default {
  components: {
    FilterVender
  },
  data() {
    return {
      // 新增采购单信息
      purchaseInfo: {
        poId: timer.formatTimeDate(),
        venderCode: "",
        venderName: "",
        account: Cookies.get("account"), //禁
        createTime: timer.timeDate(),
        tipFee: 0,
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: 0,
        status: 1, // 采购单状态
        remark: "",
        poitems: [
          //采购单明细
        ]
      },

      payType: [
        {
          value: 1,
          label: "货到付款"
        },
        {
          value: 2,
          label: "款到发货"
        },
        {
          value: 3,
          label: "预付款到发货"
        }
      ],
      value: "",
      flagF: true,

      // 远程搜索状态值
      restaurants: [],
      state: "",
      timeout: null,

      // 选择产品的下标
      index: "",

      // 总价计算
      priceAll: "",

      // 验证
      rules: {
        venderName: [
          {
            type: "string",
            required: true,
            message: "供应商名称",
            trigger: "blur"
          }
        ],
        venderCode: [
          { required: true, message: "供应商编号", trigger: "blur" }
        ],
        payType: [
          {
            type: "string",
            required: true,
            message: "请选择付款方式",
            trigger: "blur"
          }
        ]
      }
    };
  },

  created() {
    axios.get(`api/main/sell/product/show`).then(resp => {
      let arr = resp.data.list;
      this.restaurants = arr.map(item => {
        return {
          value: item.name,
          name: item.productCode.toString(),
          remark: item.unitName
        };
      });
    });
  },

  methods: {
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

      // 防止重复添加
      let res = this.purchaseInfo.poitems.find(poitem => {
        return poitem.productName == val.value;
      });
      console.log(res, 111);
      if (res) {
        alert("chong fu le");
      } else {
        this.purchaseInfo.poitems[this.index].productCode = val.name;
        this.purchaseInfo.poitems[this.index].productName = val.value;
        this.purchaseInfo.poitems[this.index].unitName = val.remark;
      }
    },

    seacrhBlur(index) {
      this.index = index;
    },
    // 远程搜索   -  end

    //  input 事件触发计算总价   -start
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
    //  input 事件触发计算总价   - end

    // 回退一页
    back() {
      window.history.back(-1);
    },

    // 保存采购单
    addPur() {
      console.log(this.purchaseInfo);
      new Promise((resolve, reject) => {
        axios
          .post(
            "api/main/purchase/pomain/add",
            JSON.stringify(this.purchaseInfo),
            { headers: { "Content-Type": "application/json" } }
          )
          .then(() => {
            this.$router.push("/purchase");
          });
      }).catch(err => {
        console.log(err);
      });
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
        itemPrice: ""
      };
      this.purchaseInfo.poitems.push(more);
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

    transmitA(row) {
      this.purchaseInfo.venderCode = row.venderCode;
      this.purchaseInfo.venderName = row.name;
    },
    changeAlert() {
      // this.flagF = !this.flagF
    }
  }
};
</script>

<style scope>
.borBtn {
  background-color: #334257;
  margin-bottom: 20px;
  padding: 0;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  border: 1px solid #334257;
}
.borBtn:hover {
  background-color: #fff;
  color: #334257;
  border: 1px solid #334257;
}
.el-table td {
  padding: 0;
}

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