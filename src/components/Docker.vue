<template>
  <!-- 底部标签栏 -->
  <div class="docker">
    <!-- 下标index等于0显示蓝色，表示当前访问的页面 -->
    <div
      v-for="(item, index) in DockerList"
      :key="index"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex
      }"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const DockerList = [
      { icon: "&#xe602;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe637;", text: "购物车", to: { name: "CartList" } },
      { icon: "&#xe600;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe601;", text: "我的", to: { name: "Personal" } }
    ];
    return {
      DockerList
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";

.docker {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  padding: 0 0.18rem;
  box-sizing: border-box;
  color: $content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
