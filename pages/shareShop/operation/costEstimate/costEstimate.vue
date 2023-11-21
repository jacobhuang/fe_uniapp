<template>
	<view class="scheme-list">
		<u-tabs :list="list" :is-scroll="false" :current="current" bar-width="50" active-color="orange"
			@change="change">
		</u-tabs>
		<view v-if="current == 0" style="margin-top: 15px;">
			<view class="card-wrapper" v-for="(item, index) in schemeList" :key="index">
				<view class="card-tag" v-if="item.default">{{ item.default }}</view>

				<view class="card-header">
					<view class="card-title">{{ item.schemeName }}</view>
				</view>
				<view class="card-content">
					<view class="card-line">
						<view class="cooperation-years">{{ item.cooperationYears }}</view>
						<view class="dividing-ratio">{{ item.dividingRatio }}</view>
					</view>
					<view class="card-line">
						<view class="gift-amount">{{ item.giftAmount }}</view>
						<view class="gift-plan">{{ item.giftPlan }}</view>
					</view>
					<view class="card-line">
						<view class="cooperation-desc">{{ item.cooperationDesc }}</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="btn-wrap">
						<view class="btn-delete" @click="deleteScheme(index)">{{ btnText.delete }}</view>
						<view class="btn-edit" @click="editScheme(index)">{{ btnText.edit }}</view>
						<view class="btn-use" @click="useScheme(index)">{{ btnText.use }}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view v-if="current == 1">
			22
		</view>
		<view class="footer">
			<button class="btn-restore" @click="restoreDefault">{{ btnText.restore }}</button>
			<button class="btn-add" @click="addScheme">{{ btnText.add }}</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: "方案设计",
					},
					{
						name: "新增方案",
					},
				],
				//默认展开第几项
				current: 0,
				schemeList: [], // 存储数据源
				btnText: { // 存储按钮文本内容，以便后期可能的国际化处理
					delete: '删除',
					edit: '修改',
					use: '使用该方案',
					restore: '恢复默认方案',
					add: '新增核算方案'
				}
			}
		},
		methods: {
			change(item) {
				this.current = item.index;
			},
			// 初始化数据，调用接口获取列表数据
			initSchemeList() {
				// api.fetchData 获取数据的方法（这里采用mock数据作为示例）
				this.schemeList = [...Array(10)].map((v, i) => ({
					schemeName: '方案名称:合作金额' + (i + 1) * 1000,
					default: (i == 0 || i == 2) ? '默认方案' : '',
					cooperationYears: '合作年限：' + (i + 1) + '年',
					dividingRatio: '分红比例：' + ((i + 1)) + '%',
					giftAmount: '赠送金额：' + (i + 1) * 1000,
					giftPlan: '赠送套餐：套餐' + i,
					cooperationDesc: '合作方案一描述\n合作方式二描述\n合作方案三描述'
				}))
			},
			// 删除方案
			deleteScheme(index) {
				this.schemeList.splice(index, 1)
			},
			// 编辑方案
			editScheme(index) {
				// 编辑逻辑
				// 根据传入的index获取对应的方案数据
				const scheme = this.schemeList[index]
				// 跳转到编辑页面，并传入方案数据
				uni.navigateTo({
				  url: `/pages/home/costEstimate/editScheme/editScheme?scheme=${JSON.stringify(scheme)}&index=${index}`
				})
			},
			// 使用方案
			useScheme(index) {
				// 使用逻辑
			},
			// 恢复默认方案
			restoreDefault() {
				// 恢复逻辑
			},
			// 新增方案
			addScheme() {
      // 新增逻辑
      const newScheme = {
        schemeName: '新方案',
        default: '',
        cooperationYears: '',
        dividingRatio: '',
        giftAmount: '',
        giftPlan: '',
        cooperationDesc: ''
      }
      this.schemeList.push({...newScheme})
      },
			// 格式化数字（整数部分每三位加逗号，小数点后保留两位）
			formatNumber(num) {
				return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
					return $1 + ','
				}).replace(/\.$/, '').split('.')[1] ? num.toFixed(2) : num
			}
		},
		filters: {
			// 格式化百分比（保留两位小数）
			formatPercent(val) {
				return val ? (val * 100).toFixed(2) + '%' : '0'
			},
			// 格式化金额
			formatMoney(val) {
				return '￥' + this.formatNumber(val)
			}
		},
		mounted() {
			this.initSchemeList()
		}
	}
</script>

<style scoped>
  .u-tabs {
    background-color: black;
  }
  
  .u-tabs__item {
    color: white;
  }
  .u-tabs__item--active {
    color: gold;
  }

	.scheme-list {
		padding: 16rpx;
	}

	.card-wrapper {
		margin-bottom: 16rpx;
		border-radius: 10rpx;
		background-color: #EFEFEF;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.card-header {
		display: flex;
		align-items: center;
		padding: 16rpx;
		font-weight: bold;
		font-size: 34rpx;
		color: #000;
	}

	.card-tag {
		margin-right: auto;
		margin-left: 0rpx;
		padding: 4rpx 8rpx;
		border-radius: 10rpx 0 10rpx 0;
		width: 150rpx;

		color: #fff;
		background-color: #ffc107;
		font-size: 30rpx;
	}

	.card-content {
		padding: 0 16rpx 16rpx;
		font-size: 28rpx;
		color: #666;

	}

	.card-line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8rpx;
	}

	.cooperation-desc {
		white-space: pre-wrap;
		font-size: 28rpx;
		text-indent: 2em;
		color: #333;
	}

	.card-footer {
		display: flex;
		justify-content: flex-end;
		background-color: #fff;
		padding: 16rpx;
	}

	.btn-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.btn-delete,
	.btn-edit,
	.btn-use {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 52rpx;
		padding: 0 20rpx;
		border-radius: 26rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.btn-delete {
		background-color: #CCCCCC;
		margin-right: 12rpx;
	}

	.btn-edit {
		background-color: #CCCCCC;
		margin-right: 12rpx;
	}

	.btn-use {
		background-image: linear-gradient(90deg, #FFF8E1);
		color: #9E7C30;
	}


	.btn-delete:hover,
	.btn-edit:hover,
	.btn-use:hover {
		opacity: 0.9;
	}


	.footer {
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #EFEFEF;
		padding: 20rpx;
	}

	.btn-restore,
	.btn-add {
		height: 40px;
		width: 45%;
		border-radius: 20px;
		border: none;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		white-space: nowrap;
	}

	.btn-restore {
		color: white;
		background-color: grey;
	}

	.btn-add {
		color: darkgoldenrod;
		background-image: linear-gradient(45deg, white, gold);
		box-shadow: 0 0 5px darkgoldenrod;
	}

	.btn-add:hover {
		box-shadow: 0 0 10px darkgoldenrod;
	}
</style>