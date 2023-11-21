<template>
	<view >
		<view>
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">会员中心</block>
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
                    <view class="filter-area">
                        <view class="button-bar">
                            <view class="button-style-selected" v-for="(item,index) in buttonList" :key="index">
                                {{item.name}}
                            </view>
                        </view>
                    </view>
					
					<view class="card-wrapper" v-for="(item, index) in schemeList" :key="index">
						<view class="card-content">
                            <view class="card-line">
                                <view class="cooperation-years">{{ item.cooperationYears }} | {{ item.phone }}</view>
                                <view style="display:inline-flex;justify-content:space-between;">
                                    <view class="dividing-ratio">{{ item.dividingRatio }}</view>
                                    <view class="dividing-ratio">{{ item.dividingRatio }}</view>
                                
                                </view>
                                <view style="display:inline-flex;justify-content:space-between;">
                                    <view class="dividing-ratio">{{ item.gotTime }}</view>
                                    <view class="dividing-ratio">{{ item.gotTime }}</view>
                           
                                </view>
                            </view>
                            
                            
                        </view>
                        <view class="card-footer">
                            <view class="profit-time">
								Randi食单店
							</view>
                            <view class="btn-wrap">
                                
                                <view class="btn-delete" @click="deleteScheme(index)">{{ btnText.delete }}</view>
                                <view class="btn-use" @click="useScheme(index)">{{ btnText.use }}</view>
                            </view>
                        </view>
                        
					</view>
					
				</view>
				<view v-if="current == 1" style="height:100vh;">
                   <view class="setting-header">
						会员流失报警设置
					</view>
					<view class="setting-content">
						<view class="input-form">
								正在淡忘会员<view class="input-wrapper">
									<input type="text" placeholder="" />
								</view>天（含以上）未到店消费
								
							</view>
							
					</view>
                       <view class="setting-header">
						
					</view>
					<view class="setting-content">
						<view class="input-form">
								即将流失会员<view class="input-wrapper">
									<input type="text" placeholder="" />
								</view>天（含以上）未到店消费
								
							</view>
							
					</view>
                      <view class="setting-header">
						
					</view>
                    <view class="setting-content">
						<view class="input-form">
								已经流失会员<view class="input-wrapper">
									<input type="text" placeholder="" />
								</view>天（含以上）未到店消费
								
							</view>
							
					</view>
				</view>
				
			</view>
				
		</view>
		<view class="footer">
			<!-- <button class="btn-restore" @click="restoreDefault">{{ btnText.restore }}</button> -->
			<button class="btn-add" @click="addScheme">{{ btnText.add }}</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonList:[{name:"消费总额"},{name:"消费次数"},{name:"月平均消费次数"},{name:"平均客单价"},{name:"领取礼券数量"},{name:"转介绍次数"},{name:"获得奖励"},{name:"几天未到店"}],
				list: [{
						name: "客户资料",
					},
					{
						name: "会员流失警报设置",
					},
					
				],
				//默认展开第几项
				current: 0,
				schemeList: [], // 存储数据源
				roleList: [], //角色
				departmentList: [], //部门
				btnText: { // 存储按钮文本内容，以便后期可能的国际化处理
					delete: '删除',
					edit: '结束',
					use: '修改',
					restore: '恢复默认方案',
					add: '添加客户'
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
					default:  '默认方案',
					giftType:  '毛利分红',
                    cooperationYears: '客户一 ',
                    phone:'13989999999',
                    dividingRatio: '消费总额： | ¥243',
                    gotTime:'平均客单价：¥138',
					giftAmount: '直接客源奖励比例：' + (50)+'%',
					giftPlan: '间接客源奖励比例：' + (30)+'%'
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
       giftAmount: '直接客源奖励比例：' + (50)+'%',
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
            this.initSchemeList();
		}
	}
</script>

<style scoped>
	.main-content{
		height: 78vh;
		margin-bottom: 10px;
		overflow-y:scroll;
	}
	.input-form{
		display:inline-flex;
		flex-direction: row;
		align-items: center;
        font-size:9pt;
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
		background-color: #E7E2E2;
		padding:20rpx 20rpx;
		border-radius: 15rpx;
	}
	.profit-rate{
		border:1px solid #cc9d0f;
		font-size:9pt;
		padding: 5rpx 10rpx;color:#cc9d0f;
		margin: 20rpx 5rpx;
		font-weight: bold;
	}
    .filter-area{
        
        overflow-x:scroll;  
    }
	.button-bar{width:240vw;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		
	}
	.button-style{
		font-size: 9pt;
		border-radius: 20rpx;
		/* border:1px solid orange; */
		padding: 5rpx 40rpx;
		margin: 20rpx 10rpx;
		color: #777777;
		background-color: #fbfbfb;
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
		padding: 16rpx;
		height:90vh;
	}

	.card-wrapper {
		margin-bottom: 36rpx;
		border-radius: 10rpx;
		background-color: #EFEFEF;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.card-tag {float:left;
		margin-right: auto;
		margin-left: 0rpx;
		padding: 10rpx 20rpx;
		border-radius: 10rpx 0 10rpx 0;
		width: auto;

		color: #fff;
		background-color: #cc9d0f;
		font-size: 30rpx;
	}
	.card-tag-right {
		margin-left: auto;
		margin-right: 0rpx;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 10rpx 0 10rpx;
		width: 120rpx;

		color: #cc9d0f;
		background-color: #ffeb9c;
		font-size: 25rpx;
	}

	.card-content {
		padding: 30rpx;
		font-size: 11pt;
		padding-bottom:0;
		color: #666;

	}

	.card-line {
		display: flex;
        flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		margin-bottom: 8rpx;
	}
    .cooperation-years{
        font-size:12pt;
        font-weight: bold;
        color:#000000;
    }
	.cooperation-desc {
		white-space: pre-wrap;
		font-size: 28rpx;
		text-indent: 2em;
		color: #333;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 10rpx 30rpx;
	}

	.btn-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.profit-time{
		display: inline-flex;
		align-items: center;
		justify-content: start;
		font-size: 9pt;
        color:#888888;
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
		background-image: linear-gradient(45deg, rgba(255, 166, 0, 0.464),orange);
		color: #583E07;
	}


	.btn-delete:hover,
	.btn-edit:hover,
	.btn-use:hover {
		opacity: 0.9;
	}


	.footer {
		/* display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #EFEFEF;
		padding: 20rpx; */
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
		color: #81450f;
		background-image: linear-gradient(90deg, white, #CA8C17);
		/* box-shadow: 0 0 5px darkgoldenrod; */
		width: 98vw;
		font-size:12pt;
	}

	.btn-add:hover {
		box-shadow: 0 0 10px darkgoldenrod;
	}
</style>