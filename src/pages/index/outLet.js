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
import ProductList from './components/topic.vue';

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
        HeadTop,
        ProductList
    },
    data(){
        return{
            'controlSaleArray': [],
            'busy': false,
            'page':0,
            'pageSize': 10

        };
    },
    methods: {
        getDatas(){
            request.post(Datas.getControlsale, {}).then(res => {
                this.controlSaleArray = res.controlsaleArray;
            });
        },
        getGoodsList(flag){
            let sort = this.sortFlag ? 1 : -1;
            let param = {
                sort:sort,
                priceLevel:this.priceChecked,
                page:this.page,
                pageSize:this.pageSize
            };
            request.post(Datas.getControlsale,{params:param}).then(res=>{
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
        },
        loadMore: function() {
            this.busy = true;
            // 多次加载数据
            setTimeout(() => {
                this.page ++;
                this.getGoodsList(true);
            }, 100);
        }

    },
    created(){
        this.getDatas();
    },

});
