import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import HeadTop from 'src/common/header.vue';
import ProductList from './components/topic.vue';

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});

import '@style/topic.less';

// Vue.config.productionTip = false;
new Vue({
    el: '#controlSale',
    router,
    components:{
        HeadTop,
        ProductList
    },
    data(){
        return{
            'controlSaleArray': [],
            'resultAdArray': []
        };
    },
    methods: {
        getDatas(){
            request.post(Datas.getControlsale, {}).then(res => {
                this.controlSaleArray = res.controlsaleArray;
            });
        }
    },
    created(){
        this.getDatas();
    },
});
