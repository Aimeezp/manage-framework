<template>
  <el-dialog class="dialog-self"
             :close-on-click-modal="false"
              title="订阅详情"
             :center="true"
             :visible.sync="subscribeInfoVisible"
             width="60%">
    <el-table class="tableList"
              :data="previewList" v-loading="tableLoading" stripe highlight-current-row>
      <el-table-column align="center" min-width="280" label="订阅ID" prop="subscribeId">
      </el-table-column>
      <el-table-column align="center" label="用户名" prop="dmpUserId">
      </el-table-column>
      <el-table-column align="center" label="设备类型" prop="deviceType">
      </el-table-column>
      <el-table-column align="center" label="DMP厂商" prop="maker">
      </el-table-column>
      <el-table-column align="center" min-width="120" label="DMP型号" prop="model">
      </el-table-column>
      <el-table-column align="center" label="订阅类型" prop="subscribeType">
      </el-table-column>
      <el-table-column width="120" align="center" label="操作" prop="roleStatus">
        <template slot-scope="scope">
          <div class="tableBtnGroup">
            <!--@click="addSubscribe({ title: '编辑订阅', groupName: groupName })"-->
            <span class="tableBtn btnDisable">编辑</span>
            <span class="tableBtn" @click="delSubscribe(scope.row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
    <el-button @click="subscribeInfoVisible = false">取消</el-button>
    <el-button type="primary" @click="addSubscribe({ title: '添加订阅', groupName: groupName, dmpGroupId: subGroupId })">添加订阅</el-button>
  </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'subscribe-info',
  data() {
    return {
      previewList: [],
      subscribeInfoVisible: false,
      tableLoading: false,
      delSubscribeNowId: '',
      groupName: '',
      subGroupId: '',
    };
  },
  created() {
  },
  methods: {
    getSubscribeData() {
      const that = this;
      that.previewList = [];
      that.tableLoading = true;
      window.vaApi.getSubscribeList({ groupName: that.groupName }).then(({ data: { data, status } }) => {
        that.tableLoading = false;
        if (parseInt(status, 10) === 1) {
          that.previewList = data;
        }
      });
    },
    delSubscribe(row) {
      const that = this;
      this.delSubscribeNowId = row.subscribeId;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        window.vaApi.delSubscribe({ subscribeId: that.delSubscribeNowId }).then(({ data: { status } }) => {
          if (parseInt(status, 10) === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1000,
            });
            setTimeout(() => that.getSubscribeData(), 1000);
          }
        });
      }).catch(() => {
      });
    },
    closeSubscribeInfo() {
      this.subscribeInfoVisible = false;
    },
    openSubscribeInfo(row) {
      this.previewList = [];
      if (row) {
        this.subGroupId = row.nodeId;
        this.groupName = row.nodeName;
      }
      this.subscribeInfoVisible = true;
      if (this.$parent.userTableData.length >= 1) {
        this.getSubscribeData();
      }
    },
    addSubscribe(data) {
      const that = this;
      this.subscribeInfoVisible = false;
      setTimeout(() => that.$parent.$children[6].openAddModify(data), 300);
    },
  },
};
</script>
