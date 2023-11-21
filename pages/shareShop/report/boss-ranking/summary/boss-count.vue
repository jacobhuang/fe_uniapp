<template>
	<view>
		<view>
			<!-- 顶部标题名称-->
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">掌柜拓客排名</block>
			</cu-custom>
			<!-- Tab菜单-->
			<view class="bg-black">
				<u-tabs class="tabs-style" height="150" font-size="12" inactive-style="color:#999999;"
					active-style="color:#FFFFFF;font-weight:bold;" line-color="#e4a650" :list="list" :is-scroll="true"
					@change="change" @swipe="change">
				</u-tabs>
			</view>
		</view>
		<view v-if="current === 0" class="list">
			<!-- 拓客汇总页面-->
			<view class="boss-count">
				<!-- 时间搜索输入区域 -->
				<view class="time-frame">
					<view class="month" :class="{ active: summary.selectedTime === 'month' }"
						@click="selectTime('month')">本月
					</view>
					<view class="quarter" :class="{ active: summary.selectedTime === 'quarter' }"
						@click="selectTime('quarter')">本季</view>
					<view class="year" :class="{ active: summary.selectedTime === 'year' }" @click="selectTime('year')">
						本年
					</view>
					<view class="custom" :class="{ active: summary.selectedTime === 'custom' }"
						@click="selectTime('custom')">
						自定义</view>
				</view>
				<!-- 自定义时间选择 -->
				<view v-show="summary.selectedTime === 'custom'" class="date-picker">
					时间段：<picker mode="date" @change="onDateChange">
						<view class="picker-item">{{ formatDate(summary.dateArray[0]) }}</view>
					</picker>
					<view class="to">到</view>
					<picker mode="date" :start="summary.dateArray[0]" @change="onDateChange">
						<view class="picker-item">{{ formatDate(summary.dateArray[1]) }}</view>
					</picker>
					<button class="confirm-btn" @click="confirmDate">修改</button>
				</view>
				<!-- 统计总数区域 -->
				<view class="counts">
					<view class="total-boss" @click="goToBossSummaryPage">
						<view class="number">{{ summary.totalBoss }}</view>
						<view class="label">掌柜总数</view>
					</view>
					<view class="total-customers" @click="goToCustomersSummaryPage">
						<view class="number">{{ summary.totalCustomers }}</view>
						<view class="label">拓客总数</view>
					</view>
				</view>
				<view id="table-scroll" class="table-scroll">
					<view class="ranking">
						<view class="table-header">
							<view class="rank rank-sticky">No.</view>
							<view class="rank rank-width-text" v-for="(item,index) in summary.headers" :key="index">{{item}}</view>
						</view>
						<view class="table-body">
							<view v-for="(item, index) in summary.list" :key="item.id" class="table-row">
								<view class="rank rank-sticky">{{index<9?"00":index>99?"":"0"}}{{ index + 1 }}</view>
								<view class="rank rank-width-text">
									<view v-if="item.type === 'convert'" class="boss-label-convert">转</view>
									<view v-if="item.type === 'add'" class="boss-label-add">加</view>
									{{ item.name }}
								</view>
								<view class="rank rank-width-text">2{{ item.shopkeeperCount }}</view>
								<view class="rank rank-width-text">3{{ item.expansionRatio }}</view>
								<view class="rank rank-width-text">3{{ item.expansionRatio }}</view>
							</view>
							<view class="loading rank-width" v-show="summary.isLoading">加载中...</view>
							<view v-if="!summary.isLoading && summary.currentPage < summary.pageCount" class="load-more"
								@click="loadMoreData">加载更多
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 1" class="record">
			<view class="container">
				<!-- <uni-calendar @change="onChangeDate" :show="showDatepicker"></uni-calendar> -->
				<view class="date-picker">
					<picker mode="date" @change="onDateChange">
						<view class="picker-item">{{ formatDate(record.dateArray[0]) }}</view>
					</picker>
					<view class="to">到</view>
					<picker mode="date" :start="record.dateArray[0]" @change="onDateChange">
						<view class="picker-item">{{ formatDate(record.dateArray[1]) }}</view>
					</picker>
					<button class="confirm-btn" @click="confirmDate">确认</button>
				</view>
				<view id="table-scroll" class="table-scroll"> 
					<view class="ranking">
						<view class="table-header">
							<view class="rank rank-sticky">No.</view>
							<view class="rank rank-width" v-for="(item,index) in record.headers" :key="index">{{item}}</view>
						</view>
						<view class="table-body">
							<view v-for="(item, index) in record.list" :key="item.id" class="table-row2">
								<view class="rank rank-sticky">{{index<9?"00":index>99?"":"0"}}{{ index + 1 }}</view>
								<view class="rank rank-width">
									<view v-if="item.type === 'convert'" class="boss-label-convert">转</view>
									<view v-if="item.type === 'add'" class="boss-label-add">加</view>
									{{ item.name }}
								</view>
								<view class="rank rank-width">2{{ item.shopkeeperCount }}</view>
								<view class="rank rank-width">3{{ item.expansionRatio }}</view>
								<view class="rank rank-width">3{{ item.expansionRatio }}</view>
								<view class="rank rank-width">3{{ item.expansionRatio }}</view>
								<view class="rank rank-width">3{{ item.expansionRatio }}</view>
								<view class="rank rank-width">3{{ item.expansionRatio }}</view>
							</view>
							<view class="loading rank-width" v-show="record.isLoading">加载中...</view>
							<view v-if="!record.isLoading && record.currentPage < record.pageCount" class="load-more"
								@click="loadMoreData">加载更多
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myDate from "@/components/my-componets/my-date.vue";
	import {
		mapActions
	} from "vuex";
	import {
		forEach
	} from "../../../../../common/luch-request/utils";
	export default {
		data() {
			return {
				current: 0,
				buttonList: [{
						name: "启用",
					},
					{
						name: "停用",
					},
				],
				list: [{
						name: "拓客汇总",
					},
					{
						name: "拓客记录",
					},
				],
				activeTab: "summary",
				summary: {
					dateArray: [new Date("2022/01/01"), new Date()],
					selectedTime: "",
					startDate: "",
					endDate: "",
					totalBoss: 0,
					totalCustomers: 0,
					headers: [
						"排名",
						"掌柜",
						"拓客数量",
						"拓客占比",
					],
					list: [],
					currentPage: 1,
					pageCount: 5,
					isLoading: false,
				},
				record: {
					dateArray: [new Date("2022/01/01"), new Date()],
					selectedTime: "month",
					startDate: "",
					endDate: "",
					totalBoss: 0,
					totalCustomers: 0,
					headers: [
						"掌柜",
						"客户姓名",
						"手机号",
						"微信昵称",
						"客源属性",
						"拓客途径",
						"客户所属门店",
					],
					list: [],
					currentPage: 1,
					pageCount: 5,
					isLoading: false,
				},

			};
		},
		created() {
			this.loadData(0);
		},
		methods: {
			...mapActions(["topShareRank", "topShareRankRecord"]),
			change(tab) {
				this.current = tab.index;
				this.loadData(tab.index);
				console.log(this.current);
			},
			goToBossSummaryPage() {},
			goToCustomersSummaryPage() {},
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
				this.summary.selectedTime = time;
				// 获取时间段内数据
				this.loadData();
			},
			loadData(index) {
				// 根据时间段获取数据
				this.isLoading = true;
				let params = {
					timeFrame: "month",
					startDate: this.startDate,
					endDate: this.endDate,
					page: 5, //this.pageCount
					pageSize: 10,
				};
				switch (index) {
					case 0:
						(async () => {
							try {
								let res = await this.topShareRank(params);
								this.isLoading = false;
								console.log(JSON.stringify(res));
								if (res.data.success) {
									this.summary.list.push(...res.data.result.individualDataList);
									// console.log(JSON.stringify(res.data.result.individualDataList[0]));
								} else {
									this.$tip.alert(res.data.message);
								}
							} catch (err) {
								let msg = err.data.message || "请求出现错误，请稍后再试";
								this.isLoading = false;
								this.$tip.alert(msg);
							} finally {
								this.isLoading = false;
							}
						})();
						break;
					case 1:
						(async () => {
							try {
								let res = await this.topShareRankRecord(params);
								this.isLoading = false;
								console.log(JSON.stringify(res));
								if (res.data.success) {
									this.record.list.push(...res.data.result.individualRecordDataList);
									// console.log(JSON.stringify(res.data.result.individualDataList[0]));
								} else {
									this.$tip.alert(res.data.message);
								}
							} catch (err) {
								let msg = err.data.message || "请求出现错误，请稍后再试";
								this.isLoading = false;
								this.$tip.alert(msg);
							} finally {
								this.isLoading = false;
							}
						})();
					default:
						break;
				}

			},
			loadMoreData(index) {
				this.currentPage = this.currentPage + 1;
				this.loadData(index);

			},
			onDateChange(e) {
				let index = e.target.dataset.index;
				let value = e.detail.value;
				this.dateArray[index] = new Date(value);
			},
			confirmDate() {
				this.loadData(0);
			},
			onCheckboxChange(index) {
				this.dataList[index].checked = !this.dataList[index].checked;
			},
		},
		onReachBottom() {
			if (this.currentPage < this.pageCount) {
				// this.currentPage = this.currentPage + 1;
				// 触底刷新
				this.loadMoreData();
			}
		},
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
		background-color: #efefef;
		border: solid 1px #cccccc;
		border-radius: 12px;
		padding: 5px 15px;
		margin-left: 10px;
	}

	.time-frame .active {
		color: #f5a623;
		background-color: #efefef;
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
		font-size: 0.8rem;
	}

	.to {
		margin: 0 10px;
	}

	.confirm-btn {
		color: darkgoldenrod;
		background-color: gold;
		border-radius: 5;
		padding: 0px 20px;
		font-size: 0.8rem;
	}

	.counts {
		display: flex;
		border-radius: 5px;
		padding: 0px 15px;
		margin: 0.5rem 0.5rem;
		background-color: #fff;
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
		font-size: 0.8rem;
		font-weight: bold;
		color: #333;
	}

	.ranking .table-header {
		display: flex;
		background-color: #fff;
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
		width:100%;
	}
	.ranking .table-row2 {
		display: flex;
		align-items: center;
		background-color: #fff;
		width:200%;
	}
	.ranking .table-row:nth-child(even) {
		background-color: #f5f5f5;}
	.ranking .table-row2:nth-child(even) {
		background-color: #f5f5f5;
	}
	.ranking .rank:nth-child(even) {
		/* background-color: #f5f5f5; */
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
	.ranking .table-row2 .rank {
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
		font-size: 0.8rem;
	}

	.customer-list {
		flex-grow: 1;
	}

	.header {
		display: flex;
		align-items: center;
		background-color: #f7f7f7;
		font-size: 0.8rem;
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
		font-size: 0.8rem;
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
	
	
	
	
	
	.table-scroll {
		position: relative;
		width: 100%;
		z-index: 1;
		margin: auto;
		overflow: auto;
		height: 500px;
		font-size: 0.8rem;
	}
	.rank-sticky {
		background-color:white;position: sticky; left: 0;
	}
	.rank-width {
		min-width: 100px;
	}
	.rank-width-text{
		min-width: 60px;
	}
</style>