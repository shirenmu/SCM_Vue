<template>
  <div>
    <el-popover placement="top-start" width="700" trigger="click">
      <el-form :model="productInfo" ref="form" :rules="rules" label-width="100px" class="alertAdd">
        <el-row style="margin:10px 0">
          <el-col :span="6">
            <h4
              style="font-weight:700;margin: 0 auto;color:#334257;width:120px;height:66px; font-size:20px"
            >
              <i class="el-icon-edit-outline"></i>添加产品
            </h4>
          </el-col>
        </el-row>
        <el-row style="margin:10px 0">
          <el-col :span="10">
            <el-form-item label="产品编号" prop="productCode">
              <el-input v-model="productInfo.productCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="productInfo.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="销售价" prop="price">
              <el-input v-model="productInfo.price"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="2">
            <el-form-item label="数量单位" prop="unitName">
              <el-input v-model="productInfo.unitName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:20px 0">
          <el-col :span="10">
            <el-form-item label="产品分类" prop="categoryId">
              <el-select v-model="productInfo.categoryId" placeholder="产品分类">
                <el-option
                  v-for="item in productType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="添加日期" prop="createDate">
              <el-input v-model="productInfo.createDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin:20px 0">
          <el-col :span="20">
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="productInfo.remark"
                size="small"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="loginText">
          <el-button type="primary" @click="addProduct" class="btnDel">添加</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference" class="btnMain">
        <i class="el-icon-plus" style="margin-right:8px"></i>添加产品
      </el-button>
    </el-popover>

    <el-row style="margin:10px 0">
      <div class="marginTb">
        <el-col :span="17">
          <el-input placeholder="查找对应编号和名称的产品" v-model="search" size="small" @keyup.enter.native="filterProduct" autofocus="true">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="el-icon-search btnDel" @click="filterProduct" style="margin:0 4px"></el-button>
        </el-col>

        <el-col :span="4" :offset="1">
          <el-select v-model="categoryId" placeholder="产品类型" size="mini">
            <el-option
              v-for="item in productType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </div>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="productData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="产品编号" width="120">
        <template slot-scope="scope">{{ scope.row.productCode}}</template>
      </el-table-column>
      <el-table-column label="产品名称" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="数量单位" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.unitName }}</template>
      </el-table-column>

      <el-table-column label="分类编号" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.categoryId }}</template>
      </el-table-column>
      <el-table-column label="销售价" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="添加日期" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="产品描述" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>

      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover placement="top-start" width="900" trigger="click">
            <el-form
              :model="editProduct"
              prop="editProduct"
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
                    <i class="el-icon-edit-outline"></i>修改产品
                  </h4>
                </el-col>
              </el-row>
              <el-row style="margin:10px 0">
                <el-col :span="8">
                  <el-form-item label="产品编号" prop="productCode">
                    <el-input v-model="editProduct.productCode" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品名称" prop="name">
                    <el-input v-model="editProduct.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="数量单位" prop="unitName">
                    <el-input v-model="editProduct.unitName" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:20px 0">
                <el-col :span="10">
                  <el-form-item label="产品分类" prop="categoryId">
                    <el-select v-model="productInfo.categoryId" placeholder="产品分类">
                      <el-option
                        v-for="item in productType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="添加日期" prop="createDate">
                    <el-input v-model="productInfo.createDate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:10px 0">
                <el-col :span="6">
                  <el-form-item label="销售价" prop="price">
                    <el-input v-model="editProduct.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="添加日期">
                    <el-input v-model="editProduct.createDate" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="margin:20px 0">
          <el-col :span="20">
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="productInfo.remark"
                size="small"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

              <el-form-item class="loginText">
                <el-button type="primary" @click="upDate" class="btnDel">保存</el-button>
              </el-form-item>
            </el-form>

            <el-button slot="reference" size="mini" class="btnEdit" @click="editOpen(scope.row)">编辑</el-button>
          </el-popover>

          <el-button size="mini" type="primary" @click="del(scope.row)" class="btnDel">删除</el-button>
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
      productData: [],
      total: 0,
      page: 1,
      venderCode: "",
      name: "",
      search: "", // 筛选产品编号&产品名
      categoryId: "", // 筛选产品分类

      // 添加产品对象
      productInfo: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: 0,
        createDate: timer.timeDate(),
        remark: ""
      },

      productType: [],

      editProduct: {},

      rules: {
        productCode: [
          {
            type: "string",
            required: true,
            message: "请输入产品编号",
            trigger: "blur"
          },
          {
            pattern: /^\d{4,10}$/,
            min: 4,
            max: 10,
            message: "长度在4-10位的字母、数字",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          {
            max: 100,
            message: "不超过100个字符",
            trigger: "blur"
          }
        ],
        unitName: [
          { required: true, message: "数量单位不能为空", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "分类编号不能为空", trigger: "blur" }
        ]
      },

      rulesTwo: {
        productCode: [
          {
            type: "string",
            required: true,
            message: "请输入产品编号",
            trigger: "blur"
          },
          {
            pattern: /^\d{4,10}$/,
            min: 4,
            max: 10,
            message: "长度在4-10位的字母、数字",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          {
            max: 100,
            message: "不超过100个字符",
            trigger: "blur"
          }
        ],
        unitName: [
          { required: true, message: "数量单位不能为空", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "分类编号不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 公共修改数据方法
    changeData(resp) {
      this.productData = resp.data.list;
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
      this.editProduct = row;
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 显示分页
      new Promise((resolve, reject) => {
        if (isNaN(Number(this.search))) {
          axios
            .get(
              `api/main/sell/product/show?page=${this.page}&name=${this.search}&categoryId=${this.categoryId}`
            )
            .then(resp => {
              this.changeData(resp);
            });
        } else {
          axios
            .get(
              `api/main/sell/product/show?page=${this.page}&productCode=${this.search}&categoryId=${this.categoryId}`
            )
            .then(resp => {
              this.changeData(resp);
            });
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 添加产品
    addProduct() {
      new Promise((resolve, reject) => {
        axios
          .post(`api/main/sell/product/add`, qs.stringify(this.productInfo))
          .then(resp => {
            this.changeData(resp);
            location.reload();
          });
      }).catch(err => {
        console.log(err);
      });
    },

    // 删除产品   // 有相关依赖无法删除 ？？？？？？？？？？？？？？？
    del(row) {
      let a = row.productCode;
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post(
              `api/main/sell/product/delete`,
              qs.stringify({ productCode: a })
            )
            .then(() => {
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

    // 筛选产品
    filterProduct() {
      console.log(this.search);
      new Promise((resolve, reject) => {
        //  axios
        //     .get(
        //        `api/main/sell/product/show?page=${this.page}&name=${this.search}&categoryId=${this.categoryId}`
        //     )
        //     .then(resp => {
        //       console.log(resp.data)
        //       this.changeData(resp);
        //     });
        if (isNaN(Number(this.search))) {
          axios
            .get(
              `api/main/sell/product/show?page=${this.page}&name=${this.search}&categoryId=${this.categoryId}`
            )
            .then(resp => {
              console.log(resp.data);
              this.changeData(resp);
            });
        } else {
          axios
            .get(
              `api/main/sell/product/show?page=${this.page}&productCode=${this.search}&categoryId=${this.categoryId}`
            )
            .then(resp => {
              this.changeData(resp);
              console.log(resp);
            });
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 修改产品
    upDate() {
      new Promise((resolve, reject) => {
        axios
          .post(`api/main/sell/product/update`, qs.stringify(this.editProduct))
          .then(resp => {
            this.changeData(resp);
            location.reload();
          });
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    new Promise((resolve, reject) => {
      axios.get(`api/main/sell/category/show?page=${this.page}`).then(resp => {
        let arr = resp.data.list;
        this.productType = arr.map(item => {
          return {
            value: item.categoryId.toString(),
            name: item.name,
            remark: item.remark
          };
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }
};
</script>

<style scoped>
.element .style {
  background: #000;
}
</style>