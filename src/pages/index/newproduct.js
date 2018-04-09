//import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import HeadTop from 'src/common/header.vue';
import ProductList from './components/topic.vue';
import {getStore,setStore} from '@js/config'
Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});

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
            pageSize:10
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
});
