// 导入store
import { useStore } from "vuex";
// 导入refs
import { toRefs, computed } from "vue";
//点击按钮添加商品数据存入store的cartList中，并根据cartList显示每个商品的数量
export const useCommCartEffect = shopId => {
  // 使用全局仓库
  const store = useStore();
  // state本身是reactive响应式的 要解构
  const cartList = toRefs(store.state).cartList.value;
  //   点击加减按钮添加或删除商品到cartList中
  const changeCartItemInfo = (shopId, productId, productInfo, num,shopName) => {
    //   提交commit触发mutaions，将数据存入cartList
    store.commit("changeCartItemInfo", { shopId, productId, productInfo, num,shopName });
  };

  // 获取到cartList以及店铺id，获取商品中选中商品的数据显示在购物车列表
  const productList = computed(() => {
    // 通过店铺id获取该店铺中存入购物车的商品数据，如果没选择店铺中任何商品默认给空
    const productList = cartList[shopId]?.productList || [];
    return productList;
  });


  

  return { cartList, productList, changeCartItemInfo };
};
