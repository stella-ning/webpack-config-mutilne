
import 'src/static/plugins/layer_mobile/layer.js';
import 'src/static/plugins/layer_mobile/need/layer.css';
import Vue from 'vue';
import 'babel-polyfill';
import router from './router/router.js';
//分页
import infiniteScroll from 'vue-infinite-scroll';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import HeadTop from 'src/common/header.vue';
import {setStore,getStore} from '@js/config';
import {addClass,removeClass} from 'src/static/js/dom.js';
import $ from 'jquery';

//懒加载
Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});
//分页
Vue.use(infiniteScroll);

import '@style/topic.less';

// Vue.config.productionTip = false;
new Vue({
    el: '#outLetBox',
    router,
    components:{
        HeadTop
    },
    data(){
        return{
            outLetArray: [],
            busy: false,
            currentPage:0,
            pageSize: 10,
            companyCode:1000,
            userId:null,
            priceChecked:'',
        };
    },
    computed:{

    },
    methods: {
        initDatas(){
            let $this = this;
            request.post(Datas.getDiscountDepot, 'companyCode='+$this.companyCode).then(res => {
                //console.log(res);
                $this.outLetArray = res.resultArray;
                $this.pageSize = res.pageSize;
                this.outLetArray.forEach(function(itemList){
                    //追加数量框数据
                    if(itemList.constraint){
                        itemList.quantity = itemList.zhongPackage;
                    }else{
                        itemList.quantity = itemList.minValue;
                    }
                });
            });
        },
        getDatas(){
            let $this = this;
            request.post(Datas.getDiscountDepot, 'uid='+$this.userId).then(res => {
                //console.log(res);
                $this.outLetArray = res.resultArray;
                $this.pageSize = res.pageSize;
                this.outLetArray.forEach(function(itemList){
                    //追加数量框数据
                    if(itemList.constraint){
                        itemList.quantity = itemList.zhongPackage;
                    }else{
                        itemList.quantity = itemList.minValue;
                    }
                });
            });
        },
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
                goods = this.outLetArray[index],
                goodsId = 'product_'+goods.code,
                numberInp = $('#'+goodsId),
                max = 9999999;
            var msgParms =  _this.msgFn(step,max,goods.minUnit);
            if ( numChange == 1 ) {
                //加
                goods.quantity = parseFloat(goods.quantity);
                console.log('jian'+goods.quantity);
                goods.quantity = parseFloat((parseInt(goods.quantity*1000+step*1000)/1000).toFixed(2));
                operateFn();

            } else if ( numChange == -1 ) {
                //减
                goods.quantity = parseFloat(goods.quantity);
                goods.quantity =parseFloat((parseInt(goods.quantity*1000-step*1000)/1000).toFixed(2));
                operateFn();
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
                    _this.layerMsg(msgParms.msgA);

                }else if(parseFloat(goods.quantity*1000) % (step*1000) != 0){
                    if(goods.quantity < step){
                        goods.quantity = step;
                        console.log(345)
                    }else{
                        goods.quantity = parseFloat((parseInt(goods.quantity/step)*step).toFixed(2));
                        console.log(123)
                    }
                }
                numberInp.val(goods.quantity);
            }
        },
        //输入
        enteryChange(index,step){
            let goods = this.outLetArray[index],
                _this = this,
                numberInp =document.getElementsByClassName('product-amount')[index],
                max = 9999999;
            var msgParms =  _this.msgFn(step,max,goods.minUnit);
            //判断是否为空
            if(parseFloat(goods.quantity) == 0|| goods.quantity == ''){
                //console.log('是否为空')
                goods.quantity = step;
                //numberInp.value = step;
                _this.layerMsg(msgParms.msgA);
            }else{
                //判断是否输入合法的数量
                if(parseFloat(goods.quantity*1000) % (step*1000) != 0){
                    _this.layerMsg(msgParms.msgC);
                    if(goods.quantity < step){
                        goods.quantity = step;
                        //numberInp.value = step;
                    }else{
                        goods.quantity = parseFloat((parseInt(goods.quantity/step)*step).toFixed(2));
                        //numberInp.value = parseFloat((parseInt(numberInp.value/step)*step).toFixed(2));
                    }

                }else {
                    if(parseFloat(goods.quantity) < step){
                        goods.quantity = step;
                        //numberInp.value = step;
                        _this.layerMsg(msgParms.msgA);
                    }else if ( parseFloat(goods.quantity) >= parseFloat(max) ) {
                        goods.quantity = parseFloat((parseInt(max/step)*step).toFixed(2));
                        //numberInp.value = parseFloat((parseInt(max/step)*step).toFixed(2));
                        _this.layerMsg(msgParms.msgB);
                    }
                }
            }
        },
        //到货通知
        arrivalMsg(codeId){
            request.post(Datas.addNotice,'uid='+this.userId+'&code='+codeId)
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
        },
        //加入购物车
        addToCart(codeId,quantity,step){
            if(quantity < step || parseFloat(quantity*1000) % (step*1000) != 0){
                layer.open({
                    style:'background:rgba(255,191,87,0.8);color:#333;',
                    content:'<div class="myMsgContent"><span class="msgIcon"><img src="../../../static/images/public/my_msg.png"></span><span class="msgTxt">购买数量有误,请修改购买数量</span></div>',
                    skin: 'msg',
                    time: 2
                });
            }else{
                request.post(Datas.joinCart,'uid='+this.userId+'&code='+codeId+'&quantity='+quantity)
                    .then(res =>  {
                        console.log('成功'+res)
                        layer.open({
                            content: '成功加入购物车',
                            skin: 'msg',
                            icon:1,
                            time: 2 //2秒后自动关闭
                        });
                    }
                );
            }

        },
        getGoodsList(flag){
            //let sort = this.sortFlag ? 1 : -1;

            if(this.userId){
                request.post(Datas.getDiscountDepot,'uid='+this.userId+'&currentPage='+this.currentPage).then(res=>{
                    res.resultArray.forEach(function(itemList){
                        //追加数量框数据
                        if(itemList.constraint){
                            itemList.quantity = itemList.zhongPackage;
                        }else{
                            itemList.quantity = itemList.minValue;
                        }
                    });
                    if(flag){
                        // 多次加载数据
                        this.outLetArray = this.outLetArray.concat(res.resultArray);
                        if(res.resultArray == 0){
                            this.busy = true;
                            document.querySelector('.loading').innerHTML = '没有更多了';
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.outLetArray = res.resultArray;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                });
            }else{
                request.post(Datas.getDiscountDepot,'companyCode='+this.companyCode+'&currentPage='+this.currentPage).then(res=>{
                    res.resultArray.forEach(function(itemList){
                        //追加数量框数据
                        if(itemList.constraint){
                            itemList.quantity = itemList.zhongPackage;
                        }else{
                            itemList.quantity = itemList.minValue;
                        }
                    });
                    if(flag){
                        // 多次加载数据
                        this.outLetArray = this.outLetArray.concat(res.resultArray);
                        if(res.outLetArray == 0){
                            this.busy = true;
                            document.querySelector('.loading').innerHTML = '没有更多了';
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.outLetArray = res.resultArray;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                });
            }
        },
        loadMore() {
            this.busy = true;
            // 多次加载数据
            setTimeout(() => {
                this.currentPage ++;
                this.getGoodsList(true);
            }, 100);
        },
        sortByStock(event){
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('.sortProduce');
            removeClass(siblingDom ,'active');
            this.outLetArray.sort(function(x,y){
                return x.realStock-y.realStock;
            });
        },
        sortByTime(){
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('.sortStock');
            removeClass(siblingDom ,'active');
            //将日期转换为时间戳
            this.outLetArray.forEach(function(outLetItem){
                var date = new Date(outLetItem.creationDate);
                outLetItem.creationDate = date.getTime();
            });
            this.outLetArray.sort(function(x,y){
                return x.creationDate-y.creationDate;
            });
        }

    },
    created(){
        //获取用户信息
        let hasUserId = getStore('user_id'),
            hasuserCode = getStore('user_code');
        if(hasUserId){
            this.userId = hasUserId;
            this.companyCode = hasuserCode;
            this.getDatas();
        }else{
            this.initDatas();
        }

    },
    mounted(){


    },


});
