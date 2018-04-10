<template>
    <div class="cartBox">
        <!-- <Head-top head-title="购物车" go-back="true"></Head-top> -->
        <!-- 头部 -->
        <div class="headerBox">
            <div class="header">
                <div class="headCon">
                    <span class="icon-back" @click="goback"></span>
                    <h1>
                        购物车
                        ( <span class="cartAmount">15</span> )
                        <span class="edit">编辑</span>
                    </h1>
                    <span class="more-info" @click="handleMenu"></span>
                </div>
                <!-- 控销非控销折扣tab -->
                <div class="controlBar">
                    <div class="controlProduct">折扣</div>
                    <div class="controlProduct">控销</div>
                    <div class="controlProduct">非控销</div>
                </div>
                <!-- 折扣商品特别说明 -->
                <div class="discountNote">
                    <img src="../../static/images/topic/outLetwarmIcon2.png" alt="">
                    <a href="" class="txt">外包装轻微褶皱商品特价销售，不予退换&nbsp;&gt;</a>
                </div>
            </div>
            <div class="header-position"></div>
            <transition name="fade">
                <div id="menu-modal" v-on:click.stop="handleMenu" v-show="isShow" >
                    <div class="menu-modal" >
                        <div class="menu f-right">
                            <span class="icon-triangle"></span>
                            <ul class="menu-list">
                                <li class="shopping-card"><a href="/cart">购物车</a></li>
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
        <div class="cartTab">
            <div class="cartView">
                <ul class="productBox">
                    <li class="productList ">

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import url('../../static/css/cart');
</style>
<script>
    import { request } from 'common';
    import * as Datas from 'api';
    import HeadTop from 'src/common/header.vue';
    export default {

        data(){
            return{
                isShow:false,//是否显示菜单栏
            }
        },
        components:{
            HeadTop
        },
        methods:{
            handleMenu() {
                this.isShow = !this.isShow;
            },
            goback(){
                window.history.go(-1);
                this.$router.go(-1);
            },
        }
    }
</script>


