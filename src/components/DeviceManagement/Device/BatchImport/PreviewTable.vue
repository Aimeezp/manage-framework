<template>
    <div id="preview-table-page">
      <el-table class="tableList"
                :data="previewList" v-loading="tableLoading" stripe highlight-current-row>
        <el-table-column type="index" align="center" label="序号">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="项目名称" prop="projectName">
        </el-table-column>
        <el-table-column min-width="120" align="center" label="设备类型" prop="deviceType">
        </el-table-column>
        <el-table-column align="center" label="设备厂商" prop="maker">
        </el-table-column>
        <el-table-column align="center" label="设备型号" prop="productModel">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="IMEI" prop="serialNumber">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="厂商设备号" prop="serialNumber">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="MSISDN" prop="msisdn">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="IMSI" prop="imsi">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="经度" prop="lng">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="纬度" prop="lat">
        </el-table-column>
        <el-table-column min-width="240" label="安装地址" prop="addr">
        </el-table-column>
        <el-table-column min-width="140" align="center" label="备注" prop="remark">
        </el-table-column>
      </el-table>
      <div class="upload-btn-div">
        <el-button @click="$parent.cancelUploadFun();">取 消</el-button>
        <el-button type="primary" @click="clickUploadBtn">上传</el-button>
      </div>
      <!--err tip-->
      <uploadErrDialog title="批量导入设备错误" :uploadErrList="uploadErrList"
                       :uploadTableDialogVisible="uploadTableDialogVisible"></uploadErrDialog>
    </div>
</template>

<script>
import uploadErrDialog from './uploadErrDialog';

export default {
  name: 'preview-table',
  data() {
    return {
      uploadTableDialogVisible: false,
      uploadErrList: [{ }],
    };
  },
  props: {
    tableLoading: {
      type: Boolean,
      default: false,
    },
    previewList: {
      type: Array,
      default: function defaultFun() {
        return [];
      },
    },
  },
  components: {
    uploadErrDialog,
  },
  watch: {
    previewList: {
      handler: function watchFun() {
      },
      deep: true,
    },
  },
  methods: {
    clickUploadBtn() {
      const that = this;
      window.vaApi.uploadFile(that.previewList).then((res) => {
        const { status, data, message } = res.data;
        // const { message } = res;
        if (parseInt(status, 10) === 1) {
          that.$message({
            type: 'success',
            message: '上传成功!',
            duration: 2000,
          });
          setTimeout(() => that.$router.push({ path: '/device-maintain' }), 2000);
        } else if (data) {
          this.uploadErrList = data;
          this.uploadTableDialogVisible = true;
        } else {
          this.$message({
            type: 'error',
            message,
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
#preview-table-page{
}
</style>
