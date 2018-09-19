<template>
  <!--err tip-->
  <el-dialog
    style="min-width: 500px;"
    center
    id="upload-table-err-dialog"
    :title="title"
    :visible.sync="uploadTableDialogVisible"
    width="40%">
    <div class="errList">
      <div class="list-info" v-for="(item, index) in Object.keys(uploadErrList[0])" :key="index">
        <span>【报错行数{{item}}】：</span>
        <span v-for="(item2, index) in uploadErrList[0][item]" :key="index">
          {{item2}}
          <span v-if="index < uploadErrList[0][item].length-1">&nbsp;|&nbsp;</span>
        </span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button class="sureBtn" type="primary" @click="clickUploadErrDialogBtn">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'upload-err-dialog',
  data() {
    return {
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    uploadErrList: {
      type: Array,
      required: true,
      default() {
        return [{}];
      },
    },
    uploadTableDialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clickUploadErrDialogBtn() {
      this.$parent.uploadTableDialogVisible = false;
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
  #upload-table-err-dialog{
    overflow: hidden;
    min-width: 900px;
    /*overflow-x: scroll;*/
    .errList{
      overflow-y: scroll;
      min-width: 600px;
      .border-btm{
        border-bottom: 1px solid #ccc;
      }
      .list-info{
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
      }
    }
    .el-dialog__body{
      overflow: scroll;
    }
    .dialog-footer{
      .sureBtn{
        width: 140px;
        font-size: 16px;
      }
    }
  }
</style>
