//import 'babel-polyfill';
import Vue from 'vue';
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
        getGoodsList(flag){
            //let sort = this.sortFlag ? 1 : -1;

            if(this.userId){
                request.post(Datas.getDiscountDepot,'uid='+this.userId+'&currentPage='+this.currentPage).then(res=>{
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
