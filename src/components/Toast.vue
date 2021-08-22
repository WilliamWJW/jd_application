<template>
  <!-- 弹窗 -->
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  // 接受父组件数据
  props: ["message"]
};
export const useToastEffect = () => {
  const toastData = reactive({
    // 设置一个值判断登录成功或失败后是否显示Toast组件弹窗,默认值false
    show: false,
    // 设置值，登录失败后传递给子组件显示
    toastMessage: ""
  });
  //   toRefs()函数可以将reactive()创建出来的响应式对象，
  // 转换为普通对象，只不过这个对象上的每个属性节点，都是ref()类型的响应式数据
  const { show, toastMessage } = toRefs(toastData);
  // 设置登录请求失败封装
  const showToast = msg => {
    //   登录失败show设置为true,显示弹窗组件
    toastData.show = true;
    // 弹窗组件中说明文字
    toastData.toastMessage = msg;
    // 设置延时器 两秒后因此组件，清空msg内容
    setTimeout(() => {
      toastData.show = false;
      toastData.toastMessage = "";
    }, 2000);
  };
  return { show, toastMessage, showToast };
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: $bgColor;
}
</style>
