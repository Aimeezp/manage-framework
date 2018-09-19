<template>
  <el-container ref="homeRef" class="homeContainer">
    <public-nav></public-nav>
    <el-container class="rightHomeContainer">
      <!--header-->
      <el-header class="homeHeader">
        <public-header></public-header>
      </el-header>
      <!--main-->
      <el-main class="homeMain">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Nav from '../components/Nav';
import Header from '../components/Header';

export default {
  components: {
    'public-nav': Nav,
    'public-header': Header,
  },
};
</script>

<style lang="scss" scoped>
@import "~scss_vars";
.homeContainer {
  min-height: 100%;
  .rightHomeContainer {
    min-width: $min-width;
    .homeHeader {
      background-color: #fff;
    }
    .homeMain {
      overflow: visible;
    }
  }
}
</style>
