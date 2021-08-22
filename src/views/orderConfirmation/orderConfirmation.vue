<template>
  <div class="wrapper">
    <!-- 收货地址 -->
    <TopArea />
    <!-- 订单列表 -->
    <ProductsList />
    <!-- 结算区域 -->
    <Order />
  </div>
</template>

<script>
import TopArea from "./TopArea.vue";
import ProductsList from "./ProductsList.vue";
import Order from './Order.vue';
export default {
  components: { TopArea, ProductsList,Order},
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  overflow-y: scroll;
}
</style>
