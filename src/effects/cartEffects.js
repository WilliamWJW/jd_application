// 导入store
import { useStore } from "vuex";
// 导入refs
import { toRefs, computed } from "vue";
//点击按钮添加商品数据存入store的cartList中，并根据cartList显示每个商品的数量
export const useCommCartEffect = shopId => {
  // 使用全局仓库
  const store = useStore();
  // state本身是reactive响应式的 要解构
  // const cartList = toRefs(store.state).cartList.value;
  const cartList = store.state.cartList;
  //   点击加减按钮添加或删除商品到cartList中
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    //   提交commit触发mutaions，将数据存入cartList
    store.commit("changeCartItemInfo", { shopId, productId, productInfo, num });
  };

  // 获取到cartList以及店铺id，获取商品中选中商品的数据显示在购物车列表
  const productList = computed(() => {
    // 通过店铺id获取该店铺中存入购物车的商品数据，如果没选择店铺中任何商品默认给空
    const productList = cartList[shopId]?.productList || {};
    const notEmptyProductList = {};
    // 循环输出商品数据
    for (let i in productList) {
      const product = productList[i];
      // 如果商品数量大于0才存入购物车中
      if (product.count > 0) {
        notEmptyProductList[i] = product;
      }
    }
    return notEmptyProductList;
  });

  // 获取到cartList以及店铺id，获取商品中选中的商品的所在店铺的店铺名称
  const shopName = computed(() => {
    // 通过店铺id获取该店铺中存入购物车的店铺名称，如果没选择店铺中任何商品默认给空
    const shopName = cartList[shopId]?.shopName || "";
    return shopName;
  });

  // 计算价格、商品总数、选中状态
  // 全选判断，如果商品全选，那么全选按钮也是选中状态。添加商品后，默认全选按钮是选中状态
  // 如果其中一个没选中，则不是全选状态
  const calculations = computed(() => {
    // 通过店铺id获取该店铺中存入购物车的商品数据
    const productList = cartList[shopId]?.productList;
    const result = { total: 0, price: 0, allChecked: true };
    //  先判断商品数据是否存在,如果没有商品数据，那么返回0
    if (productList) {
      //  将获取到的商品数据循环
      for (let i in productList) {
        // 将商品数量添加到count中  productList[1]productList[2] 将每一项都添加到product中
        const product = productList[i];
        result.total += product.count;
        // 判断商品是否选中，总价只包含选中商品，不包含未选中的。
        if (product.check) {
          //check为true是选中，计算总价
          result.price += product.count * product.price;
        }
        // 判断商品数量大于0并且商品为未选中
        if (product.count > 0 && !product.check) {
          // 全选按钮为false
          result.allChecked = false;
        }
      }
    }
    // 保留两位小数
    result.price = result.price.toFixed(2);
    return result;
  });

  return { cartList, productList, shopName, calculations, changeCartItemInfo };
};
