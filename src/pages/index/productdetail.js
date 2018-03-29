//import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import { request , resolveParams } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});

import '@style/topic.less';
import '@style/productdetail';
Vue.config.productionTip = false;
new Vue({
    el: '#productdetail',
    router,
    components:{
    },
    data(){
        return{
            code:'',
            name:'',
            ean:'',
            form:'',
            minUnit:'',
            minValue:null,
            price:'',
            effectiveDate:'',
            productionDate:'',
            barcode:'',
            licenseNumber:'',
            productPicArray:[],
            productRefereArray:[],
            quantityFormat:[],
            realStock:'',
            saleScope:'',
            sentUrl:'',
            specifications:'',
            supercategories:'',
            isShow: false
        };
    },
    beforemount(){
    },
    methods: {
        handleMenu() {
            this.isShow = !this.isShow;
        },
        getDatas(){
            request.post(Datas.productDetail+'?code='+2717, {
                'code':this.code
            }).then(res => {
                //this.specialOfferArray = res.resultArray;
                console.log(res);
            });
        }
    },
    beforeCreate(){

    },
    created(){
        var param = resolveParams();
        this.code = param.code;
        this.getDatas();
    },
});
