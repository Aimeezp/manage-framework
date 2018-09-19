<template>
  <section class="dmpMaintainCls">
    <el-form :inline="true" :model="searchForm" class="dmpSearch">
      <el-form-item>
        <el-input clearable class="searchKey searchInput" v-model.trim="searchForm.groupNameKey" @keyup.enter.native="getDmpList(1)" placeholder="DMP分组">
          <template slot="append">
            <div @click="getDmpList(1)">检索</div>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <div class="dmpTable tableList" v-loading="dmpTableLoading">
      <div class="tableTitle">
        <span>DMP分组</span>
        <span>分组说明</span>
        <span>操作</span>
      </div>
      <el-tree class="tableTree" :data="dmpTableData" :props="defaultProps"  @node-click="getDmpUser" :expand-on-click-node="false" ref="tableTreeRef"
               :default-expanded-keys="expandArray"
               node-key="nodeId">
        <div class="dmpTableRow" slot-scope="{ node, data }" @click="markCurrent" :data-id="data.nodeId">
          <div :class="{rootNode:data.rootNode}">{{ node.label }}</div>
          <div :style="{marginLeft: data.offset?`-${data.offset}px`:0}">{{ data.desc }}</div>
          <div class="tableBtnGroup">
            <span class="tableBtn" @click.stop="addGronp(data.nodeId, node.label)">添加分组</span>
            <span class="tableBtn" @click.stop="addUsers(data.nodeId)">添加用户</span>
            <span class="tableBtn" @click.stop="subscribeClick(data)">数据订阅</span>
            <span class="tableBtn btnDisable">删除</span>
          </div>
        </div>
      </el-tree>
      <pagination :flag="showSizes" ref="turnPage1" :total="dmpTotal" :paginationFun="getDmpList"></pagination>
    </div>

    <el-table :data="userTableData" stripe class="tableList" height="340" v-loading="userTableLoading">
      <el-table-column label="DMP账户" align="center" prop="accountName">
      </el-table-column>
      <el-table-column label="类型" align="center" prop="accountType">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="tableBtnGroup">
            <span class="tableBtn btnDisable">编辑</span>
            <span class="tableBtn btnDisable">停用</span>
            <span class="tableBtn btnDisable">启用</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination :flag="showSizes" ref="turnPage2" :total="userTotal" :paginationFun="getDmpUserList"></pagination>

    <!--subscribe info dialog-->
    <subscribeInfo ref="subscribeInfo"></subscribeInfo>
    <!--add / modify subscribe dialog-->
    <addModifyPage></addModifyPage>
    <newGronp ref="newGronp"></newGronp>
    <addUser ref="addU" :isAdd="isAdd"></addUser>
  </section>
</template>

<script>
import pagination from '@/components/Pagination';
import subscribeInfo from '../../components/DeviceManagement/DMP/DataSubscribe/SubscribeInfo';
import addModifyPage from '../../components/DeviceManagement/DMP/DataSubscribe/addModify';
import newGronp from '../../components/DeviceManagement/DMP/NewGronp';
import addUser from '../../components/DeviceManagement/DMP/AddUser';

const treeLeft = 18;

export default {
  data() {
    return {
      title: '添加订阅',
      searchForm: {
        groupNameKey: '',
      },
      dmpTableLoading: false,
      dmpTableData: [],
      defaultProps: {
        children: 'nodes',
        label: 'nodeName',
      },
      dmpTotal: 1,
      groupId: 0,
      userTableLoading: false,
      userTableData: [],
      userTotal: 1,
      isAdd: true,
      showSizes: false,
      userId: '',
      nowRowData: '',
      expandArray: [],
      nodeSELECT: [],
      gid: '',
    };
  },
  components: {
    pagination,
    subscribeInfo,
    addModifyPage,
    newGronp,
    addUser,
  },
  mounted() {
    this.getDmpList();
  },
  methods: {
    subscribeClick(data1) {
      this.groupId = data1.nodeId;
      this.nowRowData = data1;
      this.userTableLoading = true;
      const param = Object.assign({}, this.searchForm);
      param.currentPage = 1;
      param.pageSize = this.$refs.turnPage2.pageSize;
      param.dmpGroupId = this.groupId;
      this.userTableLoading = true;
      window.vaApi.getDmpUserList(param).then(({ data: { status, data } }) => {
        this.userTableLoading = false;
        if (parseInt(status, 10) === 1) {
          this.userTableData = data.list || [];
          this.userTotal = data.total;
          this.$refs.subscribeInfo.openSubscribeInfo(this.nowRowData);
          // setTimeout(() => this.$refs.subscribeInfo.openSubscribeInfo(this.nowRowData), 10);
        }
      });
      // this.getDmpUserList();
    },
    // mark dmp group table row offset
    markOffset(arr, i) {
      arr.forEach((v) => {
        const val = v;
        if (val.nodes && val.nodes.length > 0) {
          const offset = i * treeLeft;
          val.nodes.forEach((z) => {
            const nodeData = z;
            nodeData.offset = offset;
          });
          this.markOffset(val.nodes, i + 1);
        }
      });
    },
    // get dmp group
    getDmpList(currentPage = 1, dataGroup) {
      const param = Object.assign({}, this.searchForm);
      param.currentPage = currentPage;
      param.pageSize = this.$refs.turnPage1.pageSize;
      this.dmpTableLoading = true;
      window.vaApi.getDmpList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.dmpTableLoading = false;
          this.dmpTableData = data.list || [];
          this.dmpTotal = data.total;
          // handle dmp group table data judge each line css
          if (this.dmpTableData.length > 0) {
            // mark root node
            this.dmpTableData.forEach((v) => {
              const val = v;
              val.rootNode = true;
            });
            // mark offset
            this.markOffset(this.dmpTableData, 1);
          }
          // clear dmp user data
          this.userTableData = [];
          this.$nextTick(() => {
            this.expandArray.push(this.gid);
            setTimeout(() => {
              const content = document.querySelectorAll('.tableTree .dmpTableRow');
              content.forEach((v) => {
                if (parseInt(dataGroup, 10) === parseInt(v.attributes[0].nodeValue, 10)) {
                  setTimeout(() => {
                    document.querySelector('.tableTree').scrollTop = v.offsetTop;
                  });
                  v.click();
                  // alert(v.offsetTop);
                }
              });
            });
          });
        }
      });
    },
    getDmpUser({ nodeId }) {
      this.groupId = nodeId;
      this.getDmpUserList();
    },
    // get dmp account
    getDmpUserList(currentPage = 1) {
      const param = Object.assign({}, this.searchForm);
      param.currentPage = currentPage;
      param.pageSize = this.$refs.turnPage2.pageSize;
      param.dmpGroupId = this.groupId;
      this.userTableLoading = true;
      window.vaApi.getDmpUserList(param).then(({ data: { status, data } }) => {
        if (parseInt(status, 10) === 1) {
          this.userTableLoading = false;
          this.userTableData = data.list || [];
          this.userTotal = data.total;
        }
      });
    },
    findParentNode(dom, className) {
      const findNode = (d) => {
        if (d.classList.contains(className)) {
          return d;
        }
        return null;
      };
      let targetDom;
      let currDom = dom;
      let i = 0;
      while (!targetDom) {
        i += 1;
        if (i > 10) {
          break;
        }
        currDom = currDom.parentNode;
        targetDom = findNode(currDom);
      }
      return targetDom;
    },
    markCurrent(e) {
      // remove class 'currNode'
      const currDom = this.$refs.tableTreeRef.$el.querySelector('.currNode');
      if (currDom) {
        currDom.classList.remove('currNode');
      }
      this.findParentNode(e.target, 'el-tree-node__content').classList.add('currNode');
    },
    addGronp(gid, lable) {
      this.$refs.newGronp.open();
      this.$refs.newGronp.addGronpData(gid, lable);
      this.gid = gid;
    },
    addUsers(userID) {
      this.$refs.addU.open();
      this.$refs.addU.addUserData();
      this.isAdd = true;
      this.userId = userID;
    },
    modifyUser(userID) {
      this.$refs.addU.addUserVisible = true;
      this.$refs.addU.modifyUser(userID);
      this.isAdd = false;
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

.dmpMaintainCls {
  /* search start */
  .dmpSearch {
    .searchKey {
      width: 700px;
    }
    .connectText {
      display: inline-block;
      margin-right: 10px;
      height: 40px;
      line-height: 40px;
      width: 4px;
      text-align: center;
    }
  }
  /* search end */

  .dmpTable {
    .tableTitle {
      background-color: $color-bg;
      color: #333;
      display: flex;
      font-weight: 700;
      padding: 12px 0 12px 32px;
      > span {
        flex: 1;
      }
    }
    .tableTree {
      max-height: 290px;
      overflow: auto;
      .dmpTableRow {
        display: flex;
        width: 100%;
        padding: 12px 0;
        .rootNode {
          color: $color-primary;
          font-weight: bold;
        }
        > div {
          flex: 1;
        }
      }
      .el-tree-node__content {
        height: auto;
      }
      .el-tree-node__expand-icon {
        font-size: 20px;
      }
      .el-tree-node__content:hover,
      .currNode {
        background-color: #CBE5F6;
      }
    }
  }
}
</style>
