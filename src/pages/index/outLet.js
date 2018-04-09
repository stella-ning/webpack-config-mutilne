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
    el: '#outLetBox',
    router,
    components:{
        HeadTop
    },
    data(){
        return{
            outLetArray: [],
            busy: false,
            page:0,
            pageSize: 10,
            companyCode:1000,
            userId:null,
            priceChecked:''
        };
    },
    methods: {
        initDatas(){
            let $this = this;
            request.post(Datas.getDiscountDepot, 'companyCode='+$this.companyCode).then(res => {
                console.log(res);
                $this.outLetArray = res.resultArray;
                $this.pageSize = res.pageSize;
            });
        },
        getDatas(){
            let $this = this;
            request.post(Datas.getDiscountDepot, 'uid='+$this.userId).then(res => {
                console.log(res);
                $this.outLetArray = res.resultArray;
                $this.pageSize = res.pageSize;
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
            request.post(Datas.getDiscountDepot,{params:param}).then(res=>{
                if(flag){
                    // 多次加载数据
                    this.outLetArray = this.outLetArray.concat(res.resultArray);
                    if(res.resultArray == 0){
                        this.busy = true;
                        document.querySelector('.loading').innerHTML = '没有更多了';
                        //console.log(document.querySelector('.loading').innerHTML);
                    }else{
                        this.busy = false;
                    }
                }else{
                    // 第一次加载数据
                    this.outLetArray = res.resultArray;
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
    mounted(){
        window.onload = function(){
            let stock = document.querySelectorAll('.stock');
            for(let i=0;i<stock.length;i++){
                var value = stock[i].innerHTML;
                stock[i].innerHTML = parseFloat(stock[i].innerHTML);
            }
        }

    }

});
