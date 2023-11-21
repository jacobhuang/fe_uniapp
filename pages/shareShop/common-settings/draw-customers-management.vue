<template>
	<view>
		<view>
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">抽奖获客管理</block>
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
					
				</view>
				
				<view class="counts">
					<view class="total-boss" @click="goToBossSummaryPage">
						<view class="number">{{ totalBoss }}</view>
						<view class="label">抽奖客户数</view>
					</view>
					<view class="total-customers" @click="goToCustomersSummaryPage">
						<view class="number">{{ totalCustomers }}</view>
						<view class="label">转分享人数</view>
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
				<view>
					抽奖入口前可见
				</view>
				<view>
					是否邀请好友
				</view>
				<view>
					<view class="setting-header">
						免费抽奖次数设置
					</view>
					<view class="setting-content">
						<view class="input-form">
								每人每次免费抽奖<view class="input-wrapper">
									<input type="text" placeholder="" />
								</view>次
								
							</view>
							
					</view>
					<view>
						<view class="setting-header">
						奖品及规则设置
						</view>
						<view class="button-bar">
							<view class="button-style-selected" v-for="(item,index) in buttonList" :key="index">
								{{item.name}}
							</view>
						</view>
						<scroll-view :scroll-y="true" class="customer-list">
							<view class="header">
								<view class="cell">序号</view>
								<view class="cell">#</view>
								<view class="cell">掌柜</view>
								<view class="cell">客户姓名</view>
								<view class="cell">手机号</view>

							</view>
							<view class="cell-row" v-for="(item, index) in dataList" :key="item.id">
								<view class="cell">
									{{ index + 1 }}
								</view>
								<view class="cell">
									<select v-model="selectedItem" style="border:1px solid grey;height:20px;width:50px;">
										<option v-for="item in dropdownItems" :value="item" :key="item.key">{{ item.value }}</option>
									</select>
								</view>
								<view class="cell">{{ item.name }}</view>
								<view class="cell">{{ item.phone }}</view>
								<view class="cell">{{ item.nickname }}</view>
							</view>
							<view class="loading" v-show="isLoading">加载中...</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import myDate from '@/components/my-componets/my-date.vue'
	export default {
		data() {
			return {
				current: 0,
				dropdownItems:[{value:"11",key:"1"},{value:"333",key:"2"}],
				buttonList:[{name:"奖品及中奖率"},{name:"规则设置"}],
				list: [{
						name: "中奖管理",
					},
					{
						name: "抽奖设置",
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
					}, 

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
		background-color: #C4C1C153;
		border: solid 1px #EFEFEF;
		border-radius: 30px;
		padding: 3px 15px;
		margin-left: 10px;
	}

	.time-frame .active {
		color: #f5a623;
		background-color: #EFEFEF;
		border: solid 1px #f5a623;
		border-radius: 30px;
		padding: 3px 15px;
	}

	.time-frame .custom {
		position: relative;
		margin-right: 1rem;
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
.input-form{
		display:inline-flex;
		flex-direction: row;
		align-items: center;
	}
	.input-wrapper {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 4px;
		margin-top: 8px;
		margin:0px 10px;
	}
	.input-wrapper input {
		flex: 1;
		border: none;
		outline: none;
		/* padding: 0 8px; */
		font-size: 12px;
		width:80px;
		
	}
	
	.setting-header{
		font-size: 13pt;
		font-weight: bold;
		color: #000000;
		margin:20rpx 0;
	}
	.setting-content{
		font-size: 11pt;
		color: #333333;
		/* background-color: #E7E2E2; */
		padding:20rpx 20rpx;
		border-radius: 15rpx;
	}
	.button-bar{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width:90vw;
	}
	.button-style{
		font-size: 9pt;
		border-radius: 20rpx;
		/* border:1px solid orange; */
		padding: 5rpx 40rpx;
		margin: 20rpx 10rpx;
		color:#333;
		background-color: #ffeb9c;
	}
	.button-style-selected{
		font-size: 9pt;
		border-radius: 20rpx;
		border:1px solid orange;
		padding: 5rpx 40rpx;
		margin: 20rpx 10rpx;
		color: orange;
		background-color: #fbfbfb;
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