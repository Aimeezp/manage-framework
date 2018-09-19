<template>
  <el-dialog class="add-account-dialog dialog-self"
    :title="title"
             :center="true"
    :visible.sync="dialogVisible"
             top="2vh"
    width="30%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号名称:" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入账号名称"></el-input>
      </el-form-item>
      <el-form-item label="登录密码:" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址:" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="企业名称:" prop="companyName">
        <el-input v-model="ruleForm.companyName" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item label="部门名称:" prop="departmentName">
        <el-input v-model="ruleForm.departmentName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="账户描述:" prop="accountDescription">
        <el-input type="textarea" placeholder="请输入角色描述（选填）" v-model="ruleForm.accountDescription"></el-input>
      </el-form-item>
      <el-form-item label="账户状态:" prop="accountState">
        <el-select v-model="ruleForm.accountState" placeholder="请选择账户状态">
          <el-option v-for="item in accountStateList" :label="item.name" :value="item.value" :key="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属项目:" prop="projectNameArr">
        <el-tree
          class="add-account-project"
          :data="data2"
          show-checkbox
          node-key="id"
          ref="projectTree"
          v-model="ruleForm.projectNameArr"
          :default-expanded-keys="[]"
          :default-checked-keys="[]"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item label="所属角色:" prop="roleArr">
        <el-tree
          class="add-account-project"
          :data="data2"
          show-checkbox
          node-key="id"
          ref="roleTree"
          v-model="ruleForm.roleArr"
          :default-expanded-keys="[]"
          :default-checked-keys="[]"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-account',
  data() {
    return {
      title: '',
      dialogVisible: false,
      // account state
      accountStateList: [{
        name: '正常',
        value: 1,
      }, {
        name: '冻结',
        value: 2,
      }],
      ruleForm: {
        name: '',
        pwd: '',
        phone: '',
        email: '',
        companyName: '',
        departmentName: '',
        accountDescription: '', // 账户描述选填
        accountState: '',
        projectNameArr: [],
        roleArr: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        accountState: [
          { required: true, message: '请选择账户状态', trigger: 'change' },
        ],
        projectNameArr: [
          { required: true, message: '请选择至少一个所属项目', trigger: 'change' },
        ],
        roleArr: [
          { required: true, message: '请选择至少一个所属角色', trigger: 'change' },
        ],
      },
      // tree
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1',
          }, {
            id: 10,
            label: '三级 1-1-2',
          }],
        }],
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
        }, {
          id: 6,
          label: '二级 2-2',
        }],
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1',
        }, {
          id: 8,
          label: '二级 3-2',
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      nowId: '',
    };
  },
  methods: {
    open(title, nowId) {
      const that = this;
      that.title = title;
      that.nowId = nowId || '';
      that.dialogVisible = true;
      setTimeout(() => {
        that.resetForm('ruleForm');
        that.$refs.projectTree.setCheckedKeys([]);
        that.$refs.roleTree.setCheckedKeys([]);
      }, 30);
    },
    close() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.ruleForm.projectNameArr = this.$refs.projectTree.getCheckedNodes();
      this.ruleForm.roleArr = this.$refs.roleTree.getCheckedNodes();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.close();
          this.$message({
            message: '新建成功！',
            type: 'success',
          });
        }
      });
    },
    // init
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
  .dialog-self{
    // tree scroll
    .add-account-project{
    height: 110px;
    overflow-y: scroll;
  }
  }
</style>
