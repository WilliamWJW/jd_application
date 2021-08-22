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
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        autocomplete="new-password"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <!-- 登录按钮 -->
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">
      已有账号去登陆
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
// 导入响应式
import { reactive, toRefs } from "vue";
// 导入路由实例
import { useRouter } from "vue-router";
// 导入请求封装
import { post } from "../../utils/request";
// 导入弹窗组件和对应方法
import Toast, { useToastEffect } from "../../components/Toast.vue";
// 设置注册方法
const useRegisterEffect = showToast => {
  // 使用路由实例
  const router = useRouter();
  // 设置响应式数据
  const data = reactive({
    username: "",
    password: "",
    ensurement: ""
  });
  // 转换普通对象
  const { username, password, ensurement } = toRefs(data);
  // 异步执行变为同步
  const handleRegister = async () => {
    try {
      if (data.username == "" || data.password == "" || data.ensurement == "") {
        showToast("登录失败，信息不能为空");
        return;
      } else {
        if (data.password != data.ensurement) {
          showToast("两次密码不一致");
          return;
        }
        const result = await post("/api/user/register", {
          username: data.username,
          password: data.password
        });
        console.log(result);
        if (result?.errno === 0) {
          router.push({ name: "Login" });
        } else {
          showToast("注册失败");
        }
      }
    } catch (error) {
      showToast("请求失败");
    }
  };
  return { username, password, ensurement, handleRegister };
};

const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};

export default {
  name: "Register",
  // 使用弹窗组件
  components: {
    Toast
  },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { handleLoginClick } = useLoginEffect();
    const {
      username,
      password,
      ensurement,
      handleRegister
    } = useRegisterEffect(showToast);

    return {
      handleRegister,
      handleLoginClick,
      show,
      toastMessage,
      username,
      password,
      ensurement
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
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    text-align: center;
    font-size: 0.16rem;
    color: $bgColor;
    line-height: 0.48rem;
  }
  &__register-link {
    font-size: 0.14rem;
    color: $login-fontcolor;
    text-align: center;
  }
}
</style>
