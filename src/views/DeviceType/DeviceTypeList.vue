<template>
  <div id="deviceList">
    <div class="top clearfix">
      <el-select v-model="status" placeholder="全部类型">
        <el-option
          v-for="item in allType"
          :key="item.status"
          :label="item.value"
          :value="item.status">
        </el-option>
      </el-select>
      <el-select v-model="status" placeholder="全部品牌">
        <el-option
          v-for="item in allBrand"
          :key="item.status"
          :label="item.value"
          :value="item.status">
        </el-option>
      </el-select>
      <el-select v-model="status" placeholder="全部状态">
        <el-option
          v-for="item in testStatus"
          :key="item.status"
          :label="item.value"
          :value="item.status">
        </el-option>
      </el-select>
      <div class="block">
        <el-date-picker
          v-model="startData"
          type="date"
          :picker-options='pickerBeginDateAfter1'
          placeholder="创建开始时间">
        </el-date-picker> -
        <el-date-picker
          v-model="endData"
          type="date"
          :picker-options='pickerBeginDateAfter2'
          placeholder="创建结束时间">
        </el-date-picker>
      </div>
      <div class="searchText">
        <el-input v-model="searchText" placeholder="请输入内容"></el-input>
        <span class="btn cursor" @click="getDeviceTypeList">检索</span>
        <span class="line"></span>
      </div>
      <el-button type="primary" @click="newDevice">新建设备类型</el-button>
    </div>
    <div class="tableList">
      <el-table
        :data="tableData"
        style="width: 100%"
        fit
        v-loading="tableLoading" >
        <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="类型ID">
        </el-table-column>
        <el-table-column
          prop="isDone"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="类型名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="设备品牌">
        </el-table-column>
        <el-table-column
          prop="deviceCount"
          label="设备版本">
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="设备型号">
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="DMP型号">
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="DMP标签">
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="回调地址">
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="设备状态">
          <template slot-scope="scope">
            <p v-if="scope.row.isDone=== 0" class="weiwancehng">未完成</p>
            <p v-else-if="scope.row.isDone=== 1">已完成</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="passCount"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          align="center"
          width="200px">
          <template slot-scope="scope">
            <span class="infoBtn cursor">停用</span>
            <span class="infoBtn cursor">启用</span>
            <span class="infoBtn cursor" @click="deleteDevice">删除</span>
            <span class="infoBtn cursor" @click="editDevice">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagination :flag="showSizes" ref="turnPage1" :total="total" :paginationFun="getDeviceTypeList" :pageSizeFun="pageSizeFun"></pagination>
    <!--新建设备-->
    <NewDevice ref="addDevice"></NewDevice>
    <!--编辑设备-->
    <EditDevice ref="editDevice"></EditDevice>
  </div>
</template>

<script>
import pagination from '../../components/Pagination';
import NewDevice from '../../components/DeviceType/NewDevice';
import EditDevice from '../../components/DeviceType/EditDevice';
import formatDate from '../../assets/js/formatDate';

export default {
  data() {
    return {
      showSizes: true, // is show pageSizes
      testStatus: [
        {
          status: 1,
          value: '已测试',
        }, {
          status: 0,
          value: '未测试',
        },
      ],
      allType: [],
      allBrand: [],
      startData: '',
      endData: '',
      searchText: '',
      status: '', // 已测试1未测试0
      tableData: [],
      tableLoading: false,
      total: 1,
      // 起止时间选择
      pickerBeginDateAfter1: {
        disabledDate: (time) => {
          const thisTime = time.getTime() < Date.now() - 8.64e7;
          const thatTime = time.getTime() < Date.now() - 8.64e7 || (this.endData.getTime && (time.getTime() > this.endData.getTime()));
          if (this.startData !== '') {
            return thatTime;
          }
          return thisTime;
        },
      },
      pickerBeginDateAfter2: {
        disabledDate: (time) => {
          const selfTime = time.getTime() < this.startData || time.getTime() < Date.now() - 8.64e7;
          return selfTime;
        },
      },
    };
  },
  components: {
    pagination,
    NewDevice,
    EditDevice,
  },
  mounted() {
    this.getDeviceTypeList();
  },
  methods: {
    // 测试列表
    getDeviceTypeList(currentPage) {
      const param = {};
      param.pageNum = currentPage || 1;
      param.keyWords = this.searchText;
      param.startTime = this.startData;
      param.endTime = this.endData;
      param.isDone = this.status;
      param.pageSize = this.$refs.turnPage1.pageSize;
      window.vaApi.getDeviceTypeList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.tableData = data.list || {};
          this.total = data.total;
          this.tableData.startTime = formatDate(this.tableData.startTime);
        }
      });
    },
    pageSizeFun() {
      this.getDeviceTypeList();
    },
    newDevice() {
      this.$refs.addDevice.open();
      this.$refs.addDevice.projectData();
    },
    editDevice() {
      this.$refs.editDevice.open();
    },
    // 删除设备
    deleteDevice() {
      this.$confirm('确定删除该设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
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
