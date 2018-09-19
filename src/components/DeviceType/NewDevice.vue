<template>
  <div id="deviceDialog">
    <el-dialog
      v-if="dialogVisible"
      title=""
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center>
      <p class="step"><span class="stepNum">{{stepNum}}</span>{{stepText}}</p>
      <el-form :model="newDeviceForm" :rules="rules" ref="newDeviceForm" class="newDeviceForm" label-position="left">
        <el-form-item label="" prop="newType">
          <div v-if="type">
            <el-radio v-model="radio" label="1" @change="disabled">
              <span class="typeTest">新类型：</span>
              <el-input v-model="newDeviceForm.newType" placeholder="请输入" :disabled="isDisabledNew"></el-input>
            </el-radio>
            <el-radio v-model="radio" label="2" @change="disabled">
              <span class="type">现有类型：</span><el-select v-model="newDeviceForm.deviceType" placeholder="请选择类型" :disabled="isDisabled">
              <el-option
                v-for="(item, index) in deviceTypeList"
                :key="index"
                :label="item.deviceType"
                :value="item.deviceType">
              </el-option>
            </el-select>
            </el-radio>
          </div>
          <div v-if="brand">
            <el-radio v-model="radio" label="1" @change="disabled">
              <span class="typeTest">新品牌：</span>
              <el-input v-model="newDeviceForm.newType" placeholder="请输入" :disabled="isDisabledNew"></el-input>
            </el-radio>
            <el-radio v-model="radio" label="2" @change="disabled">
              <span class="type">现有品牌：</span><el-select v-model="newDeviceForm.deviceType" placeholder="请选择类型" :disabled="isDisabled">
              <el-option
                v-for="(item, index) in deviceTypeList"
                :key="index"
                :label="item.deviceType"
                :value="item.deviceType">
              </el-option>
            </el-select>
            </el-radio>
          </div>
          <div v-if="model">
            <el-radio v-model="radio" label="1" @change="disabled">
              <span class="typeTest">新型号：</span>
              <el-input v-model="newDeviceForm.newType" placeholder="请输入" :disabled="isDisabledNew"></el-input>
            </el-radio>
            <el-radio v-model="radio" label="2" @change="disabled">
              <span class="type">现有型号：</span><el-select v-model="newDeviceForm.deviceType" placeholder="请选择类型" :disabled="isDisabled">
              <el-option
                v-for="(item, index) in deviceTypeList"
                :key="index"
                :label="item.deviceType"
                :value="item.deviceType">
              </el-option>
            </el-select>
            </el-radio>
          </div>
          <div v-if="version">
            <el-radio v-model="radio" label="1" @change="disabled">
              <span class="typeTest">新版本：</span>
              <el-input v-model="newDeviceForm.newType" placeholder="请输入" :disabled="isDisabledNew"></el-input>
            </el-radio>
            <el-radio v-model="radio" label="2" @change="disabled">
              <span class="type">现有版本：</span><el-select v-model="newDeviceForm.deviceType" placeholder="请选择" :disabled="isDisabled">
              <el-option
                v-for="(item, index) in deviceTypeList"
                :key="index"
                :label="item.deviceType"
                :value="item.deviceType">
              </el-option>
            </el-select>
            </el-radio>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('newDeviceForm')">完成</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      deviceTypeList: [],
      deviceTitle: '',
      stepText: '类型',
      stepNum: '1',
      radio: '1',
      isDisabledNew: false,
      isDisabled: true,
      type: true,
      brand: false,
      model: false,
      version: false,
      newDeviceForm: {
        newType: '',
        deviceType: '',
      },
      rules: {
        newType: [
          { required: true, message: '请输入或选择', trigger: 'change' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符' },
        ],
      },
    };
  },
  created() {
    this.deviceTitle = this.stepNum + this.stepText;
  },
  mounted() {
  },
  methods: {
    disabled() {
      if (this.radio === '1') {
        this.isDisabled = true;
        this.isDisabledNew = false;
      } else {
        this.isDisabled = false;
        this.isDisabledNew = true;
      }
    },
    open() {
      this.dialogVisible = true;
      this.stepText = '类型';
      this.stepNum = '1';
      this.type = true;
      this.brand = false;
      this.model = false;
      this.version = false;
      const obj = Object.keys(this.newDeviceForm);
      obj.map((item) => {
        this.newDeviceForm[item] = '';
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
          if (this.type) {
            this.type = false;
            this.brand = true;
            this.stepText = '品牌';
            this.stepNum = '2';
          } else if (this.brand) {
            this.model = true;
            this.brand = false;
            this.stepNum = '3';
            this.stepText = '型号';
          } else if (this.model) {
            this.model = false;
            this.version = true;
            this.stepNum = '4';
            this.stepText = '版本';
          } else if (this.version) {
            this.dialogVisible = false;
            // const param = { testerId: this.newDeviceForm.testId };
            // Object.assign(param, this.newDeviceForm);
            // window.vaApi.getNewTest(param).then(({ data: { status } }) => {
            //   if (parseInt(status, 10) === 1) {
            //     this.dialogVisible = false;
            //     this.$message({
            //       message: '新建测试成功！',
            //       type: 'success',
            //     });
            //     this.$parent.getTestList(1);
            //   }
            // });
          }
        }
      });
    },
  },
};
</script>

<style  lang="scss">
@import "~scss_vars";

  #deviceDialog{
    .el-dialog__header{
      padding:0;
    }
    .el-dialog--center .el-dialog__body{
      padding-bottom: 0;
    }
    .step{
      font-size: 18px;
      text-align: center;
      .stepNum{
        background:$color-primary;
        color:#fff;
        border-radius: 100%;
        display:inline-block;
        width:18px;
        height:18px;
        line-height: 18px;
        text-align: center;
        margin-right: 10px;
      }
    }

    .newDeviceForm{
      .el-radio{
        display:block;
        margin-top: 20px;
      }
      .el-radio+.el-radio{
        margin-left: 0;
      }
      .typeTest{
        letter-spacing: 5px;
      }
      .type{
        margin-right: 2%;
      }
      .el-input{
        width:70%;
      }
      .el-select{
        width:70%;
        .el-input--suffix{
          width:100%;
        }
      }
    }
  }
</style>
