<template>
  <el-aside width="140px" id="navAside">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
      <template v-for="(item, index) in routers" v-if="item.show">
        <el-menu-item v-if="!item.hasSub" class="menuItem" :index="(index).toString()" :key="index">
          <span slot="title">
            <router-link :to="item.children[0].path">{{item.children[0].title}}</router-link>
            <i class="msg" v-if="item.children[0].haveMsg"></i>
          </span>
        </el-menu-item>
        <el-submenu v-else :index="(index).toString()" class="menuItem" :key="index">
          <template slot="title">
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="menuItem"
                          v-for="(subMenu, subIndex) in item.children"
                          :index="`${(index).toString()}-${(subIndex).toString()}`" :key="subIndex">
              <router-link :to="subMenu.path">{{subMenu.title}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '2',
      routers: this.$router.options.routes,
    };
  },
  created() {
    // judge which sub menu open
    const { path } = this.$route;
    for (let i = 0; i < this.routers.length; i += 1) {
      if (this.routers[i].hasSub) {
        for (let j = 0; j < this.routers[i].children.length; j += 1) {
          if (path === this.routers[i].children[j].path) {
            this.defaultActive = `${i}-${j}`;
            break;
          }
        }
      }
    }
  },
};
</script>


<style lang="scss">
@import "~scss_vars";

$navWidth: 140px;
$bgColor: #005892;

#navAside {
  background-color: $bgColor;
  text-align: center;
  position: relative;

  /*菜单  start*/
  .el-menu {
    border: 0;
    /*add*/
    .el-menu-item-group__title {
      display: none;
    }
    .el-menu-item.is-active {
      color: #fff;
    }
    .el-submenu__title {
      color: #9dc7e1;
    }
    /*add over*/
    // 不显示箭头
    .el-submenu__icon-arrow {
      color: #9dc7e1;
    }
    .topMenu {
      border-bottom: 1px solid $bgColor;
      &,
      .el-submenu__title {
        padding: 0 !important;
      }
      .iconfont,
      > a,
      span {
        font-size: 16px;
        color: #fff;
      }
      > a,
      span {
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .menuItem {
      padding: 0 !important;
      width: $navWidth;
      min-width: $navWidth;
      a {
        color: #9dc7e1;
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
      }
      .router-link-active {
        color: #fff;
        background-color: $color-primary;
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          width: 0;
          height: 0;
          border-top: 7px solid transparent;
          border-right: 7px solid $color-body;
          border-bottom: 7px solid transparent;
          transform: translateY(-50%);
        }
      }
      .msg {
        position: absolute;
        top: 50%;
        right: 27px;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff4b3c;
      }
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-submenu__title:focus,
    .el-submenu__title:hover,
    .el-menu-item.is-active,
    .menuItem {
      background-color: $bgColor;
    }
  }
  /*菜单  end*/
}
</style>
