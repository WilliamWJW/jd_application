<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    />
    <!-- 登录 -->
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <!-- 登录按钮 -->
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <!-- 如果showToast为true显示弹窗 那么就是登录失败 -->
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
// 导入请求封装
import { post } from "../../utils/request";
import axios from "axios";
// 导入弹窗组件和对应方法
import Toast, { useToastEffect } from "../../components/Toast.vue";

// const useLoginEffect = showToast => {
//   //   获取路由实例
//   const router = useRouter();
//   const data = reactive({
//     username: "",
//     password: ""
//   });
// toRefs()函数可以将reactive()创建出来的响应式对象，转换为普通对象，只不过这个对象上的每个属性节点，都是ref()类型的响应式数据
//   const { username, password } = toRefs(data);
//   const handleLogin = async () => {
//     try {
//       // 遇到await就先返回，等到触发的异步操作完成，再接着执行函数体内的语句
//       const result = await post("/api/user/login", {
//         username: data.username,
//         password: data.password
//       });
//       console.log(result);
//       if (result?.errno === 0) {
//         localStorage.isLogin = true;
//         router.push({ name: "Home" });
//       } else {
//         showToast("登录失败");
//       }
//     } catch (e) {
//       showToast("请求失败");
//     }
//   };
//   return { username, password, handleLogin };
// };

// 外部定义登录方法

// 注册跳转封装

const useRegisterEffect = () => {
  //   获取路由实例
  const router = useRouter();
  const handleRegisterClick = () => {
    // 跳转注册页
    router.push({ name: "Register" });
  };
  return { handleRegisterClick }
};

const useLoginEffect = showToast => {
  //   获取路由实例
  const router = useRouter();
  // 设置数据，并设置响应式
  const data = reactive({
    username: "",
    password: ""
  });
  // toRefs()函数可以将reactive()创建出来的响应式对象，转换为普通对象，只不过这个对象上的每个属性节点，都是ref()类型的响应式数据
  const { username, password } = toRefs(data);
  // 使用async 异步执行变为同步
  const handleLogin = async () => {
    /*
    await 后面的 Promise 对象不总是返回 resolved 状态，
    只要一个 await 后面的Promise状态变为 rejected ，
    整个 async 函数都会中断执行，为了保存错误的位置和错误信息，
    我们需要用 try...catch 语句来封装多个 await 过程 
    */
    try {
      const result = await axios.get(
        `http://www.dell-lee.com/react/api/login.json?user=${data.username}&password=${data.password}`
      );
      // 获取请求的数据解构赋值给login
      const { login } = result.data.data;
      // 判断login是否为true
      if (login) {
        // 讲login赋值给本地存储中
        localStorage.isLogin = login;
        // 页面跳转到首页
        router.push({ name: "Home" });
      } else {
        // login为false，登录失败
        showToast("登录失败");
      }
    } catch (error) {
      showToast("请求失败");
    }
  };

  return { username, password, handleLogin };
};

export default {
  name: "Login",
  components: {
    Toast
  },
  setup() {
    // 获取外部定义的数据和方法
    const { show, toastMessage, showToast } = useToastEffect();
    // 获取外部定义的登陆方法和数据
    const { username, password, handleLogin } = useLoginEffect(showToast);
    // 获取外部定义的注册跳转
    const { handleRegisterClick } = useRegisterEffect();
    return {
      handleLogin,
      handleRegisterClick,
      username,
      password,
      show,
      toastMessage
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    box-sizing: border-box;
    padding-left: 0.16rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    height: 0.48rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      width: 100%;
      border: none;
      outline: none;
      line-height: 0.48rem;
      background: none;
      font-size: 0.16rem;
      color: $login-fontcolor;
      &::placeholder {
        color: $login-fontcolor;
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    text-align: center;
    font-size: 0.16rem;
    color: $bgColor;
    line-height: 0.48rem;
  }
  &__login-link {
    font-size: 0.14rem;
    color: $login-fontcolor;
    text-align: center;
  }
}
</style>
