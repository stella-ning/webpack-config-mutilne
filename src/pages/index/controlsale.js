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
    el: '#controlSale',
    router,
    components:{
        HeadTop,
    },
    data(){
        return{
            controlSaleArray: [],
            busy: false,
            currentPage:0,
            pageSize: 10,
            companyCode:1000,
            userId:null,
        };
    },
    methods: {
        initDatas(){
            request.post(Datas.getControlsale,{}).then(res => {
                this.controlSaleArray = res.controlsaleArray;
                this.controlSaleArray.forEach(function(itemList){
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
            request.post(Datas.getControlsale, 'uid='+this.userId).then(res => {
                this.controlSaleArray = res.controlsaleArray;
                this.controlSaleArray.forEach(function(itemList){
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
            let sort = this.sortFlag ? 1 : -1;
            let param = {};
            if(this.userId){
                request.post(Datas.getControlsale,'uid='+this.userId+'&currentPage='+this.currentPage).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.controlSaleArray = this.controlSaleArray.concat(res.controlsaleArray);
                        if(res.controlsaleArray == 0){
                            this.busy = true;
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.controlSaleArray = res.controlsaleArray;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                });
            }else{
                request.post(Datas.getControlsale,'currentPage='+this.currentPage).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.controlSaleArray = this.controlSaleArray.concat(res.controlsaleArray);
                        if(res.controlsaleArray == 0){
                            this.busy = true;
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.controlSaleArray = res.controlsaleArray;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                });
            }
        },
        loadMore: function() {
            this.busy = true;
            // 多次加载数据
            setTimeout(() => {
                this.currentPage ++;
                this.getGoodsList(true);
            }, 100);
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

});
