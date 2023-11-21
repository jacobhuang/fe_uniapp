/**
 * 共享店铺
 * 
 */
const icon_prefix = "/static/home/128/"
export const shareShop = {
	data: [{
			title: "报表分析",
			icon: icon_prefix + "richang.png",
			description: "报表分析",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data:[
            {
              title:"掌柜拓客排名",
              icon:icon_prefix+"richang.png",
              description:"掌柜拓客排名",
              useCount:1000,
            page:'bossCount'
            },{
              title:"充值金增减汇总",
              icon:icon_prefix+"zhoubao.png",
              description:"充值金增减汇总",
              useCount:10000,
            page:'rechargeIncreaseDecreaseCount'
            },{
              title:"掌柜奖励排名",
              icon:icon_prefix+"kaoqin.png",
              description:"掌柜奖励排名",
              useCount:10000,
            page:'bossRewardRanking'
            },{
              title:"掌柜贡献排名",
              icon:icon_prefix+"richeng.png",
              description:"掌柜贡献排名",
              useCount:10000,
            page:'bossContributionRanking'
            },{
              title:"专属管家排名",
              icon:icon_prefix+"qingjia1.png",
              description:"专属管家排名",
              useCount:10000,
            page:'exclusiveStewardRanking'
            },{
            title:"转介绍掌柜",
            icon:icon_prefix+"chuchai.png",
            description:"客源流失分析",
            useCount:10000,
            page:'bossIntroductionRanking'
            },{
            title:"掌柜冠军报表",
            icon:icon_prefix+"chuchai.png",
            description:"掌柜冠军报表",
            useCount:10000,
            page:'bossChampionAnalysis'
            },{
              title:"待唤醒客户",
              icon:icon_prefix+"richeng.png",
              description:"待唤醒客户",
              useCount:10000,
            page:'waitToWakeupCustomers'
            },{
              title:"客源流失分析",
              icon:icon_prefix+"qingjia1.png",
              description:"客源流失分析",
              useCount:10000,
            page:'customerAttritionAnalysis'
            }
          ]
			}
		},
		{
			title: "操作中心",
			icon: icon_prefix + "richang.png",
			description: "操作中心",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data:[
            {
              title:"商品毛利设置",
              icon:icon_prefix+"gongwen.png",
              description:"商品毛利设置",
              useCount:10000,
              page:'goodsProfitSetting'
            },{
              title:"奖励方案设置",
              icon:icon_prefix+"tongzhi.png",
              description:"奖励方案设置",
              useCount:10000,
              page:'awardSetting'
            },{
              title:"贵宾卡管理",
              icon:icon_prefix+"youjian.png",
              description:"贵宾卡管理",
              useCount:10000,
              dot:false,
              page:'vipCardManagement'
            },{
              title:"共享掌柜管理",
              icon:icon_prefix+"tongxun.png",
              description:"共享掌柜管理",
              useCount:10000,
              page:'sharedBossManagement'
            }
            ]
			}
		},
		{
			title: "公共设置",
			icon: icon_prefix + "richang.png",
			description: "公共设置",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data:[
            {
              title:"活动中心",
              icon:icon_prefix+"wendang.png",
              description:"活动中心",
              useCount:10000,
              page:'activityCenter'
            },{
              title:"招募管理",
              icon:icon_prefix+"hetong.png",
              description:"招募管理",
              useCount:10000,
              page:'recruitmentManagement'
            },{
              title:"评论管理",
              icon:icon_prefix+"wendang.png",
              description:"评论管理",
              useCount:10000,
              page:'commentManagement'
            },{
              title:"抽奖获客管理",
              icon:icon_prefix+"hetong.png",
              description:"抽奖获客管理",
              useCount:10000,
              page:'drawCustomersManagement'
            },{
              title:"员工中心",
              icon:icon_prefix+"wendang.png",
              description:"员工中心",
              useCount:10000,
              page:'staffCenter'
            },{
              title:"排班设置",
              icon:icon_prefix+"hetong.png",
              description:"排班设置",
              useCount:10000,
              page:'scheduleSetting'
            },{
              title:"商品管理",
              icon:icon_prefix+"tongzhi.png",
              description:"商品管理",
              useCount:10000,
              page:'goodsManagement'
            },{
              title:"会员中心",
              icon:icon_prefix+"huiyi.png",
              description:"会员中心",
              useCount:10000,
              page:'memberCenter'
            },{
              title:"订单中心",
              icon:icon_prefix+"tongzhi.png",
              description:"订单中心",
              useCount:10000,
              page:'orderCenter'
            },{
              title:"系统设置",
              icon:icon_prefix+"tongzhi.png",
              description:"系统设置",
              useCount:10000,
              page:'systemSetting'
            },{
              title:"权限管理",
              icon:icon_prefix+"tongzhi.png",
              description:"权限管理",
              useCount:10000,
              page:'permissionManagement'
            },{
              title:"收银台",
              icon:icon_prefix+"tongzhi.png",
              description:"收银台",
              useCount:10000,
              page:'cashier'
            }
          ]
			}
		},
	]

}
