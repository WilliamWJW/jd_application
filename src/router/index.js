import { createRouter, createWebHashHistory } from "vue-router";
// 引入home组件

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
  },
  {
    path: "/orderConfirmation/:id",
    name: "orderConfirmation",
    component: () =>
      import(
        /* webpackChunkName: "orderConfirmation" */ "../views/orderConfirmation/orderConfirmation.vue"
      )
  },
  {
    // 跳转商品详细页传递id参数，显示对应商店信息
    path: "/shop/:id",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "../views/shop/Shop.vue")
  },
  {
    // 跳转订单列表页面
    path: "/orderList",
    name: "OrderList",
    component: () =>
      import(
        /* webpackChunkName: "orderList" */ "../views/orderList/OrderList.vue"
      )
  },
  {
    path: "/cartlist",
    name: "CartList",
    component: () =>
      import(/* webpackChunkName: "cartList" */ "../views/shop/CartList.vue")
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import(
        /* webpackChunkName: "personal" */ "../views/personal/Personal.vue"
      )
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    beforeEnter(to, from, next) {
      // 获取登录状态
      const { isLogin } = localStorage;
      // 判断，如果已经登录了，那么就跳转到首页
      // 如果没有登录就跳转login页面
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/register/Register.vue"
      ),
    beforeEnter(to, from, next) {
      // 获取登录状态
      const { isLogin } = localStorage;
      // 判断，如果已经登录了，那么就跳转到首页
      // 如果没有登录就跳转login页面
      isLogin ? next({ name: "Home" }) : next();
    }
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 路由守卫，全局守卫
// 回调函数中的参数，to进入到哪个路由去，from从哪个路由离开，next(执行下一步)决定是否展示你要看到的路由页面。
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  // 判断是否登录，或者是否访问login页面
  // 如果登录就执行下一步
  // 如果未登录跳转登录界面
  // 判断，如果未登录，同时访问的不是Login和Register页面，那么跳转到登录页面
  if (!isLogin && to.name !== "Login" && to.name !== "Register") {
    next({ name: "Login" });
  } else {
    // 如果登录了，或者访问的是登录和注册页面，那么执行下一步。
    next();
  }
});

export default router;
