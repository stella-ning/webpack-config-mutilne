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
    el: '#specialOffer',
    router,
    components:{
        HeadTop,
        ProductList
    },
    data(){
        return{
            'specialOfferArray': [],
            'resultAdArray': [],
            'bannurl':'../../static/images/topic/specialOfferMark.png'
        };
    },
    methods: {
        getDatas(){
            request.post(Datas.getSpecialOffers, {}).then(res => {
                this.specialOfferArray = res.resultArray;
            });
        }
    },
    created(){
        this.getDatas();
    },
});
