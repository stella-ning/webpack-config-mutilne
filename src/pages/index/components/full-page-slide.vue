
<template>
  <div v-if="items.length" class="full-page-slide-wrapper">
    <slide ref="slide" :autoPlay="false" :loop="true">
      <div v-for="(item, index) in items" :key="index">
        <div class="full-page-img-wrapper" :style="getStyle(index)">
          <!-- <div v-if="index === items.length -1" class="button-wrapper" @click="handleClick()">
            <span class="button">{{ $t('fullPageSlideComponent.buttonTxt') }}</span>
          </div> -->
        </div>
      </div>
    </slide>
  </div>
</template>

<script>
  import Slide from './slide.vue'

  const COMPONENT_NAME = 'pull-page-slide'
  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        items: this.data
      }
    },
    components: {
      Slide
    },
    methods: {
      handleClick() {
        this.$emit('finish')
      },
      getStyle(index) {
        return `background-image:url(${this.items[index]})`
      }
    }
  }
</script>

<style lang="less">


  .full-page-slide-wrapper{
        .slide{
            height: 100%;
            .slide-group{
                height: 100%;
                .slide-item{
                    height: 100%;
                    .full-page-img-wrapper{
                        position: relative;
                        height: 100%;
                        background-size: cover;
                        transform: translateZ(0);
                    }
                    .button-wrapper{
                        position: fixed;
                        bottom: 85px;
                        display: block;
                        width: 100%;
                        overflow: hidden;
                        .button{
                            display: inline-block;
                            width: 130px;
                            padding: 15px 0;
                            border: 4px solid rgba(255, 255, 255, 0.7);
                            border-radius: 4px;
                            color: rgba(255, 255, 255, 0.7);
                            //font-size: $fontsize-large-xx;
                        }
                    }
                }
            }
        }
  }
</style>
