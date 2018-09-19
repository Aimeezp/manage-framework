<template>
    <el-dialog title="消息回复" :visible.sync="dialogFormVisible" center width="30%">
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="消息主题" prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" :label-width="formLabelWidth">
                <div>
                    <p>测试工单故障处理完成，设备信息如下：</p>
                    <p>设备IMEI：{{msgInfo.serialNumber}}</p>
                    <p>设备品牌：{{msgInfo.maker}}</p>
                    <p>设备类型：{{msgInfo.deviceType}}</p>
                    <p>设备型号：{{msgInfo.model}}</p>
                </div>
            </el-form-item>
            <el-form-item label="处理结果" prop="result" :label-width="formLabelWidth">
              <el-radio-group v-model="form.result">
                <el-radio label="1">待定</el-radio>
                <el-radio label="2">完成</el-radio>
                <el-radio label="3">失败</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitFun()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        result: '',
      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入消息主题', trigger: 'blur' },
        ],
        result: [
          { required: true, message: '请输入处理结果', trigger: 'change' },
        ],
      },
    };
  },
  props: {
    msgInfo: {
      required: true,
    },
  },
  methods: {
    submitFun() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            id: this.msgInfo.id,
            topic: this.form.name,
            result: this.form.result,
          };
          window.vaApi.msgReply(params).then((res) => {
            const { status } = res.data;
            if (parseInt(status, 10) === 1) {
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
  },
};
</script>

