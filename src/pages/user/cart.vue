<template>
    <div class="cartBox">
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
                    <div class="controlProduct" v-for="(cartList,index) in cartArray" :key="index"
                        data-type="cartList.isDiscount"
                        data-sumSize="cartList.sumSize"
                        :class="{active:index == currenCart}"
                        @click="changeTab(index)"
                    >
                        {{cartList.cartName}}
                    </div>
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
        <!-- 购物车列表 -->
        <div class="cartTab">
            <div class="cartView" v-for="(cartItem,index) in cartArray" :key="index" v-show="index == currenCart">
                <ul class="productBox">
                    <li class="productList" v-for="(cartProduct,index) in cartItem.entryArray" :key="index">
                        <div class="cartInfo clearfix">
                            <label class="check-wrap f-left">
                                <span class="checkbox-inner-wrap">
                                    <input type="checkbox" name="productCodes[]"
                                        id="'check'+cartProduct.code+'_'+cartProduct.isDiscount"
                                        checked="checked"
                                        data-zhongpackage="cartProduct.zhongPackage"
                                        data-bigPackage="cartProduct.bigPackage"
                                        data-code="cartProduct.code"
                                        data-constraint="cartProduct.constraint"
                                        data-isDiscount="cartProduct.isDiscount"
                                        data-quantityFormat="cartProduct.quantityFormat"
                                        data-realstock="cartProduct.realstock"
                                        data-discountrealstock="cartProduct.discountrealstock"
                                    >
                                    <!-- 判断是否存在折扣库存 -->
                                    <template v-if="cartProduct.isDiscount">
                                        <input type="hidden" class="discountstock" value="cartProduct.discountrealstock">
                                    </template>
                                    <span class="checkbox-inner"></span>
                                </span>
                            </label>
                            <div class="productImgBox f-left">
                                <div class="productImg" v-if="cartProduct.isDiscount">
                                    <a :href="'/index/cartProduct?code='+cartProduct.code+'&discountClick=true'">
                                        <img v-lazy="cartProduct.imgsrc" alt=""/>
                                    </a>
                                </div>
                                <div class="productImg" v-else>
                                    <a :href="'/index/cartProduct?code='+cartProduct.code">
                                        <img v-lazy="cartProduct.imgsrc" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div class="productInfoBox f-left">
                                <p class="product-name" v-if="cartProduct.isDiscount">
                                    <a :href="'/index/productdetail?code='+cartProduct.code+'&discountClick=true'">
                                        {{cartProduct.name}}
                                    </a>
                                </p>
                                <p class="product-name" v-else>
                                    <a :href="'/index/productdetail?code='+cartProduct.code">
                                        {{cartProduct.name}}
                                    </a>
                                </p>
                                <p class="factory-name txt-style">
                                    {{cartProduct.ean}}
                                </p>
                                <p class="product-spec txt-style">
                                    {{cartProduct.specifications}}
                                </p>
                                <p class="product-package txt-style">
                                    中/大包装：
                                    <span class="midPack" v-html="parseFloat(cartProduct.zhongPackage)"></span>
                                    <span>/</span>
                                    <span class="bigPack" v-html="parseFloat(cartProduct.bigPackage)"></span>
                                    <span class="unit">{{cartProduct.minUnit}}</span>
                                </p>
                                <p class="product-validity txt-style">
                                    有效日期：{{cartProduct.effectiveDate}}
                                    <template v-if="cartProduct.validity">
                                        <span style="color:#ff3a32">(1年内，请慎拍)</span>
                                    </template>
                                </p>
                                <div class="product-price">
                                    <template v-if="Number(cartProduct.price)">
                                        <span class="price" >￥{{cartProduct.price}}</span>
                                        <span class="unit-kg" style="color:#ff3a32;"> / {{cartProduct.minUnit}}</span>
                                    </template>
                                    <template v-else>
                                        <span class="price" >{{cartProduct.price}}</span>
                                    </template>

                                </div>
                            </div>
                        </div>
                        <div class="cartCount clearfix">
                            <div class="setCount f-left">
                                小计：
                                <span class="subtotal">$4545</span>
                            </div>
                            <div class="number f-right">
                                <button class="decrease disabled">-</button>
                                <input type="number" class="numberInp" @focus="handleFocus" @blur="handleBlur">
                                <button class="increase">+</button>
                                <span class="unit">盒</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 底部 -->
        <section class="actionBar">
            <div class="toSure">
                <div class="selectInfo">
                    <label class="check-wrap f-left" for="checkAll">
                        <span class="checkbox-inner-wrap">
                            <input type="checkbox"  checked="checked" class="checkAll" id="checkAll">
                            <span class="checkbox-inner"></span>
                        </span>
                        全选
                    </label>
                    <span class="txt">
                        品种合计：
                        <span class="total totalCount"></span>
                        种
                    </span>
                    <span class="txt">
                        总金额：
                        <span class="total totalPrice">￥</span>
                    </span>
                </div>
                <div class="forSure">去确认</div>
            </div>
        </section>
    </div>
</template>
<style lang="less" scoped>
    @import url('../../static/css/cart');
</style>
<script>
    import Vue from 'vue';
    import { request } from 'common';
    import * as Datas from 'api';
    import HeadTop from 'src/common/header.vue';
    import VueLazyLoad from 'vue-lazyload';
    import {setStore,getStore} from '@js/config';
    Vue.use(VueLazyLoad,{
        error:'../static/images/public/loading.gif',
        loading:'../static/images/public/loading.gif'
    });
    export default {

        data(){
            return{
                isShow:false,//是否显示菜单栏
                userId:null,
                cartArray:[],
                isShowJYHT:0,
                isDiscount:false,
                sumSize:null,
                currenCart:0,
                isEditt:false,
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
            getDatas(){
                let _this = this;
                request.post(Datas.getMyCart,'uid='+this.userId)
                .then(res =>  {
                    console.log(res)
                    _this.cartArray = res.cartTypeArray;
                    _this.isShowJYHT = res.isShowJYHT;
                })
            },
            changeTab(index){
                this.currenCart = index;
            },
            handleFocus(){
                document.querySelector('.actionBar').style.position = 'static';

            },
            handleBlur(){
                document.querySelector('.actionBar').style.position = 'fixed';
            }
        },
        created(){
            //获取用户信息
            this.userId = getStore('user_id');
            //获取数据
            this.getDatas();
        },
        mounted(){


        }
    }
</script>


