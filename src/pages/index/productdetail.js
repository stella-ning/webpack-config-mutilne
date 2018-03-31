//import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import { request , resolveParams } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import {setStore,getStore} from '@js/config';
import 'src/static/plugins/swiper-3.4.2.min.js';

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});


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
            isShow: false,
            salesPromotion:'',//促销信息
        };
    },
    beforemount(){

    },
    methods: {
        handleMenu() {
            this.isShow = !this.isShow;
        },
        goback(){
            window.history.go(-1);
        },
        getDatas(){
            let $this = this,
                userId = getStore('user_id'),
                userCode = getStore('user_code');
            //'code='+$this.code+'&uid='+userId+'&companyCode='+userCode
            request.post(Datas.productDetail,'code='+$this.code,)
                .then(res => {
                    //this.specialOfferArray = res.resultArray;
                    console.log(res);
                    $this.code = res.code;
                    $this.name = res.name;
                    $this.ean = res.ean;
                    $this.form = res.form;
                    $this.minUnit = res.minUnit;
                    $this.minValue = res.minValue;
                    $this.price = res.price;
                    $this.effectiveDate = res.effectiveDate;
                    $this.productionDate = res.productionDate;
                    $this.barcode = res.barcode;
                    $this.licenseNumber = res.licenseNumber;
                    $this.productPicArray = res.productPicArray;
                    $this.productRefereArray = res.productRefereArray;
                    $this.quantityFormat = res.quantityFormat;
                    $this.realStock = res.realStock;
                    $this.saleScope = res.saleScope;
                    $this.sentUrl = res.sentUrl;
                    $this.specifications = res.specifications;
                    $this.supercategories = res.supercategories;
                    $this.salesPromotion = res.salesPromotion || '';
                });
        }
    },
    beforeCreate(){

    },
    created(){
        //获取url参数
        var param = resolveParams();
        this.code = param.code;
        this.getDatas();
    },
    mounted(){
        //产品图片
        new Swiper('.prodectPictureBox', {
            pagination: '.swiper-pagination',
            loop: true,
            observer:true,
            observeParents:true
        });
    }
});
