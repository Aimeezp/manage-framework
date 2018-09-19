<template>
  <div class="account-manage-page">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model.trim="formInline.role" placeholder="全部账号">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model.trim="formInline.roleStatus" placeholder="全部账号状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model.trim="formInline.startDate"
                        :picker-options="pickerOptions1"
                        type="date" placeholder="创建时间">
        </el-date-picker>
        -
        <el-date-picker v-model.trim="formInline.endDate"
                        :picker-options="pickerOptions2"
                        type="date" placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="width: 20%;">
        <div class="searchText">
        <el-input v-model.trim="formInline.searchKey" @keyup.enter.native="getAccountManageList" placeholder="请输入内容"></el-input>
        <span class="btn cursor" @click="getAccountManageList">检索</span>
        <span class="line"></span>
        </div>
      </el-form-item>
      <el-form-item class="floatRight">
        <el-button type="primary" @click="$refs.addAccountDialogRef.open('新建账号', '');">新建账号</el-button>
      </el-form-item>
    </el-form>
    <el-table class="tableList" center height="620"
              :data="accountManageList" v-loading="tableLoading" stripe highlight-current-row>
      <el-table-column align="center" type="index" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="accountId" label="账号ID">
      </el-table-column>
      <el-table-column align="center" prop="name" label="账号名称">
      </el-table-column>
      <el-table-column align="center" prop="describe" label="账号描述">
      </el-table-column>
      <el-table-column align="center" prop="state" label="账号状态">
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column align="center" label="更多操作">
        <template slot-scope="scope">
          <div class="tableBtnGroup">
            <span class="tableBtn">停用</span>
            <span class="tableBtn">启用</span>
            <span class="tableBtn" @click="$refs.addAccountDialogRef.open('修改账号', scope.row.accountId);">编辑</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--add dialog-->
    <addAccountDialog ref="addAccountDialogRef"></addAccountDialog>
  </div>
</template>

<script>
import formatDate from '../../assets/js/formatDate';
import addAccountDialog from '../../components/systemManage/accountManage/AddAccount';

let thisVue = '';

export default {
  data() {
    return {
      formInline: {
        role: '',
        roleStatus: '',
        startDate: '',
        endDate: '',
        searchKey: '',
      },
      tableLoading: false,
      accountManageList: [{
        accountId: 1,
        name: '',
        describe: '',
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
    addAccountDialog,
  },
  created() {
    thisVue = this;
  },
  methods: {
    getAccountManageList() {
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
