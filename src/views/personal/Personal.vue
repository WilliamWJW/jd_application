<template>
  <div class="wrapper">
    <div class="personal">
      <div class="personal__update iconfont">&#xe6d2;</div>

      <div class="personal__info">
        <img src="../../assets/avatar.jpg" alt="" class="personal__img" />
        <div class="personal__info__title">热心市民王先生</div>
        <div class="personal__info__number">ID: 1069643013</div>
        <div class="personal__info__hr"></div>
        <div class="personal__info__preferential">
          <div class="personal__info__coupon">
            <div class="personal__info__item">红包</div>
            <div class="personal__info__num">218</div>
          </div>
          <div class="personal__info__coupon">
            <div class="personal__info__item">优惠券</div>
            <div class="personal__info__num">12张</div>
          </div>
          <div class="personal__info__coupon">
            <div class="personal__info__item">鲜豆</div>
            <div class="personal__info__num">80</div>
          </div>
          <div class="personal__info__coupon">
            <div class="personal__info__item">白条</div>
            <div class="personal__info__num">1000</div>
          </div>
        </div>
      </div>

      <div class="personal__options">
        <div class="personal__options__item">
          <span class="personal__options__tagMoney iconfont">&#xe60c;</span>
          <span class="personal__options__name">我的钱包</span>
          <span class="personal__options__arrow iconfont">&#xe604;</span>
        </div>
        <div class="personal__options__item">
          <span class="personal__options__tagAddress iconfont">&#xe614;</span>
          <span class="personal__options__name">我的地址</span>
          <span class="personal__options__arrow iconfont">&#xe604;</span>
        </div>
        <div class="personal__options__item">
          <span class="personal__options__tagHelp iconfont">&#xe64a;</span>
          <span class="personal__options__name">客服与帮助</span>
          <span class="personal__options__arrow iconfont">&#xe604;</span>
        </div>
      </div>
    </div>
    <Docker :currentIndex="3" />
  </div>
</template>

<script>
import Docker from "../../components/Docker.vue";
export default {
  name: "Personal",
  components: {
    Docker
  },
  setup() {
    return {};
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
  overflow-y: auto;
  box-sizing: border-box;
}
.personal {
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  border-bottom-left-radius: 90% 40%;
  border-bottom-right-radius: 90% 40%;
  height: 2.5rem;

  &__update {
    text-align: right;
    color: $bgColor;
    margin-right: 0.23rem;
    padding-top: 0.4rem;
  }

  &__img {
    position: absolute;
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    top: 5%;
    //   z-index: 999;
  }

  &__info {
    height: 2.03rem;
    margin: 0.31rem 0.18rem 0.16rem 0.18rem;
    background-color: $bgColor;
    border-radius: 0.08rem;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    &__title {
      font-size: 0.24rem;
      color: $content-fontcolor;
      padding-top: 0.49rem;
      font-weight: normal;
      text-align: center;
    }
    &__number {
      font-size: 0.14rem;
      color: $login-fontcolor;
      text-align: center;
      margin-top: 0.08rem;
      margin-bottom: 0.12rem;
    }
    &__hr {
      // height: .01rem;
      border-top: 0.01rem solid #f1f1f1;
      margin-bottom: 0.12rem;
    }
    &__preferential {
      display: flex;
      margin: 0 0.28rem;
      align-items: center;
      text-align: center;
    }
    &__coupon {
      flex: 1;
    }
    &__item {
      font-size: 0.12rem;
      color: $search-fontcolot;
      margin-bottom: 0.08rem;
    }
    &__num {
      font-size: 0.2rem;
      color: $content-fontcolor;
    }
  }
  &__options {
    height: 1.46rem;
    margin: 0 0.18rem;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.08rem;
    background-color: $bgColor;
    padding: 0.16rem;
    box-sizing: border-box;
    &__item {
      margin-bottom: 0.24rem;
      display: flex;
      //   margin-bottom: 0.24rem;
    }
    &__name {
      font-size: 0.14rem;
      color: $content-fontcolor;
      line-height: 0.2rem;
      margin-left: 0.12rem;
    }
    &__arrow {
      flex: 1;
      transform: rotate(180deg);
      line-height: 0.2rem;
      color: $login-fontcolor;
    }
    &__tagMoney,
    &__tagAddress,
    &__tagHelp {
      font-size: 0.2rem;
    }
    &__tagMoney {
      color: $hightlight-fontColor;
    }
    &__tagAddress {
      color: $btn-bgColor;
    }
    &__tagHelp {
      color: purple;
    }
  }
}
</style>
