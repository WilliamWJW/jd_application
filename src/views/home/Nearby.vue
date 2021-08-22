<template>
  <!-- 商家店铺 -->
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <!-- 使用商店信息组件  shopinfo -->
    <!-- router-link 跳转到商家详细页面  那么用router-link包裹，同事循环的数据也要放在link标签上-->
    <!-- v-bind:to:"`/shop/${item._id}`" 点击跳转后附带商店id -->
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
// 导入get请求方法
import { get } from "../../utils/request";
// 导入响应式引用
import { ref } from "vue";
// 导入商品组件
import ShopInfo from "../../components/Shopinfo.vue";
const useNearbyListEffect = () => {
  // 设置响应式数据
  const nearbyList = ref([]);
  // 获取请求的数据
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    // 判断是否为0并且长度大于1
    if (result.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    }
  };
  // 返回到外部
  return { nearbyList, getNearbyList };
};
export default {
  name: "Nearby",
  // 使用商品组件
  components: {
    ShopInfo
  },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    // 显示商家店铺
    getNearbyList();
    // 获取到数据返回外部
    return {
      nearbyList
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
// 附件店铺
.nearby {
  &__title {
    margin: 0.14rem 0 0.04em 0;
    font-size: 0.18rem;
    color: $content-fontcolor;
  }

  a {
    text-decoration: none;
  }
}
</style>
