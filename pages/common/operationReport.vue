<template>

	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content"></block>
			</cu-custom>


			<view class="padding">
				<view class="u-page__tag-item" v-for="(item, index) in radios" :key="index" style="float:left;">
					<view style="float:left;width:100upx;">
						<u-tag :text="`${item.text}`" :plain="!item.checked" type="warning" :name="index"
							@click="radioClick">
						</u-tag>
					</view>

				</view>

			</view>
			<view class="padding ">
				今日业绩 本月业绩 上月同期（+100%） 上月业绩
			</view>

			<view class="padding ">
				今日消费0人,平均客单价0元/单
			</view>

			<view class="padding ">
				收款类型 收款金额 交易笔数 退款金额 退款笔数

				合计
				<u-icon name="zhifubao" color="#2979ff" size="28"></u-icon>
				<u-icon name="weixin-fill" color="#00aa00" size="28"></u-icon>
			</view>


		</scroll-view>
	</view>

</template>

<script>
	const plan_type = [{
		text: '日常记录',
		value: '1'
	}, {
		text: '本周工作',
		value: '2'
	}, {
		text: '下周计划',
		value: '3'
	}];
	import appSelect from '@/components/my-componets/appSelect.vue'
	import myImageUpload from '@/components/my-componets/my-image-upload.vue'
	import myDate from '@/components/my-componets/my-date.vue'

	export default {
		components: {
			appSelect,
			myImageUpload,
			myDate
		},
		data() {
			return {
				treeData: [
				          {
				            id: 1,
				            name: '黑谷科技1-总部',
				            open: true,
				            children: [
				              {
				                id: 2,
				                name: '黑谷1号（美业）',
				                open: true,
				                children: []
				              }
				            ]
				          }
				        ],
				radios: [{
						text: "今日",
						checked: true
					},
					{
						text: "月报",
						checked: false
					},
					{
						text: "年报",
						checked: false
					},
					{
						text: "累计",
						checked: false
					}
				],
				modalName: null,
				item: {
					msg: '退出成功'
				},
				plan_type,
				type: "1",
				selected: [],
				beginTime: ''
			}
		},
		methods: {
			radioClick(name) {
				this.radios.map((item, index) => {
					item.checked = index === name ? true : false
				})
			},
		}
	}
</script>

<style lang="scss">
	.u-page__tag-item {
		margin-right: 20px;
		width: 60px;
	}
</style>
