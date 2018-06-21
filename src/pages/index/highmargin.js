import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import HeadTop from 'src/common/header.vue';
import ProductList from './components/topic.vue';
import {getStore,setStore} from '@js/config';
//分页
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});

import '@style/topic.less';

// Vue.config.productionTip = false;
new Vue({
    el: '#highmargin',
    router,
    components:{
        HeadTop,
        ProductList
    },
    data(){
        return{
            highmarginArray: [],
            resultAdArray: [],
            bannurl:'../../static/images/topic/highProfit.png',
            userId:null,
            companyCode:'1000',
            currentPage:0,
            pageSize:10,
            busy: false,
        };
    },
    methods: {
        initDatas(){
            request.post(Datas.getHighMargin,'companyCode='+this.companyCode).then(res => {
                this.highmarginArray = res.resultArray;
                this.highmarginArray.forEach(function(itemList){
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
            request.post(Datas.getHighMargin,'uid='+this.userId).then(res => {
                this.highmarginArray = res.resultArray;
                this.highmarginArray.forEach(function(itemList){
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
                request.post(Datas.getHighMargin,'uid='+this.userId+'&currentPage='+this.currentPage).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.highmarginArray = this.highmarginArray.concat(res.resultArray);
                        if(res.resultArray == 0){
                            this.busy = true;
                            document.querySelector('.loading').innerHTML = '没有更多了';
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.highmarginArray = res.resultArray;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                });
            }else{
                request.post(Datas.getHighMargin,'companyCode='+this.companyCode+'&currentPage='+this.currentPage).then(res=>{
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
                        this.highmarginArray = this.highmarginArray.concat(res.resultArray);
                        if(res.resultArray == 0){
                            this.busy = true;
                            document.querySelector('.loading').innerHTML = '没有更多了';
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.highmarginArray = res.resultArray;
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
