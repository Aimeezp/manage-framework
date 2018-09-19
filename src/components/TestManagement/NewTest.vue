<template>
  <div id="testDialog">
    <el-dialog v-if="dialogVisible" title="新建测试" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" top="3vh" center>
      <el-form :model="newTestForm" :rules="rules" ref="newTestForm" class="newTestForm" label-position="left">
        <el-form-item label="项目名称：" prop="projectName" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.projectId" placeholder="请输入项目名称" @change="selectChange(newTestForm.projectId,'project')">
            <el-option v-for="(item, index) in projectList" :key="index" :label="item.projectName" :value="item.projectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目地址：" prop="address" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.projectId" placeholder="请输入项目地址" @change="selectChange(newTestForm.projectId,'project')">
            <el-option v-for="(item, index) in projectList" :key="index" :label="item.address" :value="item.projectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目经理：" prop="managerName" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.managerId" placeholder="请输入项目经理" @change="selectChange(newTestForm.managerId,'manager')">
            <el-option v-for="item in managerList" :key="item.managerId" :label="item.managerName" :value="item.managerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" prop="managerMobile" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.managerId" placeholder="请输入联系电话" @change="selectChange(newTestForm.managerId,'manager')">
            <el-option v-for="item in managerList" :key="item.managerId" :label="item.managerMobile" :value="item.managerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试日期：" prop="startTime" required class="formItem">
          <el-date-picker class="fullWidth" type="date" placeholder="请选择测试日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" :picker-options='pickerBeginDateAfter' v-model="newTestForm.startTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="测试类型：" prop="type" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.type" placeholder="请选择测试类型">
            <tempalte v-for="item in type" :key="item.status">
              <el-option v-if="item.value === '安装'" :disabled="true" :label="item.value" :value="item.status">
              </el-option>
              <el-option v-else :label="item.value" :value="item.status">
              </el-option>
            </tempalte>
            <!--<el-option v-for="item in type" :key="item.status" :label="item.value" :value="item.status">-->
            <!--</el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="现场测试人员姓名：" prop="testerName" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.testId" placeholder="请输入现场测试人员姓名" @change="selectChange(newTestForm.testId,'test')">
            <el-option v-for="item in testerList" :key="item.testId" :label="item.testerName" :value="item.testId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现场测试人员电话：" prop="testerMobile" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.testId" placeholder="请输入现场测试人员电话" @change="selectChange(newTestForm.testId,'test')">
            <el-option v-for="item in testerList" :key="item.testId" :label="item.testerMobile" :value="item.testId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技术支持人员姓名：" prop="supporterName" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.supporterId" placeholder="请输入技术支持人员姓名" @change="selectChange(newTestForm.supporterId,'supporter')">
            <el-option v-for="item in supportersList" :key="item.supporterId" :label="item.supporterName" :value="item.supporterId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技术支持人员电话：" prop="supporterMobile" class="formItem">
          <el-select class="fullWidth" v-model="newTestForm.supporterId" placeholder="请输入技术支持人员电话" @change="selectChange(newTestForm.supporterId,'supporter')">
            <el-option v-for="item in supportersList" :key="item.supporterId" :label="item.supporterMobile" :value="item.supporterId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('newTestForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      projectList: [],
      managerList: [],
      testerList: [],
      supportersList: [],
      type: [
        {
          status: 0,
          value: '场测',
        },
        {
          status: 1,
          value: '安装',
        },
      ],
      newTestForm: {
        projectName: '',
        address: '',
        managerName: '',
        managerId: '',
        managerMobile: '',
        testerName: '',
        testerMobile: '',
        supporterName: '',
        supporterMobile: '',
        startTime: '',
      },
      // 时间选择
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          const dataTime = time.getTime() < Date.now() - 8.64e7;
          return dataTime;
        },
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'change' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符' },
        ],
        address: [
          { required: true, message: '请输入项目地址', trigger: 'change' },
        ],
        managerName: [
          { required: true, message: '请输入项目经理', trigger: 'change' },
        ],
        managerMobile: [
          { required: true, message: '请输入联系方式', trigger: 'change' },
        ],
        testerName: [
          {
            required: true,
            message: '请输入现场测试人员姓名',
            trigger: 'change',
          },
        ],
        testerMobile: [
          {
            required: true,
            message: '请输入现场测试人员电话',
            trigger: 'change',
          },
        ],
        supporterName: [
          {
            required: true,
            message: '请输入技术支持人员姓名',
            trigger: 'change',
          },
        ],
        supporterMobile: [
          {
            required: true,
            message: '请输入技术支持人员电话',
            trigger: 'change',
          },
        ],
        type: [
          { required: true, message: '请选择测试类型', trigger: 'change' },
        ],
        startTime: [
          {
            type: 'string', required: true, message: '请选择测试日期', trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    selectChange(id, type) {
      if (type === 'project') {
        this.newTestForm.projectName = this.projectList.filter(item => item.projectId === this.newTestForm.projectId)[0].projectName;
        this.newTestForm.address = this.projectList.filter(item => item.projectId === this.newTestForm.projectId)[0].address;
      } else if (type === 'manager') {
        this.newTestForm.managerName = this.managerList.filter(item => item.managerId === this.newTestForm.managerId)[0].managerName;
        this.newTestForm.managerMobile = this.managerList.filter(item => item.managerId === this.newTestForm.managerId)[0].managerMobile;
      } else if (type === 'test') {
        this.newTestForm.testerName = this.testerList.filter(item => item.testId === this.newTestForm.testId)[0].testerName;
        this.newTestForm.testerMobile = this.testerList.filter(item => item.testId === this.newTestForm.testId)[0].testerMobile;
      } else if (type === 'supporter') {
        this.newTestForm.supporterName = this.supportersList.filter(item => item.supporterId === this.newTestForm.supporterId)[0].supporterName;
        this.newTestForm.supporterMobile = this.supportersList.filter(item => item.supporterId === this.newTestForm.supporterId)[0].supporterMobile;
      }
    },
    open() {
      this.dialogVisible = true;
      const obj = Object.keys(this.newTestForm);
      obj.map((item) => {
        this.newTestForm[item] = '';
        return item;
      });
    },
    close() {
      this.dialogVisible = false;
    },
    // 新建测试数据回显
    projectData() {
      window.vaApi.getProjectData().then((res) => {
        const { status, data } = res.data;
        const self = this;
        if (parseInt(status, 10) === 1) {
          self.projectList = data.project;
          self.managerList = data.managers;
          self.testerList = data.users;
          self.supportersList = data.supporters;
        }
      });
    },
    // 保存数据
    submitForm(formName) {
      // const startTimes = this.newTestForm.startTime.getFullYear() + '-' + (this.newTestForm.startTime.getMonth() + 1) + '-' + this.newTestForm.startTime.getDate() + '-' + this.newTestForm.startTime.getMinutes() + '-' + this.newTestForm.startTime.getMinutes() + '-' + this.newTestForm.startTime.getSeconds();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = { testerId: this.newTestForm.testId };
          Object.assign(param, this.newTestForm);
          window.vaApi.getNewTest(param).then(({ data: { status } }) => {
            if (parseInt(status, 10) === 1) {
              this.dialogVisible = false;
              this.$message({
                message: '新建测试成功！',
                type: 'success',
              });
              this.$parent.getTestList(1);
            }
          });
        }
      });
    },
  },
};
</script>

<style  lang="scss">
#testDialog {
  .newTestForm {
    .formItem {
      display: flex;
      .el-form-item__content {
        flex: 1;
        .fullWidth {
          width: 100%;
        }
      }
    }
  }
}
</style>
