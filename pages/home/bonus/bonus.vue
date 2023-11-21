<template>
  <view>
    <button
      style="background-color: green; border-radius: 50%"
      @click="handleClick"
    >
      新增
    </button>

    <view class="bonus-list" @scroll="handleScroll">
      <view class="bonus-item" v-for="(bonus, index) in bonusList" :key="index">
        <view class="bonus-amount">{{ bonus.amount }}</view>
        <view class="bonus-date">{{ bonus.date }}</view>
      </view>
      <view class="refresh" v-if="isRefreshing">Refreshing...</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bonusList: [],
      isRefreshing: false,
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      // Simulate an API call to fetch new data
      setTimeout(() => {
        this.bonusList.push({
          amount: Math.floor(Math.random() * 100),
          date: new Date().toISOString(),
        });
        this.isRefreshing = false;
      }, 2000);
    },
    handleScroll() {
      // Define the scroll handling logic here
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        // Simulate an API call to fetch new data
        setTimeout(() => {
          this.bonusList.push({
            amount: Math.floor(Math.random() * 100),
            date: new Date().toISOString(),
          });
          this.isRefreshing = false;
        }, 2000);
      }
    },
    handleClick() {
      // Define the click handling logic here
    },
  },
};
</script>

<style>
</style>
