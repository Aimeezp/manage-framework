<template>
    <div class="newGronp">
      <el-dialog
        title="添加分组"
        :visible.sync="newGronpVisible"
        :close-on-click-modal="false"
        width="30%"
        center
        class="dialog-self">
        <el-form :model="newGronpFrom" :rules="rules" ref="newGronpFrom" label-width="100px" class="newGronpFrom">
          <!--<el-form-item label="父组名称：" prop="parentGroupId">-->
            <!--<el-select v-model="newGronpFrom.parentGroupId" placeholder="请选择父组名称">-->
              <!--<el-option v-for="(item, index) in parentNameList"-->
                         <!--:key="index"-->
                         <!--:label="item"-->
                         <!--:value="index+1"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="父组名称：" class="noStyle">
            <el-input v-model="newGronpFrom.parentGroupName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="子组名称：" prop="childGroupName">
            <el-input v-model="newGronpFrom.childGroupName" placeholder="请输入子组名称"></el-input>
          </el-form-item>
          <el-form-item label="子组说明：" prop="description">
            <el-input v-model="newGronpFrom.description" placeholder="请输入子组说明"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="newGronpVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitGronpForm('newGronpFrom')">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      newGronpVisible: false,
      newGronpFrom: {
        parentGroupName: '',
        childGroupName: '',
        description: '',
        parentGroupId: '',
      },
      parentNameList: [],
      rules: {
        parentGroupName: [
          { required: true, message: '', trigger: 'change' },
        ],
        childGroupName: [
          { required: true, message: '请输入子组名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入子组说明', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    open() {
      this.newGronpVisible = true;
      const obj = Object.keys(this.newGronpFrom);
      obj.map((item) => {
        this.newGronpFrom[item] = '';
        return item;
      });
    },
    addGronpData(gid, lable) {
      this.newGronpFrom.parentGroupName = lable;
      this.newGronpFrom.parentGroupId = gid;
    },
    submitGronpForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = Object.assign({}, this.newGronpFrom);
          window.vaApi.submitGronp(param).then((res) => {
            const { status, data } = res.data;
            if (parseInt(status, 10) === 1) {
              this.newGronpVisible = false;
              this.$message({
                type: 'success',
                message: '添加成功!',
              });
              this.$parent.getDmpList(1, data.id);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .newGronp{
    .el-select{
      width:100%;
    }
    .el-dialog--center .el-dialog__body{
      padding-bottom: 0;
    }
    .el-input.is-disabled .el-input__inner{
      background:none;
      border:none;
    }
  }

</style>
