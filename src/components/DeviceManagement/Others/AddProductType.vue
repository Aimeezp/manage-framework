<template>
    <el-dialog :title="dialogTypeTitle" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="30%" :center="true" class="dialog-self">
        <el-form :model="dialogTypeForm" :rules="rules" ref="subAdd" :label-width="formLabelWidth">
            <el-form-item label="设备类型(英文)：" prop="deviceType">
                <el-input v-model.trim="dialogTypeForm.deviceType" placeholder="请输入设备类型"></el-input>
            </el-form-item>
            <el-form-item label="类型名称(中文)：" prop="category">
                <el-input v-model.trim="dialogTypeForm.category" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item label="回调地址：" prop="callbackUrl">
                <el-input v-model.trim="dialogTypeForm.callbackUrl" placeholder="请输入回调地址"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveFun('subAdd')">保 存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  data() {
    const reg1 = '^[A-Za-z0-9:\\-\\/\\s]+$'; // only english
    const reg2 = '^[\u0391-\uFFE5\\s]+$'; // don't input chinese
    const reg3 = '^[a-zA-z]+://[A-Za-z0-9\\:\\?\\&\\-\\_\\.\\#\\/\\s]+$';// only InternetURL
    const validDeviceType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入设备类型'));
      } else if (!new RegExp(reg1).test(value)) {
        callback(new Error('请输入英文'));
      } else {
        callback();
      }
    };
    const validCategory = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类型名称'));
      } else if (!new RegExp(reg2).test(value)) {
        callback(new Error('请输入中文'));
      } else {
        callback();
      }
    };
    const validCallback = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入回调地址'));
      } else if (!new RegExp(reg3).test(value)) {
        callback(new Error('请输入有效的地址'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        deviceType: [
          {
            validator: validDeviceType, required: true, trigger: 'blur',
          },
          { max: 50, message: '最大长度50个字节' },
        ],
        category: [
          {
            validator: validCategory, required: true, trigger: 'blur',
          },
          { max: 25, message: '最大长度25个字符' },
        ],
        callbackUrl: [
          {
            validator: validCallback, required: true, trigger: 'blur',
          },
          { max: 100, message: '最大长度100个字节' },
        ],
      },
    };
  },
  props: {
    dialogTypeTitle: {
      required: true,
    },
    dialogTypeForm: {
      required: true,
    },
    oldDeviceType: {
      required: true,
    },
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
    },
    saveFun(formRef) {
      let params = {};
      if (this.dialogTypeTitle === '编辑产品类型') { // edit product
        params = {
          oldDeviceType: this.oldDeviceType,
          newDeviceType: this.dialogTypeForm.deviceType,
          category: this.dialogTypeForm.category,
          callbackUrl: this.dialogTypeForm.callbackUrl,
        };
      } else if (this.dialogTypeTitle === '添加产品类型') { // add product type
        params = {
          category: this.dialogTypeForm.category,
          callbackUrl: this.dialogTypeForm.callbackUrl,
          oldDeviceType: '',
          newDeviceType: this.dialogTypeForm.deviceType,
        };
      }
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          window.vaApi.addProductType(params).then(({ data: { status } }) => {
            if (parseInt(status, 10) === 1) {
              this.$message({
                type: 'success',
                message: '保存成功!',
              });
              this.dialogFormVisible = false;
              this.$parent.paginationFun();
            }
          });
        }
      });
    },
  },
};
</script>
