<template>
	<view>
		<view>
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">掌柜贡献排名</block>
			</cu-custom>
			<view class="bg-black">
			<u-tabs
				class="tabs-style"
				height="150"
				font-size="12"
				inactive-style="color:#999999;" 
				active-style="color:#FFFFFF;font-weight:bold;"
				line-color="#e4a650"
				:list="list"
				:is-scroll="false"
				@change="change"
			>
			</u-tabs>
			</view>
		</view>
		<view v-if="current === 0" class="list">
			<view class="boss-count">
				<view class="time-frame">
					<view class="month" :class="{ active: selectedTime === 'month' }" @click="selectTime('month')">本月
					</view>
					<view class="quarter" :class="{ active: selectedTime === 'quarter' }"
						@click="selectTime('quarter')">本季</view>
					<view class="year" :class="{ active: selectedTime === 'year' }" @click="selectTime('year')">本年
					</view>
					<view class="custom" :class="{ active: selectedTime === 'custom' }" @click="selectTime('custom')">
						自定义</view>
				</view>
				<view v-show="selectedTime === 'custom'" class="date-picker">
					时间段：<picker mode="date" @change="onDateChange">
						<view class="picker-item">{{ formatDate(dateArray[0]) }}</view>
					</picker>
					<view class="to">到</view>
					<picker mode="date" :start="dateArray[0]" @change="onDateChange">
						<view class="picker-item">{{ formatDate(dateArray[1]) }}</view>
					</picker>
					<button class="confirm-btn" @click="confirmDate">修改</button>
				</view>
				<view class="counts">
					<view class="total-boss" @click="goToBossSummaryPage">
						<view class="number">{{ totalBoss }}</view>
						<view class="label">掌柜总数</view>
					</view>
					<view class="total-customers" @click="goToCustomersSummaryPage">
						<view class="number">{{ totalCustomers }}</view>
						<view class="label">拓客总数</view>
					</view>
				</view>
				<view class="ranking">
					<view class="table-header">
						<view class="rank">排名</view>
						<view class="boss">掌柜</view>
						<view class="customers-count">拓客数量</view>
						<view class="percentage">拓客占比</view>
					</view>
					<view class="table-body">
						<view v-for="(item, index) in tableData" :key="item.id" class="table-row">
							<view class="rank">{{ (currentPage - 1) * 10 + index + 1 }}</view>
							<view class="boss">
								<view v-if="item.type === 'convert'" class="boss-label-convert">转</view>
								<view v-if="item.type === 'add'" class="boss-label-add">加</view>
								{{ item.boss }}
							</view>
							<view class="customers-count">{{ item.customersCount }}</view>
							<view class="percentage">{{ item.percentage }}</view>
						</view>
						<view v-if="currentPage < pageCount" class="load-more" @click="loadMoreData">加载更多</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 1" class="record">
			<view class="container">
				<!-- <uni-calendar @change="onChangeDate" :show="showDatepicker"></uni-calendar> -->
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
		</view>

	</view>
</template>

<script>
	import myDate from '@/components/my-componets/my-date.vue'
	export default {
		data() {
			return {
				current:0,
				buttonList:[{name:"启用"},{name:"停用"}],
				list: [{
						name: "掌柜排名汇总",
					},
					{
						name: "掌柜排名记录",
					},
				],
				activeTab: "summary",
				dateArray: [new Date("2022/01/01"), new Date()],
				selectedTime: "month",
				startDate: "",
				endDate: "",
				totalBoss: 0,
				totalCustomers: 0,
				tableData: [{
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}, {
						"boss": "asdfsdf",
						"customersCount": "345",
						"percentage": "30%"
					}

				],
				currentPage: 1,
				pageCount: 5,
				dateArray: [new Date("2022/01/01"), new Date()],
				dataList: [{
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}, {
						"boss": "sdfsd",
						"name": "qwe",
						"phone": "13606966586",
						"nickname": "Jacob",
						"property": "2343.00",
						"way": "线下",
						"store": "厦门"
					}

				],
				isLoading: false
			};
		},
		created() {
			// 加载第一页数据
			this.loadMoreData();
		},
		methods: {
			change(tab) {
				this.current = tab.index;
				console.log(this.current);
			},
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
			selectTime(time) {
				this.selectedTime = time;
				// 获取时间段内数据
				this.loadData();
			},
			loadData() {
				// 根据时间段获取数据
				// 省略代码
			},
			// {
			//   "timeFrame": "month",
			//   "startDate": "",
			//   "endDate": "",
			//   "page": 1,
			//   "pageSize": 10
			// }
			// {
			//   "code": 200,
			//   "msg": "success",
			//   "data": {
			//     "totalBoss": 3483,
			//     "totalCustomers": 12844,
			//     "tableData": [
			//       {
			//         "id": 1,
			//         "rank": 1,
			//         "boss": "张三",
			//         "type": "add",
			//         "customersCount": 123,
			//         "percentage": "0.95%"
			//       },
			//       {
			//         "id": 2,
			//         "rank": 2,
			//         "boss": "李四",
			//         "type": "add",
			//         "customersCount": 112,
			//         "percentage": "0.87%"
			//       },
			//       {
			//         "id": 3,
			//         "rank": 3,
			//         "boss": "王五",
			//         "type": "add",
			//         "customersCount": 105,
			//         "percentage": "0.82%"
			//       },
			//       // 此处省略中间部分数据
			//       {
			//         "id": 48,
			//         "rank": 48,
			//         "boss": "赵六",
			//         "type": "convert",
			//         "customersCount": 48,
			//         "percentage": "0.37%"
			//       },
			//       {
			//         "id": 49,
			//         "rank": 49,
			//         "boss": "田七",
			//         "type": "add",
			//         "customersCount": 42,
			//         "percentage": "0.33%"
			//       },
			//       {
			//         "id": 50,
			//         "rank": 50,
			//         "boss": "顾八",
			//         "type": "convert",
			//         "customersCount": 40,
			//         "percentage": "0.31%"
			//       }
			//     ]
			//   }
			// }


			// 获取boss count列表数据
			getBossCountList(params) {
				// return fetch('/api/boss-count', {
				//   method: 'POST',
				//   body: JSON.stringify(params),
				//   headers: {
				//     'Content-Type': 'application/json'
				//   }
				// }).then(res => res.json());
			},
			goToBossSummaryPage() {
				// 跳转到掌柜总数对应页面
				// 省略代码
			},
			goToCustomersSummaryPage() {
				// 跳转到拓客总数对应页面
				// 省略代码
			},
			loadMoreData() {
				this.tableData.push({
					"boss": "123",
					"customersCount": "dsf",
					"percentage": "43"
				})
				// 加载更多数据
				// 省略代码
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

<style scoped>
	.tab-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 49px;
		background-color: #000;
		position: relative;
	}

	.tab-bar .tab-item {
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 2;
	}

	.tab-bar .tab-item .menu-text {
		font-size: 14px;
		color: white;
	}

	.tab-bar .tab-item .active {
		color: gold;
	}

	.tab-bar .indicator {
		background-color: gold;
		height: 2px;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 50%;
		transition: transform 0.3s ease-in-out;
		z-index: 1;
	}

	.boss-count {
		font-size: 0.8rem;
		line-height: 1.5;
	}

	.time-frame {
		display: flex;
		align-items: center;
		margin: 10px;
	}

	.time-frame .month,
	.quarter,
	.year,
	.custom {
		color: #666;
		background-color: #EFEFEF;
		border: solid 1px #CCCCCC;
		border-radius: 12px;
		padding: 5px 15px;
		margin-left: 10px;
	}

	.time-frame .active {
		color: #f5a623;
		background-color: #EFEFEF;
		border: solid 1px #f5a623;
		border-radius: 12px;
		padding: 5px 15px;
	}

	.time-frame .custom {
		position: relative;
		margin-right: 1rem;
	}


	.date-picker {
		display: flex;
		align-items: center;
		padding: 0px 20px;
		margin-bottom: 15px;
		color: #666;
		font-size: 1.1em;
	}

	.to {
		margin: 0 10px;
	}

	.confirm-btn {
		color: darkgoldenrod;
		background-color: gold;
		border-radius: 5;
		padding: 0px 20px;
		font-size: 1em;
	}


	.counts {
		display: flex;
		border-radius: 5px;
		padding: 0px 15px;
		margin: 0.5rem 0.5rem;
		background-color: #FFF;
	}

	.counts .total-boss,
	.counts .total-customers {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
		color: #666666;
	}

	.counts .total-boss .label,
	.counts .total-customers .label {
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
	}

	.counts .total-boss .number,
	.counts .total-customers .number {
		font-size: 1.2rem;
		font-weight: bold;
		color: #333;
	}

	.ranking .table-header {
		display: flex;
		background-color: #FFF;
		word-break: keep-all;
	}

	.ranking .table-header .rank {
		flex: 1;
		padding: 0.5rem;
	}

	.ranking .table-header .boss {
		flex: 1.5;
		padding: 0.5rem;
	}

	.ranking .table-header .customers-count {
		flex: 1;
		padding: 0.5rem;
	}

	.ranking .table-header .percentage {
		flex: 1;
		padding: 0.5rem;
	}

	.ranking .table-row {
		display: flex;
		align-items: center;
		background-color: #fff;
	}

	.ranking .table-row:nth-child(even) {
		background-color: #f5f5f5;
	}

	.ranking .boss .boss-label-convert {
		display: inline-block;
		padding: 0.1rem 0.5rem;
		background-color: #ffb400;
		color: #fff;
		margin-right: 0.5rem;
	}

	.ranking .boss .boss-label-add {
		display: inline-block;
		padding: 0.1rem 0.5rem;
		background-color: #0080ff;
		color: #fff;
		margin-right: 0.5rem;
	}

	.ranking .boss .boss-label-convert,
	.ranking .boss .boss-label-add {
		font-size: 0.8rem;
	}

	.ranking .table-row .rank {
		flex: 1;
		padding: 0.5rem;
	}

	.ranking .table-row .boss {
		flex: 2;
		padding: 0.5rem;
	}

	.ranking .table-row .customers-count {
		flex: 1;
		padding: 0.5rem;
	}

	.ranking .table-row .percentage {
		flex: 1;
		padding: 0.5rem;
	}

	.load-more {
		display: block;
		text-align: center;
		background-color: #f5f5f5;
		cursor: pointer;
		padding: 0.5rem;
	}

	.load-more:hover {
		background-color: #e6e6e6;
	}

	/******/
	.container {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 10upx;
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