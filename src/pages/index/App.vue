<template>
    <div class="app" v-cloak>
        <div id="header">
            <div class="header-container clearfix hasBgImg">
                <div class="logo">
                    <!-- site / 站点 -->
                    <div class="siteBox f-left">
                        <p class="site" @click="showSitesHandle">
                            <span class="siteChecked">{{site}}</span>
                            <img src="../../static/images/public/arrowDown.png" alt="">
                        </p>
                    </div>
                    <div class="search-box f-left">
                        <a href="/">
                            <span class="iconfont icon-sousuo"></span>
                            <input type="search" class="search f-left" autocomplete="off" placeholder="请输入您要搜索的内容" readonly/>
                        </a>
                    </div>

                    <a class="shopCart f-right" href="javascript:void(0);" >
                        <img src="../../static/images/public/iconCart.png" alt="">
                    </a>
                    <!-- <a class="login f-right" href="javascript:void(0);">
                        登录
                    </a> -->
                </div>
            </div>
            <!-- 站点弹窗 -->
            <div class="modalDialogueBox" v-show="showSites">
                <div class="modalDialogue">
                    <header class="modalHeader">
                        <h2>
                            请选择您所在的地区进行采购
                        </h2>
                    </header>
                    <div class="modalBody">
                        <ul class="sites">
                            <li class="siteList clearfix" @click="chooseSite('粤东','1000')">
                                <a href="javascript:void(0)">
                                    <h3>粤东地区</h3>
                                    <p>向（创美药业股份有限公司）采购</p>
                                    <img class="arrowRight" src="../../static/images/public/arrowRight.png">
                                </a>
                            </li>
                            <li class="siteList clearfix" @click="chooseSite('佛山','1001')">
                                <a href="javascript:void(0)">
                                    <h3>佛山地区</h3>
                                    <p>向（广东创美药业股份有限公司）采购</p>
                                    <img class="arrowRight" src="../../static/images/public/arrowRight.png">
                                </a>
                            </li>
                            <li class="siteList clearfix" @click="chooseSite('珠海','1002')">
                                <a href="javascript:void(0)">
                                    <h3>珠海地区</h3>
                                    <p>向（珠海创美恒祥医药有限公司）采购</p>
                                    <img class="arrowRight" src="../../static/images/public/arrowRight.png">
                                </a>
                            </li>
                        </ul>
                        <div class="closeBtn" @click="closeSitesLay">
                            关闭
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommed">
            <FullPageSlide :data="carouselInfo" @finish="finish"></FullPageSlide>
        </div>
        <!-- 导航栏 -->
        <div class="cm-nav-container">
            <ul class="cm-nav-list clearfix">
                <li class="cm-nav-cell" v-for="(navList , index) in navitems" :key="index">
                    <a :href="navList.navLink">
                        <img class="icon-nav" :src="navList.navImg" alt=""/>
                        <p class="nav-title">{{navList.navText}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 品牌专区 -->
        <div class="special-area">
            <div class="area-title">
                <img src="../../static/images/index/floor_title_bg_01.png" alt=""/>
                <div class="more-to-link">
                    <a href="javascript:void(0);">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <!-- 品牌专区 -->
            <div class="hotBrandInfo swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(hotBrand,index) in hotBrandInfo.itemsArray" :key="index">
                        <div class="special-factory-img">
                            <a href="javascript:void(0);">
                                <img v-lazy="hotBrand.imgsrc"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination slider-pagination"></div>
            </div>
        </div>
        <!-- 新品上线 -->
        <div class="module-floor short-floor">
            <div class="module-title">
                <div class="icon-module">
                    <img src="../../static/images/index/icon_floor_02.png" alt=""/>
                </div>
                <div class="floor-title_1">{{dailyNewInfo.name}}</div>
                <div class="more-to-link">
                    <a href="/index/newproduct">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <!-- 产品轮播 -->
            <div class="newProductBox swiper-container">
                <div class="swiper-wrapper">
                    <!--已登录-->
                    <div class="swiper-slide" v-for="(newProduct,index) in dailyNewInfo.itemsArray" :key="index">
                        <div class="per-product">
                            <a :href="newProduct.sentUrl">
                                <div class="product-img">
                                    <span class="imgList">
                                        <img v-lazy="newProduct.imgsrc" alt=""/>
                                    </span>
                                </div>
                                <p class="product-name">
                                    {{newProduct.name}}
                                    <span class="product-size">{{newProduct.specifications}}</span>
                                </p>
                                <p class="discount-price">
                                    <span v-show="isLogin" class="icon-symbol">&yen;</span>
                                    {{newProduct.price}}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 活动买赠 -->
        <div class="special-area">
            <div class="area-title">
                <img src="../../static/images/index/floor_title_bg_02.png" alt=""/>
                <div class="more-to-link">
                    <a href="/index/newbuygift">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <!-- 活动买赠 -->
            <div class="newBuyGift swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="( newBuyGiftItem ,index) in  newBuyGift.itemsArray" :key="index">
                        <div class="special-factory-img">
                            <a :href="newBuyGiftItem.sentUrl">
                                <img v-lazy="newBuyGiftItem.imgsrc"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination slider-pagination"></div>
            </div>
        </div>

        <!--特价专区-->
        <div class="special-area">
            <div class="area-title">
                <img src="../../static/images/index/floor_title_bg_04.png" alt=""/>
                 <div class="more-to-link">
                    <a href="/index/specialOffer">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <div class="special-product-container">
                <ul class="special-product-list clearfix">
                    <li class="special-product-cell" v-for="(specialOffersItem,index ) in specialOffersInfo.itemsArray" :key="index">
                        <div class="imgBox">
                            <a :href="specialOffersItem.sentUrl">
                                <img v-lazy="specialOffersItem.imgsrc" alt=""/>
                            </a>
                        </div>
                        <p class="area-product-name">{{specialOffersItem.name}}</p>
                        <p class="area-product-price">
                            <span v-show="isLogin" class="icon-symbol">&yen;</span>
                            <span class="product-price">{{specialOffersItem.price}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 厂家广告图 -->
        <div class="ad-factory-container short-floor" v-for="(infoItem,index) in extensionInfo.itemsArray" :key="index">
            <a href="javascript:void(0);">
                <img v-lazy="infoItem.imgsrc" alt=""/>
            </a>
        </div>
        <!-- 药店常备 -->
        <div class="special-area">
            <div class="area-title">
                <img src="../../static/images/index/floor_title_bg_03.png" alt=""/>
                 <div class="more-to-link">
                    <a href="/index/necessMedicine">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <div class="special-product-container">
                <ul class="special-product-list clearfix">
                    <li class="special-product-cell" v-for = "(necessMedicine ,index) in necessMedicineInfo.itemsArray" :key="index">
                        <div class="imgBox">
                            <a :href="necessMedicine.sentUrl">
                                <img :src="necessMedicine.imgsrc" alt=""/>
                            </a>
                        </div>
                        <p class="area-product-name">{{necessMedicine.name}}</p>
                        <p class="area-product-price">
                            <span v-show="isLogin" class="icon-symbol">&yen;</span>
                            <span class="product-price">{{necessMedicine.price}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 厂家广告图 -->
        <div class="ad-factory-container short-floor" v-for="info2Item in extensionInfoTwo.itemsArray">
            <a href="javascript:void(0);">
                <img v-lazy="info2Item.imgsrc" alt=""/>
            </a>
        </div>
        <!-- 高毛利 -->
        <div class="special-area">
            <div class="area-title">
                <img src="../../static/images/index/floor_title_bg_05.png" alt=""/>
                 <div class="more-to-link">
                    <a href="/index/highmargin">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <div class="special-product-container">
                <ul class="special-product-list clearfix">
                    <li class="special-product-cell" v-for="(highMarginItem,index) in highMarginInfo.itemsArray" :key="index">
                        <div class="imgBox">
                            <a :href="highMarginItem.sendUrl">
                            <img v-lazy="highMarginItem.imgsrc" alt=""/>
                        </a>
                        </div>
                        <p class="area-product-name">{{highMarginItem.name}}</p>
                        <p class="area-product-price">
                            <span v-show = "isLogin" class="icon-symbol">&yen;</span>
                            <span class="product-price">{{highMarginItem.name}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 折扣专区 -->
        <div class="special-area">
            <div class="area-title">
                <img src="../../static/images/index/floor_title_bg_06.png" alt=""/>
                 <div class="more-to-link">
                    <a href="javascript:void(0);">
                        更多
                        <span class="icon iconfont icon-left"></span>
                    </a>
                </div>
            </div>
            <div class="special-product-container">
                <ul class="special-product-list clearfix">
                    <li class="special-product-cell" v-for="(discountItem,index) in discountDepotInfo.itemsArray" :key="index">
                        <div class="imgBox">
                            <a :href="specialOffersItem.sentUrl">
                                <img v-lazy="specialOffersItem.imgsrc" alt=""/>
                            </a>
                        </div>
                        <p class="area-product-name">{{discountItem.name}}</p>
                        <p class="area-product-price">
                            <span class="icon-symbol">&yen;</span>
                            <span class="product-price">{{discountItem.price}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 底部菜单 -->
        <div class="footer-menu">
            <!-- row-1 -->
            <div class="footer-menu-box">
                <div class="footer-menu-item">
                    <a href="javascript:void(0);">登录</a>
                </div>
                <div class="footer-menu-item">
                    <a href="javascript:void(0);">账号申请</a>
                </div>
                <div class="footer-menu-item">
                    <a href="javascript:void(0);">创美官网</a>
                </div>
                <div class="footer-menu-item">
                    <a href="javascript:void(0);">联系我们</a>
                </div>
                <div class="footer-menu-item">
                    <a href="javascript:void(0);">清除缓存</a>
                </div>
                <div class="footer-menu-item">
                    <a href="javascript:void(0);">回到顶部</a>
                </div>
            </div>
            <!-- 证书 -->
            <div class="certificate-container">
                <div class="certificate-box">
                    <div class="certificate-item">
                        <a href="javascript:void(0);">
                            互联网药品交易服务资格证：粤B20150001
                        </a>
                    </div>
                    <div class="certificate-item">
                        <a href="javascript:void(0);">
                            其它证书
                        </a>
                    </div>
                </div>
            </div>
            <!-- 版权 -->
            <div class="cm-right-container">
                Copyright &copy;2000-2017创美 cmyynet.com 版权所有
            </div>
        </div>

        <!-- 底部提示 -->
        <div class="footer-tis">
            <span class="line-left"></span>
            <span>我们是有底线的</span>
            <span class="line-right"></span>
        </div>

        <!-- 返回顶部 -->
        <div class="to-top" v-show = "toTop" @click="toTopFn">
            <a href="javascript:void(0);">
                <img src="../../static/images/index/icon_tab_top_01.png" alt=""/>
            </a>
        </div>


    </div>
</template>
<style lang="less">
    @import url('../../static/css/index');
    @import url('../../static/css/swiper-3.4.1.min.css');
   // @import url('');
</style>
<style src="../../static/css/headTop.less" lang="less"></style>

<style lang='less' >
    .app{
        width:auto;
        min-width:320px;
        max-width:640px;
        margin:0 auto;
    }
</style>


<script>
    import '@style/reset';
    import FullPageSlide from 'src/pages/index/components/full-page-slide.vue';
    import 'src/static/plugins/jquery-1.11.3.js';
    import 'src/static/plugins/swiper-3.4.2.min.js';
    import { request } from 'common';
    import * as Datas from "api";
    export default {
        name:'App',
        components:{
            FullPageSlide
        },
        data(){
            return{
                showSites:false,
                isFirst:false,
                site:'粤东',
                isLogin:false,
                scroll:'',
                toTop:false,
                companyCode:1000,
                carouselInfo:[],
                navitems:[
                    {
                        navImg:'../../static/images/index/m-nav20160918-01.png',
                        navLink:'/index/newproduct',
                        navText:'新品上线'
                    },
                     {
                        navImg:'../../static/images/index/m-nav20160918-02.png',
                        navLink:'/index/specialOffer',
                        navText:'特价优惠'
                    },
                     {
                        navImg:'../../static/images/index/m-nav20160918-03.png',
                        navLink:'indx.html',
                        navText:'商品分类'
                    },
                     {
                        navImg:'../../static/images/index/m-nav20160918-04.png',
                        navLink:'indx.html',
                        navText:'控销专区'
                    },
                     {
                        navImg:'../../static/images/index/m-nav20160918-05.png',
                        navLink:'indx.html',
                        navText:'会员中心'
                    }
                ],
                hotBrandInfo:[],
                dailyNewInfo:{
                    name:'新品上线',
                    itemsArray:[]
                },
                newBuyGift:{},
                specialOffersInfo:{},
                highMarginInfo:{},
                necessMedicineInfo:{},
                discountDepotInfo:{},
                extensionInfo:{},
                extensionInfoTwo:{}

            }
        },
        created(){
           this.getIndexData();
        },
        mounted(){
            //品牌专区
        	new Swiper('.hotBrandInfo', {
		        pagination: '.swiper-pagination',
                loop: true,
                observer:true,
                observeParents:true
            });
            //新品上线
           new Swiper('.newProductBox',{
                direction: 'horizontal',
                slidesPerView: 'auto',
                observer:true,
                observeParents:true
            });
            //活动买赠
            new Swiper('.newBuyGift',{
                pagination:'.swiper-pagination',
                loop:true,
                observer:true,
                observeParents:true
            });
            window.addEventListener('scroll', this.scrFn);
        },
        methods:{
            getIndexData(){
                let $this = this;
                 request.post(Datas.indexData, {
                     'companyCode':this.companyCode,
                     'uid':'',
                     'regionId':''
                 })
                .then(res => {
                    console.log(res)
                    //首页轮播图
                    res.carouselInfo.itemsArray.map(function(item){
                        $this.carouselInfo.push(item.imgsrc);
                    });
                    //品牌专区
                    $this.hotBrandInfo = res.hotBrandInfo;
                    //新品上线
                    $this.dailyNewInfo.itemsArray = res.dailyNewInfo.itemsArray;
                    //活动买赠
                    $this.newBuyGift = res.manysimpleInfo;
                    //特价优惠
                    $this.specialOffersInfo = res.specialOffersInfo;
                    //推广广告1
                    $this.extensionInfo = res.extensionInfo;
                    //药店常备
                    $this.necessMedicineInfo = res.necessMedicineInfo;
                    //高毛利
                    $this.highMarginInfo = res.highMarginInfo;
                    //折扣区
                    $this.discountDepotInfo = res.discountDepotInfo;
                    //推广广告2
                    $this.extensionInfoTwo = res.extension2Info;

                });
            },
            finish(){
                this.$router.back()
            },
            showSitesHandle(){
                this.showSites = true;
            },
            chooseSite(curSite,companyCode){
                this.isFirst = true;
                this.showSites = false;
                this.site = curSite;

            },
            closeSitesLay(){
                this.isFirst = true;
                this.showSites = false;
            },
            scrFn(){
                this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
                let headCon = document.getElementsByClassName('header-container')[0],
                    toTop = document.getElementsByClassName('to-top')[0];
                //console.log(this.scroll)
                if(this.scroll > 40){
                   headCon.style.backgroundColor = 'rgba(20,78,149,.2)';
                   headCon.className = 'header-container';
                }
                if(this.scroll > 50){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.4)';
                }
                if(this.scroll > 60){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.6)';
                }
                if(this.scroll > 70){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.9)';
                }
                if(this.scroll < 70){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.9)';
                }
                if(this.scroll < 60){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.6)';
                }
                if(this.scroll < 50){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.4)';
                }
                if(this.scroll < 40){
                    headCon.style.backgroundColor = 'rgba(20,78,149,.2)';
                    headCon.className = 'header-container hasBgImg';
                }
                if(this.scroll > 250){
                    this.toTop = true;
                }else{
                    this.toTop = false;
                }
            },
            toTopFn(){
                let timer = setInterval(function(){
                    //获取滚动条的滚动高度
                    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    //用于设置速度差，产生缓动的效果
                    var speed = Math.floor(-osTop / 6);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
                    //isTop =true;  //用于阻止滚动事件清除定时器
                    if(osTop == 0){
                        clearInterval(timer);
                    }
                },30);
            }
        }
    }
</script>
