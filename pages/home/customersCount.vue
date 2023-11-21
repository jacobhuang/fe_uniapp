<template>
  <view class="container">
    <view class="date-picker">
      <picker mode="date" @change="onDateChange">
        <view class="picker-item">{{ formatDate(dateArray[0]) }}</view>
      </picker>
      <view class="to">到</view>
      <picker mode="date" :start="dateArray[0]" @change="onDateChange">
        <view class="picker-item">{{ formatDate(dateArray[1]) }}</view>
      </picker>
      <button class="confirm-btn" @click="confirmDate">确认</button>
    </view>
    <scroll-view :scroll-y="true" class="customer-list">
      <view class="header">
	    <view class="cell">选择</view>
        <view class="cell">#</view>
        <view class="cell">掌柜</view>
        <view class="cell">客户姓名</view>
        <view class="cell">手机号</view>
        <view class="cell">微信昵称</view>
        <view class="cell">客源属性</view>
        <view class="cell">拓客途径</view>
        <view class="cell">客户所属门店</view>
        
      </view>
      <view class="cell-row" v-for="(item, index) in dataList" :key="item.id">
		<view class="cell">
			<checkbox @change="onCheckboxChange(index)" :checked="!!item.checked"></checkbox> 
		</view>
        <view class="cell">{{ index + 1 }}</view>
        <view class="cell">{{ item.boss }}</view>
        <view class="cell">{{ item.name }}</view>
        <view class="cell">{{ item.phone }}</view>
        <view class="cell">{{ item.nickname }}</view>
        <view class="cell">{{ item.property }}</view>
        <view class="cell">{{ item.way }}</view>
        <view class="cell">{{ item.store }}</view>
      </view>
      <view class="loading" v-show="isLoading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dateArray: [new Date("2022/01/01"), new Date()],
      dataList: [
		  {"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  ,{"boss":"sdfsd","name":"qwe","phone":"13606966586","nickname":"Jacob","property":"2343.00","way":"线下","store":"厦门"}
		  
	  ],
      isLoading: false
    };
  },
  methods: {
    formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return `${y}-${m}-${d}`;
    },
    onDateChange(e) {
      let index = e.target.dataset.index;
      let value = e.detail.value;
      this.dateArray[index] = new Date(value);
    },
    confirmDate() {
      // 发起 API 请求
      let params = {
        start: this.formatDate(this.dateArray[0]),
        end: this.formatDate(this.dateArray[1])
      };
      this.isLoading = true;
      api.post('/api/customers-count', params).then(res => {
        this.dataList = res.data;
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    },
    onCheckboxChange(index) {
      this.dataList[index].checked = !this.dataList[index].checked;
    },
    loadMoreData() {
      // let params = {
      //   start: this.formatDate(this.dateArray[0]),
      //   end: this.formatDate(this.dateArray[1]),
      //   page: this.page
      // };
      // this.isLoading = true;
      // api.post('/api/customers-count', params).then(res => {
      //   this.dataList.push(...res.data);
      //   this.isLoading = false;
      //   this.page++;
      // }).catch(err => {
      //   console.log(err);
      //   this.isLoading = false;
      // });
    }
  },
  onReachBottom() {
    // 触底刷新
    this.loadMoreData();
  }
};
</script>

<style>
.container {
 display: flex;
  flex-direction: column;
  background-color: white;
  padding:10upx;
}

.date-picker {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.to {
  margin: 0 10px;
}

.confirm-btn {
  color: #fff;
  background-color: #fedb01;
  border-radius: 5;
  padding: 0px 30px;
  font-size: 14px;
}

.customer-list {
  flex-grow: 1;
}

.header {
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  font-size: 14px;
  padding: 10px 5px;
  word-break: keep-all;

}

.cell {
  flex: 1;
  text-align: center;
  word-break: keep-all;
}

.cell:nth-of-type(1) {
  flex: 0.5;
}

.cell:nth-of-type(9) {
  flex: 1.5;
}

.cell-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 10px 5px;
}

.cell-row:nth-of-type(even) {
  background-color: #f7f7f7;
}

.loading {
  text-align: center;
  color: #999;
  margin-top: 10px;
}
</style>
