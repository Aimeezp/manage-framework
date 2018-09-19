<template>
  <div class="logCons">
    <div v-if="logInfro.length === 0" class="nothing">暂无数据~~~</div>
    <ul class="textList" v-else>
      <li v-for="(item, index) in logInfro" :key="index">
        <p>序号：{{item.id}}</p>
        <p>时间：{{item.createDate}}</p>
        <p>事件类型：{{item.eventType}}</p>
        <p>距离上次告警时间：{{item.misTime || '0'}}小时</p>
        <p>日志详情：<span>{{item.logDetails}}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    logInfro: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
  .logCons{
    height:860px;
    overflow-y:scroll;
    .textList{
      li{
        padding: 10px 0;
        p{
          padding: 5px 0;
          span{
            word-break: break-all;
          }
        }
      }
    }
    .nothing{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 20px;
    }
  }
</style>
