<template>
  <div id="add-modify-page">
    <el-dialog class="dialog-self"
               :close-on-click-modal="false"
               :title="title"
               :center="true"
               :visible.sync="subscribeVisible"
               width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="addModifyRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型：" prop="subtype">
        <el-select v-model.trim="ruleForm.subtype" placeholder="请选择订阅类型">
          <el-option label="资源订阅" value="resources"></el-option>
          <el-option label="生命周期订阅" value="lifecycleEvents"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="用户：" prop="userName">
          <el-select v-model.trim="ruleForm.userName" @change="changeDmpUser" placeholder="请选择用户">
            <el-option v-for="item in dmpUserList" :label="item.accountName" :value="item.accountName" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型：" prop="deviceType">
          <el-select :disabled="nowAccountType === 1" v-model.trim="ruleForm.deviceType" @change="changeDeviceType" placeholder="请选择设备类型">
            <el-option
              v-for="item in deviceTypeList" :key="item.key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="DMP厂商：" prop="make">
          <!--:disabled="nowAccountType === 1"-->
          <el-select v-model.trim="ruleForm.make" @change="changeMaker" placeholder="请选择DMP厂商">
            <el-option v-for="item in makerList" :label="item" :value="item" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="DMP型号：" prop="model">
          <el-select :disabled="nowAccountType === 1" v-model.trim="ruleForm.model" placeholder="请选择DMP型号">
            <el-option v-for="item in modelList" :label="item" :value="item" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeAddModify">取消</el-button>
    <el-button type="primary" @click="submitForm">保存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-modify',
  data() {
    return {
      title: '添加订阅',
      groupName: '',
      subscribeVisible: false,
      dmpUserList: [],
      deviceTypeList: [],
      makerList: [],
      modelList: [],
      resultData: {},
      nowAccountType: '',
      ruleForm: {
        subtype: '',
        userName: '',
        deviceType: '',
        make: '',
        model: '',
      },
      rules: {
        subtype: [
          { required: true, message: '请选择订阅类型', trigger: 'change' },
        ],
        userName: [
          { required: true, message: '请选择用户', trigger: 'change' },
        ],
        make: [
          { required: true, message: '请选择DMP厂商', trigger: 'change' },
        ],
      },
    };
  },
  props: {
    userTableDataV: {
      type: Array,
    },
  },
  created() {
  },
  methods: {
    closeAddModify() {
      const that = this;
      that.subscribeVisible = false;
      setTimeout(() => {
        that.$parent.$children[5].openSubscribeInfo();
        that.resetForm();
      }, 300);
    },
    openAddModify(data) {
      const that = this;
      that.resetForm();
      that.nowAccountType = '';
      if (that.$parent.userTableData < 1) {
        that.$message({
          message: '该DMP分组暂无用户，请先添加用户！',
          type: 'warning',
          duration: 2000,
        });
        // setTimeout(() => {
        //   that.$parent.$children[5].openSubscribeInfo();
        // }, 3000);
        return;
      }
      if (data.title) {
        that.title = data.title;
      }
      if (data.groupName) {
        that.groupName = data.groupName;
      }
      if (data.dmpGroupId) {
        that.getDmpAllUserFun(data.dmpGroupId);
      }
      that.subscribeVisible = true;
      that.getDeviceTypeMakerModelFun();
      // that.dmpUserList = that.$parent.userTableData;
    },
    getDmpAllUserFun(groupId) {
      const that = this;
      window.vaApi.getDmpAllUser({ dmpGroupId: groupId }).then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          that.dmpUserList = data;
        }
      });
    },
    getDeviceTypeMakerModelFun() {
      const that = this;
      // that.deviceTypeList = Object.keys(that.resultData);
      window.vaApi.getDeviceTypeAndMakerAndModel().then(({ data: { data, status } }) => {
        if (parseInt(status, 10) === 1) {
          that.resultData = data;
          // that.deviceTypeList = Object.keys(data);
        }
      });
    },
    changeDmpUser() {
      const that = this;
      this.makerList = [];
      const dataList = that.$parent.userTableData;
      that.deviceTypeList = [];
      that.ruleForm.deviceType = '';
      this.ruleForm.make = '';
      this.ruleForm.model = '';
      for (let i = 0, len = dataList.length; i < len; i += 1) {
        if (dataList[i].accountName === that.ruleForm.userName) {
          that.nowAccountType = parseInt(dataList[i].accountType, 10);
          if (that.nowAccountType !== 1 && !dataList[i].dmpMarker) {
            that.deviceTypeList.push(dataList[i].deviceType);
            that.ruleForm.deviceType = dataList[i].deviceType;
            this.changeDeviceType();
          } else if (dataList[i].dmpMarker) {
            this.makerList.push(dataList[i].dmpMarker);
            this.ruleForm.make = dataList[i].dmpMarker;
          }
          break;
        }
      }
    },
    changeDeviceType() {
      this.ruleForm.make = '';
      this.ruleForm.model = '';
      if (this.nowAccountType !== 1 && Object.prototype.hasOwnProperty.call(this.resultData, this.ruleForm.deviceType)) {
        const makerModel = this.resultData[this.ruleForm.deviceType];
        this.makerList = Object.keys(makerModel);
      }
    },
    changeMaker() {
      this.ruleForm.model = '';
      if (this.nowAccountType !== 1 && Object.prototype.hasOwnProperty.call(this.resultData[this.ruleForm.deviceType], this.ruleForm.make)) {
        this.modelList = this.resultData[this.ruleForm.deviceType][this.ruleForm.make];
      }
    },
    submitForm() {
      const that = this;
      const param = that.ruleForm;
      param.groupName = that.groupName;
      param.accountType = that.nowAccountType;
      that.$refs.addModifyRuleForm.validate((valid) => {
        if (valid) {
          window.vaApi.addSubscribe(param).then(({ data: { status } }) => {
            if (parseInt(status, 10) === 1) {
              that.$message({
                type: 'success',
                message: '操作成功!',
                duration: 2000,
              });
              setTimeout(() => that.closeAddModify(), 2000);
            }
          });
        }
        return false;
      });
    },
    resetForm() {
      if (this.$refs.addModifyRuleForm) {
        this.$refs.addModifyRuleForm.resetFields();
      }
    },
  },
};
</script>

<style lang="scss">
  #add-modify-page{
    .dialog-self{
      min-width: 1200px;
    }
    .el-form-item__content{
      display: flex;
      .el-select{
        flex: 1;
      }
    }
  }
</style>
