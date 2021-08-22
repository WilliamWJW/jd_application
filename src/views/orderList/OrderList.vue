<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{
            item.isCanceled ? "已取消" : "已下单"
          }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                :src="innerItem.product.img"
                class="order__content__img"
                alt=""
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">￥{{ item.totalPrice }}</div>
            <div class="order__content__count">共{{ item.totalNumber }}件</div>
          </div>
        </div>
      </div>
    </div>
    <Docker :currentIndex="2" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import Docker from "../../components/Docker.vue";
// 显示订单数据
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getNearbyList = async () => {
    const result = await get("/api/order");
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach(order => {
        const products = order.products;
        let totalPrice = 0;
        let totalNumber = 0;
        // 计算购物车商品的数量乘以商品的价格等于他的总价
        // 计算购物车商品的数量
        products.forEach(productItem => {
          totalNumber += productItem?.orderSales || 0;
          totalPrice += productItem.product.price * productItem.orderSales || 0;
        });
        order.totalPrice = totalPrice;
        order.totalNumber = totalNumber;
      });
      //   orderlist指向同一个地址 所以返回result.data也可以。因为两个都是同一个地址
      data.list = result.data;
    }
  };
  getNearbyList();
  const { list } = toRefs(data);
  return { list };
};

export default {
  name: "OrderList",
  components: {
    Docker
  },
  setup() {
    const { list } = useOrderListEffect();
    console.log(list);
    return { list };
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
  line-height: 0.44rem;
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  margin-bottom: 0.16rem;
}

.orders {
}

.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background-color: $bgColor;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    margin-bottom: 0.1rem;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: $light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      width: 0.7rem;
    }
    &__price {
      margin-bottom: 0.04rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: 0.14rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>
