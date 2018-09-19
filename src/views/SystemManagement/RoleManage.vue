<template>
    <div class="role-manage-page">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="formInline.role" placeholder="全部角色">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="formInline.roleStatus" placeholder="全部角色状态">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="formInline.startDate" type="date" :picker-options="pickerOptions1" placeholder="创建时间">
                </el-date-picker>
                -
                <el-date-picker v-model="formInline.endDate" type="date" :picker-options="pickerOptions2" placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="width: 20%;">
              <div class="searchText">
                <el-input v-model="formInline.searchKey" @keyup.enter.native="getRoleData()" placeholder="请输入内容"></el-input>
                <span class="btn cursor" @click="getRoleData()">检索</span>
                <span class="line"></span>
              </div>
                <!--<el-input v-model="formInline.searchKey">-->
                    <!--<template slot="append">检索</template>-->
                <!--</el-input>-->
            </el-form-item>
            <el-form-item class="floatRight">
                <el-button type="primary" @click="$refs.addRoleDialogRef.open('新建角色', '');">新建角色</el-button>
            </el-form-item>
        </el-form>
        <el-table class="tableList" height="620"
                  :data="roleList" v-loading="tableLoading" stripe highlight-current-row>
            <el-table-column type="index" align="center" label="序号">
            </el-table-column>
            <el-table-column align="center" label="角色ID" prop="roleId">
            </el-table-column>
            <el-table-column align="center" label="角色名称" prop="roleName">
            </el-table-column>
            <el-table-column align="center" label="角色描述" prop="roleDescrib">
            </el-table-column>
            <el-table-column align="center" label="角色状态" prop="roleStatus">
            </el-table-column>
            <el-table-column align="center" label="分配次数" prop="distriTime">
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span class="table-operate-style cursor">停用</span>
                <span class="table-operate-style cursor">启用</span>
                <span class="table-operate-style cursor" @click="$refs.addRoleDialogRef.open('编辑角色', scope.row);">编辑</span>
              </template>
            </el-table-column>
        </el-table>
      <addRole ref="addRoleDialogRef"></addRole>
    </div>
</template>

<script>
import formatDate from '../../assets/js/formatDate';
import addRole from '../../components/systemManage/roleManage/addRole';

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
      roleList: [{
        roleId: 1,
        roleName: '管理员',
        roleDescrib: '描述一下这个角色',
        roleStatus: '正常',
        distriTime: 10,
        createTime: '2019-10-25',
        range: ['平台'],
        funcListArr: [2, 2],
      }, {
        roleId: 2,
        roleName: '管理员2',
        roleDescrib: '描述一下这个角色',
        roleStatus: '冻结',
        distriTime: 12,
        createTime: '2019-10-25',
        range: ['厂商'],
        funcListArr: [1],
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
  created() {
    thisVue = this;
  },
  mounted() {
    this.getRoleData();
  },
  components: {
    addRole,
  },
  methods: {
    getRoleData() {
      this.formInline.startDate = formatDate(this.formInline.startDate);
      this.formInline.endDate = formatDate(this.formInline.endDate);
      setTimeout(() => { }, 1000);
      const params = {
        roleType: '',
        roleStatus: '',
        startTime: '',
        endTime: '',
        searchTxt: '',
      };
      window.vaApi.getRoleList(params).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.tableLoading = true;
          this.roleList = data.list;
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .role-manage-page{
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
