/**
 * 共享网红
 * useful server
 */
const  icon_prefix="/static/home/128/"
export const shareNetHot = {
	data: [{
			title: "日常操作",
			icon: icon_prefix + "richang.png",
			description: "日常操作",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data:[
            {
              title:"掌柜拓客排名",
              icon:icon_prefix+"richang.png",
              description:"掌柜拓客排名",
              useCount:1000,
            page:'operationReport'
            },{
              title:"客源流失分析排名",
              icon:icon_prefix+"zhoubao.png",
              description:"客源流失分析排名",
              useCount:10000,
            page:'operationReport'
            },{
              title:"转介绍掌柜",
              icon:icon_prefix+"kaoqin.png",
              description:"转介绍掌柜",
              useCount:10000,
            page:'operationReport'
            },{
              title:"掌柜冠军报表",
              icon:icon_prefix+"richeng.png",
              description:"掌柜冠军报表",
              useCount:10000,
            page:'operationReport'
            },{
              title:"待唤醒客户",
              icon:icon_prefix+"qingjia1.png",
              description:"待唤醒客户",
              useCount:10000,
            page:'operationReport'
            },{
            title:"客源流失分析",
            icon:icon_prefix+"chuchai.png",
            description:"客源流失分析",
            useCount:10000,
            page:'operationReport'
            }
          ]
			}
		},
		{
			title: "共享设置",
			icon: icon_prefix + "richang.png",
			description: "共享设置",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data:[
            {
              title:"商品毛利设置",
              icon:icon_prefix+"gongwen.png",
              description:"商品毛利设置",
              useCount:10000,
              page:'operationReport'
            },{
              title:"奖励方案设置",
              icon:icon_prefix+"tongzhi.png",
              description:"奖励方案设置",
              useCount:10000,
              page:'annotationList'
            },{
              title:"贵宾卡管理",
              icon:icon_prefix+"youjian.png",
              description:"贵宾卡管理",
              useCount:10000,
              dot:false,
              page:'operationReport'
            },{
              title:"共享掌柜管理",
              icon:icon_prefix+"tongxun.png",
              description:"共享掌柜管理",
              useCount:10000,
              page:'levelAddressBook'
            }
            ]
			}
		},
		{
			title: "基础设置",
			icon: icon_prefix + "richang.png",
			description: "基础设置",
			useCount: 1000,
			page: 'operationReport',
			us: {
				data:[
            {
              title:"活动中心",
              icon:icon_prefix+"wendang.png",
              description:"活动中心",
              useCount:10000,
              page:'operationReport'
            },{
              title:"员工中心",
              icon:icon_prefix+"hetong.png",
              description:"员工中心",
              useCount:10000,
              page:'operationReport'
            },{
              title:"会员中心",
              icon:icon_prefix+"huiyi.png",
              description:"会员中心",
              useCount:10000,
              page:'operationReport'
            },{
              title:"订单中心",
              icon:icon_prefix+"tongzhi.png",
              description:"订单中心",
              useCount:10000,
              page:'operationReport'
            },{
              title:"系统设置",
              icon:icon_prefix+"tongzhi.png",
              description:"系统设置",
              useCount:10000,
              page:'operationReport'
            },{
              title:"权限管理",
              icon:icon_prefix+"tongzhi.png",
              description:"权限管理",
              useCount:10000,
              page:'operationReport'
            },{
              title:"收银台",
              icon:icon_prefix+"tongzhi.png",
              description:"收银台",
              useCount:10000,
              page:'operationReport'
            }
          ]
			}
		},
	]

}

/**
 * 网红模块
 * useful server
 */
export const us = {
  data:[
    {
      title:"添加网红",
      icon:icon_prefix+"richang.png",
      description:"添加网红",
      useCount:1000,
	  page:'operationReport'
    },{
      title:"网红分红设置",
      icon:icon_prefix+"kaoqin.png",
      description:"网红分红设置",
      useCount:10000,
	  page:'operationReport'
    },{
      title:"网红贡献报表",
      icon:icon_prefix+"richeng.png",
      description:"网红贡献报表",
      useCount:10000,
	  page:'operationReport'
    }
  ]
}


/**
 * 员工模块
 */
export const os = {
  data:[
    {
      title:"添加员工",
      icon:icon_prefix+"xinwen.png",
      description:"添加员工",
      useCount:10000,
	  page:'operationReport'
    },{
      title:"员工分红设置",
      icon:icon_prefix+"toupiao.png",
      description:"员工分红设置",
      useCount:10000,
	  page:'operationReport'
    },{
      title:"员工贡献报表",
      icon:icon_prefix+"renwu.png",
      description:"任务中心",
      useCount:10000,
	  page:'operationReport'
    }
  ]
}

/**
 * 日常管理
 */
export const base = {
  data:[
    {
      title:"核销团购券",
      icon:icon_prefix+"wendang.png",
      description:"核销团购券",
      useCount:10000,
      page:'operationReport'
    },{
      title:"每日上传报表",
      icon:icon_prefix+"hetong.png",
      description:"每日上传报表",
      useCount:10000,
      page:'operationReport'
    }
  ]
}