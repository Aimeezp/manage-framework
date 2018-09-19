<template>
  <div class="account-manage-page">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.projectState" placeholder="全部状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="formInline.startDate"
                        :picker-options="pickerOptions1"
                        type="date" placeholder="创建时间">
        </el-date-picker>
        -
        <el-date-picker v-model="formInline.endDate"
                        :picker-options="pickerOptions2"
                        type="date" placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="width: 20%;">
        <div class="searchText">
          <el-input v-model="formInline.searchKey" @keyup.enter.native="getProjectManageList" placeholder="请输入内容"></el-input>
          <span class="btn cursor" @click="getProjectManageList">检索</span>
          <span class="line"></span>
        </div>
      </el-form-item>
      <el-form-item class="floatRight">
        <el-button type="primary" @click="$refs.addProject.open();">新建项目</el-button>
      </el-form-item>
    </el-form>
    <el-table class="tableList" center height="620"
              :data="projectManageList" v-loading="tableLoading" stripe highlight-current-row>
      <el-table-column align="center" type="index" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="projectId" label="项目ID">
      </el-table-column>
      <el-table-column align="center" prop="projectName" label="项目名称">
      </el-table-column>
      <el-table-column align="center" prop="describe" label="项目描述">
      </el-table-column>
      <el-table-column align="center" prop="create" label="创建人">
      </el-table-column>
      <el-table-column align="center" prop="state" label="项目状态">
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column align="center" label="更多操作">
        <template slot-scope="scope">
          <span class="table-operate-style cursor">停用</span>
          <span class="table-operate-style cursor">启用</span>
          <span class="table-operate-style cursor">编辑</span>
        </template>
      </el-table-column>
    </el-table>
    <!--add modal-->
    <addProject ref="addProject"></addProject>
  </div>
</template>

<script>
import formatDate from '../assets/js/formatDate';
import addProject from '../components/AddProject';

let thisVue = '';

export default {
  data() {
    return {
      formInline: {
        projectState: '',
        startDate: '',
        endDate: '',
        searchKey: '',
      },
      tableLoading: false,
      projectManageList: [{
        projectId: 1,
        projectName: '',
        describe: '',
        create: '',
        state: '',
        createTime: '',
      }],
      pickerOptions1: { // 开始日期
        disabledDate(time) {
          if (thisVue.formInline.endDate) {
            const v = thisVue.formInline.endDate.getTime && (time.getTime() > thisVue.formInline.endDate.getTime());
            return v;
          }
          return false;
        },
      },
      pickerOptions2: { // 结束日期
        disabledDate(time) {
          if (thisVue.formInline.startDate) {
            const v = thisVue.formInline.startDate.getTime && (time.getTime() < thisVue.formInline.startDate.getTime());
            return v;
          }
          return false;
        },
      },
    };
  },
  components: {
    addProject,
  },
  created() {
    thisVue = this;
  },
  methods: {
    getProjectManageList() {
      const that = this;
      that.tableLoading = true;
      that.formInline.startDate = formatDate(that.formInline.startDate);
      that.formInline.endDate = formatDate(that.formInline.endDate);
      setTimeout(() => { that.tableLoading = false; }, 1000);
    },
  },
};
</script>

<style lang="scss">
  .account-manage-page{
    .el-form--inline .el-form-item__content{
      width: 100%;
    }
    .searchText{
      position:relative;
      width:100%;
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
  }
</style>
