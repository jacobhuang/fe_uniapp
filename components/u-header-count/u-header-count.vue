<template>
	<view class="card ">
		<view class="card-item">
			<view class="card-value">{{ totalMerchant }}</view>
			<view class="card-label">{{ merchantLabel }}</view>
		</view>
		<view class="card-item">
			<view class="card-value">{{ totalRechargeAmount }}</view>
			<view class="card-label">{{ rechargeAmountLabel }}</view>
		</view>
		<view class="card-item">
			<view class="card-value">{{ totalRechargeBalance }}</view>
			<view class="card-label">{{ rechargeBalanceLabel }}</view>
		</view>
		<view class="card-item" v-if="rechargeBalanceLabel1!=''">
			<view class="card-value">{{ totalRechargeBalance1 }}</view>
			<view class="card-label">{{ rechargeBalanceLabel1 }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "u-header-count",
		props: {
			totalMerchant: {
				type: Number,
				default: 0
			},
			totalRechargeAmount: {
				type: Number,
				default: 0
			},
			totalRechargeBalance: {
				type: Number,
				default: 0
			},
			totalRechargeBalance1: {
				type: Number,
				default: 0
			},
			merchantLabel: {
				type: String,
				default: '掌柜总数'
			},
			rechargeAmountLabel: {
				type: String,
				default: '总充值金额'
			},
			rechargeBalanceLabel: {
				type: String,
				default: '充值金总余额'
			},
			rechargeBalanceLabel1: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style>

	.card {
		text-align: center;
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
		margin: 3px 0px;
		border-radius: 12px;
		width:33%;
	}

	.card .card-item:first-child {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
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
	}
</style>