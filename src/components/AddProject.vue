<template>
  <el-dialog
    class="dialog-self"
    :center="true"
    title="新建项目"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form :model="ruleForm" :rules="rules" ref="addProjectForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="项目名称:" prop="projectName">
        <el-select v-model="ruleForm.projectName" placeholder="请选择项目名称">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目地址:" prop="projectAddress">
        <el-select v-model="ruleForm.projectAddress" placeholder="请选择项目地址">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人:" prop="linkMan">
        <el-select v-model="ruleForm.linkMan" placeholder="请选择联系人">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="contactNum">
        <el-select v-model="ruleForm.contactNum" placeholder="请选择联系电话">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目状态:" prop="projectState">
        <el-select v-model="ruleForm.projectState" placeholder="请选择项目状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('addProjectForm')">完 成</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-project',
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        projectName: '',
        projectAddress: '',
        linkMan: '',
        contactNum: '',
        projectState: '',
      },
      rules: {
        projectName: [
          { required: true, message: '请选择项目名称', trigger: 'change' },
        ],
        projectAddress: [
          { required: true, message: '请选择项目地址', trigger: 'change' },
        ],
        linkMan: [
          {
            required: true, message: '请选择联系人', trigger: 'change',
          },
        ],
        contactNum: [
          {
            required: true, message: '请选择联系电话', trigger: 'change',
          },
        ],
        projectState: [
          { required: true, message: '请选择项目状态', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
      setTimeout(() => this.resetForm('addProjectForm'), 30);
    },
    close() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$parent.getProjectManageList();
          this.close();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
</style>
