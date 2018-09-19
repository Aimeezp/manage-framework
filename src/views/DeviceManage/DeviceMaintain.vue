<template>
  <section class="deviceManage">
    <el-form :inline="true" :model="searchForm" class="deviceSearch">
      <div>
        <el-form-item>
          <el-select clearable v-model="searchForm.deviceStatus" placeholder="请选择设备状态">
            <el-option v-for="(item,index) in selectList.deviceStatusList" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.deviceType" placeholder="请选择设备类型">
            <el-option v-for="(item,index) in selectList.deviceTypeList" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input clearable class="searchInput" placeholder="户主|安装地址|联系电话|设备ID|IMEI|型号" v-model.trim="searchForm.keyWord" @keyup.enter.native="getList(1)">
            <template slot="append">
              <div @click="getList(1)">检索</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="batchExportFun">批量导出</el-button>
          <el-button type="primary" @click="$router.push({ path: '/device-maintain/batch-import' });">批量导入</el-button>
          <el-button type="primary" @click="addDevice">添加设备</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-select clearable v-model="searchForm.maker" placeholder="请选择设备品牌">
            <el-option v-for="(item,index) in selectList.makerList" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.projectId" placeholder="请选择项目名称">
            <el-option v-for="(item,index) in selectList.projectNameList" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="searchForm.startTime" type="date" placeholder="开始时间">
          </el-date-picker>
          <span class="connectText">-</span>
          <el-date-picker v-model="searchForm.endTime" type="date" placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>

    <div class="deviceList tableList">
      <i class="iconfont icon-set cursor" @click="openTitleDialog"></i>
      <el-table :data="tableData" border stripe class="deviceTable" v-loading="tableLoading" height="700">
        <template v-for="(item,index) in colTotalList" v-if="item.show">
          <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-if="item.label==='在线'">
            <template slot-scope="{row}">
              <span class="deviceCircle" :class="row.onlineState==='online'?'green':'gray'"></span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-else-if="item.label==='操作'">
            <template slot-scope="{row}">
              <div class="tableBtnGroup">
                <span class="tableBtn" @click="getDeviceDetail(row.deviceId)">详情</span>
                <span class="tableBtn" @click="getDevicePosition(row)">定位</span>
                <span class="tableBtn btnDisable">启用</span>
                <span class="tableBtn btnDisable">停用</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :prop="item.prop" :label="item.label" :key="index" align="center" :width="item.width" v-else>
          </el-table-column>
        </template>
      </el-table>
      <pagination :flag="true" ref="turnPage1" :total="deviceTotal" :paginationFun="getList" :pageSizeFun="pageSizeFun"></pagination>
    </div>

    <el-dialog title="编辑表单" :visible.sync="titleDialogVisible" width="40%" center class="dialog-self">
      <div class="titleList">
        <div v-for="i in Math.ceil(titleDataList.length/4)" class="titleRow" :key="i">
          <el-checkbox v-for="(item, index) in titleDataList.slice(i*4-4,i*4)" v-model="item.show" class="titleCol" :key="index">{{item.label}}</el-checkbox>
          <div class="titleCol" v-if="i===Math.ceil(titleDataList.length/4)" style="margin-left:30px;"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="titleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="titleSave">保存</el-button>
      </span>
    </el-dialog>

    <!--详情日志tab-->
    <dLog ref="Dlog"></dLog>
    <!--定位-->
    <position ref="local"></position>
    <!--新建设备-->
    <NewDevice ref="newDecive"></NewDevice>
  </section>
</template>

<script>
import moment from 'moment';
import { Local } from '@/utils/storage';
import { deviceTitleList } from '@/storage/localStorage';
import colTotalList from '@/assets/js/DeviceManage/DeviceMaintainTitleDate';
import pagination from '@/components/Pagination';
import dLog from '../../components/DeviceManagement/Device/Detailsandlog';
import NewDevice from '../../components/DeviceManagement/Device/NewDevice';
import position from '../../components/DeviceManagement/Device/Position';

export default {
  data() {
    return {
      searchForm: {
        deviceStatus: '',
        deviceType: '',
        keyWord: '',
        maker: '',
        projectId: '',
        startTime: '',
        endTime: '',
      },
      selectListData: [],
      selectList: {
        deviceStatusList: [
          {
            label: '在线',
            value: 'online',
          },
          {
            label: '离线',
            value: 'lost',
          },
        ],
        deviceTypeList: [],
        makerList: [],
        projectNameList: [],
      },
      colTotalList,
      tableLoading: false,
      tableData: [],
      deviceTotal: 1,
      titleDialogVisible: false,
      titleDataList: [],
      titleKey: `${deviceTitleList}${this.$store.getters.userName}`, // title list localstorage key
    };
  },
  components: {
    dLog,
    position,
    NewDevice,
    pagination,
  },
  created() {
    // get table title list
    const list = Local.get(this.titleKey);
    if (list) {
      this.colTotalList.forEach((v) => {
        const val = v;
        for (let i = 0; i < list.length; i += 1) {
          if (val.label === list[i].label) {
            val.show = list[i].show;
          }
        }
      });
    }
  },
  mounted() {
    this.getDeviceSelectors();
    this.getList();
  },
  watch: {
    'searchForm.deviceType': function type() {
      this.handleSelect();
    },
    'searchForm.maker': function maker() {
      this.handleSelect();
    },
    'searchForm.projectId': function project() {
      this.handleSelect();
    },
  },
  methods: {
    // 打开编辑表单弹窗
    openTitleDialog() {
      // 剔除序号，经纬度，其它均可编辑
      const arr = this.colTotalList
        .filter(val =>
          val.label !== '序号' && val.label !== '经度' && val.label !== '纬度')
        .map(val => ({
          label: val.label,
          show: val.show,
        }));
      // 添加经纬度标签
      arr.push({
        label: '经纬度',
        show: this.colTotalList.filter(val => val.label === '经度')[0].show,
      });
      this.titleDataList = arr;
      this.titleDialogVisible = true;
    },
    // 保存标题
    titleSave() {
      this.titleDataList.forEach((v) => {
        if (v.label !== '经纬度') {
          for (let i = 0; i < this.colTotalList.length; i += 1) {
            if (this.colTotalList[i].label === v.label) {
              this.colTotalList[i].show = v.show;
              break;
            }
          }
        } else {
          // 经纬度特殊处理
          for (let k = 0; k < this.colTotalList.length; k += 1) {
            if (
              this.colTotalList[k].label === '经度' ||
              this.colTotalList[k].label === '纬度'
            ) {
              this.colTotalList[k].show = v.show;
            }
          }
        }
        this.titleDialogVisible = false;
        // save table title list
        const locData = {};
        locData[this.titleKey] = this.colTotalList.map(val => ({
          label: val.label,
          show: val.show,
        }));
        Local.set(locData);
      });
    },
    // batch  Export
    batchExportFun() {
      const that = this;
      window.vaApi.batchExport(that.searchForm).then((res) => {
        if (Number(res.status) !== Number(200)) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'error',
          });
          return;
        }
        // 创建一个blob对象,file的一种
        const blob = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // 配置下载的文件名
        link.download = 'excel.xlsx';
        link.click();
        that.$message({
          type: 'success',
          message: '批量导出Excel成功!',
        });
      });
    },
    // get device selectors
    getDeviceSelectors() {
      window.vaApi.getDeviceSelectors({}).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.selectListData = data || [];
          this.handleSelect();
        }
      });
    },
    getList(currentPage = 1) {
      const param = Object.assign({}, this.searchForm);
      param.pageSize = this.$refs.turnPage1.pageSize;
      param.currentPage = currentPage;
      param.startTime = param.startTime ? moment(param.startTime).format('YYYY-MM-DD') : '';
      param.endTime = param.endTime ? moment(param.endTime).format('YYYY-MM-DD') : '';
      this.tableLoading = true;
      window.vaApi.getDeviceList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.tableData = data.list || [];
          this.deviceTotal = data.total;
        }
      });
    },
    // linkage select | xia la lian dong
    handleSelect() {
      const { deviceType, maker, projectId } = this.searchForm;
      const typeSet = new Set();
      const makerSet = new Set();
      const projectSet = new Set();
      this.selectListData.forEach((v) => {
        typeSet.add(v.device_type);
        makerSet.add(v.maker);
        projectSet.add(v.project_id);
      });
      if (!deviceType) {
        this.selectList.deviceTypeList = [];
        typeSet.forEach((v) => {
          for (let i = 0; i < this.selectListData.length; i += 1) {
            if (v === this.selectListData[i].device_type &&
                !(maker && maker !== this.selectListData[i].maker) &&
                !(projectId && projectId !== this.selectListData[i].project_id)
            ) {
              this.selectList.deviceTypeList.push({
                label: this.selectListData[i].category,
                value: v,
              });
              break;
            }
          }
        });
      }
      if (!maker) {
        this.selectList.makerList = [];
        makerSet.forEach((v) => {
          for (let i = 0; i < this.selectListData.length; i += 1) {
            if (v === this.selectListData[i].maker &&
                !(deviceType && deviceType !== this.selectListData[i].device_type) &&
                !(projectId && projectId !== this.selectListData[i].project_id)
            ) {
              this.selectList.makerList.push({
                label: v,
                value: v,
              });
              break;
            }
          }
        });
      }
      if (!projectId) {
        this.selectList.projectNameList = [];
        projectSet.forEach((v) => {
          for (let i = 0; i < this.selectListData.length; i += 1) {
            if (v === this.selectListData[i].project_id &&
                !(deviceType && deviceType !== this.selectListData[i].device_type) &&
                !(maker && maker !== this.selectListData[i].maker)
            ) {
              this.selectList.projectNameList.push({
                label: this.selectListData[i].project_name,
                value: v,
              });
              break;
            }
          }
        });
      }
    },
    pageSizeFun() {
      this.getList();
    },
    getDeviceDetail(deviceId) {
      this.$refs.Dlog.dialogVisible = true;
      this.$refs.Dlog.getDetailInfo(deviceId);
      // this.$refs.Dlog.getLogs(deviceId);
    },
    getDevicePosition(row) {
      this.$refs.local.open();
      this.$refs.local.getPosition(row);
    },
    addDevice() {
      this.$refs.newDecive.open();
      this.$refs.newDecive.addDevice();
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

.deviceManage {
  .deviceSearch {
    .searchBtn {
      float: right;
    }
    .connectText {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 4px;
      text-align: center;
    }
  }
  .deviceList {
    position: relative;
    .icon-set {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 5;
      color: #333;
      font-size: 18px;
    }
    .deviceTable {
      .deviceCircle {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: 0 auto;
        &.gray {
          background-color: #c0c0c0;
        }
        &.green {
          background-color: #71dc00;
        }
      }
      .cell {
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: ellipsis;
      }
      .el-table__header-wrapper{
        background-color: $color-bg;
      }
      .el-table__fixed-right-patch{
        background-color: $color-bg;
      }
    }
  }
  /*编辑表单    start*/
  .titleList {
    padding: 0 125px 0 45px;
    .titleRow {
      display: flex;
      margin-bottom: 20px;
      .titleCol {
        flex: 1;
      }
    }
  }
  /*编辑表单    end*/
}
</style>

