<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>&yen;{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <!-- 提交弹窗 -->
  <Toast v-show="show" :msg="toastMessage" />
  <div
    class="mask"
    v-if="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <!-- @click.stop 不允许点击内部关闭蒙版 -->
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn" @click="() => handleConfirmOrder(true)">
          取消订单
        </div>
        <div
          class="mask__content__btn"
          @click="() => handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommCartEffect } from "../../effects/cartEffects";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

// 点击提交订单获取购物车数据
const useMakeOrderEffect = (shopId, shopName, productList, showToast) => {
  const router = useRouter();
  const store = useStore();
  const handleConfirmOrder = async isCanceled => {
    const products = [];
    // productList.value是计算属性，所以值是在value中
    for (let i in productList.value) {
      const product = productList.value[i];
      // 将循环的购物车商品ID和购物车商品数量存入productList中
      products.push({ id: parseInt(product._id, 10), num: product.count });
    }
    try {
      // 遇到await就先返回，等到触发的异步操作完成，再接着执行函数体内的语句
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value || "沃尔玛",
        isCanceled,
        products
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        // 下单后要清空购物车
        store.commit("clearCartData", shopId);
        router.push({ name: "OrderList" });
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  return { handleConfirmOrder };
};

// 蒙层
const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = status => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: "Order",
  components: {
    Toast
  },
  setup() {
    const route = useRoute();
    const shopId = parseInt(route.params.id, 10);
    const { showToast, toastMessage, show } = useToastEffect();
    // 获取商品中添加至购物车的商品数据显示在订单页面
    const { calculations, shopName, productList } = useCommCartEffect(shopId);
    // 蒙版
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect();
    // 提交订单操作
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList,
      showToast
    );

    return {
      calculations,
      handleConfirmOrder,
      toastMessage,
      show,
      showConfirm,
      handleShowConfirmChange
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background-color: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: 0.98rem;
    background-color: $btn-bgColor;
    color: $bgColor;
    text-align: center;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: $bgColor;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: $content-fontcolor;
      margin-top: 0.24rem;
      line-height: 0.26rem;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border: 0.01rem solid $btn-bgColor;
      border-radius: 0.16rem;
    }
    &__btn:first-child {
      color: $btn-bgColor;
      margin-right: 0.12rem;
    }
    &__btn:last-child {
      margin-left: 0.12rem;
      background: $btn-bgColor;
      color: $bgColor;
    }
  }
}
</style>
