<template>
  <div class="Detailsandlog">
    <el-dialog
      title="设备详情"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
      top="3vh"
      center
      class="dialog-self">
      <p class="titleTab">
        <!--<span @click="deviceDetails" :class="Detail?'titleColor':''">设备详情</span>-->
        <!--| <span @click="deviceLog" :class="Log?'titleColor':''">设备日志</span>-->
      </p>
      <div>
        <Details
          v-if="Detail"
          :isEdit="true"
          :rules="rules"
          :coorList="coorList"
          :detailsForm="detailsForm"></Details>
        <log v-if="Log" ref="logs" :logInfro="logInfro"></log>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Details from './Details';
import log from './Log';

export default {
  data() {
    return {
      dialogVisible: false,
      Detail: true,
      Log: false,
      detailsForm: {
        projectName: '',
        serialNumber: '',
        category: '',
        maker: '',
        productModel: '',
        deviceType: '',
        deviceNum: '',
        msisdn: '',
        imsi: '',
        province: '',
        district: '',
        city: '',
        addr: '',
        lng: '',
        lat: '',
        coordinateType: '',
        aditional: '',
        projectList: [],
        deviceTypeList: [],
        deviceMakerList: [],
        deviceModalList: [],
      },
      logInfro: [],
      coorList: [],
      rules: {
        projectName: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'change' },
        ],
        maker: [
          { required: true, message: '请选择设备厂商', trigger: 'change' },
        ],
        productModel: [
          { required: true, message: '请选择设备型号', trigger: 'change' },
        ],
        serialNumber: [
          { required: true, message: '请输入设备IMEI号', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
      },
    };
  },
  components: {
    Details,
    log,
  },
  methods: {
    deviceLog() {
      this.Log = true;
      this.Detail = false;
    },
    deviceDetails() {
      this.Log = false;
      this.Detail = true;
    },
    getDetailInfo(deviceId) {
      const param = {};
      param.deviceId = deviceId;
      window.vaApi.getDetails(param).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          const obj = Object.keys(data);
          obj.map((v) => {
            if (!data[v]) {
              data[v] = '无数据';
            }
            return v;
          });
          data.deviceType = data.category;
          data.projectId = data.projectName;
          this.detailsForm = data;
          if (this.detailsForm.coordinateType === 1) {
            this.detailsForm.coordinateType = 'wgs84';
          } else if (this.detailsForm.coordinateType === 2) {
            this.detailsForm.coordinateType = 'gcj02';
          } else if (this.detailsForm.coordinateType === 3) {
            this.detailsForm.coordinateType = 'bd09';
          }
        }
      });
    },
    // logFun(dataList, event) {
    //   dataList.forEach((v) => {
    //     const c = v;
    //     delete c.updater;
    //     this.logInfro.push(v);
    //   });
    //   const obj = Object.entries(dataList);
    //   obj.map(([item, value]) => {
    //     const dataLists = dataList;
    //     dataLists[item].eventType = event;
    //     dataLists[item].logDetails = JSON.stringify(value);
    //     if (item < dataList.length - 1) {
    //       dataLists[parseInt(item, 10)].misTime =
    //         ((new Date(dataLists[parseInt(item, 10) + 1].createDate).getTime() -
    //           new Date(dataLists[item].createDate).getTime()) / 3600000).toFixed(2);
    //     }
    //     return item;
    //   });
    // },
    // getLogs(deviceId) {
    //   const param = {};
    //   param.deviceId = deviceId;
    //   window.vaApi.getLog(param).then((res) => {
    //     const { status, data } = res.data;
    //     if (parseInt(status, 10) === 1) {
    //       this.logInfro = [];
    //       // alarm
    //       if (data.ALARMS !== null) {
    //         this.logFun(data.ALARMS, '告警');
    //       }
    //
    //       // heart
    //       if (data.HEARTS !== null) {
    //         this.logFun(data.HEARTS, '心跳');
    //       }
    //
    //       // error
    //       if (data.ERRORS !== null) {
    //         this.logFun(data.ERRORS, '故障');
    //       }
    //     }
    //   });
    // },
  },
};
</script>

<style  lang="scss">
@import "~scss_vars";

.Detailsandlog{
  .titleTab{
    text-align: center;
    font-size: 18px;
    padding-bottom: 20px;
    span{
      padding: 0 10px;
      cursor:pointer;
    }
    .titleColor{
      color: $color-primary;
    }
  }
  .el-dialog--center .el-dialog__body{
    padding:0 25px 30px;
  }
}
</style>
