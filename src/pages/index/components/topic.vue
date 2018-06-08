<template>
    <!-- 产品楼层 -->
    <div class="productListBox">
        <div class="product-floor" v-for="(productItemList,index) in infoDatas" :key="index" >
            <div class="product-thumb floor-item">
                <a href="javascript:void(0);">
                    <img v-lazy="productItemList.imgsrc" alt=""/>
                </a>
            </div>
            <!-- 产品信息 -->
            <div class="product-instr floor-item">
                <p class="product-name">
                    <a href="javascript:void(0);">
                        {{productItemList.name}}
                    </a>
                </p>
                <p class="factory-name txt-style">
                    {{productItemList.ean}}
                </p>
                <p class="product-spec txt-style">
                    {{productItemList.specifications}}
                </p>
                <p class="product-package txt-style">
                    中/大包装：{{productItemList.quantityFormat}}
                </p>
                <p class="product-date txt-style">
                    生产日期：{{productItemList.productionDate}}
                </p>
                <p class="product-validity txt-style">
                    有效日期：{{productItemList.effectiveDate}}
                    <template v-if="productItemList.validity">
                        <span style="color:#ff3a32">(1年内，请慎拍)</span>
                    </template>
                </p>

                <div class="product-state-box clearfix">
                    <div class="product-price f-left">
                        <span class="txt-style">价格：</span>
                        <span class="price">
                            <span v-if="Number(productItemList.price)">&yen;</span>
                            {{productItemList.price}}
                            <span v-if="userId && Number(productItemList.price)">/{{productItemList.minUnit}}</span>
                        </span>
                    </div>
                    <div class="product-inventory f-right">
                        <span class="txt-style">库存：</span>
                        <span class="txt-style">{{productItemList.realStock}}</span>
                    </div>
                </div>
                <div class="productOperateBox">
                    <p v-if="productItemList.constraint">请按<b>{{productItemList.zhongPackage}}</b>的倍数购买</p>
                    <div class="product-user clearfix">
                        <!-- 强制中包装 -->
                        <template v-if="productItemList.constraint">
                            <!-- 减 -->
                            <span class="minus f-left" @click="handleChange(index,-1,parseFloat(productItemList.zhongPackage))">-</span>
                            <!-- 输入框 -->
                            <input type="number"  class="product-amount f-left" v-model.number="productItemList.quantity" @blur="enteryChange(index,parseFloat(productItemList.zhongPackage))"/>
                            <!-- 加 -->
                            <span class="plus f-left" @click="handleChange(index,1,parseFloat(productItemList.zhongPackage))">+</span>
                        </template>
                        <!-- 非强制中包装 -->
                        <template v-else>
                            <!-- 减 -->
                            <span class="minus f-left" @click="handleChange(index,-1,parseFloat(productItemList.minValue))">-</span>
                            <!-- 输入框 -->
                            <input type="number"  class="product-amount f-left" v-model.number="productItemList.quantity"  @blur="enteryChange(index,parseFloat(productItemList.minValue))"/>
                            <!-- 加 -->
                            <span class="plus f-left" @click="handleChange(index,1,parseFloat(productItemList.minValue))">+</span>
                        </template>

                        <span class="product-unit txt-style f-left">{{productItemList.minUnit}}</span>
                        <!-- 加入购物车按钮 -->
                        <template v-if="userId">
                            <a class="add-cart f-right addToCart" v-if="Number(productItemList.price) && productItemList.realStock != '无货' && productItemList.realStock != '缺货'" href="javascript:void(0);">加入购物车</a>
                            <a class="add-cart f-right bgWhite" v-else-if="productItemList.realStock == '无货'" href="javascript:void(0);" @click="arrivalMsgarrivalMsg(productItemList.code)">到货通知</a>
                            <a class="add-cart f-right bgGray" v-else-if="!Number(productItemList.price) || productItemList.realStock == '缺货'" href="javascript:void(0);">加入购物车</a>
                        </template>
                        <template v-else>
                            <a class="add-cart f-right" href="/user/index#/login">加入购物车</a>
                        </template>


                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import 'src/static/plugins/layer_mobile/layer.js';
import 'src/static/plugins/layer_mobile/need/layer.css';
import Vue from 'vue';
import { request } from 'common';
import * as Datas from 'api';
import {setStore,getStore} from '@js/config';

export default {
    props: {
        infoDatas: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            productsInfo:[],
            userId:null
        };
    },
    created(){
        //获取用户信息
        this.userId = getStore('user_id');
    },
    methods:{
        layerMsg(msg){
            layer.open({
                style:'background:rgba(255,191,87,0.8);color:#333;',
                content:'<div class="myMsgContent"><span class="msgIcon"><img src="../../../static/images/public/my_msg.png"></span><span class="msgTxt">'+msg+'</span></div>',
                skin: 'msg',
                time: 2
            })
        },
        msgFn(steps,max,minUnit){
            var msgObj = {
                msgA:"购买数量不能小于<b>"+steps+"</b>"+minUnit,
                msgB:"购买数量不能大于<b>"+parseFloat((parseInt(max/steps)*steps).toFixed(2))+"</b>"+minUnit,
                msgC:"数量输入错误,已为您修改为<b>"+steps+"</b>的倍数",
                msgD:"商品已卖完,下次来早点哦"
            }
            return msgObj;
        },
        handleChange(index,numChange,step){
            var _this = this,
                goods = this.infoDatas[index],
                numberInp =document.getElementsByClassName('product-amount')[index],
                max = 9999999;
            var msgParms =  _this.msgFn(step,max,goods.minUnit);
            if ( numChange == 1 ) {
                //加
                goods.quantity = parseFloat(goods.quantity);
                goods.quantity = parseFloat((parseInt(goods.quantity*1000+step*1000)/1000).toFixed(2));
                console.log('jian'+goods.quantity);
                operateFn();

            } else if ( numChange == -1 ) {
                //减
                goods.quantity = parseFloat(goods.quantity);
                //goods.quantity -= step;
                goods.quantity =parseFloat((parseInt(goods.quantity*1000-step*1000)/1000).toFixed(2));
                // console.log('--'+ goods.quantity);
                operateFn()

            }
            //判断是否是折扣商品
            function operateFn(){
                //console.log('是否是折扣商品'+_this.cartArray[index1].isDiscount)
                if ( parseFloat(goods.quantity) >= parseFloat(max) ) {
                    //库存大于步长
                    if(parseFloat(max) > step){
                        goods.quantity = parseFloat((parseInt(max/step)*step).toFixed(2));
                         _this.layerMsg(msgParms.msgB);
                    }else{
                        goods.quantity = step;
                         _this.layerMsg(msgParms.msgD);
                    }
                }else if(parseFloat(goods.quantity) < step){
                    goods.quantity = step;
                    _this.layerMsg(msgParms.msgA)
                }else{
                    console.log('数量框'+goods.quantity)
                    numberInp.value = goods.quantity;
                }
            }
        },
        //输入
        enteryChange(index,step){
            let goods = this.infoDatas[index],
                _this = this,
                numberInp =document.getElementsByClassName('product-amount')[index],
                max = 9999999;
            var msgParms =  _this.msgFn(step,max,goods.minUnit);
            //判断是否为空
            if(parseFloat(goods.quantity) == 0|| goods.quantity == ''){
                //console.log('是否为空')
                goods.quantity = step;
                numberInp.value = step;
                _this.layerMsg(msgParms.msgA);
            }else{
                //判断是否输入合法的数量
                if(parseFloat(numberInp.value*1000) % (step*1000) != 0){
                    _this.layerMsg(msgParms.msgC);
                    if(goods.quantity < step){
                        goods.quantity = step;
                        numberInp.value = step;
                    }else{
                        goods.quantity = parseFloat((parseInt(goods.quantity/step)*step).toFixed(2));
                        numberInp.value = parseFloat((parseInt(numberInp.value/step)*step).toFixed(2));
                    }

                }else {
                    if(parseFloat(numberInp.value) < step){
                        goods.quantity = step;
                        numberInp.value = step;
                        _this.layerMsg(msgParms.msgA);
                    }else if ( parseFloat(numberInp.value) >= parseFloat(max) ) {
                        goods.quantity = parseFloat((parseInt(max/step)*step).toFixed(2));
                        numberInp.value = parseFloat((parseInt(max/step)*step).toFixed(2));
                        _this.layerMsg(msgParms.msgB);
                    }else{
                        numberInp.value = goods.quantity;
                    }
                }
            }
        },
        //到货通知
        arrivalMsg(codeId){
            request.post(Datas.getArrivalNotify,{uid:this.userId,code:codeId})
                .then(res =>  {
                    console.log('成功'+res)
                    layer.open({
                        content: '如果该商品30天内到货,我们会短信通知您',
                        skin: 'msg',
                        icon:1,
                        time: 2 //2秒后自动关闭
                    });
                }
            );

        }



    },
    mounted(){
        //console.log(this.productsInfo)
       // console.log('userId'+this.userId)

    }
}
</script>

