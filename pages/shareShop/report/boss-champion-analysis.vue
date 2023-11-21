<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="content">充值金增减汇总</block>
		</cu-custom>
		<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
			<i class="fa fa-chevron-left" style="margin-right: 10px;" @click="selectedYear--">〈</i>
			<span style="font-size: 20px; font-weight: bold;">{{ selectedYear }}</span>
			<i class="fa fa-chevron-right" style="margin-left: 10px;" @click="selectedYear++">〉</i>
		</div>
		<!-- 创建一个表格 -->
		<table>
			<!-- 表头 -->
			<thead>
				<tr>
					<th>月份</th>
					<th>月冠军</th>
					<th>季冠军</th>
					<th>年冠军</th>
				</tr>
			</thead>
			<!-- 表格主体 -->
			<tbody>
				<!-- 12行数据 -->
				<tr v-for="(item, index) in filteredChampionList" :key="index">
					<td>{{item.month}}</td>
					<td>{{item.monthChampion}}</td>
					<td v-if="index % 3 === 0" :rowspan="3">{{item.quarterChampion}}</td>
					<td v-if="index % 12 === 0" :rowspan="12">{{item.yearChampion}}</td>
				</tr>
				<tr v-for="i in 12 - filteredChampionList.length" :key="i">
					<td>{{i+filteredChampionList.length}}月</td>
					<td></td>
					<td v-if="i % 3 === 0" :rowspan="3"></td>
					<td v-if="i % 12 === 0" :rowspan="12"></td>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script>
	import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants"
	import { mapActions } from "vuex"
	import configService from '@/common/service/config.service.js';
	export default {
		data() {
			return {
				selectedYear: parseInt(new Date().getFullYear().toString())-1,
				championList: []
			}
		},
		computed: {
			filteredChampionList() {
                //判断如果等于当前年份则直接返回
                if (parseInt(this.selectedYear) > new Date().getFullYear()) {
					this.selectedYear--;
                    return this.championList.filter(item => item.year === parseInt(new Date().getFullYear()));
                }
				if (parseInt(this.selectedYear) < 2000) {
					this.selectedYear++;
				    return this.championList.filter(item => item.year === 2000);
				}

				if (this.selectedYear) {
					return this.championList.filter(item => item.year === parseInt(this.selectedYear));
				} else {
					return this.championList;
				}
			},
			uniqueYears() {
				const years = new Set();
				console.log(JSON.stringify(this.championList));
				this.championList.forEach(item => years.add(item.year));
				return Array.from(years);
			}
		},
		methods: {
			...mapActions([ "championReport" ]),
			async getChampionList() {
				
				try {
					this.championReport().then(res=>{
						console.log(JSON.stringify(res));
					  if(res.data.success){
						console.log(res.data);
						this.championList = res.data.result;
					  }else{
						this.$tip.toast(res.data.message);
					  }
					});
					
				} catch (error) {
					console.error(error);
				}
			}
		},
		mounted() {
			this.getChampionList();
		}
	}
</script>



<style>
	/* 提取的css定义 */
	table {
		border-collapse: collapse;
		width: 100%;
		/* min-width:1180px; */
		text-align: center;
		/* display: flex; */
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		/* float:left;width:80px;height:20px; */
	}

	thead {
		background-color: #f2f2f2;
	}

	tbody tr:nth-child(even) {
		background-color: #f9f9f9;
	}
</style>