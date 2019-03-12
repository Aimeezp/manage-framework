<template>
  <div id="testList">
    <div class="top clearfix">
      <el-select v-model="status" placeholder="测试状态">
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
          :picker-options="pickerOptions1"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          placeholder="开始时间">
        </el-date-picker> -
        <el-date-picker
          v-model="endData"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          type="date"
          :picker-options="pickerOptions2"
          placeholder="结束时间">
        </el-date-picker>
      </div>
      <div class="searchText">
        <el-input v-model="searchText" placeholder="请输入内容"></el-input>
        <span class="btn cursor" @click="getTestList(1)">检索</span>
        <span class="line"></span>
      </div>
      <el-button type="primary" @click="newTest">新建测试</el-button>
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
          min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.selfIndex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="项目ID"
          align="center"
          min-width="80px">
        </el-table-column>
        <el-table-column
          prop="projectName"
          min-width="200px"
          align="center"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="isDone"
          label="测试状态"
          align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.isDone=== 0" class="weiwancehng">未完成</p>
            <p v-else-if="scope.row.isDone=== 1">已完成</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          min-width="120px"
          label="测试日期">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="200px"
          label="项目地址">
        </el-table-column>
        <el-table-column
          prop="managerName"
          align="center"
          min-width="100px"
          label="支持经理">
        </el-table-column>
        <el-table-column
          prop="managerMobile"
          align="center"
          min-width="120px"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="deviceCount"
          align="center"
          min-width="80px"
          label="测试设备">
        </el-table-column>
        <el-table-column
          prop="passCount"
          align="center"
          min-width="80px"
          label="测试通过">
        </el-table-column>
        <el-table-column
          prop="passCount"
          align="center"
          min-width="80px"
          label="通过率">
          <!--<template slot-scope="scope">-->
            <!--<p v-if="scope.row.deviceCount === 0 || scope.row.passCount === 0">0</p>-->
            <!--<p v-else>{{(scope.row.passCount/scope.row.deviceCount).toFixed(2)*100}}%</p>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          align="center"
        min-width="200px">
          <template slot-scope="scope">
            <span class="infoBtn cursor" @click="$router.push({path:'/details', query: { id: scope.row.id }})">测试详情</span>
            <span class="infoBtn cursor">测试报告</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagination :flag="showSizes" ref="turnPage1" :total="total" :paginationFun="getTestList" :pageSizeFun="pageSizeFun"></pagination>

    <!--新建测试-->
    <NewTest ref="addTest"></NewTest>
  </div>
</template>

<script>
import pagination from '../../components/Pagination';
import NewTest from '../../components/TestManagement/NewTest';

let thisVue = '';
export default {
  data() {
    return {
      testStatus: [
        {
          status: '',
          value: '全部',
        },
        {
          status: 1,
          value: '已测试',
        }, {
          status: 0,
          value: '未测试',
        },
      ],
      startData: '',
      endData: '',
      searchText: '',
      status: '', // 已测试1未测试0
      tableData: [],
      tableLoading: true,
      total: 1,
      pickerOptions1: { // 开始日期
        disabledDate(time) {
          if (thisVue.endData) {
            const v = thisVue.endData.getTime && (time.getTime() > thisVue.endData.getTime());
            return v;
          }
          return false;
        },
      },
      pickerOptions2: { // 结束日期
        disabledDate(time) {
          if (thisVue.startData) {
            const v = thisVue.startData.getTime && (time.getTime() < thisVue.startData.getTime());
            return v;
          }
          return false;
        },
      },
      showSizes: true,
    };
  },
  components: {
    pagination,
    NewTest,
  },
  mounted() {
    thisVue = this;
    this.getTestList(1);
  },
  methods: {
    // 测试列表
    getTestList(currentPage) {
      const param = {};
      param.pageNum = currentPage || 1;
      param.keyWords = this.searchText;
      param.startTime = this.startData || '';
      param.endTime = this.endData || '';
      param.isDone = this.status;
      param.pageSize = this.$refs.turnPage1.pageSize;
      window.vaApi.getTestList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          data.list.forEach((v, i) => {
            const obj = {
              selfIndex: i + 1,
              time: v.startTime.substr(0, 10),
            };
            Object.assign(v, obj);
          });
          this.tableLoading = false;
          this.tableData = data.list || {};
          this.total = data.total;
        }
      });
    },
    // watch pagination pageSize
    pageSizeFun() {
      this.getTestList();
    },
    newTest() {
      this.$refs.addTest.open();
      this.$refs.addTest.projectData();
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

  #testList{
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
    }
  }
</style>
