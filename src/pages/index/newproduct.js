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
Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});
//分页
Vue.use(infiniteScroll);
import '@style/topic.less';

// Vue.config.productionTip = false;
new Vue({
    el: '#newProduct',
    router,
    components:{
        HeadTop,
        ProductList
    },
    data(){
        return{
            resultArray: [],
            resultAdArray: [],
            bannurl:'../../static/images/topic/newproductMark.png',
            userId:null,
            companyCode:'1000',
            currentPage:0,
            pageSize:10,
            busy: false,
        };
    },
    methods: {
        initDatas(){
            request.get(Datas.newProductData,'companyCode='+this.companyCode).then(res => {
                this.resultArray = res.resultArray;
            });
        },
        getDatas(){
            request.get(Datas.newProductData, 'uid='+this.userId).then(res => {
                this.resultArray = res.resultArray;
            });
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
    getGoodsList(flag){
        let sort = this.sortFlag ? 1 : -1;
        let param = {};
        if(this.userId){
            request.post(Datas.newProductData,'uid='+this.userId+'&currentPage='+this.currentPage).then(res=>{
                if(flag){
                    // 多次加载数据
                    this.resultArray = this.resultArray.concat(res.resultArray);
                    if(res.resultArray == 0){
                        this.busy = true;
                    }else{
                        this.busy = false;
                    }
                }else{
                    // 第一次加载数据
                    this.resultArray = res.resultArray;
                    // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                    this.busy = false;
                }
            });
        }else{
            request.post(Datas.getControlsale,'companyCode='+this.companyCode+'&currentPage='+this.currentPage).then(res=>{
                if(flag){
                    // 多次加载数据
                    this.resultArray = this.resultArray.concat(res.resultArray);
                    if(res.resultArray == 0){
                        this.busy = true;
                    }else{
                        this.busy = false;
                    }
                }else{
                    // 第一次加载数据
                    this.resultArray = res.resultArray;
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
});
