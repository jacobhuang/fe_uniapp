<template>
	<view>
		<view>
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">待唤醒客户</block>
			</cu-custom>
			<u-tabs class="tabs-style bg-black" height="150" font-size="12" inactive-style="color:#999999;"
				active-style="color:#FFFFFF;font-weight:bold;" line-color="#e4a650" :list="list" :is-scroll="false"
				@change="change">
			</u-tabs>
		</view>
		<view v-if="current == 0" class="list">
			<u-header-count :totalMerchant="data.summary.total_merchants"></u-header-count>
			<scroll-view class="list-content" scroll-y style="display:none;">
				<view class="list-item" v-for="(item, index) in data.summary.list" :key="index">
					<view class="item-index">{{ index + 1 }}</view>
					<view class="item-info">
						<view class="item-name">{{ item.merchantName }}</view>
						<view class="item-phone">{{ item.phone }}</view>
					</view>
					<view class="item-value">{{ item.rechargeBalanceToConsume }}</view>
					<view class="item-value">{{ item.rechargeBalanceNotToConsume }}</view>
				</view>
			</scroll-view>
			<!-- 在此添加可滚动列表，显示字段及接口名请参见要求 -->
			<view id="table-scroll" class="table-scroll">
				<table id="main-table" class="main-table">
					<thead>
						<tr>
							<th>#</th>
							<th v-for="(item, i) in data.summary.summaryHeaders" :key="i" style="text-align:left;">
								{{ item }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, i) in filteredItems" :key="i">
							<th>{{ i + 1 }}</th>
							<td>{{ item.merchantName }}</td>
							<td>{{ item.phone }}</td>
							<td>{{ item.totalRechargeAmount }}</td>
							<td>{{ item.rechargeBalance }}</td>
							<td>{{ item.rechargeBalanceToConsume }}</td>
							<td>{{ item.rechargeBalanceNotToConsume }}</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td v-for="(item, i) in data.summary.summaryHeaders" :key="i"></td>
						</tr>
					</tfoot>
				</table>
			</view>
		</view>
		<view v-if="current == 1" class="record">
			<!-- 在此添加日期选择组件 -->
			<view class="date-picker">
				<picker mode="date" @change="onStartDateChange">
					<view class="picker-item">{{ formatDate(startDate) }}</view>
				</picker>
				<view class="to">到</view>
				<picker mode="date" :start="startDate" @change="onEndDateChange">
					<view class="picker-item">{{ formatDate(endDate) }}</view>
				</picker>
				<button class="confirm-btn" @click="confirmDate" style="margin-left:20px;">确认</button>
			</view>
			<view class="card">
				<view class="card-item">
					<view class="card-label">充值金变动合计:</view>
					<view class="card-value">5000</view>
				</view>
			</view>
			<view class="list card">
				<!-- 在此添加可滚动列表，显示字段及接口名请参见要求 -->

				<scroll-view class="list-content" scroll-y style="display:none;">
					<view class="list-item" v-for="(item, index) in data.record.list" :key="index">
						<view class="item-index">{{ index + 1 }}</view>
						<view class="item-info">
							<view class="item-name">{{ item.merchantName }}</view>
						</view>
						<view class="item-value">{{ item.changeType }}</view>
						<view class="item-value">{{ item.changeAmount }}</view>
						<view class="item-value">{{ item.syncTime }}</view>
					</view>
				</scroll-view>

				<!-- <u-load-more
		  :loading="data.record.loading"
		  :finished="data.record.finished"
		> -->
				<view id="table-scroll" class="table-scroll">
					<table id="main-table" class="main-table">
						<thead>
							<tr>
								<th>No.</th>
								<th v-for="(item, i) in data.record.recordHeaders" :key="i" style="text-align:left;">
									{{ item }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, i) in data.record.list" :key="i">
								<th style="width:50px;">{{ i + 1 }}</th>
								<td style="width:90px;">{{ item.merchantName }}</td>
								<td style="width:90px;">{{ item.changeType }}</td>
								<td style="width:120px;">{{ item.changeAmount }}</td>
								<td>{{ item.syncTime }}</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td v-for="(item, i) in data.record.recordHeaders" :key="i"></td>
							</tr>
						</tfoot>
					</table>
				</view>
				<!-- </u-load-more> -->
			</view>
		</view>

		<input type="text" v-model="search" />
	</view>
</template>

<script>
	import uLoadMore from "@/components/u-load-more/u-load-more";
	import uHeaderCount from "@/components/u-header-count/u-header-count";
	export default {
		components: {
			uLoadMore,
			uHeaderCount,
		},
		data() {
			return {
				current: 0,
				buttonList: [{
					name: "启用"
				}, {
					name: "停用"
				}],
				list: [{
						name: "待唤醒汇总",
					},
					{
						name: "待唤醒客户列表",
					},
				],
				search: "",
				startDate: new Date("2022/01/01"),
				endDate: new Date(),
				activeTab: "summary",
				data: {
					summary: {
						total_merchants: 0,
						total_recharge_amount: 0,
						recharge_balance: 0,
						summaryHeaders: [
							"掌柜",
							"手机号",
							"总充值金额",
							"充值金总金额",
							"可消费充值金余额",
							"不可消费充值金余额",
						],
						list: [{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
							{
								merchantName: "王先生",
								phone: "139887654467",
								totalRechargeAmount: "2000",
								rechargeBalance: "2000",
								rechargeBalanceToConsume: "4000",
								rechargeBalanceNotToConsume: "2000",
							},
						],
					},
					record: {
						loading: false,
						finished: false,
						recordHeaders: [
							"掌柜",
							"增减类型",
							"增减金额",
							"同步时间",
						],
						list: [{
								merchantName: "王先生",
								changeType: "139887654467",
								changeAmount: "2000",
								syncTime: "2000",
							},
							{
								merchantName: "王先生",
								changeType: "139887654467",
								changeAmount: "2000",
								syncTime: "2000",
							},
						],
					},
				},
			};
		},
		computed: {
			filteredItems() {
				return this.data.summary.list.filter((item) => {
					return true;
					// (
					//   item.merchantName.toLowerCase().indexOf(this.search.toLowerCase()) >
					//   -1
					// );
				});
			},
		},
		methods: {
			loadMore() {
				console.log('loadMore');
			},
			change(tab) {
				this.current = tab.index;
				console.log(tab.index);
			},
			async loadData() {
				if (this.activeTab === "summary") {
					const res = await uni.request({
						url: "/api/sharerEmployee//report/balance-summary",
					});
					if (res[1].statusCode === 200) {
						this.data.summary = res[1].data;
					}
				} else {
					this.data.record.loading = true;
					const res = await uni.request({
						url: "/api/sharerEmployee//report/balance-records",
						data: {
							start_date: this.startDate,
							end_date: this.endDate,
						},
					});
					if (res[1].statusCode === 200) {
						this.data.record.list = res[1].data;
						if (res[1].data.length < 10) {
							this.data.record.finished = true;
						}
					}
					this.data.record.loading = false;
				}
			},
			formatDate(date) {
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				m = m < 10 ? "0" + m : m;
				d = d < 10 ? "0" + d : d;
				return `${y}-${m}-${d}`;
			},
			onStartDateChange(e) {
				console.log(JSON.stringify(e));
				// let index = e.target.dataset.index;
				let value = e.detail.value;
				this.startDate = new Date(value);
			},
			onEndDateChange(e) {
				console.log(JSON.stringify(e));
				// let index = e.target.dataset.index;
				let value = e.detail.value;
				this.endDate = new Date(value);
			},
			confirmDate() {
				// 发起 API 请求
				let params = {
					start: this.formatDate(this.startDate),
					end: this.formatDate(this.endDate),
				};
				this.isLoading = true;
				api
					.post("/api/customers-count", params)
					.then((res) => {
						this.dataList = res.data;
						this.isLoading = false;
					})
					.catch((err) => {
						console.log(err);
						this.isLoading = false;
					});
			},
		},
	};
</script>

<style scoped>
	.tab-bar-area {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 49px;
		background-color: #000;
		position: relative;
	}

	.tab-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 49px;
		background-color: #000;
		position: relative;
		width: 260px;
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
		color: #cccccc;
	}

	.tab-bar .tab-item .active {
		color: white;
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

	.card {
		margin: 10px;
		background-color: #fff;
		border-radius: 12px;
		display: flex;
	}

	.card-item {
		justify-content: center;
		align-items: center;
		height: 70px;
		padding: 10px;
		margin: 3px 10px;
		border-radius: 12px;
	}

	.card .card-item:first-child {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
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

	.record .card-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		padding: 10px;
	}

	.card .card-item:last-child {
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
	}

	.card-value {
		font-size: 20px;
		font-weight: bold;
		color: #000;
	}

	.card-label {
		font-size: 12px;
		color: #999;
		padding-right: 10px;
	}

	.list {
		margin-top: 15px;
		background-color: #fff;
		border-radius: 12px;
		padding: 10px;
	}

	.record .date-picker {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.record .date-picker button.confirm-btn {
		font-size: 16px;
		color: #fff;
		background: linear-gradient(90deg, #f5a623, #ffb300);
		border-radius: 50px;
		width: 80px;
		height: 36px;
		border: none;
		margin-right: 10px;
		padding: 0;
	}

	.record .list {
		margin-top: 15px;
		background-color: #fff;
		border-radius: 12px;
		padding: 10px;
	}

	html {
		box-sizing: border-box;
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	.intro {
		max-width: 1280px;
		margin: 1em auto;
	}

	.table-scroll {
		position: relative;
		width: 100%;
		z-index: 1;
		margin: auto;
		overflow: auto;
		height: 500px;
	}

	.table-scroll table {
		width: 100%;
		min-width: 1280px;
		margin: auto;
		border-collapse: separate;
		border-spacing: 0;
	}

	.table-wrap {
		position: relative;
	}

	.table-scroll th,
	.table-scroll td {
		padding: 5px 10px;
		border-bottom: 1px solid #efefef;
		background: #fff;
		vertical-align: top;
		height: 38px;
		vertical-align: middle;
	}

	.table-scroll thead th {
		background: white;
		color: black;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
	}

	/* safari and ios need the tfoot itself to be position:sticky also */
	.table-scroll tfoot,
	.table-scroll tfoot th,
	.fixedColumn,
	.table-scroll tfoot td {
		position: -webkit-sticky;
		position: sticky;
		bottom: 0;
		background: white;
		color: black;
		z-index: 4;
	}

	a:focus {
		background: red;
	}

	/* testing links*/

	th:first-child,
	.fixedColumn {
		position: -webkit-sticky;
		position: sticky;
		left: 0;
		z-index: 2;
		background: #fff;
		/* color: red; */
	}

	thead th:first-child,
	.fixedColumn,
	tfoot th:first-child,
	.fixedColumn {
		z-index: 5;
	}



	.list-content {
		/* Add your CSS styles here */
		background-color: #f2f2f2;
		padding: 10px;
		height: 500px;
	}

	.list-item {
		/* Add your CSS styles here */
		display: flex;
		align-items: center;
		padding: 10px;
		margin-bottom: 10px;
		background-color: white;
		border-radius: 8px;
	}

	.item-index {
		/* Add your CSS styles here */
		width: 30px;
		margin-right: 10px;
		font-weight: bold;
	}

	.item-info {
		/* Add your CSS styles here */
		flex-grow: 1;
	}

	.item-name {
		/* Add your CSS styles here */
		font-weight: bold;
	}

	.item-phone {
		/* Add your CSS styles here */
		color: gray;
	}

	.item-value {
		/* Add your CSS styles here */
		font-weight: bold;
	}
</style>