<template>
  <div class="newDevice">
    <el-dialog
      title="新建设备"
      :visible.sync="newDeviceVisible"
      :close-on-click-modal="false"
      width="40%"
      top="3vh"
      center
      class="dialog-self">
      <Details
        v-if="isForm"
        :detailsForm="detailsForm"
        :coorList="coorList"
        :rules="rules"
        ref="detailsForm"
        :selectListData="selectListData"
      ></Details>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Details from './Details';

export default {
  data() {
    return {
      newDeviceVisible: false,
      Detail: true,
      Log: false,
      isForm: true,
      selectListData: [],
      detailsForm: {
        projectName: '',
        projectId: '',
        serialNumber: '',
        deviceType: '',
        maker: '',
        productModel: '',
        deviceNum: '',
        category: '',
        msisdn: '',
        imsi: '',
        province: '',
        city: '',
        district: '',
        addr: '',
        lng: '',
        lat: '',
        coordinateType: '',
        remak: '',
        projectList: [],
        deviceTypeList: [],
        deviceMakerList: [],
        deviceModalList: [],
        provinceList: [],
        cityList: [],
        countryList: [],
      },
      provinceId: '',
      cityId: '',
      coorList: [
        {
          label: 'wgs84',
          value: 1,
        },
        {
          label: 'gcj02',
          value: 2,
        },
        {
          label: 'bd09',
          value: 3,
        },
      ],
      rules: {
        projectId: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'change' },
        ],
        maker: [
          { required: true, message: '请选择设备厂商', trigger: 'change' },
        ],
        productModel: [
          { required: true, message: '请选择设备型号', trigger: 'change' },
        ],
        serialNumber: [
          { required: true, message: '请输入设备IMEI号', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        province: [
          { message: '请选择省', trigger: 'change' },
        ],
        city: [
          { message: '请选择市', trigger: 'change' },
        ],
        district: [
          { message: '请选择区', trigger: 'change' },
        ],
        addr: [
          { message: '请输入详细地址', trigger: 'blur' },
          { max: 30, message: '最大长度30个字符' },
        ],
        lng: [
          { message: '请输入经度', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        lat: [
          { message: '请输入纬度', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        deviceNum: [
          { message: '请输入厂商设备号', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        msisdn: [
          { message: '请输入MSIDN', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        imsi: [
          { message: '请输入IMSI', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' },
        ],
        remak: [
          { message: '请输入备注信息', trigger: 'blur' },
          { max: 40, message: '最大长度40个字符' },
        ],
      },
    };
  },
  components: {
    Details,
  },
  mounted() {
  },
  methods: {
    open() {
      this.newDeviceVisible = true;
      this.$nextTick(() => {
        this.$refs.detailsForm.$children[0].clearValidate();
      });
      const obj = Object.keys(this.detailsForm);
      obj.map((item) => {
        this.detailsForm[item] = '';
        return item;
      });
    },
    close() {
      this.newDeviceVisible = false;
      this.$refs.detailsForm.$children[0].resetFields();
    },
    getProvinceList() {
      window.vaApi.getProvinceList().then((res) => {
        this.detailsForm.provinceList = res.data.data;
      });
    },
    getCityList() {
      const param = {};
      param.id = this.provinceId;
      window.vaApi.getCityList(param).then((res) => {
        this.detailsForm.cityList = res.data.data;
      });
    },
    getCountryList() {
      const param = {};
      param.id = this.cityId;
      window.vaApi.getCountryList(param).then((res) => {
        this.detailsForm.countryList = res.data.data;
      });
    },
    proviceFuns(a) {
      this.detailsForm.province = this.detailsForm.provinceList.filter(item => item.id === a)[0].name;
      this.detailsForm.city = '';
      this.detailsForm.district = '';
      if (a) {
        this.provinceId = a;
        this.getCityList();
      }
    },
    cityFuns(a) {
      this.detailsForm.city = this.detailsForm.cityList.filter(item => item.id === a)[0].name;
      this.detailsForm.district = '';
      if (a) {
        this.cityId = a;
        this.getCountryList();
      }
    },
    districtFuns(a) {
      this.detailsForm.district = this.detailsForm.countryList.filter(item => item.id === a)[0].name;
    },
    // addDevice
    addDevice() {
      // this.cityId = this.detailsForm.city;
      const param = {};
      window.vaApi.addDevice(param).then((res) => {
        const { status, data } = res.data;
        if (parseInt(status, 10) === 1) {
          this.selectListData = data || [];
          this.detailsSelect();
        }
      });
      this.getProvinceList();
    },
    detailsSelect() {
      const {
        projectId, deviceType, maker, productModel,
      } = this.detailsForm;
      const projectSet = new Set();
      const deviceTypeSet = new Set();
      const deviceMakerSet = new Set();
      const deviceModalSet = new Set();
      this.selectListData.forEach((v) => {
        projectSet.add(v.projectId);
        deviceTypeSet.add(v.deviceType);
        deviceMakerSet.add(v.maker);
        deviceModalSet.add(v.productModel);
      });
      // format selector data
      // if (!projectId) {
      // console.log('projectId', projectId);
      this.detailsForm.projectList = [];
      projectSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].projectId &&
            (!maker || maker === this.selectListData[i].maker) &&
            (!deviceType || deviceType === this.selectListData[i].deviceType) &&
            (!productModel || productModel === this.selectListData[i].productModel)) {
            this.detailsForm.projectList.push({
              label: this.selectListData[i].projectName,
              value: v,
            });
            break;
          }
        }
      });
      if (this.detailsForm.projectList.length < 1) {
        this.detailsForm.projectId = '';
        this.detailsForm.projectName = '';
      }
      // }
      // if (!deviceType) {
      // console.log('deviceType', deviceType);
      this.detailsForm.deviceTypeList = [];
      deviceTypeSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].deviceType &&
            (!maker || maker === this.selectListData[i].maker) &&
            (!projectId || projectId === this.selectListData[i].projectId) &&
            (!productModel || productModel === this.selectListData[i].productModel)) {
            this.detailsForm.deviceTypeList.push({
              label: this.selectListData[i].category,
              value: v,
            });
            break;
          }
        }
      });
      if (this.detailsForm.deviceTypeList.length < 1) {
        this.detailsForm.deviceType = '';
      }
      // }

      // if (!maker) {
      // console.log('maker', maker);
      this.detailsForm.deviceMakerList = [];
      deviceMakerSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].maker &&
            (!deviceType || deviceType === this.selectListData[i].deviceType) &&
            (!projectId || projectId === this.selectListData[i].projectId) &&
            (!productModel || productModel === this.selectListData[i].productModel)) {
            this.detailsForm.deviceMakerList.push({
              label: v,
              value: v,
            });
            break;
          }
        }
      });
      if (this.detailsForm.deviceMakerList.length < 1) {
        this.detailsForm.maker = '';
      }
      // }
      // if (!productModel) {
      // console.log('productModel', productModel);
      this.detailsForm.deviceModalList = [];
      deviceModalSet.forEach((v) => {
        for (let i = 0; i < this.selectListData.length; i += 1) {
          if (v === this.selectListData[i].productModel &&
            (!deviceType || deviceType === this.selectListData[i].deviceType) &&
            (!projectId || projectId === this.selectListData[i].projectId) &&
            (!maker || maker === this.selectListData[i].maker)) {
            this.detailsForm.deviceModalList.push({
              label: v,
              value: v,
            });
            break;
          }
        }
      });

      if (this.detailsForm.deviceModalList.length < 1) {
        this.detailsForm.productModel = '';
      }
      // }
      // console.log('projectList', JSON.stringify(this.detailsForm.projectList));
      // console.log('deviceTypeList', JSON.stringify(this.detailsForm.deviceTypeList));
      // console.log('deviceMakerList', JSON.stringify(this.detailsForm.deviceMakerList));
      // console.log('deviceModalList', JSON.stringify(this.detailsForm.deviceModalList));
    },
    submitForm() {
      this.$refs.detailsForm.$children[0].validate((valid) => {
        if (valid) {
          const param = Object.assign({}, this.detailsForm);
          window.vaApi.submitDeviceInfo(param).then((res) => {
            const { status } = res.data;
            if (parseInt(status, 10) === 1) {
              this.newDeviceVisible = false;
              this.$message({
                type: 'success',
                message: '添加成功!',
              });
              this.$parent.getList();
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
  @import "~scss_vars";

  .newDevice {
    .el-dialog--center .el-dialog__body {
      padding: 0 30px;
    }
  }
</style>
