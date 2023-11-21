/**
 * 常用服务
 * useful server
 */
const icon_prefix = "/static/home/128/"
export const header = {
	data: [{
			title: "日常操作",
			icon: icon_prefix + "richang.png",
			description: "日常操作",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data: [{
					title: "经营报表",
					icon: icon_prefix + "richang.png",
					description: "经营报表",
					useCount: 1000,
					page: 'operationReport'
				}, {
					title: "核销+收银",
					icon: icon_prefix + "zhoubao.png",
					description: "核销+收银",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "连锁报表",
					icon: icon_prefix + "kaoqin.png",
					description: "连锁报表",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "贡献报表",
					icon: icon_prefix + "richeng.png",
					description: "贡献报表",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "待唤醒客户",
					icon: icon_prefix + "qingjia1.png",
					description: "待唤醒客户",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "专属管家",
					icon: icon_prefix + "chuchai.png",
					description: "专属管家",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "招募资料",
					icon: icon_prefix + "gongwen.png",
					description: "招募资料",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "查看记录",
					icon: icon_prefix + "tongzhi.png",
					description: "查看记录",
					useCount: 10000,
					page: 'annotationList'
				}, {
					title: "执行力分析",
					icon: icon_prefix + "youjian.png",
					description: "执行力分析",
					useCount: 10000,
					dot: false,
					page: 'operationReport'
				}, {
					title: "客户信息",
					icon: icon_prefix + "tongxun.png",
					description: "客户信息",
					useCount: 10000,
					page: 'levelAddressBook'
				}, {
					title: "分红记录",
					icon: icon_prefix + "tongxun.png",
					description: "分红记录",
					useCount: 10000,
					page: 'levelAddressBook'
				}, {
					title: "合伙人账户报表",
					icon: icon_prefix + "tongxun.png",
					description: "合伙人账户报表",
					useCount: 10000,
					page: 'levelAddressBook'
				}]
			}
		},
		{
			title: "共享设置",
			icon: icon_prefix + "richang.png",
			description: "共享设置",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data: [{
					title: "成本核算",
					icon: icon_prefix + "xinwen.png",
					description: "成本核算",
					useCount: 10000,
					page: 'costEstimate'
				}, {
					title: "设计合作方案",
					icon: icon_prefix + "toupiao.png",
					description: "投票中心",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "添加合伙人",
					icon: icon_prefix + "renwu.png",
					description: "任务中心",
					useCount: 10000,
					page: 'operationReport'
				}]
			}
		},
		{
			title: "基础设置",
			icon: icon_prefix + "richang.png",
			description: "基础设置",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data: [{
					title: "收款账户",
					icon: icon_prefix + "wendang.png",
					description: "文档中心",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "添加员工",
					icon: icon_prefix + "hetong.png",
					description: "合同",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "分红账户",
					icon: icon_prefix + "huiyi.png",
					description: "会议",
					useCount: 10000,
					page: 'operationReport'
				}, {
					title: "连锁设置",
					icon: icon_prefix + "tongzhi.png",
					description: "客户关系",
					useCount: 10000,
					page: 'operationReport'
				}]
			}
		},
	]

}