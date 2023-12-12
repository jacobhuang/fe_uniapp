const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/index',
      name: 'index',
        meta: {
	        title: '主页',
	    },
    },

	{
	    path: '/pages/common/exit',
	    name: 'exit',
	    meta: {
	        title: '退出',
	    },
	},
	{
	    path: '/pages/common/success',
	    name: 'success',
	    meta: {
	        title: 'success',
	    },
	},
	{
	    path: '/pages/common/operationReport',
	    name: 'operationReport',
	    meta: {
	        title: 'operationReport',
	    },
	},{
	    path: '/pages/common/bonus',
	    name: 'bonus',
	    meta: {
	        title: 'bonus',
	    },
	},{
	    path: '/pages/common/selectOrg',
	    name: 'selectOrg',
	    meta: {
	        title: '选择机构',
	    },
	},{
	    path: '/pages/shareShop/operation/costEstimate/costEstimate',
	    name: 'costEstimate',
	    meta: {
	        title: '成本核算',
	    },
	},{
	    path: '/pages/shareShop/operation/shared-boss-management',
	    name: 'sharedBossManagement',
	    meta: {
	        title: '共享掌柜管理',
	    },
	},{
	    path: '/pages/shareShop/operation/vip-card-management',
	    name: 'vipCardManagement',
	    meta: {
	        title: '贵宾卡管理',
	    },
	},{
	    path: '/pages/shareShop/operation/goods-profit/setting',
	    name: 'goodsProfitSetting',
	    meta: {
	        title: '商品毛利设置',
	    },
	},{
	    path: '/pages/shareShop/operation/awardSetting/awardSetting',
	    name: 'awardSetting',
	    meta: {
	        title: '奖励方案设置',
	    },
	}
	,
	{
	    path: '/pages/shareShop/report/boss-ranking/summary/boss-count',
	    name: 'bossCount',
	    meta: {
	        title: '拓客汇总',
	    },
	},{
	    path: '/pages/shareShop/report/boss-ranking/summary/customers-count',
	    name: 'customersCount',
	    meta: {
	        title: '拓客记录',
	    },
	},{
	    path: '/pages/shareShop/report/recharge-increase-decrease-summary/recharge-increase-decrease-summary',
	    name: 'rechargeIncreaseDecreaseCount',
	    meta: {
	        title: '充值金增减汇总',
	    },
	}, {
	    path: '/pages/shareShop/report/boss-reward-ranking',
	    name: 'bossRewardRanking',
	    meta: {
	        title: '掌柜奖励排名',
	    },
	}
	,{
	    path: '/pages/shareShop/report/boss-contribution-ranking',
	    name: 'bossContributionRanking',
	    meta: {
	        title: '掌柜贡献报表',
	    },
	}
	,{
	    path: '/pages/shareShop/report/exclusive-steward-ranking',
	    name: 'exclusiveStewardRanking',
	    meta: {
	        title: '专属管家排名',
	    },
	}

	,{
	    path: '/pages/shareShop/report/boss-introduction-ranking',
	    name: 'bossIntroductionRanking',
	    meta: {
	        title: '转介绍掌柜',
	    },
	}

	, {
	    path: '/pages/shareShop/report/boss-champion-analysis',
	    name: 'bossChampionAnalysis',
	    meta: {
	        title: '掌柜冠军报表',
	    },
	}
	,
	{
	    path: '/pages/shareShop/report/wait-to-wake-up-customers',
	    name: 'waitToWakeupCustomers',
	    meta: {
	        title: '待唤醒客户',
	    },
	}
	,
	{
	    path: '/pages/shareShop/report/customer-attrition-analysis',
	    name: 'customerAttritionAnalysis',
	    meta: {
	        title: '客源流失分析',
	    },
	}	

	,
	{
	    path: '/pages/shareShop/common-settings/staff-center',
	    name: 'staffCenter',
	    meta: {
	        title: '员工中心',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/activity-center/activity-center',
	    name: 'activityCenter',
	    meta: {
	        title: '活动中心',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/goods-management/goods',
	    name: 'goodsManagement',
	    meta: {
	        title: '商品管理',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/cashier',
	    name: 'cashier',
	    meta: {
	        title: '收银台',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/comment-management',
	    name: 'commentManagement',
	    meta: {
	        title: '评论管理',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/draw-customers-management',
	    name: 'drawCustomersManagement',
	    meta: {
	        title: '抽奖获客管理',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/member-center',
	    name: 'memberCenter',
	    meta: {
	        title: '会员中心',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/order-center',
	    name: 'orderCenter',
	    meta: {
	        title: '订单中心',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/permission-management',
	    name: 'permissionManagement',
	    meta: {
	        title: '权限管理',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/recruitment-management',
	    name: 'recruitmentManagement',
	    meta: {
	        title: '招募管理',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/schedule-setting',
	    name: 'scheduleSetting',
	    meta: {
	        title: '排班设置',
	    },
	},
	{
	    path: '/pages/shareShop/common-settings/system-setting',
	    name: 'systemSetting',
	    meta: {
	        title: '系统设置',
	    },
	},


	{
	    path: '/pages/home/shareShop',
	    name: 'shareShop',
	    meta: {
	        title: '共享店铺',
	    },
	},
	{
	    path: '/pages/home/shareEmployee',
	    name: 'shareEmployee',
	    meta: {
	        title: '员工合伙',
	    },
	},
	{
	    path: '/pages/home/douyinEnv',
	    name: 'douyinEnv',
	    meta: {
	        title: '抖音生态',
	    },
	},
	{
	    path: '/pages/home/shareNetHot',
	    name: 'shareNetHot',
	    meta: {
	        title: '共享网红',
	    },
	},
	{
	    path: '/pages/goodsMargin/classifyMargin',
	    name: 'classifyMargin',
	    meta: {
	        title: '分类毛利',
	    },
	},
	{
	    path: '/pages/saleReport/saleReport',
	    name: 'saleReport',
	    meta: {
	        title: '销售报表',
	    },
	},
]
export default routes