<template>
    <div id="EditDevice">
      <el-dialog
        v-if="dialogVisible"
        title="编辑设备"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="40%"
        top="3vh"
        center>
        <el-form :model="editDeviceFrom" :rules="rules" ref="editDeviceFrom" class="editDeviceFrom" label-position="left">
          <el-form-item label="设备类型：" prop="deviceType">
            <el-select v-model="editDeviceFrom.deviceType" placeholder="请输入" @change = "selectChange(editDeviceFrom.projectId,'project')">
              <el-option
                v-for="(item, index) in projectList"
                :key="index"
                :label="item.deviceType"
                :value="item.deviceType">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备品牌：" prop="deviceBrand">
            <el-select v-model="editDeviceFrom.deviceBrand" placeholder="请输入" @change = "selectChange(editDeviceFrom.projectId,'project')">
              <el-option
                v-for="(item, index) in projectList"
                :key="index"
                :label="item.deviceBrand"
                :value="item.deviceBrand">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备型号：" prop="deviceModel">
            <el-select v-model="editDeviceFrom.deviceModel" placeholder="请输入" @change = "selectChange(editDeviceFrom.managerId,'manager')">
              <el-option
                v-for="(item, index) in managerList"
                :key="index"
                :label="item.deviceModel"
                :value="item.deviceModel">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备版本：" prop="deviceversion">
            <el-select v-model="editDeviceFrom.deviceversion" placeholder="请输入" @change = "selectChange(editDeviceFrom.managerId,'manager')">
              <el-option
                v-for="(item, index) in managerList"
                :key="index"
                :label="item.deviceversion"
                :value="item.deviceversion">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他信息：" prop="textarea">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="editDeviceFrom.textarea">
            </el-input>
          </el-form-item>
          <el-form-item label="创建时间：" required>
            <el-col>
              <el-form-item prop="startTime">
                <el-date-picker type="date"
                                placeholder="请选择创建时间"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options='pickerBeginDateAfter'
                                v-model="editDeviceFrom.startTime"
                                style="width: 100%;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="设备状态：" prop="deviceStatus">
            <el-select v-model="editDeviceFrom.deviceStatus" placeholder="请选择设备状态">
              <el-option
                v-for="(item, index) in type"
                :key="index"
                :label="item.deviceStatus"
                :value="item.deviceStatus">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('editDeviceFrom')">保存</el-button>
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
          value: '产测',
        }, {
          status: 1,
          value: '安装',
        },
      ],
      editDeviceFrom: {
        deviceType: '',
        deviceBrand: '',
        deviceModel: '',
        deviceversion: '',
        deviceStatus: '',
        textarea: '',
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
        deviceType: [
          { required: true, message: '请输入设备类型', trigger: 'change' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符' },
        ],
        deviceBrand: [
          { required: true, message: '请输入设备品牌', trigger: 'change' },
        ],
        deviceModel: [
          { required: true, message: '请输入设备型号', trigger: 'change' },
        ],
        deviceversion: [
          { required: true, message: '请输入设备版本', trigger: 'change' },
        ],
        deviceStatus: [
          { required: true, message: '请选择设备状态', trigger: 'change' },
        ],
        textarea: [
          { required: true, message: '请选择测试类型', trigger: 'blur' },
        ],
        startTime: [
          { type: 'string', message: '请选择测试日期', trigger: 'change' },
          { required: true },
        ],
      },
    };
  },
  methods: {
    selectChange(id, type) {
      if (type === 'project') {
        this.editDeviceFrom.projectName = this.projectList.filter(item => item.projectId === this.editDeviceFrom.projectId)[0].projectName;
        this.editDeviceFrom.address = this.projectList.filter(item => item.projectId === this.editDeviceFrom.projectId)[0].address;
      } else if (type === 'manager') {
        this.editDeviceFrom.managerName = this.managerList.filter(item => item.managerId === this.editDeviceFrom.managerId)[0].managerName;
        this.editDeviceFrom.managerMobile = this.managerList.filter(item => item.managerId === this.editDeviceFrom.managerId)[0].managerMobile;
      } else if (type === 'test') {
        this.editDeviceFrom.testerName = this.testerList.filter(item => item.testId === this.editDeviceFrom.testId)[0].testerName;
        this.editDeviceFrom.testerMobile = this.testerList.filter(item => item.testId === this.editDeviceFrom.testId)[0].testerMobile;
      } else if (type === 'supporter') {
        this.editDeviceFrom.supporterName = this.supportersList.filter(item => item.supporterId === this.editDeviceFrom.supporterId)[0].supporterName;
        this.editDeviceFrom.supporterMobile = this.supportersList.filter(item => item.supporterId === this.editDeviceFrom.supporterId)[0].supporterMobile;
      }
    },
    open() {
      this.dialogVisible = true;
      const obj = Object.keys(this.editDeviceFrom);
      obj.map((item) => {
        this.editDeviceFrom[item] = '';
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = { testerId: this.editDeviceFrom.testId };
          Object.assign(param, this.editDeviceFrom);
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
#EditDevice{
.editDeviceFrom{
  .el-form-item__content{
    float:left;
  }
  $list: 1,2,3,4,5,6,7;
  @each $i in $list{
    .el-form-item:nth-child(#{$i}){
      .el-form-item__content{
        width:82%;
        .el-form-item__content{
          width:100%;
        }
      }
      .el-select{
        width:100%;
      }
    }
  }
  $lists: 8,9,10;
  @each $j in $lists{
    .el-form-item:nth-child(#{$j}){
      .el-form-item__content{
        width:71%;
      }
      .el-select{
        width:100%;
      }
    }
  }
 }
  .el-dialog__body{
    padding-bottom:0;
  }
}
</style>
