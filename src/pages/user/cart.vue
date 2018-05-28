<template>
    <div class="cartBox">
        <!-- 头部 -->
        <div class="headerBox">
            <div class="header">
                <div class="headCon">
                    <span class="icon-back" @click="goback"></span>
                    <h1>
                        购物车
                        <!-- ( <span class="cartAmount">15</span> ) -->
                        <span class="edit" @click="handleEdit">编辑</span>
                    </h1>
                    <span class="more-info" @click="handleMenu"></span>
                </div>
                <!-- 控销非控销折扣tab -->
                <div class="controlBar">
                    <div class="controlProduct"  v-for="(cartList,index) in cartArray" :key="index"
                        data-type="cartList.isDiscount"
                        data-sumSize="cartList.sumSize"
                        :class="{active:index == currenCart}"
                        @click="changeTab(index)"
                        v-if="cartArray.length !=1"
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
                    <template v-if="cartItem.isDiscount">
                        <li class="productList" v-for="(cartProduct,index) in cartItem.entryArray" :key="index" :class="parseFloat(cartProduct.discountRealStock)?'':'noStock'">
                            <div class="cartInfo clearfix">
                                <label class="check-wrap f-left"  v-if="cartProduct.hide">
                                    <span class="checkbox-inner-wrap">
                                        <input type="checkbox" name="productCodes[]"
                                            class="selectInput"
                                            :id="'check'+cartProduct.code+'_'+cartItem.isDiscount"
                                            :checked="cartProduct.checked"
                                            @click="choose(index1, index)"
                                            >
                                        <span class="checkbox-inner"></span>
                                    </span>
                                </label>
                                <div class="productImgBox f-left">
                                    <div class="productImg">
                                        <a :href="'/index/productdetail?code='+cartProduct.code+'&discountClick=true'">
                                            <img v-lazy="cartProduct.imgsrc" alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div class="productInfoBox f-left">
                                    <p class="product-name">
                                        <a :href="'/index/productdetail?code='+cartProduct.code+'&discountClick=true'">
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
                                <p class="noStockMsg msg" v-show="cartProduct.isnoStock">现有库存0</p>
                                <div class="setCount f-left" v-if="Number(cartProduct.price)">
                                    小计：
                                    <span style="color:#ff3a32;">￥</span>
                                    <span class="subtotal" v-html="(parseFloat(cartProduct.price)*parseFloat(cartProduct.quantity)).toFixed(2)"></span>
                                </div>
                                <div class="number f-right">
                                    <!-- 强制中包装 -->
                                    <template v-if="cartProduct.constraint">
                                        <button class="decrease disabled" @click='handleChange(index1,index,-1,parseFloat(cartProduct.zhongPackage))' :id="cartProduct.code+'_'+cartProduct.isDiscount" :disabled="!cartProduct.checked">-</button>
                                        <input  type="number" class="numberInp"
                                            :readonly="!cartProduct.checked"
                                            v-model.number="cartProduct.quantity"
                                            :id="cartProduct.code+'_'+cartProduct.isDiscount"
                                            @blur="enteryChange(index1,index,parseFloat(cartProduct.zhongPackage))"
                                        />
                                        <button class="increase" @click='handleChange(index1,index,1,parseFloat(cartProduct.zhongPackage))' :id="cartProduct.code+'_'+cartProduct.isDiscount" :disabled="!cartProduct.checked">+</button>
                                        <span class="unit">盒</span>
                                    </template>
                                    <!-- 非强制中包装 -->
                                    <template v-else>
                                        <button class="decrease disabled" @click='handleChange(index1,index,-1,parseFloat(cartProduct.minValue))' :id="cartProduct.code+'_'+cartProduct.isDiscount" :disabled="!cartProduct.checked">-</button>
                                        <input  type="number" class="numberInp"
                                            :readonly="!cartProduct.checked"
                                            v-model.number="cartProduct.quantity"
                                            :id="cartProduct.code+'_'+cartProduct.isDiscount"
                                            @blur="enteryChange(index1,index,parseFloat(cartProduct.minValue))"
                                        />
                                        <button class="increase" @click='handleChange(index1,index,1,parseFloat(cartProduct.minValue))' :id="cartProduct.code+'_'+cartProduct.isDiscount" :disabled="!cartProduct.checked">+</button>
                                        <span class="unit">盒</span>
                                    </template>
                                </div>
                            </div>
                            <!-- 删除按钮 -->
                            <div class="deleteBtn">
                                <span class="iconfont icon-delete"></span>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <li class="productList" v-for="(cartProduct,index) in cartItem.entryArray" :key="index" :class="parseFloat(cartProduct.realStock)?'':'noStock'">
                            <div class="cartInfo clearfix">
                                <label class="check-wrap f-left" v-if="cartProduct.hide">
                                    <span class="checkbox-inner-wrap">
                                        <input type="checkbox" name="productCodes[]"
                                            class="selectInput"
                                            :id="'check'+cartProduct.code+'_'+cartItem.isDiscount"
                                            :checked="cartProduct.checked"
                                            @click="choose(index1,index)"
                                        >
                                        <span class="checkbox-inner"></span>
                                    </span>
                                </label>
                                <div class="productImgBox f-left">
                                    <div class="productImg">
                                        <a :href="'/index/productdetail?code='+cartProduct.code">
                                            <img v-lazy="cartProduct.imgsrc" alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div class="productInfoBox f-left">
                                    <p class="product-name">
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
                                <p class="noStockMsg msg" v-show="cartProduct.isnoStock">现有库存0</p>
                                <div class="setCount f-left" v-if="Number(cartProduct.price)">
                                    小计：
                                    <span style="color:#ff3a32;">￥</span>
                                    <span class="subtotal" v-html="(parseFloat(cartProduct.price)*parseFloat(cartProduct.quantity)).toFixed(2)"></span>
                                </div>
                                <div class="number f-right" v-if="Number(cartProduct.price)">
                                    <!-- 强制中包装 -->
                                    <template v-if="cartProduct.constraint">
                                        <button class="decrease disabled" @click='handleChange(index1,index,-1,parseFloat(cartProduct.zhongPackage))' :disabled="!cartProduct.checked" >
                                            -
                                        </button>
                                        <input  type="number" class="numberInp"
                                            :readonly="!cartProduct.checked"
                                            v-model.number="cartProduct.quantity"
                                            :id="cartProduct.code+'_'+cartProduct.isDiscount"
                                            @keyup="enteryChange(index1,index,parseFloat(cartProduct.zhongPackage))"
                                        />
                                        <button class="increase" @click='handleChange(index1,index,1,parseFloat(cartProduct.zhongPackage))' :disabled="!cartProduct.checked">
                                            +
                                        </button>
                                        <span class="unit">盒</span>
                                    </template>
                                    <!-- 非强制中包装 -->
                                    <template v-else>
                                        <button class="decrease disabled" @click='handleChange(index1,index,-1,parseFloat(cartProduct.minValue))' :disabled="!cartProduct.checked">-</button>
                                        <input  type="number" class="numberInp"
                                            :readonly="!cartProduct.checked"
                                            v-model.number="cartProduct.quantity"
                                            :id="cartProduct.code+'_'+cartProduct.isDiscount"
                                            @keyup="enteryChange(index1,index,parseFloat(cartProduct.minValue))"
                                        />
                                        <button class="increase" @click='handleChange(index1,index,1,parseFloat(cartProduct.minValue))' :disabled="!cartProduct.checked">
                                            +
                                        </button>
                                        <span class="unit">盒</span>
                                    </template>
                                </div>
                            </div>
                            <!-- 删除按钮 -->
                            <div class="deleteBtn">
                                <span class="iconfont icon-delete"></span>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <!-- 底部 -->
        <section class="actionBar">
            <!-- 去确认 -->
            <div class="toSure">
                <div class="selectInfo" v-for="(checkallItem,index) in cartArray" :key="index" v-show="index ==currenCart">
                    <label class="check-wrap f-left" for="checkAll">
                        <span class="checkbox-inner-wrap">
                            <input type="checkbox"  checked="checked" class="checkAll" id="checkAll" v-model="checkallItem.checked" @click="handleAllCheck(index)">
                            <span class="checkbox-inner"></span>
                        </span>
                        全选
                    </label>
                    <span class="txt">
                        品种合计：
                        <span class="total totalCount" v-html="calCheckLen(index)"></span>
                        种
                    </span>
                    <span class="txt">
                        总金额：￥
                        <span class="total totalPrice" v-html="calEveryStore(index)"></span>
                    </span>
                </div>
                <div class="forSure">去确认</div>
            </div>
            <!-- 删除 -->
            <div class="toDelete">
            </div>
        </section>
        <!-- 修改商品数量弹出 -->
        <div id="changeCount" style="display:none;">
            <div class="number changeCount clearfix">
                <button class="decrease disabled">-</button>
                <input class="numberInp" >
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
    import {addClass,removeClass} from 'src/static/js/dom.js';
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
                    console.log(res);
                    res.cartTypeArray.forEach(function(item,index){
                        //追加checked
                        item.checked = true;
                        item.entryArray.forEach(function(itemList,index){
                            itemList.quantity = parseFloat(itemList.quantity);
                            //判断是否是折扣商品
                            if(itemList.isDiscount){
                                //判断是否有库存
                                if(parseFloat(itemList.discountRealStock)){
                                    //判断商品价格是否是数字
                                    if(Number(itemList.price)){
                                        itemList.checked = true;
                                        itemList.hide = true;
                                        //itemList.isnoStock = false;
                                    }else{
                                        itemList.checked = false;
                                        itemList.hide = false;

                                    }
                                    itemList.isnoStock = false;
                                }else{
                                    itemList.checked = false;
                                    itemList.hide = false;
                                    //预防新品上线的商品也没有库存时,不显示库存提醒
                                    if(Number(itemList.price)){
                                        itemList.isnoStock = true;
                                    }else{
                                        itemList.isnoStock = false;
                                    }
                                }
                            }else{
                                 //判断是否有库存
                                if(parseFloat(itemList.realStock)){
                                    //判断商品价格是否是数字
                                    if(Number(itemList.price)){
                                        itemList.checked = true;
                                        itemList.hide = true;

                                    }else{
                                        itemList.checked = false;
                                        itemList.hide = false;
                                    }
                                    itemList.isnoStock = false;
                                }else{
                                    itemList.checked = false;
                                    itemList.hide = false;
                                    //预防新品上线的商品也没有库存时,不显示库存提醒
                                    if(Number(itemList.price)){
                                        itemList.isnoStock = true;
                                    }else{
                                        itemList.isnoStock = false;
                                    }

                                }
                            }

                        })
                    });
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
            //商品数量控制
            handleChange(index1,index,numChange,step){
                let goods = this.cartArray[index1]['entryArray'][index],
                    _this = this,
                    increase = document.getElementsByClassName('increase')[index],
                    decrease = document.getElementsByClassName('decrease')[index],
                    numberInp =document.getElementsByClassName('numberInp')[index],
                    productList = document.getElementsByClassName('productList')[index],
                    checkBox = document.getElementsByClassName('check-wrap')[index],
                    selectInput = document.getElementsByClassName('selectInput')[index];
                    //console.log(index)
                    //console.log(increase)
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
                                });

                            }else{
                                goods.quantity = step;
                                layer.open({
                                    content:'商品已卖完,下次来早点哦',
                                    skin: 'msg',
                                    time: 2
                                });
                            }

                        }else if(parseFloat(goods.quantity) < step){
                            goods.quantity = step;
                            layer.open({
                                content:'购买量不能少于'+step+goods.minUnit,
                                skin: 'msg',
                                time: 2
                            });
                        }else{
                            request.post(Datas.updateCartQuantity,'uid='+_this.userId+'&quantity='+goods.quantity+'&cartName='+_this.cartArray[index1].cartName+'&code='+ goods.code)
                                .then(res =>  {
                                //console.log('成功'+res)
                            });
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
                                    content:'商品已卖完,下次来早点哦',
                                    skin: 'msg',
                                    time: 2
                                });
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
                 //判断是否为空
                if(parseFloat(goods.quantity) == 0|| goods.quantity == ''){
                   //console.log('是否为空')
                    goods.quantity = step;
                    layer.open({
                        content:'商品数量不能为小于'+step,
                        skin: 'msg',
                        time: 2
                    })
                }else{
                    //判断是否是折扣商品
                    if(this.cartArray[index1].isDiscount){
                        //判断是否输入合法的数量
                        if(parseFloat((goods.quantity*1000) % (step*1000)) != 0){
                            layer.open({
                                content:'商品数量有误,已为您修改为'+step+'的倍数',
                                skin: 'msg',
                                time: 2
                            });
                            //parseFloat((($(_this).val())*1000) % (steps*1000))/1000
                            goods.quantity = parseFloat((parseInt(goods.quantity/step)*step).toFixed(2));
                            if(goods.quantity == 0){
                                goods.quantity = step;
                            }
                        }else {
                            if(parseFloat(goods.quantity) < step){
                                goods.quantity = step;
                                layer.open({
                                    content:'购买量不能少于'+step+goods.minUnit,
                                    skin: 'msg',
                                    time: 2
                                })
                            }else if ( parseFloat(goods.quantity) >= parseFloat(goods.discountRealStock) ) {
                                goods.quantity = parseFloat((parseInt(goods.discountRealStock/step)*step).toFixed(2));
                                layer.open({
                                    content:'购买量不能高于'+ parseFloat((parseInt(goods.discountRealStock/step)*step).toFixed(2))+goods.minUnit,
                                    skin: 'msg',
                                    time: 2
                                })
                            }else{
                                 request.post(Datas.updateCartQuantity,'uid='+_this.userId+'&quantity='+goods.quantity+'&cartName='+_this.cartArray[index1].cartName+'&code='+ goods.code)
                                    .then(res =>  {
                                    //console.log('成功'+res)
                                });
                            }
                        }
                    }else{
                        //判断是否输入合法的数量
                        if(parseFloat(goods.quantity*1000) % (step*1000) != 0){
                            layer.open({
                                content:'商品数量有误,已为您修改为'+step+'的倍数',
                                skin: 'msg',
                                time: 2
                            });

                            goods.quantity = parseFloat((parseInt(goods.quantity/step)*step).toFixed(2));
                        }else {
                             if(parseFloat(goods.quantity) < step){
                                goods.quantity = step;
                                layer.open({
                                    content:'购买量不能少于'+step+goods.minUnit,
                                    skin: 'msg',
                                    time: 2
                                })
                            }else if ( parseFloat(goods.quantity) >= parseFloat(goods.realStock) ) {
                                goods.quantity = parseFloat((parseInt(goods.realStock/step)*step).toFixed(2));
                                layer.open({
                                    content:'购买量不能高于'+ parseFloat((parseInt(goods.realStock/step)*step).toFixed(2))+goods.minUnit,
                                    skin: 'msg',
                                    time: 2
                                })
                            }else{
                                request.post(Datas.updateCartQuantity,'uid='+_this.userId+'&quantity='+goods.quantity+'&cartName='+_this.cartArray[index1].cartName+'&code='+ goods.code)
                                    .then(res =>  {
                                    console.log('成功'+res)
                                });
                            }
                        }

                    }
                }
            },
            //全选
            handleAllCheck(index){
                let goodsList = this.cartArray[index]['entryArray'],
                    len = goodsList.length;
                if ( this.cartArray[index]['checked'] ) {
                    for (var i = 0; i < len; i++ ) {
                        goodsList[i]['checked'] = false;
                    }
                } else {
                    for (var i = 0; i < len; i++ ) {
                        goodsList[i]['checked'] = true;
                    }
                }
                this.cartArray[index]['checked'] = !this.cartArray[index]['checked'];
            },
            // 计算每个tab的商品总额
            calEveryStore (index) {
                var storeMoney = 0,
                    list = this.cartArray[index]['entryArray'];
                list.forEach(function(item, index, arr) {
                    if ( list[index]['checked'] ) {
                        if(parseFloat(item.price)){
                            storeMoney += parseFloat(item.price) * parseFloat(item.quantity);
                        }
                    }
                });

                return storeMoney.toFixed(2);
            },
            //单选
            choose : function(index1, index) {
                var list = this.cartArray[index1]['entryArray'],
                    len = list.length;
                if ( list[index]['checked'] ) {
                    console.log(1)
                    this.cartArray[index1]['checked'] = false;
                    list[index]['checked'] = !list[index]['checked'];

                } else {
                    list[index]['checked'] = !list[index]['checked'];

                }
                var inputLen = $('.cartView').eq(index1).find('input[name="productCodes[]"]').length;
                var checkLen = this.calCheckLen(index1);
                // 判断是否选择当前tab的全选
                if(checkLen ==inputLen){
                    this.cartArray[index1]['checked'] = true;
                }else{
                    this.cartArray[index1]['checked'] = false;
                }

            },
            //计算选中了多少个商品
            calCheckLen(index){
                var checkLen = 0,
                    list = this.cartArray[index]['entryArray'];
                list.forEach(function(item, index, arr) {
                    if ( list[index]['checked'] ) {
                        checkLen += 1
                    }
                });

                return checkLen;
            },
            //编辑
            handleEdit(){
                console.log('编辑')
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


