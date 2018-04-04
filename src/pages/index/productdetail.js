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
            userId:null,
            userCode:null,//站点编号
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
            isShowDiscount: false,//是否选中折扣商品
            salesPromotion:'',//促销信息
            medicalDeviceLicense:'',
            instructions:'',
            isDiscount:false,//是否是折扣商品
            discountPrice:'',
            discountRealStock:'',
            discountPackage:'',
            discountBigPackage:'',
            discountProductionDate:'',
            discountEffectiveDate:'',
            discountValidity:'',
            currentContent:0,//tab切换
            normalProduct:{
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
                isShowDiscount: false,//是否选中折扣商品
                salesPromotion:'',//促销信息
                medicalDeviceLicense:'',
                instructions:'',
                isDiscount:false,//是否是折扣商品
                discountPrice:'',
                discountRealStock:'',
                discountPackage:'',
                discountBigPackage:'',
                discountProductionDate:'',
                discountEffectiveDate:'',
                discountValidity:'',
            },
            discountProduct:{
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
                isShowDiscount: false,//是否选中折扣商品
                salesPromotion:'',//促销信息
                medicalDeviceLicense:'',
                instructions:'',
                isDiscount:false,//是否是折扣商品
                discountPrice:'',
                discountRealStock:'',
                discountPackage:'',
                discountBigPackage:'',
                discountProductionDate:'',
                discountEffectiveDate:'',
                discountValidity:''
            }
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
            $this.userId = getStore('user_id'),
            $this.userCode = getStore('user_code') || '';
            if($this.userId){
                //判断是否是折扣商品
                if($this.isDiscount){
                    request.post(Datas.productDetail,'code='+$this.code+'&uid='+$this.userId)
                        .then(res => {
                            console.log(res);
                            //保存正价商品数据
                            $this.normalProduct.code = res.code;
                            $this.normalProduct.name = res.name;
                            $this.normalProduct.ean = res.ean;
                            $this.normalProduct.form = res.form;
                            $this.normalProduct.otc = res.otc;
                            $this.normalProduct.minUnit = res.minUnit;
                            $this.normalProduct.minValue = res.minValue;
                            $this.normalProduct.price = res.price;
                            $this.normalProduct.effectiveDate = res.effectiveDate;
                            $this.normalProduct.productionDate = res.productionDate;
                            $this.normalProduct.barcode = res.barcode;
                            $this.normalProduct.licenseNumber = res.licenseNumber;
                            $this.normalProduct.productPicArray = res.productPicArray;
                            $this.normalProduct.productRefereArray = res.productRefereArray;
                            $this.normalProduct.quantityFormat = res.quantityFormat;
                            $this.normalProduct.realStock = res.realStock;
                            $this.normalProduct.saleScope = res.saleScope;
                            $this.normalProduct.sentUrl = res.sentUrl;
                            $this.normalProduct.specifications = res.specifications;
                            $this.normalProduct.supercategories = res.supercategories;
                            $this.normalProduct.salesPromotion = res.salesPromotion || '';
                            $this.normalProduct.instructions = res.instructions;
                            $this.normalProduct.zhongPackage = res.zhongPackage;
                            $this.normalProduct.bigPackage = res.bigPackage;
                            //保存折扣价商品数据
                            $this.discountProduct.code = res.discountDetailData.code;
                            $this.discountProduct.name = res.discountDetailData.name;
                            $this.discountProduct.ean = res.discountDetailData.ean;
                            $this.discountProduct.form = res.discountDetailData.form;
                            $this.discountProduct.otc = res.discountDetailData.otc;
                            $this.discountProduct.minUnit = res.discountDetailData.minUnit;
                            $this.discountProduct.minValue = res.discountDetailData.minValue;
                            $this.discountProduct.price = res.discountDetailData.price;
                            $this.discountProduct.effectiveDate = res.discountDetailData.effectiveDate;
                            $this.discountProduct.productionDate = res.discountDetailData.productionDate;
                            $this.discountProduct.barcode = res.discountDetailData.barcode;
                            $this.discountProduct.licenseNumber = res.discountDetailData.licenseNumber;
                            $this.discountProduct.productPicArray = res.discountDetailData.productPicArray;
                            $this.discountProduct.productRefereArray = res.discountDetailData.productRefereArray;
                            $this.discountProduct.quantityFormat = res.discountDetailData.quantityFormat;
                            $this.discountProduct.realStock = res.discountDetailData.realStock;
                            $this.discountProduct.saleScope = res.discountDetailData.saleScope;
                            $this.discountProduct.sentUrl = res.discountDetailData.sentUrl;
                            $this.discountProduct.specifications = res.discountDetailData.specifications;
                            $this.discountProduct.supercategories = res.discountDetailData.supercategories;
                            $this.discountProduct.salesPromotion = res.discountDetailData.salesPromotion || '';
                            $this.discountProduct.instructions = res.discountDetailData.instructions;
                            $this.discountProduct.zhongPackage = res.discountDetailData.zhongPackage;
                            $this.discountProduct.bigPackage = res.discountDetailData.bigPackage;
                            //赋值渲染
                            $this.code = $this.discountProduct.code;
                            $this.name = $this.discountProduct.name;
                            $this.ean = $this.discountProduct.ean;
                            $this.form = $this.discountProduct.form;
                            $this.otc = $this.discountProduct.otc;
                            $this.minUnit = $this.discountProduct.minUnit;
                            $this.minValue = $this.discountProduct.minValue;
                            $this.price = $this.discountProduct.price;
                            $this.effectiveDate = $this.discountProduct.effectiveDate;
                            $this.productionDate = $this.discountProduct.productionDate;
                            $this.barcode = $this.discountProduct.barcode;
                            $this.licenseNumber = $this.discountProduct.licenseNumber;
                            $this.productPicArray = $this.discountProduct.productPicArray;
                            $this.productRefereArray = $this.discountProduct.productRefereArray;
                            $this.quantityFormat = $this.discountProduct.quantityFormat;
                            $this.realStock = $this.discountProduct.realStock;
                            $this.saleScope = $this.discountProduct.saleScope;
                            $this.sentUrl = $this.discountProduct.sentUrl;
                            $this.specifications = $this.discountProduct.specifications;
                            $this.supercategories = $this.discountProduct.supercategories;
                            $this.salesPromotion = $this.discountProduct.salesPromotion;
                            $this.instructions = $this.discountProduct.instructions;
                            $this.zhongPackage = $this.discountProduct.zhongPackage;
                            $this.bigPackage = $this.discountProduct.bigPackage;
                        });
                }else{
                    request.post(Datas.productDetail,'code='+$this.code+'&uid='+$this.userId)
                        .then(res => {
                            console.log(res);
                            //保存正价商品数据
                            $this.normalProduct.code = res.code;
                            $this.normalProduct.name = res.name;
                            $this.normalProduct.ean = res.ean;
                            $this.normalProduct.form = res.form;
                            $this.normalProduct.otc = res.otc;
                            $this.normalProduct.minUnit = res.minUnit;
                            $this.normalProduct.minValue = res.minValue;
                            $this.normalProduct.price = res.price;
                            $this.normalProduct.effectiveDate = res.effectiveDate;
                            $this.normalProduct.productionDate = res.productionDate;
                            $this.normalProduct.barcode = res.barcode;
                            $this.normalProduct.licenseNumber = res.licenseNumber;
                            $this.normalProduct.productPicArray = res.productPicArray;
                            $this.normalProduct.productRefereArray = res.productRefereArray;
                            $this.normalProduct.quantityFormat = res.quantityFormat;
                            $this.normalProduct.realStock = res.realStock;
                            $this.normalProduct.saleScope = res.saleScope;
                            $this.normalProduct.sentUrl = res.sentUrl;
                            $this.normalProduct.specifications = res.specifications;
                            $this.normalProduct.supercategories = res.supercategories;
                            $this.normalProduct.salesPromotion = res.salesPromotion || '';
                            $this.normalProduct.instructions = res.instructions;
                            $this.normalProduct.zhongPackage = res.zhongPackage;
                            $this.normalProduct.bigPackage = res.bigPackage;
                            //赋值渲染
                            $this.code = $this.normalProduct.code;
                            $this.name = $this.normalProduct.name;
                            $this.ean = $this.normalProduct.ean;
                            $this.form = $this.normalProduct.form;
                            $this.otc = $this.normalProduct.otc;
                            $this.minUnit = $this.normalProduct.minUnit;
                            $this.minValue = $this.normalProduct.minValue;
                            $this.price = $this.normalProduct.price;
                            $this.effectiveDate = $this.normalProduct.effectiveDate;
                            $this.productionDate = $this.normalProduct.productionDate;
                            $this.barcode = $this.normalProduct.barcode;
                            $this.licenseNumber = $this.normalProduct.licenseNumber;
                            $this.productPicArray = $this.normalProduct.productPicArray;
                            $this.productRefereArray = $this.normalProduct.productRefereArray;
                            $this.quantityFormat = $this.normalProduct.quantityFormat;
                            $this.realStock = $this.normalProduct.realStock;
                            $this.saleScope = $this.normalProduct.saleScope;
                            $this.sentUrl = $this.normalProduct.sentUrl;
                            $this.specifications = $this.normalProduct.specifications;
                            $this.supercategories = $this.normalProduct.supercategories;
                            $this.salesPromotion = $this.normalProduct.salesPromotion;
                            $this.instructions = $this.normalProduct.instructions;
                            $this.zhongPackage = $this.normalProduct.zhongPackage;
                            $this.bigPackage = $this.normalProduct.bigPackage;
                        });
                }

            }else{
                //判断是否是折扣商品
                if($this.isDiscount){
                    request.post(Datas.productDetail,'code='+$this.code)
                        .then(res => {
                            console.log(res);
                            //保存正价商品数据
                            $this.normalProduct.code = res.code;
                            $this.normalProduct.name = res.name;
                            $this.normalProduct.ean = res.ean;
                            $this.normalProduct.form = res.form;
                            $this.normalProduct.otc = res.otc;
                            $this.normalProduct.minUnit = res.minUnit;
                            $this.normalProduct.minValue = res.minValue;
                            $this.normalProduct.price = res.price;
                            $this.normalProduct.effectiveDate = res.effectiveDate;
                            $this.normalProduct.productionDate = res.productionDate;
                            $this.normalProduct.barcode = res.barcode;
                            $this.normalProduct.licenseNumber = res.licenseNumber;
                            $this.normalProduct.productPicArray = res.productPicArray;
                            $this.normalProduct.productRefereArray = res.productRefereArray;
                            $this.normalProduct.quantityFormat = res.quantityFormat;
                            $this.normalProduct.realStock = res.realStock;
                            $this.normalProduct.saleScope = res.saleScope;
                            $this.normalProduct.sentUrl = res.sentUrl;
                            $this.normalProduct.specifications = res.specifications;
                            $this.normalProduct.supercategories = res.supercategories;
                            $this.normalProduct.salesPromotion = res.salesPromotion || '';
                            $this.normalProduct.instructions = res.instructions;
                            $this.normalProduct.zhongPackage = res.zhongPackage;
                            $this.normalProduct.bigPackage = res.bigPackage;
                            //保存折扣价商品数据
                            $this.discountProduct.code = res.discountDetailData.code;
                            $this.discountProduct.name = res.discountDetailData.name;
                            $this.discountProduct.ean = res.discountDetailData.ean;
                            $this.discountProduct.form = res.discountDetailData.form;
                            $this.discountProduct.otc = res.discountDetailData.otc;
                            $this.discountProduct.minUnit = res.discountDetailData.minUnit;
                            $this.discountProduct.minValue = res.discountDetailData.minValue;
                            $this.discountProduct.price = res.discountDetailData.price;
                            $this.discountProduct.effectiveDate = res.discountDetailData.effectiveDate;
                            $this.discountProduct.productionDate = res.discountDetailData.productionDate;
                            $this.discountProduct.barcode = res.discountDetailData.barcode;
                            $this.discountProduct.licenseNumber = res.discountDetailData.licenseNumber;
                            $this.discountProduct.productPicArray = res.discountDetailData.productPicArray;
                            $this.discountProduct.productRefereArray = res.discountDetailData.productRefereArray;
                            $this.discountProduct.quantityFormat = res.discountDetailData.quantityFormat;
                            $this.discountProduct.realStock = res.discountDetailData.realStock;
                            $this.discountProduct.saleScope = res.discountDetailData.saleScope;
                            $this.discountProduct.sentUrl = res.discountDetailData.sentUrl;
                            $this.discountProduct.specifications = res.discountDetailData.specifications;
                            $this.discountProduct.supercategories = res.discountDetailData.supercategories;
                            $this.discountProduct.salesPromotion = res.discountDetailData.salesPromotion || '';
                            $this.discountProduct.instructions = res.discountDetailData.instructions;
                            $this.discountProduct.zhongPackage = res.discountDetailData.zhongPackage;
                            $this.discountProduct.bigPackage = res.discountDetailData.bigPackage;
                            //赋值渲染
                            $this.code = $this.discountProduct.code;
                            $this.name = $this.discountProduct.name;
                            $this.ean = $this.discountProduct.ean;
                            $this.form = $this.discountProduct.form;
                            $this.otc = $this.discountProduct.otc;
                            $this.minUnit = $this.discountProduct.minUnit;
                            $this.minValue = $this.discountProduct.minValue;
                            $this.price = $this.discountProduct.price;
                            $this.effectiveDate = $this.discountProduct.effectiveDate;
                            $this.productionDate = $this.discountProduct.productionDate;
                            $this.barcode = $this.discountProduct.barcode;
                            $this.licenseNumber = $this.discountProduct.licenseNumber;
                            $this.productPicArray = $this.discountProduct.productPicArray;
                            $this.productRefereArray = $this.discountProduct.productRefereArray;
                            $this.quantityFormat = $this.discountProduct.quantityFormat;
                            $this.realStock = $this.discountProduct.realStock;
                            $this.saleScope = $this.discountProduct.saleScope;
                            $this.sentUrl = $this.discountProduct.sentUrl;
                            $this.specifications = $this.discountProduct.specifications;
                            $this.supercategories = $this.discountProduct.supercategories;
                            $this.salesPromotion = $this.discountProduct.salesPromotion;
                            $this.instructions = $this.discountProduct.instructions;
                            $this.zhongPackage = $this.discountProduct.zhongPackage;
                            $this.bigPackage = $this.discountProduct.bigPackage;
                        });
                }else{
                    request.post(Datas.productDetail,'code='+$this.code)
                        .then(res => {
                            console.log(res);
                            //保存正价商品数据
                            $this.normalProduct.code = res.code;
                            $this.normalProduct.name = res.name;
                            $this.normalProduct.ean = res.ean;
                            $this.normalProduct.form = res.form;
                            $this.normalProduct.otc = res.otc;
                            $this.normalProduct.minUnit = res.minUnit;
                            $this.normalProduct.minValue = res.minValue;
                            $this.normalProduct.price = res.price;
                            $this.normalProduct.effectiveDate = res.effectiveDate;
                            $this.normalProduct.productionDate = res.productionDate;
                            $this.normalProduct.barcode = res.barcode;
                            $this.normalProduct.licenseNumber = res.licenseNumber;
                            $this.normalProduct.productPicArray = res.productPicArray;
                            $this.normalProduct.productRefereArray = res.productRefereArray;
                            $this.normalProduct.quantityFormat = res.quantityFormat;
                            $this.normalProduct.realStock = res.realStock;
                            $this.normalProduct.saleScope = res.saleScope;
                            $this.normalProduct.sentUrl = res.sentUrl;
                            $this.normalProduct.specifications = res.specifications;
                            $this.normalProduct.supercategories = res.supercategories;
                            $this.normalProduct.salesPromotion = res.salesPromotion || '';
                            $this.normalProduct.instructions = res.instructions;
                            $this.normalProduct.zhongPackage = res.zhongPackage;
                            $this.normalProduct.bigPackage = res.bigPackage;

                            //赋值渲染
                            $this.code = $this.normalProduct.code;
                            $this.name = $this.normalProduct.name;
                            $this.ean = $this.normalProduct.ean;
                            $this.form = $this.normalProduct.form;
                            $this.otc = $this.normalProduct.otc;
                            $this.minUnit = $this.normalProduct.minUnit;
                            $this.minValue = $this.normalProduct.minValue;
                            $this.price = $this.normalProduct.price;
                            $this.effectiveDate = $this.normalProduct.effectiveDate;
                            $this.productionDate = $this.normalProduct.productionDate;
                            $this.barcode = $this.normalProduct.barcode;
                            $this.licenseNumber = $this.normalProduct.licenseNumber;
                            $this.productPicArray = $this.normalProduct.productPicArray;
                            $this.productRefereArray = $this.normalProduct.productRefereArray;
                            $this.quantityFormat = $this.normalProduct.quantityFormat;
                            $this.realStock = $this.normalProduct.realStock;
                            $this.saleScope = $this.normalProduct.saleScope;
                            $this.sentUrl = $this.normalProduct.sentUrl;
                            $this.specifications = $this.normalProduct.specifications;
                            $this.supercategories = $this.normalProduct.supercategories;
                            $this.salesPromotion = $this.normalProduct.salesPromotion;
                            $this.instructions = $this.normalProduct.instructions;
                            $this.zhongPackage = $this.normalProduct.zhongPackage;
                            $this.bigPackage = $this.normalProduct.bigPackage;
                        });
                }
            }

        },
        handleChoseNormal(event){
            let $this = this;
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('.discountTab');
            removeClass(siblingDom ,'active');
            this.isShowDiscount = false;
            //赋值渲染
            $this.code = $this.normalProduct.code;
            $this.name = $this.normalProduct.name;
            $this.ean = $this.normalProduct.ean;
            $this.form = $this.normalProduct.form;
            $this.otc = $this.normalProduct.otc;
            $this.minUnit = $this.normalProduct.minUnit;
            $this.minValue = $this.normalProduct.minValue;
            $this.price = $this.normalProduct.price;
            $this.effectiveDate = $this.normalProduct.effectiveDate;
            $this.productionDate = $this.normalProduct.productionDate;
            $this.barcode = $this.normalProduct.barcode;
            $this.licenseNumber = $this.normalProduct.licenseNumber;
            $this.productPicArray = $this.normalProduct.productPicArray;
            $this.productRefereArray = $this.normalProduct.productRefereArray;
            $this.quantityFormat = $this.normalProduct.quantityFormat;
            $this.realStock = $this.normalProduct.realStock;
            $this.saleScope = $this.normalProduct.saleScope;
            $this.sentUrl = $this.normalProduct.sentUrl;
            $this.specifications = $this.normalProduct.specifications;
            $this.supercategories = $this.normalProduct.supercategories;
            $this.salesPromotion = $this.normalProduct.salesPromotion;
            $this.instructions = $this.normalProduct.instructions;
            $this.zhongPackage = $this.normalProduct.zhongPackage;
            $this.bigPackage = $this.normalProduct.bigPackage;
        },
        handleChoseDiscount(event){
            let $this = this;
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('.normalTab');
            removeClass(siblingDom ,'active');
            this.isShowDiscount = true;

            //赋值渲染
            $this.code = $this.discountProduct.code;
            $this.name = $this.discountProduct.name;
            $this.ean = $this.discountProduct.ean;
            $this.form = $this.discountProduct.form;
            $this.otc = $this.discountProduct.otc;
            $this.minUnit = $this.discountProduct.minUnit;
            $this.minValue = $this.discountProduct.minValue;
            $this.price = $this.discountProduct.price;
            $this.effectiveDate = $this.discountProduct.effectiveDate;
            $this.productionDate = $this.discountProduct.productionDate;
            $this.barcode = $this.discountProduct.barcode;
            $this.licenseNumber = $this.discountProduct.licenseNumber;
            $this.productPicArray = $this.discountProduct.productPicArray;
            $this.productRefereArray = $this.discountProduct.productRefereArray;
            $this.quantityFormat = $this.discountProduct.quantityFormat;
            $this.realStock = $this.discountProduct.realStock;
            $this.saleScope = $this.discountProduct.saleScope;
            $this.sentUrl = $this.discountProduct.sentUrl;
            $this.specifications = $this.discountProduct.specifications;
            $this.supercategories = $this.discountProduct.supercategories;
            $this.salesPromotion = $this.discountProduct.salesPromotion;
            $this.instructions = $this.discountProduct.instructions;
            $this.zhongPackage = $this.discountProduct.zhongPackage;
            $this.bigPackage = $this.discountProduct.bigPackage;
        },
        showProductInfo(event){
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('#books');
            removeClass(siblingDom ,'active');
            this.currentContent = 0;

        },
        showStation(event){
            let currentTargetDom = event.currentTarget;
            addClass(currentTargetDom,'active');
            var siblingDom = document.querySelector('#namepages');
            removeClass(siblingDom ,'active');
            this.currentContent = 1;
        }
    },
    beforeCreate(){

    },
    created(){
        //获取url参数
        var param = resolveParams();
        this.code = param.code;
        //如果是折扣商品
        if(param.discountClick){
            this.isDiscount = Boolean(param.discountClick);
            this.isShowDiscount = Boolean(param.discountClick);
        }

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
