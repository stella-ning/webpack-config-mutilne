
import Vue from 'vue';
import 'babel-polyfill';
import router from './router/router.js';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import HeadTop from 'src/common/header.vue';

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});
import '@style/topic.less';

new Vue({
    el: '#newbuygift',
    router,
    components:{
        HeadTop
    },
    data(){
        return{
            'newbuygiftArray': [],
            'bannurl':'../../static/images/topic/newbuygift.png'
        };
    },
    methods: {
        getDatas(){
            request.post(Datas.getManysimple, {}).then(res => {
                this.newbuygiftArray = res.resultArray;
            });
        }
    },
    created(){
        this.getDatas();
    },
});
