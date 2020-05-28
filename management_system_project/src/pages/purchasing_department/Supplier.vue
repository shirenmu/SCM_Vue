<template>
  <div>
    <el-popover placement="top-start" width="900" trigger="click">
      <el-form :model="venderInfo" ref="form" :rules="rules" label-width="100px" class="alertAdd">
        <el-row style="margin:10px 0">
          <el-col :span="6">
            <h4
              style="font-weight:700;margin: 0 auto;color:#334257;width:120px;height:66px; font-size:20px"
            >
              <i class="el-icon-edit-outline"></i>添加供应商
            </h4>
          </el-col>
        </el-row>
        <el-row style="margin:10px 0">
          <el-col :span="8">
            <el-form-item label="供应商编号" prop="venderCode">
              <el-input v-model="venderInfo.venderCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="venderInfo.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="venderInfo.passWord" type="password" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:20px 0">
          <el-col :span="8">
            <el-form-item label="联系人" prop="contactor">
              <el-input v-model="venderInfo.contactor"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="venderInfo.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:20px 0">
          <el-col :span="8">
            <el-form-item label="地址" prop="address">
              <el-input v-model="venderInfo.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码" prop="postCode">
              <el-input v-model="venderInfo.postCode" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:10px 0">
          <el-col :span="8">
            <el-form-item label="添加日期">
              <el-input v-model="venderInfo.createDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:10px 0">
         
          <el-col :span="8">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="venderInfo.fax" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="loginText">
          <el-button type="primary" @click="addVender" class="btnDel">添加</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference" class="btnMain">
        <i class="el-icon-plus" style="margin-right:8px"></i>添加供应商
      </el-button>
    </el-popover>

    <el-row style="margin:10px 0">
      <div class="marginTb">
        <el-col :span="22">
          <el-input placeholder="查找对应编号和名称的供应商" v-model="searchVender" size="small">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="el-icon-search btnDel" @click="filterVender" style="margin:0 4px"></el-button>
        </el-col>
      </div>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="venderData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="编号" width="120">
        <template slot-scope="scope">{{ scope.row.venderCode }}</template>
      </el-table-column>
      <el-table-column label="名称" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="联系人" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.contactor }}</template>
      </el-table-column>
      <el-table-column label="地址" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div style="padding:10px">
              <p>邮编: {{ scope.row.postCode }}</p>
              <p>传真: {{ scope.row.fax }}</p>
            </div>

            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" class="hoverShow">{{ scope.row.address }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="注册日期" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="电话" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>

      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover placement="top-start" width="900" trigger="click">
            <el-form
              :model="editVender"
              prop="editVender"
              ref="form"
              label-width="100px"
              class="alertAdd"
              :rules="rulesTwo"
            >
              <el-row style="margin:10px 0">
                <el-col :span="8">
                  <h4
                    style="font-weight:700;margin: 0 auto;color:#334257;width:120px;height:66px; font-size:20px"
                  >
                    <i class="el-icon-edit-outline"></i>编辑供应商
                  </h4>
                </el-col>
              </el-row>
              <el-row style="margin:10px 0">
                <el-col :span="8">
                  <el-form-item label="用户编号" prop="venderCode">
                    <el-input v-model="editVender.venderCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="editVender.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="密码" prop="passWord">
                    <el-input v-model="editVender.passWord" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="6">
                  <el-form-item label="联系人" prop="contactor">
                    <el-input v-model="editVender.contactor"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="6">
                  <el-form-item label="地址" prop="address">
                    <el-input v-model="editVender.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="邮政编码" prop="postCode">
                    <el-input v-model="editVender.postCode" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="12">
                  <el-form-item label="添加日期">
                    <el-input v-model="editVender.createDate" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="6">
                  <el-form-item label="电话" prop="tel">
                    <el-input v-model="editVender.tel" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="传真" prop="fax">
                    <el-input v-model="editVender.fax" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item class="loginText">
                <el-button type="primary" @click="updateVender" class="btnDel">保存</el-button>
              </el-form-item>
            </el-form>

            <el-button slot="reference" size="mini" class="btnEdit" @click="editOpen(scope.row)">编辑</el-button>
          </el-popover>

          <el-button size="mini" type="primary" @click="delVender(scope.row)" class="btnDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
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
import * as timer from "@/tools/DateTime";
export default {
  data() {
    return {
      multipleSelection: [],
      venderData: [],
      total: 0,
      page: 1,
      venderCode: "",
      name: "",
      searchVender: "", // 筛选供应商

      // 添加供应商对象
      venderInfo: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: timer.timeDate(),
        tel: "",
        fax: ""
      },

      editVender: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: "",
        tel: "",
        fax: ""
      },


      rules: {
        venderCode: [
          {
            type: "string",
            required: true,
            message: "请输入供应商编号",
            trigger: "blur"
          },
          {pattern: /^\d{4,20}$/, min: 4, max: 20, message: "长度在4-20位的字母、数字", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          {
            max: 100,
            message: "不超过100个字符",
            trigger: "blur"
          }
        ],
        passWord: [
          { required: true, message: "请设置密码", trigger: "blur" },
          {
            type: "string",
            message: "请设置密码",
            trigger: ["blur"]
          }
        ],
        contactor:[
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        tel:[
          { required: true, message: "联系方式不能为空", trigger: "blur" },
          {
            pattern: /^1(3|5|7|8)\d{9}$/,
            message: "请输入正确的手机号，长度11位",
            trigger: "blur"
          }
        ]
      },

      rulesTwo: {
        venderCode: [
          {
            type: "string",
            required: true,
            message: "请输入供应商编号",
            trigger: "blur"
          },
          {pattern: /^\d{4,20}$/, min: 4, max: 20, message: "长度在4-20位的字母、数字", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          {
            max: 100,
            message: "不超过100个字符",
            trigger: "blur"
          }
        ],
        passWord: [
          { required: true, message: "请设置密码", trigger: "blur" },
          {
            type: "string",
            message: "请设置密码",
            trigger: ["blur"]
          }
        ],
        contactor:[
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        tel:[
          { required: true, message: "联系方式不能为空", trigger: "blur" },
          {
            pattern: /^1(3|5|7|8)\d{9}$/,
            message: "请输入正确的手机号，长度11位",
            trigger: "blur"
          }
        ]
      },
    };
  },

  methods: {
    // 公共修改数据方法
    changeData(resp) {
      this.venderData = resp.data.list;
      this.total = resp.data.total;
      this.page = resp.data.pageNum;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 打开编辑
    editOpen(row) {
      this.editVender = row;
      console.log(this.editVender);
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 显示分页
      new Promise((resolve, reject) => {
        if (isNaN(Number(this.searchVender))) {
          axios
            .get(
              `api/main/purchase/vender/show?page=${val}&name=${this.searchVender}`
            )
            .then(resp => {
              this.changeData(resp);
            });
        } else {
          axios
            .get(
              `api/main/purchase/vender/show?page=${val}&venderCode=${this.searchVender}`
            )
            .then(resp => {
              this.changeData(resp);
            });
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 新增供应商
    addVender() {

      if (!this.venderInfo.passWord) {
        let p = confirm("是否设置默认密码为供应商编号？");
        if (p) {
          this.venderInfo.passWord = this.venderInfo.venderCode;
        }
      } else {
         new Promise((resolve, reject) => {
        axios
          .post(`api/main/purchase/vender/add`, qs.stringify(this.venderInfo))
          .then(resp => {
            this.changeData(resp);
            location.reload();
            // console.log(resp.data)
          });
      }).catch(err => {
        console.log(err);
      });
        
      }
      
     
    },

    // 删除供应商   // 有相关依赖无法删除 ？？？？？？？？？？？？？？？
    delVender(vender) {
        let a = vender.venderCode
          this.$confirm("此操作将永久删除该供应商, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            axios.post(`api/main/purchase/vender/delete`,qs.stringify({venderCode:a})).then(() => {
                location.reload();
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });


    },

    // 筛选供应商
    filterVender() {
      new Promise((resolve, reject) => {
        if (isNaN(Number(this.searchVender))) {
          axios
            .get(
              `api/main/purchase/vender/show?page=${this.page}&name=${this.searchVender}`
            )
            .then(resp => {
              this.changeData(resp);
            });
        } else {
          axios
            .get(
              `api/main/purchase/vender/show?page=${this.page}&venderCode=${this.searchVender}`
            )
            .then(resp => {
              this.changeData(resp);
            });
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 修改供应商
    updateVender() {
      new Promise((resolve, reject) => {
        axios
          .post(
            `api/main/purchase/vender/update`,
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
    }
  },
  created() {
    new Promise((resolve, reject) => {
      axios.get(`api/main/purchase/vender/show`).then(resp => {
        this.changeData(resp);
      });
    }).catch(err => {
      console.log(err);
    });
  },
  filters: {
    // 定义私有过滤器  过滤器有两个 条件 【过滤器名称 和 处理函数】
    dateFormat: function(dateStr, pattern = "") {
      let dt = new Date(dateStr);

      // yyyy-mm-dd
      let y = dt.getFullYear();
      let m = (dt.getMonth() + 1).toString().padStart(2, "0");
      let d = dt
        .getDate()
        .toString()
        .padStart(2, "0");

      if (pattern.toLowerCase() === "yyyy-mm-dd") {
        return `${y}-${m}-${d}`;
      } else {
        let hh = dt.getHours();
        let mm = dt
          .getMinutes()
          .toString()
          .padStart(2, "0");
        let ss = dt
          .getSeconds()
          .toString()
          .padStart(2, "0");
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
      }
    }
  }
};
</script>

<style scoped>
.element .style {
  background: #000;
}
</style>