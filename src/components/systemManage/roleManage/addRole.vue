<template>
    <el-dialog class="dialog-self"
               :center="true"
               :title="title" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="describe">
                <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>
            <el-form-item label="角色状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择角色状态">
                    <el-option label="正常" value="normal"></el-option>
                    <el-option label="冻结" value="frozen"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色范围">
               <el-radio-group v-model="form.range">
                  <el-radio label="平台"></el-radio>
                  <el-radio label="项目"></el-radio>
                  <el-radio label="厂商"></el-radio>
                  <el-radio label="用户"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="功能权限" prop="func">
                <el-tree
                :data="funcData"
                show-checkbox
                node-key="id"
                ref="funcTree"
                :default-checked-keys="form.funcListArr"
                :props="defaultProps">
                </el-tree>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      dialogFormVisible: false,
      nowId: '',
      form: {
        name: '',
        describe: '',
        status: '',
        range: [],
        funcListArr: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        describe: [
          { required: false, message: '请输入描述', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入状态', trigger: 'change' },
        ],
        range: [
          { required: true, message: '请输入范围', trigger: 'change' },
        ],
        func: [
          { required: true, message: '请输入功能列表', trigger: 'change' },
        ],
      },
      funcData: [
        {
          id: 1,
          label: '系统管理',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1',
            }, {
              id: 10,
              label: '三级 1-1-2',
            }],
          }],
        }, {
          id: 2,
          label: '测试管理',
          children: [{
            id: 5,
            label: '二级 2-1',
          }, {
            id: 6,
            label: '二级 2-2',
          }],
        }, {
          id: 3,
          label: '数据管理',
          children: [{
            id: 7,
            label: '二级 3-1',
          }, {
            id: 8,
            label: '二级 3-2',
          }],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    open(title, currentMsg) {
      this.title = title;
      this.dialogFormVisible = true;
      if (title === '新建角色') {
        this.form = {
          name: '',
          describe: '',
          status: '',
          range: '',
          funcListArr: [],
        };
        // this.$refs.funcTree.setCheckedKeys([]);
      } else if (title === '编辑角色') {
        this.form = {
          name: currentMsg.roleName,
          describe: currentMsg.roleDescrib,
          status: currentMsg.roleStatus,
          range: currentMsg.range,
          funcListArr: currentMsg.funcListArr,
        };
        this.$refs.funcTree.setCheckedKeys(this.form.funcListArr);
      }
    },
    close() {
      this.dialogVisible = false;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            name: this.form.name,
            describe: this.form.describe,
            status: this.form.status,
            range: this.form.range,
            funcListArr: this.$refs.funcTree.getCheckedNodes(),
          };
          if (this.title === '新建角色') {
            window.vaApi.createRole(params).then((res) => {
              const { status } = res.data;
              if (parseInt(status, 10) === 1) {
                this.close();
                this.$message({
                  message: '新建成功！',
                  type: 'success',
                });
              }
            });
          } else if (this.title === '编辑角色') {
            window.vaApi.updataRole(params).then((res) => {
              const { status } = res.data;
              if (parseInt(status, 10) === 1) {
                this.close();
                this.$message({
                  message: '编辑成功！',
                  type: 'success',
                });
              }
            });
          }
        }
      });
    },
  },
};
</script>
<style>

</style>

