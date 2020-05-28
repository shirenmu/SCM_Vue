<template>
  <div>
    <el-popover placement="right" width="500" trigger="click">
      <el-form :model="user" :rules="rules" ref="form" label-width="80px" class="alertAdd">
        <el-row style="margin:10px 0">
          <el-col :span="14">
            <el-form-item label="用户名" prop="account">
              <el-input v-model="user.account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:10px 0">
          <el-col :span="16">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:10px 0">
          <el-col :span="18">
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="user.passWord" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:10px 0">
          <el-col :span="22">
            <el-form-item label="添加日期">
              <el-input v-model="user.createDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="锁定状态">
          <el-radio-group v-model="user.status">
            <el-radio label="0">不锁定</el-radio>
            <el-radio label="1">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="user.modelcodes">
            <el-checkbox label="1" name="采购管理">采购管理</el-checkbox>
            <el-checkbox label="2" name="销售管理">销售管理</el-checkbox>
            <el-checkbox label="3" name="系统管理">系统管理</el-checkbox>
            <el-checkbox label="4" name="财务管理">财务管理</el-checkbox>
            <el-checkbox label="5" name="仓库管理">仓库管理</el-checkbox>
            <el-checkbox label="6" name="业务报表">业务报表</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="loginText">
          <el-button type="primary" @click="addAtaff" class="btnDel">添加</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference" class="btnMain">
        <i class="el-icon-plus" style="margin-right:8px"></i>添加用户
      </el-button>
    </el-popover>

    <el-table :data="userData" style="width: 100%">
      <el-table-column label="注册日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="140">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="140">
        <template slot-scope="scope">
          <p size="medium">{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="锁定状态" width="140">
        <template slot-scope="scope">
          <i class="el-icon-goods"></i>
          <span style="margin-left: 10px">{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户权限" width="300" class="label_center">
        <template slot-scope="scope">
          <el-button-group v-for="(g,i) in scope.row.models" :key="i">
            <el-button style="margin:4px 3px;" size="mini" round>{{g.modelName}}</el-button>
          </el-button-group>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 员工信息编辑  satrt-->
          <el-popover placement="right" width="500" trigger="click">
            <el-form
              :model="changeStaff"
              :rules="rulesTwo"
              ref="form"
              label-width="80px"
              class="alertAdd"
            >
              <el-form-item label="用户名" prop="account">
                <el-input v-model="changeStaff.account"></el-input>
              </el-form-item>
              <el-form-item label="用户姓名" prop="name">
                <el-input v-model="changeStaff.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passWord">
                <el-input v-model="changeStaff.passWord" type="password"></el-input>
              </el-form-item>

              <el-form-item label="锁定状态">
                <el-radio-group v-model="changeStaff.status">
                  <el-radio :label="0">不锁定</el-radio>
                  <el-radio :label="1">锁定</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="权限">
                <el-checkbox-group v-model="changeStaff.modelcodes">
                  <!-- <el-checkbox v-for="(e,i) in staffModel" :label="i" :key="i">{{e.modelName}}</el-checkbox> -->
                  <el-checkbox :label="1" name="采购管理">采购管理</el-checkbox>
                  <el-checkbox :label="2" name="销售管理">销售管理</el-checkbox>
                  <el-checkbox :label="3" name="系统管理">系统管理</el-checkbox>
                  <el-checkbox :label="4" name="财务管理">财务管理</el-checkbox>
                  <el-checkbox :label="5" name="仓库管理">仓库管理</el-checkbox>
                  <el-checkbox :label="6" name="业务报表">业务报表</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item class="loginText">
                <el-button type="primary" @click="editInfo()" class="btnDel">保存</el-button>
              </el-form-item>
            </el-form>

            <el-button
              slot="reference"
              size="mini"
              @click="handleEdit(scope.row)"
              class="btnEdit"
            >编辑</el-button>
          </el-popover>

          <!-- 员工信息编辑  end-->

          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)"
            class="btnDel"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="float:right; margin:20px 200px 20px auto">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
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
import Cookies from "js-cookie";
import * as timer from "@/tools/DateTime";
const qs = require("querystring");
// import { mapState } from "vuex";
export default {
  data() {
    return {
      // 添加用户对象
      user: {
        account: "",
        name: "",
        passWord: "",
        createDate: timer.timeDate(),
        status: "0",
        modelcodes: []
      },

      userData: [], // 员工管理信息
      total: 0, // 员工数
      pageNum: 1, // 当前页码

      // 更改用户对象
      changeStaff: {
        account: "",
        name: "",
        passWord: "",
        status: "",
        modelcodes: []
      },

      rules: {
        account: [
          {
            type: "string",
            required: true,
            message: "请输入账号",
            trigger: "blur"
          },
          { min: 3, max: 8, message: "账号长度在3~8位", trigger: "blur" }
        ],
        name: [
          { required: true, message: "员工姓名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "请输入正确账号，长度在3~8位",
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
        ]
      },

      rulesTwo: {
        account: [
          {
            type: "string",
            required: true,
            message: "请输入账号",
            trigger: "blur"
          },
          { min: 3, max: 8, message: "账号长度在3~8位", trigger: "blur" }
        ],
        name: [
          { required: true, message: "员工姓名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "账号长度在3~8位",
            message: "请输入正确账号，长度在3~8位",
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
        ]
      }
    };
  },
  created() {
    new Promise((resolve, reject) => {
      axios.get(`api/main/system/user/show?page=${this.pageNum}`).then(resp => {
        this.getStaff(resp);
      });
    }).catch(err => {
      console.log(err);
    });

    // Code
  },

  computed: {
    // ...mapState(["userData", "total", "pageNum"])
    // 这些属性指向this
  },

  watch: {
    // 监视$route
    $route: {
      handler: function(newQuestion, oldQuestion) {
        new Promise((resolve, reject) => {
          axios
            .get(`api/main/system/user/show?page=${this.pageNum}`)
            .then(resp => {
              this.getStaff(resp);
            });
        }).catch(err => {
          console.log(err);
        });
        // Code
      },
      immediate: true
    }
  },

  methods: {
    getStaff(resp) {
      // 公共 更改页面数据
      this.userData = resp.data.list; // 员工信息列表
      this.total = resp.data.total; // 员工数
      this.pageNum = resp.data.pageNum; // 当前页码
      // location.reload();
      // this.$forceUpdate()
    },

    // 表格
    handleEdit(row) {
      //  打开 编辑员工信息
      this.changeStaff.account = row.account;
      this.changeStaff.name = row.name;
      this.changeStaff.passWord = row.passWord;
      this.changeStaff.status = row.status;
      this.changeStaff.createDate = row.createDate;
      this.changeStaff.modelcodes = row.models.map(m => m.modelCode);
    },

    handleDelete(index, row) {
      // 删除员工
      // Code
      // 删除员工

      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parameter = { account: row.account, page: this.pageNum };
          axios
            .post("api/main/system/user/delete", qs.stringify(parameter))
            .then(resp => {
              this.getStaff(resp);
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

    editInfo() {
      // Code
      // 编辑员工
      new Promise((resolve, reject) => {
        axios
          .post("api/main/system/user/update", qs.stringify(this.changeStaff))
          .then(() => {
            location.reload();
          });
      }).catch(err => {
        console.log(err);
      });
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 显示分页
      new Promise((resolve, reject) => {
        axios.get(`api/main/system/user/show?page=${val}`).then(resp => {
          this.getStaff(resp);
        });
      }).catch(err => {
        console.log(err);
      });

      // Code
    },

    addAtaff() {
      // 添加员工
      if (!this.user.passWord) {
        let p = confirm("是否设置默认密码为用户名？");
        if (p) {
          this.user.passWord = this.user.account;
        }
      } else {
        new Promise((resolve, reject) => {
          axios
            .post("api/main/system/user/add", qs.stringify(this.user))
            .then(resp => {
              if (resp.data.code == 2) {
                this.getStaff(resp);
                location.reload();
              } else {
                reject("添加员工出错");
                this.$message({
                  type: "info",
                  message: "添加员工出错"
                });
              }
            })
            
        })
      }
    }
  }
};
</script>

<style scoped>
</style>