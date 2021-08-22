<template>
  <!-- 主体 -->
  <div class="wrapper">
    <!-- 导航区域 -->
    <StaticPart />
    <!-- 商家店铺 -->
    <Nearby />
  </div>
  <!-- 底部tabbar -->
  <Docker :currentIndex="0" />
</template>

<script>
// 导入导航组件
import StaticPart from "./StaticPart.vue";
// 导入商家店铺组件
import Nearby from "./Nearby.vue";
// 导入底部标签栏
import Docker from "../../components/Docker.vue";
export default {
  name: "App",
  // 使用导入的组件
  components: {
    StaticPart,
    Nearby,
    Docker
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.3rem 0.18rem;
  overflow-y: auto;
}
</style>
