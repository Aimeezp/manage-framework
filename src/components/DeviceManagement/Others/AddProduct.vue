<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="30%" :center="true" class="dialog-self">
        <el-form :model="dialogForm" :label-width="formLabelWidth" ref="addProductRef" :rules="rules">
            <el-form-item label="设备厂商" prop="maker">
                <el-select @change = "changeMaker" v-model="dialogForm.maker" placeholder="请选择厂商" :disabled="dialogTitle==='编辑产品'">
                    <el-option v-for="(item,index) in dialogMakerData" :key="index" :label="item" :value="item"></el-option>
                    <el-option label="新设备厂商" value="addMewMaker"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="newMaker" v-if="dialogForm.maker==='addMewMaker'">
                <el-input v-model.trim="dialogForm.newMaker" placeholder="请输入厂商名称"></el-input>
            </el-form-item>
            <el-form-item label="厂商回调" prop="dmpCallBack">
              <el-input :disabled="dialogForm.maker!=='addMewMaker'" v-model.trim="dialogForm.dmpCallBack" placeholder="请输入厂商callBack"></el-input>
            </el-form-item>
            <el-form-item label="设备型号" prop="productModel">
                <el-input v-model.trim="dialogForm.productModel" placeholder="请输入设备型号"></el-input>
            </el-form-item>
            <el-form-item label="DMP厂商(英文和数字)" prop="dmpMarker">
                <el-input v-model.trim="dialogForm.dmpMarker" placeholder="请输入maker"></el-input>
            </el-form-item>
            <el-form-item label="DMP型号(英文和数字)" prop="dmpModel">
                <el-input v-model.trim="dialogForm.dmpModel" placeholder="请输入model"></el-input>
            </el-form-item>
            <el-form-item label="DMP标签(英文和数字)" prop="tag">
                <el-input v-model.trim="dialogForm.tag" placeholder="请输入tag"></el-input>
            </el-form-item>
            <el-form-item label="设备协议" prop="protocol">
                <el-select v-model="dialogForm.protocol" placeholder="请选择">
                    <el-option label="SHCU_NB" value="SHCU_NB"></el-option>
                    <el-option label="SHCU_TCP" value="SHCU_TCP"></el-option>
                    <el-option label="SHCU_UDP" value="SHCU_UDP"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备资源路径" prop="resources">
                <el-select v-model="dialogForm.resources" placeholder="请选择">
                    <el-option label="uplinkMsg/0/data" value="uplinkMsg/0/data"></el-option>
                    <el-option label="uplinkMsg/1/data" value="uplinkMsg/1/data"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备状态" prop="deviceStatus">
                <el-select v-model="dialogForm.deviceStatus">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="0"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="saveFun('addProductRef')">保 存</el-button>
        </div>
    </el-dialog>
</template>
<script>
// import bus from '';
export default {
  data() {
    const reg1 = '^[A-Za-z0-9:\\-\\/\\s]+$'; // only english
    const reg2 = '^[\u0391-\uFFE5\\s]+$'; // don't input chinese
    const reg3 = '^[a-zA-z]+://[A-Za-z0-9\\:\\?\\&\\-\\_\\.\\#\\/\\s]+$';// only InternetURL
    const validDmp = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容'));
      } else if (!new RegExp(reg1).test(value)) {
        callback(new Error('请输入英文'));
      } else {
        callback();
      }
    };
    const validNewMaker = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入厂商'));
      } else if (!new RegExp(reg2).test(value)) {
        callback(new Error('请输入中文'));
      } else {
        callback();
      }
    };
    const validCallback = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类型名称'));
      } else if (!new RegExp(reg3).test(value)) {
        callback(new Error('请输入有效地址'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: '160px',
      rules: {
        maker: [
          {
            required: true, trigger: 'change',
          },
        ],
        newMaker: [{
          validator: validNewMaker, required: true, trigger: 'blur',
        }, { max: 25, message: '最大长度25个字符' },
        ],
        dmpCallBack: [
          {
            validator: validCallback, required: true, trigger: 'blur',
          },
          { max: 100, message: '最大长度100个字节' },
        ],
        productModel: [
          {
            validator: validDmp, required: true, trigger: 'blur',
          },
          { max: 50, message: '最大长度50个字节' },
        ],
        tag: [
          {
            validator: validDmp, required: true, trigger: 'blur',
          },
          { max: 50, message: '最大长度50个字节' },
        ],
        dmpMarker: [
          {
            validator: validDmp, required: true, trigger: 'blur',
          },
          { max: 50, message: '最大长度50个字节' },
        ],
        dmpModel: [
          {
            validator: validDmp, required: true, trigger: 'blur',
          },
          { max: 50, message: '最大长度50个字节' },
        ],
        deviceStatus: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
        protocol: [
          { required: true, message: '请选择设备协议', trigger: 'change' },
        ],
        resources: [
          { required: true, message: '请选择设备资源路径', trigger: 'change' },
        ],
      },
    };
  },
  props: {
    dialogTitle: {
      required: true,
    },
    dialogForm: {
      required: true,
    },
    dialogTypeId: {
      required: true,
    },
    dialogMakerData: {
      required: true,
    },
    ldMaker: {
      required: true,
    },
  },
  watch: {
    dialogTypeId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dialogForm.maker = '';
        this.dialogForm.dmpCallBack = '';
      }
    },
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
      this.$refs.addProductRef.resetFields();
    },
    changeMaker(val) {
      if (val === 'addMewMaker') {
        this.dialogForm.dmpCallBack = '';
      } else {
        this.dialogForm.dmpCallBack = this.ldMaker[val][0].dmpCallBack;
      }
    },
    saveFun(formRef) {
      let params = {};
      if (this.dialogTitle === '编辑产品') { // edit product
        params = {
          dmpMarker: this.dialogForm.dmpMarker,
          dmpModel: this.dialogForm.dmpModel,
          tag: this.dialogForm.tag,
          deviceStatus: this.dialogForm.deviceStatus,
          protocol: this.dialogForm.protocol,
          resources: this.dialogForm.resources,
          typeId: this.dialogTypeId, // from father
          oldMaker: this.dialogForm.oldMaker,
          oldProductModel: this.dialogForm.oldProductModel,
          newMaker: this.dialogForm.maker,
          newProductModel: this.dialogForm.productModel,
          dmpCallBack: this.dialogForm.dmpCallBack,
        };
      } else if (this.dialogTitle === '添加产品') { // add product
        params = {
          dmpMarker: this.dialogForm.dmpMarker,
          dmpModel: this.dialogForm.dmpModel,
          tag: this.dialogForm.tag,
          deviceStatus: this.dialogForm.deviceStatus,
          protocol: this.dialogForm.protocol,
          resources: this.dialogForm.resources,
          typeId: this.dialogForm.typeId, // from father
          oldMaker: '',
          oldProductModel: '',
          newMaker: this.dialogForm.newMaker,
          newProductModel: this.dialogForm.productModel,
          dmpCallBack: this.dialogForm.dmpCallBack,
        };
      }
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          window.vaApi.addProduct(params).then(({ data: { status } }) => {
            if (parseInt(status, 10) === 1) {
              this.$message({
                type: 'success',
                message: '保存成功!',
              });
              this.dialogFormVisible = false;
              this.$parent.getProDetailList();
            }
          });
        }
      });
    },
  },
};
</script>
