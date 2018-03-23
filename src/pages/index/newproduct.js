import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import HeadTop from 'src/common/header.vue';
import { request } from 'common';
import * as Datas from "api";

import '@style/topic.less';

// Vue.config.productionTip = false;
new Vue({
    el: '#newProduct',
    router,
    components:{
        HeadTop
    },
    data(){
        return{
            'resultArray': [],
            'resultAdArray': []
        };
    },
    methods: {
        getDatas(){
            request.get(Datas.newProductData, {}).then(res => {
                this.resultArray = res.resultArray;
            });
        }
    },
    created(){
        this.getDatas();
    },
});
