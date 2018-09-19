<template>
  <div id="batch-import-page">
    <!--breadcrumb-->
    <el-breadcrumb id="bread-self-class" separator-class="el-icon-arrow-left">
      <el-breadcrumb-item :to="{ path: '/device-maintain' }">设备维护</el-breadcrumb-item>
      <el-breadcrumb-item>批量导入</el-breadcrumb-item>
    </el-breadcrumb>
    <!--step-->
    <div class="step-div">
      <div class="step-k">
        <div v-for="(item, index) in stepTextList" :key="index">
          <div class="circle">{{item.num}}</div>
          <span class="text">{{item.text}}</span>
          <el-button @click="downLoadTemplate" v-if="item.hasBtn" plain class="btn">{{item.btnText}}</el-button>
        </div>
      </div>
    </div>
      <!--upload file-->
      <importOptionPage v-show="importIsShow" @receiveData="receivePreviewList"></importOptionPage>
      <!--preview file-->
      <previewTablePage v-show="!importIsShow" :previewList="previewList"></previewTablePage>
  </div>
</template>

<script>
import importOptionPage from './ImportOption';
import previewTablePage from './PreviewTable';

export default {
  name: 'batch-import',
  data() {
    return {
      // step config
      stepTextList: [
        {
          num: 1,
          text: '下载批量导入摸板',
          hasBtn: true,
          btnText: 'Excel模版',
        },
        {
          num: 2,
          text: '按文档要求填充数据',
          hasBtn: false,
        },
        {
          num: 3,
          text: '上传批量导入文档',
          hasBtn: false,
        },
      ],
      previewList: [],
      importIsShow: true,
    };
  },
  created() {
  },
  mounted() {

  },
  components: {
    importOptionPage,
    previewTablePage,
  },
  methods: {
    downLoadTemplate() {
      const that = this;
      window.vaApi.downloadTemplate().then((res) => {
        if (Number(res.status) !== Number(200)) {
          this.$message({
            message: '网络异常,请稍后重试',
            type: 'error',
          });
          return;
        }
        // 创建一个blob对象,file的一种
        const blob = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // 配置下载的文件名
        link.download = 'excel.xlsx';
        link.click();
        that.$message({
          type: 'success',
          message: '下载模板成功!',
        });
        // if (parseInt(status, 10) === 1) {
        //   that.$message({
        //     type: 'success',
        //     message: '下载模板成功!',
        //   });
        // } else {
        //   that.$message({
        //     type: 'error',
        //     message: '下载模板失败!',
        //   });
        // }
      });
    },
    receivePreviewList(data) {
      this.previewList = data.previewList;
      this.importIsShow = data.importIsShow;
    },
    cancelUploadFun() {
      this.$router.push('/device-maintain');
    },
  },
};
</script>

<style lang="scss">
@import "~scss_vars";

  #batch-import-page {
    flex: 1;
    $text666: #666;
    $space10px: 10px;
    $colorfff: #fff;
    overflow: hidden;
    /*position: absolute;*/
    /*top: 80px;*/
    /*left: 160px;*/
    /*right: 20px;*/
    /*bottom: 0;*/
    .el-button{
      height: 36px;
      line-height: .5px;
    }
    /* bread*/
    #bread-self-class {
      .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
        color: #3F3F3F;
        font-size: 16px;
        font-weight: normal;
        text-decoration: none;
        -webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
        transition: color .2s cubic-bezier(.645, .045, .355, 1);
      }
      .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link:hover{
        text-decoration: underline;
      }
      .el-breadcrumb__item:last-child .el-breadcrumb__inner,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        font-weight: 400;
        font-size: 16px;
        color: $text666;
        cursor: text;
      }
      .el-breadcrumb__separator {
        margin: 0 9px;
        font-weight: 700;
        color: #3F3F3F;
      }
    }
    /* step*/
    .step-div {
      width: 100%;
      height: 60px;
      background: $colorfff;
      margin-top: $space10px;
      margin-bottom: $space10px;
      padding-left: 20px;
      .step-k {
        width: 40%;
        min-width: 600px;
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          display: flex;
          align-items: center;
          > div.circle {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            margin-right: $space10px;
            border-radius: 20px;
            background: #DCE8F2;
            font-size: 16px;
            color: $color-primary;
          }
          .text {
            font-size: 12px;
            color: $text666;
          }
          .btn {
            margin-left: $space10px;
            border: 1px solid $color-primary;
            border-radius: 3px;
            font-size: 16px;
            color: #00A3EE;
          }
        }
      }
    }
    /* btn*/
    .upload-btn-div{
      width: 30%;
      min-width: 220px;
      margin: 30px auto 0 auto;
      .el-button.is-disabled,
      .el-button.is-disabled:focus,
      .el-button.is-disabled:hover {
        opacity: 0.5;
      }
      .el-button{
        border: 1px solid $color-primary;
        border-radius: 3px;
        font-size: 16px;
        width: 100px;
      }
      .el-button--default{
        color: $color-primary;
      }
      .el-button--primary{
        color: $colorfff;
      }
    }
  }
</style>
