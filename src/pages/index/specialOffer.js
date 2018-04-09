//import 'babel-polyfill';
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
    el: '#specialOffer',
    router,
    components:{
        HeadTop,
        ProductList
    },
    data(){
        return{
            specialOfferArray: [],
            resultAdArray: [],
            bannurl:'../../static/images/topic/specialOfferMark.png',
            userId:null,
            companyCode:'1000',
            currentPage:0,
            pageSize:10,
            busy: false,
        };
    },
    methods: {
        initDatas(){
            request.post(Datas.getSpecialOffers,'companyCode='+this.companyCode).then(res => {
                this.specialOfferArray = res.resultArray;
            });
        },
        getDatas(){
            request.post(Datas.getSpecialOffers,'uid='+this.userId).then(res => {
                this.specialOfferArray = res.resultArray;
            });
        },
        getGoodsList(flag){
            //let sort = this.sortFlag ? 1 : -1;
            if(this.userId){
                request.post(Datas.getSpecialOffers,'uid='+this.userId+'&currentPage='+this.currentPage).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.specialOfferArray = this.specialOfferArray.concat(res.resultArray);
                        if(res.resultArray == 0){
                            this.busy = true;
                            document.querySelector('.loading').innerHTML = '没有更多了';
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.specialOfferArray = res.resultArray;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                });
            }else{
                request.post(Datas.getSpecialOffers,'companyCode='+this.companyCode+'&currentPage='+this.currentPage).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.specialOfferArray = this.specialOfferArray.concat(res.resultArray);
                        if(res.resultArray == 0){
                            this.busy = true;
                            document.querySelector('.loading').innerHTML = '没有更多了';
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.specialOfferArray = res.resultArray;
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
