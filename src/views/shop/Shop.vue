<!-- 商品店铺详情页 -->
<template>
  <div class="wrapper">
    <!-- 搜索框 -->
    <div class="search">
      <!-- 返回按钮 -->
      <div class="search__back iconfont" @click="handleBackClick">&#xe604;</div>
      <!-- 搜索框 -->
      <div class="search__content">
        <!-- 放大镜 -->
        <span class="search__content__icon iconfont">&#xe688;</span>
        <!-- 输入框 -->
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <!-- 设置 v-if="item.imgUrl" 当只有获取到imgurl才显示图片，没有获取则不显示 -->
    <shop-info :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
// 导入商品店铺组件
import ShopInfo from "../../components/Shopinfo.vue";
// 导入商店主要页面组件
import Content from "../../views/shop/Content.vue";
// 导入购物车组件
import Cart from "../../views/shop/Cart.vue";
// 导入get请求
import { get } from "../../utils/request";
// 导入路由实例
// 使用useroute获取当前路由，userouter是获取整个路由实例
import { useRouter, useRoute } from "vue-router";
// 根据URL传递的ID获取数据
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  console.log(item.name)
  return { getItemData, item };
};

// 点击返回按钮，返回首页
const useBackRouterEffect = () => {
  // 获得路由实例
  const router = useRouter();
  // 点击返回按钮，返回首页
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  name: "Shop",
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup() {
    // 根据URL传递的ID获取数据
    const { getItemData, item } = useShopInfoEffect();
    console.log(item._id);
    // 返回首页
    const { handleBackClick } = useBackRouterEffect();
    // 显示商店信息
    getItemData();

    return {
      item,
      handleBackClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.16rem 0 0.16rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    line-height: 0.32rem;
    &__icon {
      width: 0.44rem;
      padding-left: 0.18rem;
      color: $search-fontcolot;
    }
    &__input {
      // display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
