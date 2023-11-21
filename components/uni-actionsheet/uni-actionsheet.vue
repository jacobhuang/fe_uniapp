<template>
  <div class="actionsheet-mask" :class="{'show': show}" @click="handleMaskClick">
    <div class="actionsheet-wrap">
      <div class="actionsheet-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    // 背景遮罩点击处理函数
    handleMaskClick() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
.actionsheet-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.actionsheet-mask.show {
  opacity: 1;
}

.actionsheet-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.actionsheet-content {
  background-color: #fff;
  padding: 20rpx 0;
}

/* 按钮样式，可根据具体需求自定义样式 */
.actionsheet-content > view {
  color: #007aff;
  font-size: 36rpx;
  line-height: 94rpx;
  text-align: center;
  border-top: 1px solid #eee;
  margin-top: 20rpx;
}
</style>
