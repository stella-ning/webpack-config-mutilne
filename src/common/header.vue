<template>
   <!-- 头部 -->
   <div class="headerBox">
       <div class="header">
            <span class="icon-back" @click="goback"></span>
            <h1>{{headTitle}}</h1>
            <span class="more-info" @click="handleMenu"></span>
        </div>
        <div class="header-position"></div>
         <transition name="fade">
            <div id="menu-modal" v-on:click.stop="handleMenu" v-show="isShow" >
                <div class="menu-modal" >
                    <div class="menu f-right">
                        <span class="icon-triangle"></span>
                        <ul class="menu-list">
                            <li class="shopping-card"><a href="/user/index#/cart">购物车</a></li>
                            <li class="search"><a href="/searchpage">搜索</a></li>
                            <li class="category"><a href="/cmyy-category">分类</a></li>
                            <li class="home"><a href="/index/index">首页</a></li>
                            <li class="my"><a href="/my-account">我的</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
   </div>
</template>

<style lang="less" scoped>
.headerBox {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
.header {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  height: 0.88rem;
  line-height: 0.88rem;
  background: #fff;
  text-align: center;
  position: fixed;
  z-index: 100;
  .icon-back {
    width: 30px;
    height: 34px;
    background: url(../static/images/public/image_back.png) no-repeat;
    background-size: auto auto;
    background-size: 20px 20px;
    display: inline-block;
    position: absolute;
    z-index: 150;
    top: 12px;
    left: 10px;
  }
  h1 {
    width: 100%;
    line-height: 44px;
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: normal;
  }
  .more-info {
    display: inline-block;
    width: 30px;
    height: 40px;
    background: url(../static/images/public/more_info.png) no-repeat -1px 10px;
    background-size: auto auto;
    background-size: 35px 19px;
    position: absolute;
    z-index: 150;
    top: 4px;
    right: 10px;
  }
}
.header-position {
  height: 0.88rem;
}
#menu-modal{
    min-width: 320px;
    max-width: 640px;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 44px;
    bottom: 0;
    z-index: 100;
    background: rgba(21, 21, 21, 0.4);
}
.menu-modal {

  .menu {
    width: 40%;
    height: 225px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 5px;
    background: rgba(21, 21, 21, 0.7);
    position: relative;
    .icon-triangle {
      width: 25px;
      height: 10px;
      background: url(../static/images/public/icon_triangle_01.png) no-repeat;
      display: inline-block;
      position: absolute;
      top: -10px;
      right: 10px;
    }
    .menu-list {
      margin-top: 2px;
      a {
        display: block;
        color: #fff;
        width: 100%;
        height: 100%;
      }
      li {
        border-bottom: 1px solid #5c5c5c;
        padding: 0 10px;
        padding-left: 40px;
        height: 41px;
        line-height: 41px;
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        text-align: center;

        &.shopping-card {
          background: url(../static/images/public/icon_nav_07.png) no-repeat 20%
            50%;
          background-size: 28px 24px;
        }
        &.search {
          background: url(../static/images/public/icon_nav_08.png) no-repeat 20%
            50%;
          background-size: 26px 24px;
        }
        &.category {
          background: url(../static/images/public/icon_nav_09.png) no-repeat 20%
            50%;
          background-size: 26px 24px;
        }
        &.home {
          background: url(../static/images/public/icon_nav_10.png) no-repeat 20%
            50%;
          background-size: 26px 24px;
        }
        &.my {
          background: url(../static/images/public/icon_nav_11.png) no-repeat 20%
            50%;
          background-size: 26px 24px;
        }
      }
    }
  }
}
</style>
<script>
import { request } from 'common';
import * as Datas from "api";
import "@style/reset";
export default {
  name: "headTop",
  data() {
    return {
      isShow: false
    };
  },
  created() {

  },
  props: ["signinUp", "headTitle", "goBack"],
  methods: {
    handleMenu() {
      this.isShow = !this.isShow;
    },
    goback(){
        window.history.go(-1)
    },

  }
};
</script>
