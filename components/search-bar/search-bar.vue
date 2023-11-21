<template>
  <view class="search-bar">
    <!-- 搜索框 -->
    <view class="search-input">
      <uni-icons type="search" @click="onSearchConfirm"></uni-icons>
      <input type="text" :value="value" @input="onSearchInput" @confirm="onSearchConfirm" @focus="onFocus" @blur="onBlur" :placeholder="placeholder"/>
      <uni-icons type="clear" v-if="value" @click="onSearchCancel"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键字'
    }
  },
  data() {
    return {
      value: '' // 搜索关键字
    }
  },
  methods: {
    onSearchInput(e) {
      this.value = e.detail.value
      this.$emit('input', this.value)
    },
    onSearchConfirm() {
      this.$emit('confirm', this.value)
    },
    onSearchCancel() {
      this.value = ''
      this.$emit('cancel')
    },
    onFocus() {
      // 输入框获取焦点时，可以添加一些效果
    },
    onBlur() {
      // 输入框失去焦点时，可以添加一些效果
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 14px;
}

.search-input {
  display: flex;
  flex: 1;
  background-color: #f2f2f2;
  border-radius: 20px;
  overflow: hidden;
  line-height: 20px;
  height: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-right: 10px;
}

.search-input input {
  flex: 1;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 14px;
}

.search-input uni-icons {
  font-size: 16px;
  color: #bbb;
}

.search-input uni-icons:last-child {
  margin-left: 8px;
}
</style>
