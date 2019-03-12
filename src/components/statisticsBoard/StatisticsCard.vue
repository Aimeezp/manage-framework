<template>
  <div class="statisticsCardCls">
    <div class="topPart">
      <div class="iconPart" :class="data.projectName?'':data.deviceType | type">
        <i v-if="data.projectName">{{data.projectName.substring(0, 1)}}</i>
      </div>
      <div class="infoPart">
        <p class="cursor" :title="data.deviceType | typeName(data.projectName)" @click="$emit('jumpToDevice')">{{data.deviceType | typeName(data.projectName)}}</p>
        <p><span>设备总数：</span><b>{{data.deviceNum || 0}}</b>台</p>
        <p><span>设备在线：</span><b>{{data.onlineNum || 0}}</b>台</p>
      </div>
    </div>
    <div class="bottomPart">
      <span>在线比率：</span><b>{{data.deviceNum>0 ? ((data.onlineNum || 0)*100/data.deviceNum).toFixed(2) : 0}}</b>%
    </div>
  </div>
</template>

<script>
import { valueArr, deviceTypeTxt, keyArr } from '@/assets/js/appMapping';

export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  filters: {
    typeName(val, projectName) {
      if (projectName) {
        return projectName;
      }
      let nameVal;
      for (let i = 0; i < valueArr.length; i += 1) {
        if (val === valueArr[i]) {
          nameVal = deviceTypeTxt[i];
          break;
        }
      }
      return nameVal;
    },
    type(val) {
      let typeVal;
      for (let i = 0; i < valueArr.length; i += 1) {
        if (val === valueArr[i]) {
          typeVal = keyArr[i];
          break;
        }
      }
      return typeVal;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~scss_vars";

.statisticsCardCls {
  float: left;
  border: 1px solid $border-color;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  width: 260px;
  box-sizing: border-box;
  .topPart {
    display: flex;
    .iconPart {
      width: 80px;
      height: 80px;
      line-height: 80px;
      border: 1px solid $border-color;
      border-radius: 5px;
      margin-right: 10px;
      text-align: center;
      font-size: 40px;
      @each $ele in "smoke", "environment", "cover", "doorlock", "dust",
        "dustbin", "infraRed", "lift", "alarmBtn", "geoMonitor", "hydrant",
        "firePressure", "airQuality", "gasMonitor", "light", "temperature",
        "h2s", "nh3", "noise", "ultrasonic", "water"
      {
        &.#{$ele} {
          background: url(~@/assets/images/app/#{$ele}.png);
          background-size: 100% 100%;
        }
      }
    }
    .infoPart {
      > p {
        margin-bottom: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 125px;
      }
    }
  }
  .bottomPart {
    margin-top: 10px;
    > b {
      font-size: 20px;
    }
  }
}
</style>
