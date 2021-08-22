<template>
  <!-- 商家店铺主要页面 -->
  <div class="content">
    <!-- 左侧列表项 -->
    <div class="category">
      <!--  category__item--active -->
      <!-- category__item--active的显示由currentab决定，currentab等于item.tab那么显示高亮 -->
      <!-- handleCategoryClick(item.tab)将循环出来的tab传入点击事件中实现点击不同列表获取不同数据 -->
      <!-- 以及实现传递tab给点击事件，列表项实现高亮效果 -->
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab
        }"
        v-for="(item, index) in categories"
        :key="index"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 右侧商品详细 -->
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <!-- 点击加号加商品存入store中的cartlist中，第一个参数是店铺id，第二个商品id，第三个商品所有信息,第四个为每次点击商品数量减少 第五个参数是商店名称-->
          <span
            class="product__number__minus"
            @click="
              () => {
                changeCartItem(shopid, item._id, item, -1, shopName);
              }
            "
            >-</span
          >
          <!-- 选中商品的数量 如果没有选中数量默认0-->
          {{ getProductCartCount(shopid, item._id) }}
          <!-- 点击加号加商品存入store中的cartlist中，第一个参数是店铺id，第二个商品id，第三个商品所有信息,第四个为每次点击商品数量增加 第五个参数是商店名称-->
          <span
            class="product__number__plus"
            @click="
              () => {
                changeCartItem(shopid, item._id, item, 1, shopName);
              }
            "
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref, toRefs, watchEffect } from "vue";
import { get } from "../../utils/request";
// 获取URL上传递的商店ID
import { useRoute } from "vue-router";
// 导入添加商品进购物车方法
import { useCommCartEffect } from "../../effects/cartEffects";

//   定义列表项数据
const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "fruit" }
];

// 处理tab列表项高亮方法
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  // 点击列表项，当前列表项高亮,同时将tab传递给getContentData中获取每个列表项中的商品信息
  const handleTabClick = tab => {
    // 当点击列表项事件会传递tab，tab会赋值给currentab中，那么currentab会去跟当前点击的列表项的tab对比
    // 如果相同则category__item--active=true 那么显示高亮
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};

// 获取商品信息方法
const useCurrentListEffect = (currentTab, shopid) => {
  // 设置响应式数据
  const content = reactive({ list: [] });

  //点击左侧列表项，会根据当前商家店铺id(url传递的id)以及左侧列表项的tab名称去请求数据
  const getContentData = async () => {
    // /api/shop/:id/products?tab=???(all seckill fruit)
    const result = await get(`/api/shop/${shopid}/products`, {
      // currentTab.value因为是响应式数据
      tab: currentTab.value
    });
    if (result?.errno === 0 && result?.data.length) {
      content.list = result.data;
    }
  };
  //   设置侦听器watcheffect
  //   watchEffect初始化会执行一次
  // 他会自动的收集依赖， 只要我们getContentData中引用到了响应式的属性， 那么当这些属性变更的时候，这个方法都会执行
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};

// 购物车逻辑
const useCartEffect = () => {
  const store = useStore();
  // 导入购物车添加减少方法
  const { changeCartItemInfo, cartList } = useCommCartEffect();
  // 点击添加商品，同时将商品名称添加进数据中
  // const changeShopName = (shopid, shopName) => {
  //   store.commit("changeShopName", { shopid, shopName });
  // };
  //点击按钮实现添加商品至购物车/减少购物车商品数量
  const changeCartItem = (shopid, productId, item, num, shopName) => {
    changeCartItemInfo(shopid, productId, item, num,shopName);
    // 将商店名称存入数据中
    // changeShopName(shopid, shopName);
  };
  const getProductCartCount = (shopid, productId) => {
    return cartList?.[shopid]?.productList?.[productId]?.count || 0;
  };
  return { changeCartItem, cartList, getProductCartCount };
};

export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    // 获得路由实例
    const route = useRoute();
    // 获取URL上附带的商店id
    const shopid = route.params.id;
    //处理tab列表项高亮方法
    const { currentTab, handleTabClick } = useTabEffect();
    // 获取商品详细数据
    const { list } = useCurrentListEffect(currentTab, shopid);

    const { changeCartItem, cartList, getProductCartCount } = useCartEffect();

    // 返回外部 由外部操作
    return {
      categories,
      currentTab,
      list,
      handleTabClick,
      shopid,
      changeCartItem,
      cartList,
      getProductCartCount
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  // 内容超出区域可以滚动查看内容  overflow-y: scroll;
  overflow-y: scroll;
  width: 0.76rem;
  height: 100%;
  background-color: $search-bgColor;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background-color: $bgColor;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    position: relative;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    display: flex;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    /*
    因为product__item__detail元素没有宽度限制，是由里面的内容撑起来的，
    即使里面的元素设置了超出隐藏也没有宽度限制，
    形成不了省略号。所以给product__item__detail元素设置超出隐藏，相当于限制了宽度
    */
    &__detail {
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
      overflow: hidden;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      //   文字中间划线
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        border-radius: 50%;
        text-align: center;
        font-size: 0.25rem;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        background-color: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
