import { createStore } from "vuex";

// 将商品存入localstorage中
const setLocalCartList = state => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};

// 获取存入localstorage中的购物车数据
const getLocalStroage = () => {
  // JSON.parse() 方法将数据转换为 JavaScript 对象。
  return localStorage.cartList != undefined && localStorage.cartList != ""
    ? JSON.parse(localStorage.cartList)
    : {};
};

export default createStore({
  state: {
    // 设置全局数据用于存储购物车数据
    /*cartList:{
      // 第一层级存放商店id
      shopId:{
        // 第二层级存放商店名称
        shopName:'',
        // 第三层级存放店铺中的商品id以及信息
        // productList:{
              productId:{
                _id:1,
                title:'番茄',
                imgUrl:'图片',
                sales:'10',
                price:'33.6',
                // 选择该商品数量
                count:1
              },
              222:{
                _id:2,
                title:'车厘子',
                imgUrl:'图片',
                sales:'10',
                price:'33.6',
                // 选择该商品数量
               count:1
             }
          }         
      },
      shopId:{
        productId:{
          _id:3,
          title:'帝王蟹',
          imgUrl:'图片',
          sales:'10',
          price:'33.6',
          // 选择该商品数量
          count:1
        }
      }
    }*/
    cartList: getLocalStroage()
  },
  mutations: {
    // 接受商品店铺id，商品id和商品信息
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, shopName } = payload;
      // 获取第一层级店铺id,如果第一层级不存在默认为空
      let shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      // 判断如果shopInfo不存在，那么shopInfo等于空对象
      // if (!shopInfo) {
      //   shopInfo = {};
      // }
      // 获取第三层级商品信息 第三层级存放于第一层级中(店铺中存放商品信息)
      let product = shopInfo.productList[productId];
      // 判断如果商品信息不存在，那么product等于productInfo。因为没添加商品前product为空
      // 第一次为空，当我们添加了product就有商品信息了
      if (!product) {
        // 商品不存在，那么将商品数据添加到product中
        product = productInfo;
        // 商品数量默认为空
        product.count = 0;
      }
      // 判断，如果添加商品，商品数量大于0，那么check选中状态为true
      if (payload.num > 0) product.check = true;
      // 添加商品信息后，count自增，如果商品不为空能获取商品信息那么在自增
      // payload.num也可能是负数，如果是负数，那么商品数量减少
      product.count += payload.num;
      // 如果一直减少，只能是0，不能为负数
      if (product.count < 0) product.count = 0;
      // 之后将商品信息添加到第三层级中
      shopInfo.productList[productId] = product;
      // 最后将第二层级所有数据存入第一层级中
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },

    // 点击添加按钮能够将商店名称添加到购物车商品数据中
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      // 根据商店id获取商品数据,如果不存在默认给空
      const shopInfo = state.cartList[shopId] || {
        shopName: ""
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },

    // 点击勾选按钮实现选中和未选中
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      // 根据店铺id和商品id获取店铺的商品数据
      const product = state.cartList[shopId].productList[productId];
      // true和false之间反复横跳
      product.check = !product.check;
      setLocalCartList(state);
    },

    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalCartList(state);
    },

    // 点击全选按钮选中所有添加至购物车的商品
    setCartItemChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (let key in products) {
          const product = products[key];
          product.check = true;
        }
      }
      setLocalCartList(state);
    },

    // 下单后清空购物车
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {};
      setLocalCartList(state);
    }
  }
});
