<template>
  <!-- 点击购物车展示购物车列表显示除购物车外的蒙层 -->
  <!-- 点击购物车列表外的蒙层能够隐藏购物车列表 -->
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <!-- 购物车选中商品信息 -->
    <div class="product" v-if="showCart && calculations.total > 0">
      <!-- 全选和清空 -->
      <div class="product__header">
        <!-- 全选 -->
        <div class="product__header__all">
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe671;' : '&#xe672;'"
            @click="() => setCartItemChecked(shopId)"
          >
          </span>
          全选
        </div>
        <!-- 清空 -->
        <div class="product__header__clear">
          <span @click="() => cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <!-- 选中按钮 -->
        <!-- 如果check为true则选中false未选中商品 -->
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe671;' : '&#xe672;'"
          @click="() => changeCartItemChecked(shopId, item._id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <!-- 点击加号加商品存入store中的cartlist中，第一个参数是店铺id，第二个商品id，第三个商品所有信息,第四个为每次点击商品数量减少-->
          <span
            class="product__number__minus"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1);
              }
            "
            >-</span
          >
          <!-- 选中商品的数量 如果没有选中数量默认0-->
          {{ item.count || 0 }}
          <!-- 点击加号加商品存入store中的cartlist中，第一个参数是店铺id，第二个商品id，第三个商品所有信息,第四个为每次点击商品数量增加 -->
          <span
            class="product__number__plus"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1);
              }
            "
            >+</span
          >
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <!-- 价格总计 -->
      <div class="check__info">
        总计:
        <span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <!-- 结算按钮 -->
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// 导入计算属性
import { ref } from "vue";
// 导入store
import { useStore } from "vuex";
// 导入路由获取当前页面的店铺ID
import { useRoute } from "vue-router";
// 点击加减按钮添加删除商品方法
import { useCommCartEffect } from "../../effects/cartEffects";

const useCartEffect = shopId => {
  //点击加减按钮添加删除商品方法
  const { changeCartItemInfo, productList, calculations } = useCommCartEffect(
    shopId
  );
  // 使用store实例
  const store = useStore();
  // 获取cartList中的数据
  const cartList = store.state.cartList;

  // 点击按钮选中/不选中商品   第一个参数商店id 第二个商品id
  const changeCartItemChecked = (shopId, productId) => {
    //   提交commit触发mutaions，设置选中商品和不选中商品
    store.commit("changeCartItemChecked", {
      shopId,
      productId
    });
  };

  // 清空购物车
  const cleanCartProducts = shopId => {
    //   提交commit触发mutaions，清空购物车
    store.commit("cleanCartProducts", { shopId });
  };

  // 点击全选按钮设置全选
  const setCartItemChecked = shopId => {
    store.commit("setCartItemChecked", { shopId });
  };

  // 返回外部
  return {
    productList,
    cartList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemChecked,
    calculations
  };
};

// 点击购物车控制显示隐藏购物车列表
const toggleCartEffect = () => {
  // 控制购物车列表显示隐藏
  const showCart = ref(false);
  // 点击购物车显示购物车列表
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    // 获取URL上附带的商店id
    const shopId = route.params.id;
    const { showCart, handleCartShowChange } = toggleCartEffect();
    const {
      productList,
      cartList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemChecked,
      calculations
    } = useCartEffect(shopId);

    return {
      productList,
      cartList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemChecked,
      showCart,
      handleCartShowChange,
      calculations
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
a {
  text-decoration: none;
  color: $bgColor;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;
  z-index: 2;
}
.product {
  flex: 1;
  overflow-y: scroll;
  background-color: #fff;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 1px solid $content-bgColor;
    font-size: 0.14rem;
    &__all {
      width: 0.64rem;
      margin-left: 0.18rem;
    }
    &__icon {
      color: $btn-bgColor;
      font-size: 0.2rem;
      margin-right: 0.1rem;
    }
    &__clear {
      flex: 1;
      text-align: right;

      margin-right: 0.16rem;
    }
  }
  &__item {
    position: relative;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    display: flex;
    color: $btn-bgColor;
    &__checked {
      color: $btn-bgColor;
      font-size: 0.2rem;
      line-height: 0.5rem;
      margin-right: 0.2rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
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
    &__price {
      margin: 0.06rem 0 0 0;
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
      bottom: 0.26rem;
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
.check {
  display: flex;
  line-height: 0.5rem;
  height: 0.5rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      height: 0.26rem;
      width: 0.28rem;
      margin: 0.12rem auto;
      display: block;
    }
    &__tag {
      position: absolute;
      top: 0.04rem;
      right: 0.2rem;
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: 50%;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(0.5);
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    color: $content-fontcolor;
    &__price {
      color: $hightlight-fontColor;
      font-size: 0.18rem;
      font-weight: bold;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: $btn-bgColor;
    text-align: center;
    color: $bgColor;
    font-size: 0.14rem;
  }
}
</style>
