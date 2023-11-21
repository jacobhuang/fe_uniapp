<template>
	<view >
		<view>
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">商品管理</block>
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
		<view class="main-content">
			<view class="scheme-list" >
				<view v-if="current == 0">
					<view class="button-bar">
						<view class="button-style-selected" v-for="(item,index) in buttonList" :key="index">
							{{item.name}}
						</view>
					</view>
                    <view class="card-wrapper" >
						<view class="card-content">
							<view class="card-line">
								<view class="list-header">商品分类名称</view>
								<view class="list-header">创建时间</view>
							</view>
							
						</view>
						
					</view>
					<view class="card-wrapper" v-for="(item, index) in schemeList" :key="index">
						<view class="card-content">
							<view class="card-line">
								<view class="cooperation-years"> {{ item.cooperationYears }}</view>
								<view class="dividing-ratio">{{ item.dividingRatio }}</view>
								
							</view>
							
						</view>
						
					</view>
					
				</view>
				<view v-if="current == 1" style="height:100vh;">
					<view class="button-bar">
						<view class="button-style-selected" v-for="(item,index) in buttonList" :key="index">
							{{item.name}}
						</view>
					</view>
                    <view class="card-wrapper" >
						<view class="card-content">
							<view class="card-line">
								<view class="list-header">商品名称</view>
								<view class="list-header">销售价</view>
							<view class="list-header">型号规格</view>
								<view class="list-header">创建时间</view>
							</view>
							
						</view>
						
					</view>
					<view class="card-wrapper" v-for="(item, index) in schemeList" :key="index">
						<view class="card-content">
							<view class="card-line">
								<view class="cooperation-years"> {{ item.cooperationYears }}</view>
								<view class="dividing-ratio">{{ item.shopName }}</view>
								<view class="dividing-ratio">{{ item.price }}</view>
								<view class="dividing-ratio">{{item.giftPlan}}</view>
							</view>
							
						</view>
						
					</view>
				</view>
			</view>
				
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonList:[{name:"全部分类"},{name:"未设置"}],
				list: [{
						name: "商品分类",
					},
					{
						name: "商品管理",
					},
				],
				//默认展开第几项
				current: 0,
				schemeList: [], // 存储数据源
				btnText: { // 存储按钮文本内容，以便后期可能的国际化处理
					delete: '删除',
					edit: '停用',
					use: '修改',
					restore: '恢复默认方案',
					add: '添加方案'
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
				this.schemeList = [...Array(50)].map((v, i) => ({
					default:  '默认方案',
					giftType:  '毛利分红',
					cooperationYears:  '热菜',
                    dividingRatio: '2023-03-03',
                    shopName:'200',
                    price:'大',
					giftPlan: '2023-03-01'
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
	  var i=10;
      const newScheme = {
       default:  '默认方案',
       giftType:  '毛利分红',
       cooperationYears: '充值金额：' + (i + 1) * 1000 + '元',
       dividingRatio: '绑定方案的人数：' + ((i + 1)) + '人',
       giftPlan: '间接客源奖励比例：' + (30)+'%'
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
	.main-content{
		height: 100vh;
		margin-bottom: 60px;
		overflow-y:scroll;
	}
	
    .profit-rate input {
		flex: 1;
		border: none;
		outline: none;
		/* padding: 0 8px; */
		font-size: 10pt;
		width:20px;
		
	} 
	.list-header{
        font-size:11pt;
        color:#000000;
        font-weight: bold;
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
		background-color: #E7E2E2;
		padding:20rpx 20rpx;
		border-radius: 15rpx;
	}
	.profit-rate{
		border:1px solid #EFEFEF;
		font-size:10pt;
		padding: 5rpx 10rpx;color:#cc9d0f;
		margin: 20rpx 5rpx;
		font-weight: bold;
        display: inline-flex;
        
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

	.scheme-list {
		/* padding: 16rpx; */
		height:100vh;
	}

	.card-wrapper {
		/* margin-bottom: 36rpx; */
		/* border-radius: 10rpx; */
		background-color: #EFEFEF;
		/* box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1); */
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.card-content {
		padding: 30rpx;
		font-size: 11pt;
		padding-bottom:0;
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
</style>