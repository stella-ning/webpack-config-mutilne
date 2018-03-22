import 'babel-polyfill';
import Vue from 'vue';
import router from './router/router.js';
import '@js/rem';
import HeadTop from 'src/common/header.vue';

import '@style/topic.less';

// Vue.config.productionTip = false;
new Vue({
    el: '#newProduct',
    router,
    components:{
        HeadTop
    },
    data(){
        return{
            'resultArray': [
                {
                    'month': '2017年9月份新品',
                    'dailyNewArray': [
                        {
                            'code': '100120',
                            'creationDate': '2017-3-30 12:00:00',
                            'specifications': '15ML*30支',
                            'minValue': 1,
                            'ean': '深圳太太药业有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '静心口服液',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/100120/100120_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '80062',
                            'creationDate': '2016-10-06 22:48:13',
                            'specifications': '1G*20袋',
                            'minValue': 1,
                            'ean': '贵州联盛药业有限公司',
                            'productionDate': '**',
                            'placeOfOrigin': '贵州',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '天麻饮片(破壁)',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/80062/80062_000.jpg',
                            'minUnit': '罐',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '72228',
                            'creationDate': '2016-10-06 22:35:47',
                            'specifications': '30片:Ca500+D3.200',
                            'minValue': 1,
                            'ean': '北京康远制药有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '碳酸钙D3片(Ⅱ)',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/72228/72228_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '50350',
                            'creationDate': '2016-10-06 22:10:48',
                            'specifications': '100ml',
                            'minValue': 1,
                            'ean': '贵州百灵企业集团制药股份有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '咳速停糖浆',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/50350/50350_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '2032',
                            'creationDate': '2016-10-06 21:55:16',
                            'specifications': '0.45g*24粒',
                            'minValue': 1,
                            'ean': '贵州百灵企业集团制药股份有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '金感胶囊',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/2032/2032_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '1023',
                            'creationDate': '2016-10-06 21:51:04',
                            'specifications': '0.3G*80片',
                            'minValue': 1,
                            'ean': '广东万年青制药有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '藿香正气片',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/1023/1023_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '102',
                            'creationDate': '2016-10-06 21:47:47',
                            'specifications': '7.5mg*7片',
                            'minValue': 1,
                            'ean': '上海勃林格殷格翰药业有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '美洛昔康片',
                            'realStock': '**',
                            'imgsrc' :  'http://121.10.217.170:8089/Hybris/Goods/102/102_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        }
                    ]
                },
                {
                    'month': '2017年8月份新品',
                    'dailyNewArray': [
                        {
                            'code': '80062',
                            'creationDate': '2016-10-06 22:48:13',
                            'specifications': '1G*20袋',
                            'minValue': 1,
                            'ean': '贵州联盛药业有限公司',
                            'productionDate': '**',
                            'placeOfOrigin': '贵州',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '天麻饮片(破壁)',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/80062/80062_000.jpg',
                            'minUnit': '罐',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '72228',
                            'creationDate': '2016-10-06 22:35:47',
                            'specifications': '30片:Ca500+D3.200',
                            'minValue': 1,
                            'ean': '北京康远制药有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '碳酸钙D3片(Ⅱ)',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/72228/72228_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '50350',
                            'creationDate': '2016-10-06 22:10:48',
                            'specifications': '100ml',
                            'minValue': 1,
                            'ean': '贵州百灵企业集团制药股份有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '咳速停糖浆',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/50350/50350_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '2032',
                            'creationDate': '2016-10-06 21:55:16',
                            'specifications': '0.45g*24粒',
                            'minValue': 1,
                            'ean': '贵州百灵企业集团制药股份有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '金感胶囊',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/2032/2032_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '1023',
                            'creationDate': '2016-10-06 21:51:04',
                            'specifications': '0.3G*80片',
                            'minValue': 1,
                            'ean': '广东万年青制药有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '藿香正气片',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/1023/1023_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '102',
                            'creationDate': '2016-10-06 21:47:47',
                            'specifications': '7.5mg*7片',
                            'minValue': 1,
                            'ean': '上海勃林格殷格翰药业有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '美洛昔康片',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/102/102_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        }
                    ]
                },
                {
                    'month': '2017年7月份新品',
                    'dailyNewArray': [
                        {
                            'code': '80062',
                            'creationDate': '2016-10-06 22:48:13',
                            'specifications': '1G*20袋',
                            'minValue': 1,
                            'ean': '贵州联盛药业有限公司',
                            'productionDate': '**',
                            'placeOfOrigin': '贵州',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '天麻饮片(破壁)',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/80062/80062_000.jpg',
                            'minUnit': '罐',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '72228',
                            'creationDate': '2016-10-06 22:35:47',
                            'specifications': '30片:Ca500+D3.200',
                            'minValue': 1,
                            'ean': '北京康远制药有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '碳酸钙D3片(Ⅱ)',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/72228/72228_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '50350',
                            'creationDate': '2016-10-06 22:10:48',
                            'specifications': '100ml',
                            'minValue': 1,
                            'ean': '贵州百灵企业集团制药股份有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '咳速停糖浆',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/50350/50350_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '2032',
                            'creationDate': '2016-10-06 21:55:16',
                            'specifications': '0.45g*24粒',
                            'minValue': 1,
                            'ean': '贵州百灵企业集团制药股份有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '金感胶囊',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/2032/2032_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '1023',
                            'creationDate': '2016-10-06 21:51:04',
                            'specifications': '0.3G*80片',
                            'minValue': 1,
                            'ean': '广东万年青制药有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '藿香正气片',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/1023/1023_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        },
                        {
                            'code': '102',
                            'creationDate': '2016-10-06 21:47:47',
                            'specifications': '7.5mg*7片',
                            'minValue': 1,
                            'ean': '上海勃林格殷格翰药业有限公司',
                            'productionDate': '**',
                            'quantityFormat': '0',
                            'price': '登录可见',
                            'name': '美洛昔康片',
                            'realStock': '**',
                            'imgsrc': 'http://121.10.217.170:8089/Hybris/Goods/102/102_000.jpg',
                            'minUnit': '盒',
                            'effectiveDate': '**'
                        }
                    ]
                }
            ],
            'resultAdArray': [
                {
                    'price': '',
                    'name': 'NewprodutsPicth_fs',
                    'imgsrc': 'https://www.cmyynet.com/Hybris/App/foshan/fs-banner-20171114-02.png',
                    'sentUrl': '#',
                    'target': 'detail'
                }
            ]
        }
    }
});
