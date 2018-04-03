//import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import { request , resolveParams } from 'common';
import * as Datas from 'api';
import VueLazyLoad from 'vue-lazyload';
import {setStore,getStore} from '@js/config';
import 'src/static/plugins/swiper-3.4.2.min.js';
import {addClass,removeClass} from 'src/static/js/dom.js';
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
            userId:'',
            userCode:'',//站点编号
            code:'',//商品编号
            name:'',
            ean:'',
            form:'',
            minUnit:'',
            minValue:null,
            price:'',
            zhongPackage:'',
            bigPackage:'',
            effectiveDate:'',
            productionDate:'',
            barcode:'',
            licenseNumber:'',
            productPicArray:[],
            productRefereArray:[],
            quantityFormat:[],
            realStock:'',
            saleScope:'',
            otc:'',
            sentUrl:'',
            specifications:'',
            supercategories:'',
            isShow:false,//是否显示菜单栏
            isShowDiscount: true,//是否选中折扣商品
            salesPromotion:'',//促销信息
            medicalDeviceLicense:'',
            instructions:'',
            isDiscount:true,//是否是折扣商品
            discountPrice:'',
            discountRealStock:'',
            discountPackage:'',
            discountBigPackage:'',
            discountProductionDate:'',
            discountEffectiveDate:'',
            discountValidity:'',

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
            let $this = this;
            $this.userId = getStore('user_id') || '',
            $this.userCode = getStore('user_code') || '';
            //'code='+$this.code+'&uid='+userId+'&companyCode='+userCode
            request.post(Datas.productDetail,'code='+$this.code)
                .then(res => {
                    //this.specialOfferArray = res.resultArray;
                    console.log(res);
                    $this.code = res.code;
                    $this.name = res.name;
                    $this.ean = res.ean;
                    $this.form = res.form;
                    $this.otc = res.otc;
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
        },
        handleChoseNormal(event){
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('.discountTab');
            removeClass(siblingDom ,'active');
            this.isShowDiscount = false;
        },
        handleChoseDiscount(event){
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('.normalTab');
            removeClass(siblingDom ,'active');
            this.isShowDiscount = true;
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
