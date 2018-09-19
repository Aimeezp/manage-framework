<template>
    <el-dialog
        title="日志"
        :visible.sync="dialogVisible"
        width="25%"
        center
        :before-close="handleClose"
        class="logScroll"
        >
        <h3 class="logTitle">设备信息：</h3>
        <ul class="logList">
          <li>
            【设备序列号】：{{logMsg.serialNumber}}<br>
            【DMP TAG】：{{logMsg.dmpTag}}<br>
            【dmp分组】：{{logMsg.dmpGroup}}<br>
            【设备最后上报DMP时间】：{{logMsg.dmpLastMsgTime}}<br>
            【DMP是否在线】：{{logMsg.isDmpOnline===1?'是':'否'}}<br>
            【测试状态】：{{logMsg.testState === 1?'测试成功':'测试失败'}}
          </li>
        </ul>
        <h3 class="logTitle">日志信息：</h3>
        <ul class="logList">
          <li v-for="item in logInfro" :key="item.id">
              <p>【测试结果】：{{item.testTotalState===1?'测试成功':'测试失败'}}</p>
              <p v-if="item.testTotalState!==1">
                【状态结果】：{{item.testErrorType===1?'设备故障':item.testErrorType===2?'DMP故障':item.testErrorType===3?'AEP故障':'未知状态'}}
              </p>
              <p v-if="item.testTotalState!==1">【故障信息】：{{item.testInfo}}</p>
              <p>【测试时间】：{{item.createTime}}</p>
          </li>
        </ul>
        <h3 class="logTitle">日志信息：</h3>
        <ul class="logList" :class="{showMore:showMoreClass}">
          <li v-for="item in logInfro" :key="item.id">
              <p>【测试结果】：{{item.testTotalState===1?'测试成功':'测试失败'}}</p>
              <p v-if="item.testTotalState!==1">
                【状态结果】：{{item.testErrorType===4?'设备故障':item.testErrorType===2?'DMP故障':item.testErrorType===3?'AEP故障':'未知状态'}}
              </p>
              <p v-if="item.testTotalState!==1">【故障信息】：{{item.testInfo}}</p>
              <p>【测试时间】：{{item.createTime}}</p>
          </li>
        </ul>
        <p class="showMoreBtn" @click="showMore()">{{this.showMoreClass?'隐藏':'显示更多>>'}}</p>
    </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      logInfro: [],
      showMoreClass: false,
    };
  },
  props: {
    logMsg: {
      required: true,
    },
  },
  methods: {
    getLogDetail(id) {
      window.vaApi.getLogDetail({ id }).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.logInfro = data.filter(val => val.testTotalState === 1 || val.testTotalState === 2);
        }
      });
    },
    handleClose(done) {
      done();
    },
    showMore() {
      this.showMoreClass = !this.showMoreClass;
    },
  },
};
</script>
<style lang="scss">
@import "~scss_vars";

.logList{margin:.5rem 0;}
.logList li{border-bottom:1px dotted #ccc;line-height:2rem;margin-bottom:1rem;}
.logList li:not(:nth-child(1)){display: none;}
.showMore li:not(:nth-child(1)){display: block;}
.logTitle{line-height:3rem;border-bottom:1px solid #ccc;}
.logScroll .el-dialog__body{height:500px;overflow:scroll;padding-top:0;border-top:2px solid $color-primary}
.showMoreBtn{text-align: center;cursor: pointer;}
.logTitle{line-height:3rem;border-bottom:1px solid #ccc;}
.logScroll .el-dialog__body{height:500px;overflow:scroll;padding-top:0;border-top:2px solid $color-primary}
</style>

