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
            <div class="cartView" v-for="(cartItem,index1) in cartArray" :key="index1" v-show="index1 == currenCart">
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
                            <div class="setCount f-left" v-if="Number(cartProduct.price)">
                                小计：
                                <span style="color:#ff3a32;">￥</span>
                                <span class="subtotal" v-html="(parseFloat(cartProduct.price)*parseFloat(cartProduct.quantity)).toFixed(2)"></span>
                            </div>
                            <div class="number f-right">
                                <!-- 强制中包装 -->
                                <template v-if="cartProduct.constraint">
                                    <button class="decrease disabled" @click='handleChange(index1,index,-1,parseFloat(cartProduct.zhongPackage))'>-</button>
                                    <span  type="number" class="numberInp" readonly
                                        v-html="parseFloat(cartProduct.quantity)"
                                        contenteditable="true"
                                    ></span>
                                    <button class="increase" @click='handleChange(index1,index,1,parseFloat(cartProduct.zhongPackage))'>+</button>
                                    <span class="unit">盒</span>
                                </template>
                                <!-- 非强制中包装 -->
                                <template v-else>
                                    <button class="decrease disabled" @click='handleChange(index1,index,-1,parseFloat(cartProduct.minValue))'>-</button>
                                    <span  type="number" class="numberInp" readonly
                                        v-html="parseFloat(cartProduct.quantity)"
                                        contenteditable="true"
                                    ></span>
                                    <button class="increase" @click='handleChange(index1,index,1,parseFloat(cartProduct.minValue))'>+</button>
                                    <span class="unit">盒</span>
                                </template>
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
                            <input type="checkbox"  checked="checked" class="checkAll" id="checkAll" v-model="allChecked">
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
        <!-- 修改商品数量弹出 -->
        <div id="changeCount" style="display:none;">
            <div class="number changeCount clearfix">
                <button class="decrease disabled">-</button>
                <input class="numberInp" @click="handleFocus">
                <button class="increase" >+</button>
                <span class="unit">盒</span>
            </div>
        </div>
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
    import $ from 'jquery';
    import 'src/static/plugins/layer_mobile/layer.js';
    import 'src/static/plugins/layer_mobile/need/layer.css';

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
                allChecked:true,//全选
                isChecked:true,//选中
            }
        },
        components:{
            HeadTop
        },
        methods:{
            //菜单栏的显示与隐藏
            handleMenu() {
                this.isShow = !this.isShow;
            },
            //返回上一页
            goback(){
                //window.history.go(-1);
                this.$router.go(-1);
            },
            //获取数据
            getDatas(){
                let _this = this;
                request.post(Datas.getMyCart,'uid='+this.userId)
                .then(res =>  {
                    console.log(res)
                    _this.cartArray = res.cartTypeArray;
                    _this.isShowJYHT = res.isShowJYHT;
                })
            },
            //购物车tab切换
            changeTab(index){
                this.currenCart = index;
            },
            //数量宽点击事件
            handleCountClick(){
                //document.querySelector('.actionBar').style.position = 'static';
                layer.open({
                    title: [
                        '修改商品数量',
                        'height:40px;line-height:40px;color:#333;'
                    ],
                    anim: 'up',
                    content: $('#changeCount').html(),
                    btn: ['确认', '取消']
                });

            },
            handleBlur(){
                //document.querySelector('.actionBar').style.position = 'fixed';
            },
            handleFocus(){

            },
            //商品数量控制
            handleChange(index1,index,numChange,step){
                let goods = this.cartArray[index1]['entryArray'][index],
                    _this = this;
                if ( numChange == 1 ) {
                    //加
                    goods.quantity = parseFloat(goods.quantity);
                    goods.quantity = parseFloat((parseInt(goods.quantity*1000+step*1000)/1000).toFixed(2));
                    console.log('jian'+goods.quantity);
                   isDiscountFn();

                } else if ( numChange == -1 ) {
                    //减
                    goods.quantity = parseFloat(goods.quantity);
                    //goods.quantity -= step;
                    goods.quantity =parseFloat((parseInt(goods.quantity*1000-step*1000)/1000).toFixed(2));
                   // console.log('--'+ goods.quantity);
                   isDiscountFn()

                }
                //判断是否是折扣商品
                function isDiscountFn(){
                    //console.log('是否是折扣商品'+_this.cartArray[index1].isDiscount)
                    if(_this.cartArray[index1].isDiscount){
                        if ( parseFloat(goods.quantity) >= parseFloat(goods.discountRealStock) ) {
                            if(parseFloat(goods.discountRealStock) > step){
                                 goods.quantity = parseFloat((parseInt(goods.discountRealStock/step)*step).toFixed(2));
                                layer.open({
                                    content:'购买量不能高于'+ parseFloat((parseInt(goods.discountRealStock/step)*step).toFixed(2))+goods.minUnit,
                                    skin: 'msg',
                                    time: 2
                                })
                            }else{
                                goods.quantity = step;
                                layer.open({
                                    content:'商品已卖完,下次来早点哦',
                                    skin: 'msg',
                                    time: 2
                                })
                            }

                        }else if(parseFloat(goods.quantity) < step){
                            goods.quantity = step;
                            layer.open({
                                content:'购买量不能少于'+step+goods.minUnit,
                                skin: 'msg',
                                time: 2
                            })
                        }else{
                            request.post(Datas.updateCartQuantity,'uid='+_this.userId+'&quantity='+goods.quantity+'&cartName='+_this.cartArray[index1].cartName+'&code='+ goods.code)
                                .then(res =>  {
                                //console.log('成功'+res)
                            })
                        }
                    }else{
                        if ( parseFloat(goods.quantity) >= parseFloat(goods.realStock) ) {
                            //库存大于步长
                            if(parseFloat(goods.realStock) > step){
                                goods.quantity = parseFloat((parseInt(goods.realStock/step)*step).toFixed(2));
                                layer.open({
                                    content:'购买量不能高于'+ parseFloat((parseInt(goods.realStock/step)*step).toFixed(2))+goods.minUnit,
                                    skin: 'msg',
                                    time: 2
                                })
                            }else{
                                goods.quantity = step;
                                layer.open({
                                    content:'库存不足',
                                    skin: 'msg',
                                    time: 2
                                })
                            }
                        }else if(parseFloat(goods.quantity) < step){
                            console.log('shuliang'+goods.quantity)
                            goods.quantity = step;
                            layer.open({
                                content:'购买量不能少于'+step+goods.minUnit,
                                skin: 'msg',
                                time: 2
                            })
                        }else{
                            request.post(Datas.updateCartQuantity,'uid='+_this.userId+'&quantity='+goods.quantity+'&cartName='+_this.cartArray[index1].cartName+'&code='+ goods.code)
                                .then(res =>  {
                                //console.log('成功'+res)
                            })
                        }
                    }
                }

            },
            //输入
            enteryChange(index1,index,step){
                let goods = this.cartArray[index1]['entryArray'][index],
                     _this = this;
                //判断输入是否是符合的数量
                if(isNaN(goods.quantity)){
                    goods.quantity = step;
                    layer.open({
                        content:'请输入正确的数量',
                        skin: 'msg',
                        time: 2
                    })
                }
                //判断是否是折扣商品
                if(this.cartArray[index1].isDiscount){
                    if ( parseFloat(goods.quantity) >= parseFloat(goods.discountRealStock) ) {
                        goods.quantity = parseFloat((parseInt(goods.discountRealStock/step)*step).toFixed(2));
                        layer.open({
                            content:'购买量不能高于'+ parseFloat((parseInt(goods.discountRealStock/step)*step).toFixed(2))+goods.minUnit,
                            skin: 'msg',
                            time: 2
                        })
                    }
                }else{
                    if ( parseFloat(goods.quantity) >= parseFloat(goods.realStock) ) {
                        goods.quantity = parseFloat((parseInt(goods.realStock/step)*step).toFixed(2));
                        layer.open({
                            content:'购买量不能高于'+ parseFloat((parseInt(goods.realStock/step)*step).toFixed(2))+goods.minUnit,
                            skin: 'msg',
                            time: 2
                        })
                    }
                }
                //商品数量小于最小步长
                if ( parseFloat(goods.quantity) <= step ) {
                    goods.quantity = step;
                    layer.open({
                        content:'购买量不能少于'+step+goods.minUnit,
                        skin: 'msg',
                        time: 2
                    })

                }
            },
            //全选
            handleAllCheck(){
                let goodsList = this.cartArray[index]['entryArray'];
                if ( this.cartArray[index]['checked'] ) {
                    for (var i = 0; i < len; i++ ) {
                        list[i]['checked'] = false;
                    }
                } else {
                    for (var i = 0; i < len; i++ ) {
                        list[i]['checked'] = true;
                    }
                }
                this.goodsObj[index]['checked'] = !this.goodsObj[index]['checked'];
            },

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


