<template>
	<view >
		<view>
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">商品毛利设置</block>
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
								<view class="list-header">参与奖励</view>
								<view class="list-header">分类名称</view>
							
								<view class="list-header">毛利率</view>
							</view>
							
						</view>
						
					</view>
					<view class="card-wrapper" v-for="(item, i1) in schemeList" :key="i1">
						<view class="card-content">
							<view class="card-line">
								<view class="cooperation-years"> {{ item.status }}<u-radio v-model="item.status"></u-radio></view>
								<view class="dividing-ratio">{{ item.categoryName }}</view>
								<view class="profit-rate"><input type="text" placeholder="" v-model="item.grossMarginRate" />%</view>
							</view>
							<view class="card-wrapper" v-for="(secondItem, i2) in item.children" :key="i2">
								<view class="card-content">
									<view class="card-line">
										<view class="cooperation-years"> {{ secondItem.status }} <u-radio v-model="secondItem.status"></u-radio></view>
										<view class="dividing-ratio">{{ secondItem.categoryName }}</view>
										<view class="profit-rate"><input type="text" placeholder="" v-model="secondItem.grossMarginRate" />%</view>
									</view>
									<view class="card-wrapper" v-for="(triItem, i3) in secondItem.children" :key="i3">
										<view class="card-content">
											<view class="card-line">
												<view class="cooperation-years"> {{ triItem.status }}<u-radio v-model="triItem.status"></u-radio></view>
												<view class="dividing-ratio">{{ triItem.categoryName }}</view>
												<view class="profit-rate"><input type="text" placeholder="" v-model="triItem.grossMarginRate" />%</view>
											</view>
											
										</view>
										
									</view>
								</view>
								
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
								<view class="list-header">参与奖励</view>
								<view class="list-header">商品名称</view>
							<view class="list-header">售价</view>
								<view class="list-header">毛利率</view>
							</view>
							
						</view>
						
					</view>
					<view class="card-wrapper" v-for="(item, index) in productSchemeList" :key="index">
						<view class="card-content">
							<view class="card-line">
								<view class="cooperation-years"> {{ item.cooperationYears }}</view>
								<view class="dividing-ratio">{{ item.shopName }}</view>
								<view class="dividing-ratio">{{ item.price }}</view>
								<view class="profit-rate"><input type="text" placeholder="" v-model="item.giftPlan" />%</view>
							</view>
							
						</view>
						
					</view>
				</view>
			</view>
				
		</view>

	</view>
</template>

<script>
	import UniOrg from './component/uni-org.vue';
	import uRadio from '../../../../uni_modules/uview-ui/components/u-radio/props.js'
	export default {
	  components: {
	    UniOrg
	  },
		data() {
			return {
				orgDataUrl:'http://localhost:9999/jeecg-demo/productCategory/orgData?page=10&pageSize=100',
				buttonList:[{name:"已设置"},{name:"未设置"}],
				list: [{
						name: "分类毛利",
					},
					{
						name: "商品毛利",
					},
				],
				//默认展开第几项
				current: 0,
				schemeList: [], // 分类存储数据源
				productSchemeList: [], // 商品列表
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
				// this.schemeList = [...Array(50)].map((v, i) => ({
				// 	default:  '默认方案',
				// 	giftType:  '毛利分红',
				// 	cooperationYears:  '是',
    //                 dividingRatio: '顶级分类',
    //                 shopName:'狮子头',
    //                 price:'30.00',
				// 	giftPlan: 30
				// }))
				uni.request({
				  url: this.orgDataUrl,
				  method: 'GET',
				  header: {
				    'X-ACCESS-TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDIzMzA0OTYsInVzZXJuYW1lIjoiYWRtaW4ifQ.U8NL70BQCR-KuSrTPOpDyI6skiGbidrB2EohKkS-6t8' // Add X-ACCESS-TOKEN parameter to the header
				  },
				  success: (response) => {
				  
				  this.schemeList = response.data.result.records;
				    console.log(JSON.stringify(response.data));
				  },
				  fail: (error) => {
				    console.error(error);
				  }
				});
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