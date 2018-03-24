<template>
    <!-- 产品楼层 -->
    <div class="productListBox">
        <div class="product-floor" v-for="(productItemList,index) in items" :key="index" >
            <div class="product-thumb floor-item">
                <a href="javascript:void(0);">
                    <img v-lazy="productItemList.imgsrc" alt=""/>
                </a>
            </div>
            <!-- 产品信息 -->
            <div class="product-instr floor-item">
                <p class="product-name">
                    <a href="javascript:void(0);">
                        {{productItemList.name}}
                    </a>
                </p>
                <p class="factory-name txt-style">
                    {{productItemList.ean}}
                </p>
                <p class="product-spec txt-style">
                    {{productItemList.specifications}}
                </p>
                <p class="product-package txt-style">
                    中/大包装：{{productItemList.quantityFormat}}
                </p>
                <p class="product-date txt-style">
                    生产日期：{{productItemList.creationDate}}
                </p>
                <p class="product-validity txt-style">
                    有效日期：{{productItemList.effectiveDate}}
                </p>

                <div class="product-state-box clearfix">
                    <div class="product-price f-left">
                        <span class="txt-style">价格：</span>
                        <span class="price">{{productItemList.price}}</span>
                        <span class="unit-kg">/ {{productItemList.minUnit}}</span>
                    </div>
                    <div class="product-inventory f-right">
                        <span class="txt-style">库存：</span>
                        <span class="txt-style">{{productItemList.realStock}}</span>
                    </div>
                </div>
                <div class="product-user clearfix">
                    <span class="minus f-left">-</span>
                    <input type="text" class="product-amount f-left" value="1"/>
                    <span class="plus f-left">+</span>
                    <span class="product-unit txt-style f-left">{{productItemList.minUnit}}</span>
                    <a class="add-cart f-right" href="javascript:void(0);">加入购物车</a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
      datas: {
        type: Array,
        default: []
      }
    },
    data(){
        return {
            items: this.datas
        };
    }
}
</script>

