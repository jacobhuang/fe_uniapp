<template>
  <view class="load-more">
    <view v-if="loading" class="loading">
      <text class="loading-text">加载中...</text>
    </view>
    <view v-else-if="!finished" class="load-more-btn" @tap="loadMore">
     
      <text class="load-more-text">加载更多</text>
       <slot>
			
		  </slot>
    </view>
    <view v-else class="no-more">
		<slot>
			
			
		</slot>
      <text class="no-more-text">没有更多数据了</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    loadMore() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style lang="scss">
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
}

.loading {
  color: #ccc;
  font-size: 26rpx;
  text-align: center;
}

.load-more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72rpx;
  width: 90%;
  margin: 0 auto;
  background-color: #f5a623;
  border-radius: 36rpx;
}

.load-more-text {
  color: #fff;
  font-size: 26rpx;
  text-align: center;
}

.no-more {
  // color: #ccc;
  font-size: 26rpx;
  text-align: center;
}
</style>
