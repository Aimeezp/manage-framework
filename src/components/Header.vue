<template>
  <div id="appHeader">
    <div class="title">
      <!--<img src="/static/logo.png" /> -->
      XX管理平台
    </div>
    <div class="info">
      <headerMenu>
        <i class="iconfont icon-zhanghao"></i>
      </headerMenu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import headerMenu from './HeaderMenu';

export default {
  components: { headerMenu },
  computed: {
    ...mapGetters(['headName', 'userName', 'online']),
  },
};
</script>

<style lang="scss">
#appHeader {
  height: 60px;
  line-height: 60px;
  display: flex;
  .title {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333;
    > img {
      width: 28px;
      height: 31px;
      margin-right: 10px;
    }
  }
  .info {
    display: flex;
    > div {
      color: #6e7483;
      font-size: 15px;
      margin-right: 55px;
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 5px 0 15px;
      }
      .online {
        background-color: #7de50b;
      }
      .offline {
        background-color: #ff4b3c;
      }
    }
    .iconfont {
      font-size: 28px;
      color: #6e7483;
    }
    .icon-comments {
      margin-right: 33px;
    }
  }
}
</style>
