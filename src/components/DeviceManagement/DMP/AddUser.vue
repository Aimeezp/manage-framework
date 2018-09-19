<template>
    <div class="addUser">
      <el-dialog
        :title="isAdd?'添加用户':'编辑用户'"
        :visible.sync="addUserVisible"
        :close-on-click-modal="false"
        width="30%"
        center
        class="dialog-self">
        <el-form :model="addUserFrom" :rules="rules" ref="addUserFrom" label-width="100px" class="addUserFrom">
          <el-form-item label="登录名：" prop="name">
            <el-input v-model="addUserFrom.name" placeholder="请输入登录名"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pwd">
            <el-input v-model="addUserFrom.pwd" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="addUserFrom.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="用户类型：" prop="accountType">
            <el-select v-model="addUserFrom.accountType" placeholder="请选择用户类型" @change="selectChange()">
              <el-option v-for="(item, index) in userTypeList"
                         :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型：" prop="deviceType" v-if="isType">
            <el-select v-model="addUserFrom.deviceType" placeholder="请选择设备类型">
              <el-option v-for="(item, index) in deviceTypeList"
                         :key="index"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="厂商名称：" prop="dmpMarker" v-if="isMaker">
            <el-select v-model="addUserFrom.dmpMarker" placeholder="请选择厂商名称" @change="makerChange">
              <el-option v-for="(item, index) in deviceMakerList"
                         :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回调地址：" prop="callbackUrl" v-if="isMaker">
            <el-input v-model="addUserFrom.callbackUrl" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitUserForm('addUserFrom')">保存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      addUserVisible: false,
      addUserFrom: {
        accountType: '',
        deviceType: '',
        name: '',
        pwd: '',
        email: '',
        groupId: '',
        dmpMarker: '',
        callbackUrl: '',
      },
      isMaker: false,
      isType: true,
      userTypeList: [
        {
          label: '项目',
          value: 0,
        },
        {
          label: '厂商',
          value: 1,
        },
        {
          label: '测试',
          value: 2,
        },
      ],
      deviceTypeList: [],
      deviceMakerList: [],
      makerLists: [],
      urlList: [],
      rules: {
        accountType: [
          { required: true, message: '请选择用户类型', trigger: 'change' },
        ],
        deviceType: [
          { required: false, message: '请选择设备类型', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        dmpMarker: [
          { required: true, message: '请选择厂商名称', trigger: 'change' },
        ],
      },
    };
  },
  props: {
    isAdd: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    open() {
      this.addUserVisible = true;
      const obj = Object.keys(this.addUserFrom);
      obj.map((item) => {
        this.addUserFrom[item] = '';
        return item;
      });
    },
    makerChange() {
      this.deviceMakerList.map((item) => {
        if (item.value === this.addUserFrom.dmpMarker) {
          this.addUserFrom.callbackUrl = item.callbackUrl;
        }
        return item;
      });
    },
    selectChange() {
      if (this.addUserFrom.accountType === 1) {
        window.vaApi.getDmpMakerAll().then((res) => {
          const { status, data } = res.data;
          // console.log(data);
          if (parseInt(status, 10) === 1) {
            this.makerLists = data;
            this.deviceMakerList = [];
            data.forEach((item) => {
              this.deviceMakerList.push({
                label: item.maker,
                value: item.dmpMarker,
                callbackUrl: item.callbackUrl,
              });
            });
          }
        });
        this.addUserFrom.dmpMarker = '';
        this.addUserFrom.callbackUrl = '';
        this.isMaker = true;
        this.isType = false;
      } else {
        this.isMaker = false;
        this.isType = true;
        this.addUserFrom.deviceType = '';
      }
    },
    addUserData() {
      window.vaApi.getAddUser().then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.deviceTypeList = [];
          data.forEach((item) => {
            this.deviceTypeList.push(item.deviceType);
          });
        }
      });
    },
    modifyUser(userId) {
      window.vaApi.getModifyUser(userId).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.addUserFrom = data;
        }
      });
    },
    submitUserForm(formName) {
      this.addUserFrom.groupId = this.$parent.userId;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addUserFrom.deviceType === '全部') {
            this.addUserFrom.deviceType = '  ';
          }
          const param = Object.assign({}, this.addUserFrom);
          window.vaApi.submitUser(param).then((res) => {
            const { status } = res.data;
            if (parseInt(status, 10) === 1) {
              this.addUserVisible = false;
              this.$message({
                type: 'success',
                message: '添加成功!',
              });
              this.$parent.getDmpUser({ nodeId: this.$parent.userId });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .addUser{
    .el-select{
      width:100%;
    }
    .el-dialog--center .el-dialog__body{
      padding-bottom: 0;
    }
  }

</style>
