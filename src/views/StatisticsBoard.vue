<template>
  <div class="statisticsBoardCls">
    <div v-loading="chartLoading">
      <div class="boardTitle">
        <div class="onlineData">
          <span>
            <b>设备总数：</b>
            <i>{{deviceTotalNumber}}</i>台
          </span>
          <span>
            <b>当前在线：</b>
            <i>{{deviceOnlineNumber}}</i>台
          </span>
          <span>
            <b>在线比率：</b>
            <i>{{deviceTotalNumber>0 ? ((deviceOnlineNumber||0)*100/deviceTotalNumber).toFixed(2) : 0.00}}</i>%
          </span>
        </div>
        <div class="filterPart">
          <el-button type="primary" class="refreshBtn" @click="refreshChart">更新</el-button>
          <p class="filterItem">
            <span v-for="(item, index) in timeList" class="filterBtn" :class="{ activeFilter: timeChange === item.val }" @click="timeChange = item.val" :key="index">{{item.text}}</span>
          </p>
          <p class="filterItem">
            <span class="filterBtn" :class="{activeFilter:tableStyle}" @click="tableStyle = true" title="列表模式">
              <i class="iconfont icon-liebiao"></i>
            </span>
            <span class="filterBtn" :class="{activeFilter:!tableStyle}" @click="tableStyle = false" title="卡片模式">
              <i class="iconfont icon-icon-test"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="boardChartCls" ref="boardChartRef"></div>
    </div>
    <div class="statisticsCardList">
      <div class="searchInput">
        <el-input clearable v-model.trim="keyWord" @keyup.enter.native="getList" maxlength=20 :placeholder="tabChange==='project'?'请输入项目名称':'请输入设备类型名称'">
          <template slot="append">
            <div @click="getList">检索</div>
          </template>
        </el-input>
      </div>
      <el-tabs v-model="tabChange" type="card">
        <el-tab-pane label="按项目" name="project" class="clearfix" v-loading="projectLoading">
          <div v-show="!tableStyle">
            <statistics-card v-for="(item, i) in projectList" :data="item" @jumpToDevice="jumpToDevice('',item.projectId)" :key="i"></statistics-card>
          </div>
          <div v-show="tableStyle">
            <el-table :data="projectList" border>
              <el-table-column prop="projectName" label="项目名称">
                <template slot-scope="{ row: {projectName, projectId} }">
                  <p class="cursor" @click="jumpToDevice('',projectId)">{{projectName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="deviceNum" label="设备总数">
              </el-table-column>
              <el-table-column prop="onlineNum" label="设备在线数">
              </el-table-column>
              <el-table-column label="在线比率">
                <template slot-scope="{ row: { deviceNum, onlineNum } }">
                  {{deviceNum>0 ? ((onlineNum||0)*100/deviceNum).toFixed(2) : 0}}%
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :flag="true" ref="projectTabRef" :total="projectTotal" :paginationFun="getProjectList"
            @size-change="projectSizeChange"></pagination>
        </el-tab-pane>
        <el-tab-pane label="按类型" name="deviceType" class="clearfix" v-loading="deviceTypeLoading">
          <div v-show="!tableStyle">
            <statistics-card v-for="(item, i) in deviceTypeList" :data="item" @jumpToDevice="jumpToDevice(item.deviceType)" :key="i"></statistics-card>
          </div>
          <div v-show="tableStyle">
            <el-table :data="deviceTypeList" border>
              <el-table-column label="类型名称">
                <template slot-scope="{ row: { deviceType } }">
                  <p class="cursor" @click="jumpToDevice(deviceType)">{{deviceType | typeName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="deviceNum" label="设备总数">
              </el-table-column>
              <el-table-column prop="onlineNum" label="设备在线数">
              </el-table-column>
              <el-table-column prop="address" label="在线比率">
                <template slot-scope="{ row: { deviceNum, onlineNum } }">
                  {{deviceNum>0 ? ((onlineNum||0)*100/deviceNum).toFixed(2) : 0}}%
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :flag="true" ref="deviceTypeTabRef" :total="deviceTypeTotal" :paginationFun="getDeviceTypeList"
            @size-change="deviceSizeChange"></pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import statisticsCard from '@/components/statisticsBoard/StatisticsCard';
import pagination from '@/components/Pagination';
import { valueArr, deviceTypeTxt } from '@/assets/js/appMapping';
import { keyWordReg } from '@/utils/utils';

const dateSplit = '-';
let chartList = [];

export default {
  data() {
    return {
      timeList: [
        { text: '日', val: 'day' },
        { text: '月', val: 'month' },
        { text: '年', val: 'year' },
      ],
      timeChange: 'day', // day, month, year
      deviceTotalNumber: 0,
      deviceOnlineNumber: 0,
      tableStyle: false,
      tabChange: 'project',
      keyWord: '',
      projectList: [],
      deviceTypeList: [],
      dataX: [],
      dataY: [],
      boardChart: '',
      chartLoading: false,
      projectLoading: false,
      projectTotal: 0,
      deviceTypeLoading: false,
      deviceTypeTotal: 0,
      intervalObj: '',
      lastUpdateHour: 0,
      pageSizeArr: [20, 20],
    };
  },
  watch: {
    tabChange() {
      this.tabChangehandler();
    },
    timeChange() {
      this.getChartData();
    },
  },
  filters: {
    typeName(val) {
      let nameVal;
      for (let i = 0; i < valueArr.length; i += 1) {
        if (val === valueArr[i]) {
          nameVal = deviceTypeTxt[i];
          break;
        }
      }
      return nameVal;
    },
  },
  mounted() {
    this.boardChart = echarts.init(this.$refs.boardChartRef);
    const chartPromise = this.getChartData();
    const tabPromise = this.tabChangehandler();
    Promise.all([chartPromise, tabPromise]).then(() => {
      this.chartResize();
    });
    window.addEventListener('resize', this.chartResize);
    // hourly update
    this.intervalObj = setInterval(() => {
      if (new Date().getHours() > this.lastUpdateHour) {
        this.getChartData();
      }
    }, 60000);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
    clearInterval(this.intervalObj);
    this.intervalObj = '';
    chartList = [];
  },
  components: { statisticsCard, pagination },
  methods: {
    chartResize() {
      if (this.boardChart) {
        this.boardChart.resize();
      }
    },
    formatChart() {
      let startValue;
      let endValue;
      if (this.dataX && this.dataX.length > 0) {
        switch (this.timeChange) {
          case this.timeList[0].val:
            endValue = this.dataX[this.dataX.length - 1];
            startValue =
              this.dataX.length >= 30
                ? this.dataX[this.dataX.length - 30]
                : this.dataX[0];
            break;
          case this.timeList[1].val:
            endValue = this.dataX[this.dataX.length - 1];
            startValue =
              this.dataX.length >= 12
                ? this.dataX[this.dataX.length - 12]
                : this.dataX[0];
            break;
          case this.timeList[2].val:
            endValue = this.dataX[this.dataX.length - 1];
            startValue =
              this.dataX.length >= 3
                ? this.dataX[this.dataX.length - 3]
                : this.dataX[0];
            break;
          default:
            break;
        }
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          position(pt) {
            return [pt[0], '10%'];
          },
          formatter(params) {
            const { deviceNum, onlineNum } = chartList[params[0].dataIndex];
            return `${params[0].axisValue}<br/>在线数：${onlineNum}<br/>总数：${deviceNum}<br/>在线率：${params[0].value}%`;
          },
        },
        grid: {
          left: 90,
          right: 90,
        },
        toolbox: {
          right: 50,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dataX,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          max: 100,
          axisLabel: {
            formatter: '{value}%',
          },
        },
        dataZoom: [
          {
            type: 'inside',
            minValueSpan: 1,
            startValue,
            endValue,
          },
          {
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '100%',
            minValueSpan: 1,
            startValue,
            endValue,
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        series: [
          {
            name: '在线率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: 'rgb(255, 70, 131)',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)',
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)',
                },
              ]),
            },
            data: this.dataY,
          },
        ],
      };
      this.boardChart.setOption(option);
    },
    getChartData() {
      // hourly update mark
      this.lastUpdateHour = new Date().getHours();
      this.chartLoading = true;
      return new Promise((resolve) => {
        window.vaApi
          .getBoardChart({ keyWord: this.timeChange })
          .then(({ data: { status, data } }) => {
            this.chartLoading = false;
            if (parseInt(status, 10) === 1) {
              const {
                list,
                NumMap: { deviceNum, onlineNum },
              } = data;
              chartList = list;
              this.deviceOnlineNumber = onlineNum;
              this.deviceTotalNumber = deviceNum;
              this.dataX = [];
              this.dataY = [];
              list.forEach((val) => {
                let dateContent;
                switch (this.timeChange) {
                  case this.timeList[0].val:
                    dateContent = `${val.online_rate_data_year}${dateSplit}${
                      val.online_rate_data_month
                    }${dateSplit}${val.online_rate_data_day}`;
                    break;
                  case this.timeList[1].val:
                    dateContent = `${val.online_rate_data_year}${dateSplit}${
                      val.online_rate_data_month
                    }`;
                    break;
                  case this.timeList[2].val:
                    dateContent = `${val.online_rate_data_year}`;
                    break;
                  default:
                    break;
                }
                this.dataX.push(dateContent);
                this.dataY.push(`${((val.onlineRate || 0) * 100).toFixed(2)}`);
              });
              this.formatChart();
            }
            resolve();
          });
      });
    },
    projectSizeChange(size) {
      this.pageSizeArr[0] = size;
      this.getProjectList();
    },
    getProjectList(currentPage = 1) {
      this.projectLoading = true;
      return new Promise((resolve) => {
        window.vaApi
          .getBoardProjectList({
            currentPage,
            keyWord: this.keyWord,
            pageSize: this.pageSizeArr[0],
          })
          .then(({ data: { status, data } }) => {
            this.projectLoading = false;
            if (parseInt(status, 10) === 1) {
              this.projectList = data.list;
              this.projectTotal = data.total;
            }
            resolve();
          });
      });
    },
    deviceSizeChange(size) {
      this.pageSizeArr[1] = size;
      this.getDeviceTypeList();
    },
    getDeviceTypeList(currentPage = 1) {
      this.deviceTypeLoading = true;
      return new Promise((resolve) => {
        window.vaApi
          .getBoardDeviceTypeList({
            currentPage,
            keyWord: this.keyWord,
            pageSize: this.pageSizeArr[1],
          })
          .then(({ data: { status, data } }) => {
            this.deviceTypeLoading = false;
            if (parseInt(status, 10) === 1) {
              this.deviceTypeList = data.list;
              this.deviceTypeTotal = data.total;
            }
            resolve();
          });
      });
    },
    getList() {
      if (this.keyWord && !keyWordReg.test(this.keyWord)) {
        this.$message({
          message: '请输入中文、英文或者数字！',
          type: 'error',
        });
        return false;
      }
      let listPromise;
      if (this.tabChange === 'project') {
        listPromise = this.getProjectList(1);
        this.$nextTick(() => {
          this.$refs.projectTabRef.jumpToFirst();
        });
      } else {
        listPromise = this.getDeviceTypeList(1);
        this.$nextTick(() => {
          this.$refs.deviceTypeTabRef.jumpToFirst();
        });
      }
      return listPromise;
    },
    tabChangehandler() {
      this.keyWord = '';
      return this.getList();
    },
    jumpToDevice(type, projectId) {
      const option = {
        name: 'DeviceMaintain',
        params: {},
      };
      if (projectId) {
        option.params.projectId = projectId;
      } else if (type) {
        option.params.deviceType = type;
      }
      this.$router.push(option);
    },
    async refreshChart() {
      await this.getChartData();
      this.$message({
        type: 'success',
        message: '图表更新成功!',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~scss_vars";

.statisticsBoardCls {
  padding: 10px;
  background-color: $bg-content-color;
  /*title start*/
  .boardTitle {
    font-size: 16px;
    color: $font-first-color;
    display: flex;
    margin-bottom: 10px;
    .onlineData {
      flex: 1;
      > span:not(:last-child) {
        margin-right: 30px;
      }
      i {
        font-size: 20px;
      }
    }
    .filterPart {
      display: flex;
      .refreshBtn {
        padding-top: 8px;
        padding-bottom: 8px;
        margin-right: 50px;
      }
      .filterItem {
        border: 1px solid $border-color;
        border-radius: 8px;
        display: flex;
        overflow: hidden;
        &:not(:last-child) {
          margin-right: 50px;
        }
        .filterBtn {
          box-sizing: border-box;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          &:not(:last-child) {
            border-right: 1px solid $border-color;
          }
        }
        .filterBtn:hover,
        .activeFilter {
          background-color: $color-body;
        }
      }
    }
  }
  /*title end*/
  /*chart start*/
  .boardChartCls {
    height: 300px;
  }
  /*chart end*/
  .statisticsCardList {
    margin-top: 20px;
    position: relative;
    .searchInput {
      position: absolute;
      right: 30px;
      top: -10px;
      z-index: 1;
    }
  }
}
</style>
