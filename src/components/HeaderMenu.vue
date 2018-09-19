<template>
  <span>
    <el-dropdown @command="handleCommand" class="cursor">
      <slot></slot>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePassword">修改登录密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-if="showMask" class="maskPop"></div>
    <changePassword ref="change"></changePassword>
  </span>
</template>

<script>
import changePassword from '../components/ChangePassword';

export default {
  name: 'headerMenu',
  data() {
    return {
      showMask: false,
    };
  },
  components: { changePassword },
  methods: {
    // 退出登录
    logout() {
      this.$confirm('确认退出吗?', '提示', {}).then(() => {
        this.$store.commit('CLEARINFO');
        this.$router.push('/introduce');
      });
    },
    // 下拉菜单点击事件处理
    handleCommand(command) {
      if (command === 'changePassword') {
        this.$refs.change.open();
      } else if (command === 'logout') {
        this.logout();
      }
    },
  },
};
</script>
<style>
.maskPop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2;
}
</style>

