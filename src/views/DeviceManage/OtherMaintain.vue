<template>
  <div id="deviceList">
    <div class="top clearfix">
      <el-form :inline="true" :model="searchOptions" style="position:relative;">
        <el-form-item>
          <el-select clearable v-model="searchOptions.deviceType" placeholder="全部类型">
            <el-option
              v-for="(item,index) in makerBrand.deviceType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchOptions.maker" placeholder="全部品牌">
            <el-option v-if="!searchOptions.deviceType" label="请选择类型"></el-option>
            <el-option
              v-if="searchOptions.deviceType"
              v-for="(item,index) in makerBrand.maker"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchOptions.deviceStatus" placeholder="全部状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="searchOptions.startTime" type="date" placeholder="开始时间">
          </el-date-picker>
          <span class="connectText">-</span>
          <el-date-picker v-model="searchOptions.endTime" type="date" placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="position:absolute;top:0;right:0;">
          <el-button type="primary" @click="newProductType()">添加产品类型</el-button>
        </el-form-item>
        <el-form-item style="display:block;">
          <el-input class="searchInput" placeholder="请输入内容" v-model.trim="searchOptions.keyWord" @keyup.enter.native="paginationFun">
            <template slot="append">
              <div @click="paginationFun()">检索</div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--device list-->
    <div class="tableList">
      <el-table
        :data="tableData"
        :highlight-current-row="true"
        style="width: 100%"
        v-loading="tableLoading"
        height="336"
        @row-click="queryProduct">
        <!-- <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="100px">
        </el-table-column> -->
        <el-table-column
          prop="deviceType"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类型名称">
        </el-table-column>
        <el-table-column
          prop="callbackUrl"
          label="回调地址">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200px">
          <template slot-scope="scope">
            <span class="infoBtn cursor" @click="newProduct(scope.row,1)">添加产品</span>
            <span class="infoBtn cursor" @click="newProductType(scope.row)">编辑</span>
            <span class="infoBtn cursor" @click="deletetProductType(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--pagination-->
    <pagination :flag="showSizes" ref="turnPage1" :total="proTotal" :paginationFun="paginationFun"></pagination>
    <!--device detail-->
    <div class="tableList">
      <el-table
        :data="curRowData"
        style="width: 100%"
        fit
        height="336"
        v-loading="tableLoading" >
        <!-- <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="100px">
        </el-table-column> -->
        <el-table-column
          prop="maker"
          label="产品厂商">
        </el-table-column>
        <el-table-column
          prop="productModel"
          label="产品型号">
        </el-table-column>
        <el-table-column
          prop="dmpModel"
          label="DMP型号">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="DMP标签">
        </el-table-column>
        <el-table-column
          prop="protocol"
          label="设备协议">
        </el-table-column>
        <el-table-column
          prop="resources"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="dmpCallBack"
          label="厂商回调地址">
        </el-table-column>
        <el-table-column
          prop="deviceStatus"
          width="100px"
          label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.deviceStatus=== 0" class="weiwancehng">停用</p>
            <p v-else-if="scope.row.deviceStatus=== 1">启用</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="creatDate"
          width="80px"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200px">
          <template slot-scope="scope">
            <span class="infoBtn cursor disabled">停用</span>
            <span class="infoBtn cursor disabled">启用</span>
            <span class="infoBtn cursor" @click="newProduct(scope.row,2)">编辑</span>
            <span class="infoBtn cursor" @click="deleteProduct(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--pagination-->
    <pagination :flag="showSizes" ref="turnPage2" :total="proDetailTotal" :paginationFun="getProDetailList" ></pagination>
    <!--add product-->
    <Product :dialogMakerData="dialogMakerData" :ldMaker="ldMaker" :dialogTitle="dialogTitle" :dialogForm="dialogForm" :dialogTypeId="dialogTypeId" ref="addProduct"></Product>
    <!--add productType-->
    <ProductType :oldDeviceType="oldDeviceType" :dialogTypeTitle="dialogTypeTitle" :dialogTypeForm="dialogTypeForm" ref="addProductType"></ProductType>
  </div>
</template>

<script>
import moment from 'moment';
import pagination from '../../components/Pagination';
import Product from '../../components/DeviceManagement/Others/AddProduct';
import ProductType from '../../components/DeviceManagement/Others/AddProductType';
// import formatDate from '../../assets/js/formatDate';

export default {
  name: 'other-maintain',
  data() {
    return {
      dialogTitle: '',
      dialogTypeTitle: '',
      dialogTypeId: '',
      dialogMakerData: [],
      ldMaker: [],
      dialogForm: {
        maker: '',
        productModel: '',
        dmpMarker: '',
        dmpModel: '',
        tag: '',
        deviceStatus: '',
        protocol: '',
        resources: '',
      },
      dialogTypeForm: {
        category: '',
        callbackUrl: '',
        oldDeviceType: '',
        newDeviceType: '',
      },
      oldDeviceType: '',
      searchOptions: {
        deviceStatus: [{
          label: '停用',
          value: 0,
        }, {
          label: '启用',
          value: 1,
        }],
        deviceType: [],
        maker: [],
        startTime: '',
        endTime: '',
        keyWord: '',
      },
      makerBrand: {
        maker: [],
        deviceType: [],
      },
      allBrand: [],
      tableData: [],
      curRowData: [],
      tableLoading: false,
      proTotal: 1,
      proDetailTotal: 1,
      currentPage: 1,
      showSizes: false,
      sendSonDeviceType: '',
    };
  },
  components: {
    pagination,
    Product,
    ProductType,
  },
  mounted() {
    this.paginationFun();
    this.getAllTypeBrandStatus();
  },
  watch: {
    'searchOptions.deviceType': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && newVal !== '') {
          this.searchOptions.maker = '';
          this.makerBrand.maker = Object.keys(this.allBrand[newVal]);
        }
        if (newVal === '') {
          this.searchOptions.maker = '';
        }
      },
    },
  },
  methods: {
    getAllTypeBrandStatus() {
      window.vaApi.getDeviceTypeAndMakerAndStatus().then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.allBrand = data;
          this.makerBrand.deviceType = Object.keys(data);
        }
      });
    },
    getAllMarker(deviceType) {
      window.vaApi.getAllMarker().then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.dialogMakerData = Object.keys(data[deviceType]);
          this.ldMaker = data[deviceType];
        }
      });
    },
    // getProductlist
    paginationFun(currentPage = 1) {
      const param = Object.assign({}, this.searchOptions);
      param.pageSize = this.$refs.turnPage1.pageSize;
      param.currentPage = currentPage;
      param.startTime = param.startTime ? moment(param.startTime).format('YYYY-MM-DD') : '';
      param.endTime = param.endTime ? moment(param.endTime).format('YYYY-MM-DD') : '';
      window.vaApi.queryProductTypeList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.tableData = data.list;
          this.proTotal = data.total;
        }
      });
    },
    // add productType
    newProductType(params) {
      if (params) {
        this.oldDeviceType = params.deviceType;
        this.dialogTypeTitle = '编辑产品类型';
        this.dialogTypeForm = {
          category: params.category,
          callbackUrl: params.callbackUrl,
          deviceType: params.deviceType,
        };
      } else {
        this.dialogTypeTitle = '添加产品类型';
        this.dialogTypeForm = {
          category: '',
          callbackUrl: '',
          deviceType: '',
        };
      }
      this.$refs.addProductType.open();
    },
    newProduct(row, num) {
      if (num === 2) {
        this.dialogTitle = '编辑产品';
        this.dialogForm = {
          isSelectMaker: true,
          maker: row.maker,
          productModel: row.productModel,
          dmpMarker: row.dmpMarker,
          dmpModel: row.dmpModel,
          tag: row.tag,
          oldMaker: row.maker,
          oldProductModel: row.productModel,
          deviceStatus: row.deviceStatus,
          protocol: row.protocol,
          resources: row.resources,
          dmpCallBack: row.dmpCallBack || '无',
        };
      } else if (num === 1) {
        this.dialogTitle = '添加产品';
        this.getAllMarker(row.deviceType);
        this.dialogForm.isSelectMaker = false;
        this.dialogForm.productModel = '';
        this.dialogForm.dmpMarker = '';
        this.dialogForm.dmpModel = '';
        this.dialogForm.tag = '';
        this.dialogForm.deviceStatus = '';
        this.dialogForm.protocol = '';
        this.dialogForm.resources = '';
        this.dialogForm.typeId = row.typeId;
      }
      this.$refs.addProduct.open();
    },
    queryProduct(row) {
      if (!row) return;
      this.dialogTypeId = row.typeId;
      this.getProDetailList();
    },
    // getProDetail
    getProDetailList(currentPage = 1) {
      const param = {
        typeId: this.dialogTypeId,
        currentPage,
        pageSize: this.$refs.turnPage2.pageSize,
      };
      window.vaApi.queryProductList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.curRowData = data.list;
          this.proDetailTotal = data.total;
        }
      });
    },
    // delete product
    deleteProduct(row) {
      const params = {
        maker: row.maker,
        productModel: row.productModel,
        typeId: row.typeId,
      };
      this.$confirm('确定删除该产品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        window.vaApi.deleteProduct(params).then(({ data: { status } }) => {
          if (parseInt(status, 10) === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getProDetailList();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // delete productType
    deletetProductType(row) {
      const params = {
        typeId: row.typeId,
      };
      this.$confirm('确定删除该产品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        window.vaApi.deleteProductType(params).then(({ data: { status } }) => {
          if (parseInt(status, 10) === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.paginationFun();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
};
</script>
<style lang="scss">
@import "~scss_vars";

  #deviceList{
    .top{
      /*display:flex;*/
      padding:0 0 10px 0;
      >div{
        padding-right: 20px;
        float:left;
      }
      .block{
        display:flex;
        justify-content: center;
        align-items: center;
      }
      .connectText {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 4px;
        text-align: center;
      }
      .searchText{
        position:relative;
        width:20%;
        .btn{
          position:absolute;
          right:30px;
          top:50%;
          font-size:16px;
          transform: translateY(-50%);
          color:#333333;
        }
        .line{
          background:#e0e0e0;
          width:1px;
          height:20px;
          position:absolute;
          right:70px;
          top:50%;
          transform: translateY(-50%);
        }
      }
      .el-button--primary{
        float:right;
      }
    }
    .tableList{
      .has-gutter{
        tr{
          th{
            background:$color-bg;
            color:#333;
          }
        }
      }
      .infoBtn{
        color:$color-primary;
        padding-right: 10px;
      }
      .weiwancehng{
        color:#fe9137;
      }
      .disabled{
        opacity: 0.5;
        cursor: no-drop;
      }
    }
  }
</style>
