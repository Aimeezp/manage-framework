<template>
  <div id="DetailsList">
    <div class="top clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/list' }">测试管理</el-breadcrumb-item>
        <el-breadcrumb-item>测试详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-select v-model="deviceInfo.id" placeholder="全部设备" @change="selectChange(deviceInfo.id)">
        <el-option
          v-for="(item, index) in deviceInfoList"
          :key="index"
          :label="item.deviceType"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="deviceInfo.brand" placeholder="全部品牌">
        <el-option
          v-for="(item, index) in makerList"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="status" placeholder="测试状态">
        <el-option
          v-for="item in testStatus"
          :key="item.status"
          :label="item.value"
          :value="item.status">
        </el-option>
      </el-select>
      <div class="searchText">
        <el-input v-model="searchText" placeholder="请输入内容"></el-input>
        <span class="btn cursor" @click="getDetailsList(1)">检索</span>
        <span class="line"></span>
      </div>
      <el-button type="primary" @click="PrintReport">打印报告</el-button>
    </div>
    <div class="tableList">
      <ul class="projectInfo clearfix">
        <li>项目名称：<span>{{projectInfo.projectName || '--'}}</span></li>
        <li>现场测试人员姓名：<span>{{projectInfo.testerName || '--'}}</span></li>
        <li>测试日期：<span>{{projectInfo.startTime || '--'}}</span></li>
        <li>项目地址：<span>{{projectInfo.address || '--'}}</span></li>
        <li>现场测试人员电话：<span>{{projectInfo.testerMobile || '--'}}</span></li>
        <li>测试类型：<span>{{projectInfo.type === 1?'安装':(projectInfo.type === 0?'产测': '--')}}</span></li>
        <li>支持经理：<span>{{projectInfo.managerName || '--'}}</span></li>
        <li>技术支持人员姓名：<span>{{projectInfo.supporterName || '--'}}</span></li>
        <li>设备数量：<span>{{projectInfo.deviceCount || '--'}}</span></li>
        <li>联系电话：<span>{{projectInfo.supporterMobile || '--'}}</span></li>
        <li>技术支持人员电话：<span>{{projectInfo.supporterMobile || '--'}}</span></li>
        <li>通过数量：<span>{{projectInfo.passCount || '--'}}</span></li>
      </ul>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="tableLoading"
        align="center">
        <el-table-column
          prop="id"
          label="序号"
          align="center"
          min-width="100px">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          align="center"
          min-width="140px"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="maker"
          align="center"
          min-width="100px"
          label="设备品牌">
        </el-table-column>
        <el-table-column
          prop="model"
          align="center"
          min-width="100px"
          label="设备型号">
        </el-table-column>
        <el-table-column
          prop="tag"
          align="center"
          min-width="200px"
          label="设备版本">
        </el-table-column>
        <el-table-column
          prop="serialNumber"
          align="center"
          min-width="200px"
          label="IMEI">
        </el-table-column>
        <el-table-column
          prop="serialNumber"
          align="center"
          min-width="200px"
          label="SN">
        </el-table-column>
        <el-table-column
          prop="testState"
          align="center"
          min-width="100px"
          label="测试状态">
          <template slot-scope="scope">
            <p v-if="scope.row.testState=== 2" class="weiwancehng">未通过</p>
            <p v-else-if="scope.row.testState=== 1">通过</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="testResult"
          align="center"
          min-width="100px"
          label="测试结果">
          <template slot-scope="scope">
            <p v-if="scope.row.testResult=== 1">正常</p>
            <p v-else-if="scope.row.testResult=== 4">设备异常</p>
            <p v-else-if="scope.row.testResult=== 2">DMP异常</p>
            <p v-else-if="scope.row.testResult=== 3">AEP异常</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          label="操作"
        min-width="400px">
          <template slot-scope="scope">
            <span class="infoBtn cursor" @click="openLog(scope.row)">日志</span>
            <span class="infoBtn cursor" @click="openMsgReply(scope.row)">回复</span>
            <span class="infoBtn  disabled">分组</span>
            <span class="infoBtn  disabled">订阅</span>
            <span class="infoBtn  disabled">删除</span>
            <span class="infoBtn  disabled">启用</span>
            <span class="infoBtn  disabled">停用</span>
            <span class="infoBtn  disabled">维护</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagination :total="total" :pageSize="10" :paginationFun="getDetailsList"></pagination>

    <msgReply ref="msgReply" :msgInfo="sendMsg"></msgReply>
    <logDetail ref="logDetail" :logMsg="logMsg"></logDetail>
  </div>
</template>

<script>
import pagination from '../../components/Pagination';
import formatDate from '../../assets/js/formatDate';
import msgReply from './MsgReply';
import logDetail from './LogDetail';

export default {
  data() {
    return {
      deviceInfo: {
        id: '',
        device: '',
        brand: '',
      },
      logMsg: {},
      testStatus: [
        {
          status: '',
          value: '全部',
        },
        {
          status: 1,
          value: '已通过',
        }, {
          status: 2,
          value: '未通过',
        },
      ],
      makerList: [],
      deviceInfoList: [],
      searchText: '',
      status: '', // 已测试1未测试0
      tableData: [],
      tableDataFrom: {
        id: '',
        testSheetId: '',
        serialNumber: '',
        deviceType: '',
        typeName: '',
        maker: '',
        model: '',
        tag: '',
        isDmpOnline: '',
        testState: '',
        testResult: '',
        isReport: '',
        testDmpState: '',
        testDeviceState: '',
        testAepState: '',
        testLocateState: '',
      },
      tableLoading: true,
      total: 1,
      projectInfo: [],
      sendMsg: {}, // 传给消息回复的内容
      logId: '', // 传给日志的id
      currentPage: '',
    };
  },
  components: {
    pagination,
    msgReply,
    logDetail,
  },
  created() {
    this.getDetailsList(1);
    this.getWorkDetail();
    this.getDeviceInfo();
  },
  methods: {
    selectChange(id) {
      this.makerList = [];
      this.makerList = this.deviceInfoList[id].maker.split(',');
      this.deviceInfo.device = this.deviceInfoList[id].deviceType;
      const b = this.makerList[0];
      this.deviceInfo.brand = b;
    },
    // 工单详情
    getWorkDetail() {
      const param = {};
      param.id = parseInt(this.$route.query.id, 10);
      window.vaApi.getWorkDetail(param).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.projectInfo = data || {};
          this.projectInfo.startTime = formatDate(this.projectInfo.startTime);
        }
      });
    },
    // 设备类型和厂商
    getDeviceInfo() {
      window.vaApi.getDeviceInfo().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          data.map((item, index) => {
            const i = item;
            i.id = index;
            return item;
          });
          this.deviceInfoList = data || {};
        }
      });
    },
    // 测试列表
    getDetailsList(currentPage) {
      const param = {};
      param.pageNum = currentPage || 1;
      this.currentPage = currentPage || 1;
      param.testSheetId = parseInt(this.$route.query.id, 10);
      param.deviceType = this.deviceInfo.device;
      param.maker = this.deviceInfo.brand;
      param.keyWords = this.searchText;
      param.testState = this.status;
      // testState
      window.vaApi.getDetailsList(param).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.tableLoading = false;
          this.tableData = data.list || {};
          this.total = data.total;
        }
      });
    },
    // 打开日志
    openLog(msg) {
      const logID = msg.id.toString();
      // console.log(logID, typeof logID);
      this.$refs.logDetail.dialogVisible = true;
      this.$refs.logDetail.getLogDetail(logID);
      this.logMsg = msg;
    },
    // 打开消息回复
    openMsgReply(msg) {
      this.sendMsg = msg;
      this.$refs.msgReply.dialogFormVisible = true;
    },
    // 打印报告
    PrintReport() {
      const param = this.tableDataFrom;
      param.currentPage = this.currentPage;
      window.vaApi.PrintReport(param).then((res) => {
        if (Number(res.status) !== Number(200)) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'error',
          });
          return;
        }
        this.$message({
          message: '成功导出excel',
          type: 'success',
        });
        // 创建一个blob对象,file的一种
        const blob = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // 配置下载的文件名
        link.download = 'excel.xlsx';
        link.click();
      });
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

  #DetailsList{
    .top{
      .el-breadcrumb{
        line-height: 50px;
      }
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
      .disabled{
        opacity: 0.5;
        cursor: no-drop;
      }
      .projectInfo{
        background-color: #fff;
        padding:15px 25px;
        li{
          float:left;
          width:33.3%;
          line-height: 40px;
          color:#888;
          span{
            color:#333;
            padding-left: 20px;
          }
        }
      }
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
    }
  }
</style>
