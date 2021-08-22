<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
    <div class="cartlists" v-for="(item, index) in product" :key="index">
      <div class="cartlist" v-if="index !== 0">
        <div class="cartlist__title">{{ item.shopName ||'商品详情' }}</div>
        <div
          class="cartlist__content"
          v-for="(currentItem, currentIndex) in item.productList"
          :key="currentIndex"
        >
          <div class="cartlist__content__info">
            <img
              :src="currentItem.imgUrl"
              alt=""
              class="cartlist__content__img"
            />
            <div class="cartlist__content__detailed">
              <div class="cartlist__content__shopname">
                {{ currentItem.name }}
              </div>
              <div class="cartlist__content__Pcount">
                &yen;{{ `${currentItem.price} x ${currentItem.count}` }}
              </div>
            </div>
            <span class="cartlist__content__price"
              >&yen;{{
                (currentItem.price * currentItem.count).toFixed(1)
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <Docker :currentIndex="1" />
  </div>
</template>

<script>
import Docker from "../../components/Docker.vue";
import { useStore } from "vuex";
const useCartListItemEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;
  const product = {};
  for (let i in cartList) {
    const products = cartList[i];
    product[i] = products;
  }
  return { product };
};

export default {
  name: "CartList",
  components: {
    Docker
  },
  setup() {
    const { product } = useCartListItemEffect();
    return { product };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgb(248, 248, 248);
  overflow-y: auto;
}
.title {
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  margin-bottom: 0.11rem;
  line-height: 0.44rem;
  background: $bgColor;
}
.cartlist {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background-color: $bgColor;

  &__title {
    font-size: 0.16rem;
    color: $content-fontcolor;
    margin-bottom: 0.16rem;
    font-weight: bold;
  }
  &__content {
    position: relative;
    &__info {
      display: flex;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detailed {
      flex: 1;
    }
    &__shopname {
      font-size: 0.14rem;
      color: $content-fontcolor;
      line-height: 0.2rem;
      margin-bottom: 0.06rem;
      font-weight: bold;
    }
    &__Pcount {
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      line-height: 0.2rem;
    }
    &__price {
      position: absolute;
      font-size: 0.14rem;
      color: $content-fontcolor;
      text-align: right;
      line-height: 0.2rem;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
