<template>
  <form class="search" size="small" v-on:submit.prevent="onSubmit">
    <input class="search__keyword" type="text" v-model="keyword" :placeholder="placeholder">
    <button class="search__button" type="submit">{{text}}</button>
  </form>
</template>
<script>
import Vue from 'vue';
export default {
  name: 'data-search',
  data () {
    return {
      keyword: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '搜索'
    }
  },
  methods: {
    onSubmit (ev) {
      this.$emit('do-search', {
        keyword: this.keyword
      });
    },
    clear () {
      this.keyword = '';
    }
  }
}
</script>
<style lang="less" scoped>
  .search {
    height: 30px;
    line-height: 30px;
    font-size: 0;
    &__keyword {
      text-indent: 12px;
      width: 400px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ddd;
      border-right: 0;
      border-radius: 2px 0 0 2px;
      background: #fff;
      font-size: 12px;
      color: #999;
      text-indent: 12px;
    }
    &__button {
      width: 84px;
      font-size: 12px;
      height: inherit;
      line-height: inherit;
      background: #E62225;
      color: #fff;
      cursor: pointer;
      &:hover {
        opacity: 0.85;
      }
    }
  }
</style>

