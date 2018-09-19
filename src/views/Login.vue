<template>
  <div id="login-page">
    <div class="login-content">
      <div class="img">
        <div class="title">
          <!--<img class="icon" :src="loginIcon" alt="平台icon">-->
          <span>XXXX管理平台</span>
        </div>
        <div class="welcomText">您好，欢迎使用</div>
      </div>
      <div class="content">
        <div class="content-rel">
          <div class="title">登录您的账号</div>
          <div class="subtitle">请注意账号安全</div>
          <div class="form-div">
            <div :class="['user-div', {'focusStyle': addClass[0]}, {'waringStyle': waring[0] || showTip}]">
              <div class="iconfont-self">
                <i class="iconfont icon-zhanghao"></i>
              </div>
              <div class="line"></div>
              <div class="ipt-div">
                <input type="text"
                       placeholder="请输入账号"
                       v-model.trim="form.userName"
                       @blur="blurFun('user')"
                       @focus="focusFun('user')">
              </div>
            </div>
            <div :class="['user-div', {'focusStyle': addClass[1]}, {'waringStyle': waring[1] || showTip}]" style="margin-top: 26px">
              <div class="iconfont-self">
                <i class="iconfont icon-mima"></i>
              </div>
              <div class="line"></div>
              <div class="ipt-div">
                <input type="password"
                       placeholder="请输入密码"
                       v-model.trim="form.password"
                       @keyup.enter="onlineFun"
                       @blur="blurFun('pwd')"
                       @focus="focusFun('pwd')">
              </div>
            </div>
            <div class="err-tip">
              <el-checkbox v-model="checked">记住账号密码</el-checkbox>
              <span v-show="showTip" style="float: right;">{{errText}}</span>
            </div>
          </div>
          <el-button type="primary" class="online-btn" @click="onlineFun">登录</el-button>
        </div>
      </div>
    </div>
    <div class="footer">XXX公司</div>
  </div>
</template>

<script>
import { Local } from '../utils/storage';
import { userName, password } from '../storage/localStorage';
import loginicon from '../assets/images/login/whiteLogo.png';
import Utils from '../utils/utils';

export default {
  data() {
    return {
      addClass: [false, false],
      waring: [false, false],
      showTip: false,
      errText: '用户名或密码不能为空',
      loginIcon: loginicon,
      checked: true,
      form: {
        userName: '',
        password: '',
      },
      waringStyle: '#f56c6c',
      focusStyle: '#dcdfe6',
      userNameKey: userName,
      pwdKey: password,
    };
  },
  mounted() {
    if (Local.get(this.userNameKey)) this.form.userName = Utils.Decrypt(Local.get(this.userNameKey)[this.userNameKey]) || '';
    if (Local.get(this.pwdKey)) this.form.password = Utils.Decrypt(Local.get(this.pwdKey)[this.pwdKey]) || '';
    this.errText = '用户名或密码不能为空';
    this.addClass = false;
  },
  methods: {
    focusFun(type) {
      this.showTip = false;
      if (type === 'user') {
        this.addClass = [true, false];
      } else if (type === 'pwd') {
        this.addClass = [false, true];
      } else {
        this.addClass = [false, false];
      }
    },
    blurFun(type) {
      this.addClass = [false, false];
      if (type === 'user' && this.form.userName === '') {
        this.waring = [true, false];
      } else if (type === 'pwd' && this.form.password === '') {
        this.waring = [false, true];
      } else {
        this.waring = [false, false];
      }
    },
    onlineFun() {
      if (this.form.userName === '' || this.form.password === '') {
        this.errText = '用户名或密码不能为空';
        this.showTip = true;
        return;
      }
      this.showTip = false;

      window.vaApi.requestLogin(this.form).then((res) => {
        const { status, data } = res.data;
        if (Number(status) === 1) {
          if (this.checked) {
            const localUserObj = {};
            const localPwdObj = {};
            const userV = {};
            const pwdV = {};
            userV[this.userNameKey] = Utils.Encrypt(this.form.userName);
            pwdV[this.pwdKey] = Utils.Encrypt(this.form.password);
            localUserObj[this.userNameKey] = userV;
            localPwdObj[this.pwdKey] = pwdV;
            Local.set(localUserObj);
            Local.set(localPwdObj);
          }
          delete data.authorities;
          data.author = 'smoke,cover,environment,device,hydrant,dust,doorLock,geoMonitor,dustbin';
          this.$store.commit('SET_USERINFO', data);
          this.$router.push({ path: '/list' });
        } else {
          this.errText = '用户名或密码错误';
          this.showTip = true;
        }
      });
    },
  },
};

</script>

<style lang="scss">
  @import '~scss_vars';
  #login-page{
    $fontFaimly: PingFangTC-Medium;
    $color888: #888;

    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/images/login/bg.png") no-repeat center center;
    background-size: cover;
    display: flex;
    // 中间内容部分
    .login-content{
      flex: 1;
      margin: 92px 216px;
      display: flex;
      box-sizing: border-box;
      position: relative;
      .img,
      .content{
        min-height: 450px;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label,
      .el-checkbox__label{
        color: #888888;
        font-size: .7vw;
      }
      // 左侧图
      .img{
        width: 70%;
        background: url("../assets/images/login/login.png") no-repeat center center;
        background-size: cover;
        display: flex;
        position: relative;
        .title{
          flex: 1;
          margin-top: 62px;
          margin-left: 62px;
          font-family: $fontFaimly;
          font-size: 1.6vw;
          color: #FFFFFF;
          .icon{
            width: 74px;
            height: 74px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        .welcomText{
          font-family: $fontFaimly;
          font-size: 2.6vw;
          color: #FFFFFF;
          letter-spacing: 0;
          position: absolute;
          bottom: 64px;
          right: 63px;
        }
      }
      // 右侧登录信息
      .content{
        min-width: 320px;
        width: 30%;
        background-color: #fff;
        position: relative;
        .content-rel{
          width: 80%;
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          left: 50%;
         transform: translate(-50%, -50%);
          >div{
            width: 100%;
          }
          .title{
            text-align: center;
            font-family: $fontFaimly;
            font-size: 1.6vw;
            color: $color-primary;
          }
          .subtitle{
            text-align: center;
            font-family: PingFangTC-Regular;
            font-size: .7vw;// 14px
            color: $color888;
            margin-top: 10px;
          }
          // form 表单
          .form-div{
            /*margin: auto auto;*/
            margin-top: 1.2vw;// 46px
            div{
              box-sizing: border-box;
            }
            .user-div{
              display: flex;
              height: 50px;
              border: 1px solid;
              border-color: $color888;
              overflow: hidden;
              >div{
                line-height: 50px;
              }
              .iconfont-self{
                .iconfont{
                  color: $color888;
                  font-size: 1.6vw;
                }
              }
              .line{
                border-left: 1px solid $color888;
                height: 30px;
                margin: auto auto;
              }
              .ipt-div{
                margin-left: 2px;
                flex: 1;
                input{
                  height: 100%;
                  font-size: .8vw;
                  width: 100%;
                  border-width: 0;
                  text-indent: 4px;
                }
                input:focus{
                  outline:none;
                }
              }
            }
            .waringStyle{
              border-color: #f56c6c;
            }
            .focusStyle{
              border-color: #409eff;
            }
            .err-tip{
              margin-top: 10px;
              height: 20px;
              color: #F56362;
              font-size: .7vw;
            }
          }
          .online-btn{
            width: 100%;
            margin-top: 2vw;
            height: 50px;
            font-family: $fontFaimly;
            font-size: 1.6vw;// 24px
            color: #FFFFFF;
          }
        }
      }
    }
    // 页脚
    .footer{
      position: absolute;
      font-family: PingFangTC-Regular;
      font-size: 1vw;
      color: #D0D0D0;
      bottom: 30px;
      right: 0;
      left: 0;
      text-align: center;
    }
  }
</style>
