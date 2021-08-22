<template>
  <!-- 地址 -->
  <div class="position">
    <span class="iconfont position__icon">&#xe603;</span>
    北京理工大学国防科技园2号楼10层京理工大学国防科技园2号楼10层京理工大学国防科技园2号楼10层京理工大学国防科技园2号楼10层京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe629;</span>
  </div>
  <!-- 搜索框 -->
  <div class="search">
    <span class="iconfont">&#xe688;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <!-- 轮播图 -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img
          class="banner_img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
          alt=""
        />
      </div>
      <div class="swiper-slide">
        <img
          class="banner_img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
          alt=""
        />
      </div>
      <div class="swiper-slide">
        <img
          class="banner_img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
          alt=""
        />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
  <!-- 导航栏项目 -->
  <div class="icons">
    <div class="icons__item" v-for="(item, index) in iconsList" :key="index">
      <img class="icons__item__img" :src="item.imgName" />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <!-- 分割线 -->
  <div class="gap"></div>
</template>

<script>
// 导入swiper轮播图
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";
import axios from "axios";
export default {
  name: "StaticPart",
  setup() {
    let iconsList = [
      { imgName: "http://www.dell-lee.com/imgs/vue3/超市.png", desc: "超市便利"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/菜市场.png", desc: "菜市场"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/水果店.png", desc: "水果店"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/鲜花.png", desc: "鲜花绿植"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/医药健康.png", desc: "医药健康"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/家居.png", desc: "家居时尚"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/蛋糕.png", desc: "烘培蛋糕"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/签到.png", desc: "签到"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/大牌免运.png", desc: "大牌免运"},
      { imgName: "http://www.dell-lee.com/imgs/vue3/红包.png", desc: "红包套餐"}
    ];
    // axios
    //   .get(
    //     "https://www.fastmock.site/mock/5f8a98dde3de2b60e8e8137de44b5076/jingdong/api/getIconsList"
    //   )
    //   .then(res => {
    //     iconsList = res.data.data.iconsList;
    //   });
    return {
      iconsList
    };
  },
  mounted() {
    /**初始化轮播图 */
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      speed: 500, //切换时长
      // grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
      autoplay: {
        delay: 1000, //自动切换延时
        stopOnLastSlide: false, //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）。
        disableOnInteraction: true //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      },
      keyboard: true, //键盘切换
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
// 地址
.position {
  color: $content-fontcolor;
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    font-size: 0.2rem;
    right: 0;
    top: 0.17rem;
  }
}
// 搜索框
.search {
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontcolot;
  border-radius: 0.16rem;
  margin-bottom: 0.12rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
// 轮播图
.swiper-container {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
}
.banner_img {
  width: 100%;
}
// 导航栏
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
// 间隔线
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>
