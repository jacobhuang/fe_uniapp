import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const apiService = {
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	}, 
	 /**
	  * 登录
	  */
	login(params) {
		return http.post('/sys/mLogin',params)	
	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	  * 退出
	  */
	logout(params) {
		return http.post('/sys/logout',params);
	},

	//--- 共享店铺  shareShop

	/**
	  * 获取掌柜拓客排名数据
	  */
	topShareRank(params) {
		return http.get('/sharerShop/report/topShareRank?page=1&pageSize=10',params)	
	},
	
	/**
	  * 获取掌柜拓客排名数据
	  */
	topShareRankRecord(params) {
		return http.get('/sharerShop/report/topShareRankRecord?page=1&pageSize=10',params)	
	},


	/**
	  * 获取拓客汇总数据
	  */
	shareSummary(params) {
		return http.get('/shareShop/report/shareSummary',params)	
	},
	/**
	  * 获取拓客记录数据
	  */
	shareRecords(params) {
		return http.get('/shareShop/report/shareRecords',params)	
	},
	
	/**
	  * 获取充值金增减汇总数据
	  */
	balanceSummary(params) {
		return http.get('/shareShop/report/balanceSummary?page=1&pageSize=10',params)	
	},
	/**
	  * 获取充值金增减记录数据
	  */
	balanceRecords(params) {
		return http.get('/shareShop/report/balanceRecords?page=1&pageSize=10',params)	
	},
	
	/**
	  * 获取掌柜贡献排名数据
	  */
	topContributorRank(params) {
		return http.get('/shareShop/report/topContributorRank',params)	
	},
	/**
	  * 获取专属管家排名数据
	  */
	topStewardRank(params) {
		return http.get('/shareShop/report/topStewardRank',params)	
	},
	/**
	  * 获取转介绍掌柜数据
	  */
	referrerStewards(params) {
		return http.get('/shareShop/report/referrerStewards',params)	
	},

	/**
	  * 掌柜冠军报表
	  */
	championReport(params) {
		return http.get('/shareShop/report/championReport',params)	
	},

	/**
	  * 获取待唤醒客户列表数据
	  */
	pendingCustomers(params) {
		return http.get('/shareShop/report/pendingCustomers',params)	
	},

	/**
	  * 获取待唤醒汇总数据
	  */
	pendingSummary(params) {
		return http.get('/shareShop/report/pendingSummary',params)	
	},
	/**
	  * 获取客源流失分析数据
	  */
	lostCustomers(params) {
		return http.get('/shareShop/report/lostCustomers',params)	
	},
	
	/**
	  * 获取掌柜奖励排名数据
	  */
	rewardRank(params) {
		return http.get('/shareShop/report/rewardRank',params)	
	},
	/**
	  * 获取掌柜奖励汇总数据
	  */
	rewardSummary(params) {
		return http.get('/shareShop/report/rewardSummary',params)	
	},
	/**
	  * 获取奖励明细数据
	  */
	rewardDetail(params) {
		return http.get('/shareShop/report/rewardDetail',params)	
	},
	/**
	  * 添加或修改分类毛利
	  */
	classification(params) {
		return http.put('/shareShop/product/profit/classification',params)	
	},
	/**
	  * 添加或修改分类毛利
	  */
	product(params) {
		return http.put('/shareShop/product/profit/product',params)	
	},

	//员工合伙 share Employee
	/**
	  * 员工合伙
	  */
	employeePartnership() {
		return http.put('/employee/partnership',params)	
	},

	/**
	  * 报表分析
	  */
	reportAnalysis(params) {
		return http.get('/report/analysis', { params });
	},


	// 员工奖励汇总
	employeeRewardSummary(start, end) {
		return http.get('/employee/reward/summary', { params: { start, end } });
	},

	// 拓客排名
	customerExpansionRanking() {
		return http.get('/customer/expansion/ranking');
	},

	// 拓客汇总
	customerExpansionSummary(start, end) {
		return http.get('/customer/expansion/summary', { params: { start, end } });
	},

	// 拓客记录
	customerExpansionRecord(start, end, employeeId) {
		return http.get('/customer/expansion/record', { params: { start, end, employeeId } });
	},

	// 员工贡献排名
	employeeContributionRanking() {
		return http.get('/employee/contribution/ranking');
	},


	// 后厨员工排名
	kitchenStaffRanking(type) {
		return http.get('/kitchen/staff/ranking', { params: { type } });
	},

	// 创作菜品分析
	creativeDishAnalysis(type) {
		return http.get('/creative/dish/analysis', { params: { type } });
	},

	// 后厨复购分析
	kitchenRepurchaseAnalysis() {
		return http.get('/kitchen/repurchase/analysis');
	},

	// 菜品复购分析
	dishRepurchaseAnalysis() {
		return http.get('/dish/repurchase/analysis');
	},

	/**
	  * 员工奖励记录
	  */
	employeeRewardRecord(start, end, employeeId, rewardType) {
		return http.get('/employee/reward/record', { params: { start, end, employeeId, rewardType } });
	},

	/**
	  * 更新数据
	  */
	updateData(data) {
		return http.post('/update/data', data);
	},

	/**
	  * 操作中心
	  */
	operationCenter() {
		return http.get('/operation/center');
	},
	
	// 员工奖励
	employeeReward() {
		return http.get('/employee/reward');
	},

	// 拓展客奖励
	

	// 拓展客奖励
	customerExpansionReward(params) {
		return http.post('/customer/expansion/reward', params);
	},

	// 回头客奖励
	repeatCustomerReward(params) {
		return http.post('/repeat/customer/reward', params);
	},


	// 团队协作奖励
	teamCooperationReward() {
		return http.get('/team/cooperation/reward');
	},

	// 团队协作奖励设置
	teamCooperationRewardSetting(settingOption) {
		return http.post('/team/cooperation/reward/setting', { settingOption });
	},

	// 奖励员工列表
	rewardEmployeeList() {
		return http.get('/reward/employee/list');
	},

	
	// 后厨奖励
	kitchenReward() {
		return http.get('/kitchen/reward');
	},

	// 创作奖励
	creativeReward(status, settingOption, productSelection) {
		return http.post('/creative/reward', {
			status,
			settingOption,
			productSelection
		});
	},

	// 质量奖励
	qualityReward(status, settingOption, productSelection) {
		return http.post('/quality/reward', {
			status,
			settingOption,
			productSelection
		});
	},

	// 设置
	setting(settingOption) {
		return http.post('/setting', {
			settingOption
		});
	},

	
	

	//公用接口
	/**
	  * 消息通知触发条件设置
	  */
	triggerSetting(params) {
		return http.put('/public/recruitAd/triggerSetting',params)	
	},

	/**
	  * 创建招募广告
	  */
	addRecruitAd(params) {
		return http.post('/public/recruitAd',params)	
	},

	/**
	  * 编辑招募广告
	  */
	editRecruitAd(params) {
		return http.put('/public/recruitAd',params)	
	},
	// 删除招募广告
	deleteRecruitAd(params) {
		return http.delete('/public/recruitAd', params);
	},
	/**
	  * 完成招募广告
	  */
	recruitAdFinish(params) {
		return http.put('/public/recruitAd/finish',params)	
	},
	/**
	  * 发布招募广告
	  */
	recruitAdPublish(params) {
		return http.put('/public/recruitAd/publish',params)	
	},
	/**
	  * 分享招募广告
	  */
	recruitAdShare(params) {
		return http.put('/public/recruitAd/share',params)	
	},
	/**
	  * 分享招募广告
	  */
	recruitAdShare(params) {
		return http.put('/public/recruitAd/share',params)	
	},
	/**
	  * 编辑潜在客户详情
	  */
	editPotentialCustomer(params) {
		return http.post('/potentialCustomer/edit', params);
	},
	/**
	  * 中奖记录
	  */
	getWinnerRecord(params) {
		return http.get('/lottery/winnerRecord', {
			params: {
				activityId: params.activityId,
				pageNum: params.pageNum || 1,
				pageSize: params.pageSize || 10
			}
		});
	},
	/**
	  * 抽奖设置
	  */
	getLotteryConfig(params) {
		return http.get('/lottery/config', { params });
	},
	
	// 保存设置
	saveLotteryConfig(params) {
		return http.put('/lottery/config', params);
	},

	// 设置礼包
	setLotteryGift(params) {
		return http.put('/lottery/gift', params);
	},

	// 预览抽奖页
	previewLotteryPage(params) {
		return http.get('/lottery/preview', params);
	},
	
	// 编辑活动
	editActivity(params) {
		return http.post('/activity/edit', params);
	},

	// 结束活动
	finishActivity(params) {
		return http.put('/activity/finish', params);
	},

	// 复制活动
	copyActivity(params) {
		return http.post('/activity/copy', params);
	},

	// 新建活动同步优惠券
	createFollowCouponActivity(params) {
		return http.post('/activity/new/follow-coupon', params);
	},

	// 编辑活动（未开始）
	editNotStartActivity(params) {
		return http.post('/activity/edit-not-start', params);
	},

	// 删除活动（未开始）
	deleteNotStartActivity(params) {
		return http.delete('/activity/delete-not-start', { params });
	},

	// 复制活动（未开始）
	copyNotStartActivity(params) {
		return http.post('/activity/copy-not-start', { params });
	},

	// 删除活动（已结束）
	deleteFinishedActivity(params) {
		return http.delete('/activity/delete-finished', { params });
	},

	// 复制活动（已结束）
	copyFinishedActivity(params) {
		return http.post('/activity/copy-finished', { params });
	},

	// 新建活动（已结束）
	createFinishedActivity(params) {
		return http.post('/activity/new-finished', params);
	},

	// 发布活动（已结束）
	publishFinishedActivity(params) {
		return http.put('/activity/publish-finished', { params });
	},
	
	getWinnerRecord(params) {
		return http.get('/lottery/winnerRecord', {
			params: {
				activityId: params.activityId,
				pageNum: params.pageNum || 1,
				pageSize: params.pageSize || 10
			}
		});
	},
	/**
	  * 抽奖设置
	  */
	getLotteryConfig(params) {
		return http.get('/lottery/config', { params });
	},
	
	// 保存设置
	saveLotteryConfig(params) {
		return http.put('/lottery/config', params);
	},

	// 设置礼包
	setLotteryGift(params) {
		return http.put('/lottery/gift', params);
	},

	// 预览抽奖页
	previewLotteryPage(params) {
		return http.get('/lottery/preview', { params });
	},
	
	// 编辑活动
	editActivity(params) {
		return http.post('/activity/edit', params);
	},

	// 结束活动
	finishActivity(params) {
		return http.put('/activity/finish', params);
	},

	// 复制活动
	copyActivity(params) {
		return http.post('/activity/copy', params);
	},

	// 新建活动同步优惠券
	createFollowCouponActivity(params) {
		return http.post('/activity/new/follow-coupon', params);
	},

	// 编辑活动（未开始）
	editNotStartActivity(params) {
		return http.post('/activity/edit-not-start', params);
	},

	// 删除活动（未开始）
	deleteNotStartActivity(params) {
		return http.delete('/activity/delete-not-start', { params });
	},

	// 复制活动（未开始）
	copyNotStartActivity(params) {
		return http.post('/activity/copy-not-start', { params });
	},

	// 删除活动（已结束）
	deleteFinishedActivity(params) {
		return http.delete('/activity/delete-finished', { params });
	},

	// 复制活动（已结束）
	copyFinishedActivity(params) {
		return http.post('/activity/copy-finished', { params });
	},

	// 新建活动（已结束）
	createFinishedActivity(params) {
		return http.post('/activity/new-finished', params);
	},

	// 发布活动（已结束）
	publishFinishedActivity(params) {
		return http.put('/activity/publish-finished', { params });
	},

	// 保存活动（已结束）
	saveFinishedActivity(params) {
		return http.put('/activity/save-finished', params);
	},

	// 用户评论
	getActivityComment(activityId, pageNum = 1, pageSize = 10) {
		return http.get('/activity/comment', {
			params: {
				activityId,
				pageNum,
				pageSize
			}
		});
	},

	// 公共设置-设置毛利率
	setProfitMargin(margin) {
		return http.post('/settings/profit-margin', margin);
	},

	// 员工中心-员工管理-添加
	addEmployee(employee) {
		return http.post('/employees', employee);
	},

	// 员工中心-员工管理-修改
	updateEmployee(id, employeeUpdate) {
		return http.put(`/employees/${id}`, employeeUpdate);
	},

	// 员工中心-员工管理-删除
	deleteEmployee(id) {
		return http.delete(`/employees/${id}`);
	},

	// 员工中心-员工管理-视频创作权限
	grantVideoAccess(id) {
		return http.put(`/employees/${id}/video-access`);
	},

	// 员工中心-员工管理-上传报表权限
	grantReportAccess(id) {
		return http.put(`/employees/${id}/report-access`);
	},

	// 员工中心-员工管理-收银台
	grantCashierAccess(id) {
		return http.put(`/employees/${id}/cashier`);
	},

	// 员工中心-职位管理-添加
	addPosition(position) {
		return http.post('/positions', position);
	},

	// 员工中心-职位管理-修改
	updatePosition(id, position) {
		return http.put(`/positions/${id}`, position);
	},

	// 员工中心-职位管理-删除
	deletePosition(id) {
		return http.delete(`/positions/${id}`);
	},

	// 员工中心-职位管理-启用/禁用
	enablePosition(id) {
		return http.put(`/positions/${id}/enable`);
	},

	// 员工中心-部门管理-添加
	addDepartment(department) {
		return http.post('/departments', department);
	},

	// 员工中心-部门管理-修改
	updateDepartment(id, department) {
		return http.put(`/departments/${id}`, department);
	},

	// 员工中心-部门管理-删除
	deleteDepartment(id) {
		return http.delete(`/departments/${id}`);
	},

	// 员工中心-部门管理-启用/禁用
	enableDepartment(id) {
		return http.put(`/departments/${id}/enable`);
	},

	// 商品管理-商品分类-同步
	syncCategories() {
		return http.post('/categories/sync');
	},

	// 商品管理-商品分类-设置毛利率
	setCategoryProfitMargin(margin) {
		return http.post('/categories/profit-margin', margin);
	},

	// 商品管理-商品管理-同步
	syncProducts() {
		return http.post('/products/sync');
	},

	// 商品管理-商品管理-设置毛利率
	setProductProfitMargin(margin) {
		return http.post('/products/profit-margin', margin);
	},

	// 会员中心-客户资料-添加
	addCustomer(customer) {
		return http.post('/customers', customer);
	},

	// 会员中心-客户资料-修改
	updateCustomer(id, customerUpdate) {
		return http.put(`/customers/${id}`, customerUpdate);
	},

	// 会员中心-客户资料-删除
	deleteCustomer(id) {
		return http.delete(`/customers/${id}`);
	},

	// 会员中心-客户资料-同步数据
	syncCustomers() {
		return http.post('/customers/sync');
	},

	// 会员中心-会员流失报警设置-保存设置
	saveChurnAlerts(alert) {
		return http.post('/churn-alerts', alert);
	},


	/**
	 * 修改机构门店设置
	 *
	 * @param settingsDTO 机构门店设置DTO
	 * @return 返回修改后的机构门店设置DTO
	 */
	modifyOrganizationSettings(settingsDTO) {
		return http.post('/system/organization', settingsDTO);
	},

	/**
	 * 保存机构门店设置
	 *
	 * @param settingsDTO 机构门店设置DTO
	 * @return 返回保存后的机构门店设置DTO
	 */
	saveOrganizationSettings(settingsDTO) {
		return http.post('/system/organization/save', settingsDTO);
	},

	/**
	 * 修改跨店奖励
	 *
	 * @param rewardDTO 跨店奖励DTO
	 * @return 返回修改后的跨店奖励DTO
	 */
	updateRewardSettings(rewardDTO) {
		return http.post('/system/reward/modify', rewardDTO);
	},

	/**
	 * 修改其他系统设置
	 *
	 * @param settingsDTO 其他系统设置DTO
	 * @return 返回修改后的其他系统设置DTO
	 */
	modifyOtherSettings(settingsDTO) {
		return http.post('/system/other', settingsDTO);
	},

	/**
	 * 修改会员卡名称
	 *
	 * @param cardDTO 会员卡DTO
	 * @return 返回修改后的会员卡DTO
	 */
	updateCardName(cardDTO) {
		return http.post('/system/card/modify', cardDTO);
	},

	/**
	 * 添加角色
	 *
	 * @param roleDTO 角色DTO
	 * @return 返回添加后的角色DTO
	 */
	addRole(roleDTO) {
		return http.post('/role/add', roleDTO);
	},

	/**
	 * 修改角色
	 *
	 * @param roleDTO 角色DTO
	 * @return 返回修改后的角色DTO
	 */
	updateRole(roleDTO) {
		return http.post('/role/modify', roleDTO);
	},

	/**
	 * 删除角色
	 *
	 * @param roleId 角色ID
	 * @return 返回操作结果
	 */
	deleteRole(roleId) {
		return http.post('/role/delete', { roleId });
	},

	
	/**
	 * 设置角色权限（按钮级别）
	 *
	 * @param permissionDTO 权限DTO
	 * @return 返回设置后的权限DTO
	 */
	setButtonPermission(permissionDTO) {
		return http.post('/role/permission/setButton', permissionDTO);
	},

	/**
	 * 设置角色权限
	 *
	 * @param permissionDTO 权限DTO
	 * @return 返回设置后的权限DTO
	 */
	setPermission(permissionDTO) {
		return http.post('/role/permission/set', permissionDTO);
	},

	/**
	 * 保存角色权限
	 *
	 * @param permissionDTO 权限DTO
	 * @return 返回保存后的权限DTO
	 */
	savePermission(permissionDTO) {
		return http.post('/role/permission/save', permissionDTO);
	},
	
	/**
	 * 设置可查看门店
	 *
	 * @param storeListDTO 门店列表
	 * @return 返回设置后的门店列表
	 */
	setStoreList(storeListDTO) {
		return http.post('/role/store/set', storeListDTO);
	},

	/**
	 * 保存可查看门店
	 *
	 * @param storeListDTO 门店列表
	 * @return 返回保存后的门店列表
	 */
	saveStoreList(storeListDTO) {
		return http.post('/role/store/save', storeListDTO);
	},

	/**
	 * 添加用户
	 *
	 * @param userDTO 用户DTO
	 * @return 返回添加后的用户DTO
	 */
	addUser(userDTO) {
		return http.post('/user/add', userDTO);
	},
	
	
	/**
	 * 修改用户
	 *
	 * @param userDTO 用户DTO
	 * @return 返回修改后的用户DTO
	 */
	updateUser(userDTO) {
		return http.post('/user/modify', userDTO);
	},

	/**
	 * 删除用户
	 *
	 * @param userId 用户ID
	 * @return 返回操作结果
	 */
	deleteUser(userId) {
		return http.post('/user/delete', { userId });
	},

	/**
	 * 更新用户密码
	 *
	 * @param userId      用户ID
	 * @param newPassword 新密码
	 * @return 返回操作结果
	 */
	updateUserPassword(userId, newPassword) {
		return http.post('/user/password/update', { userId, newPassword });
	},

	/**
	 * 添加时间段
	 *
	 * @param timeSlotDTO 时间段DTO
	 * @return 返回添加后的时间段DTO
	 */
	addTimeSlot(timeSlotDTO) {
		return http.post('/schedule/timeSlot/add', timeSlotDTO);
	},

	/**
	 * 删除时间段
	 *
	 * @param timeSlotId 时间段ID
	 * @return 返回操作结果
	 */
	deleteTimeSlot(timeSlotId) {
		return http.post('/schedule/timeSlot/delete', { timeSlotId });
	},

	/**
	 * 清空排班
	 *
	 * @param scheduleId 排班ID
	 * @return 返回操作结果
	 */
	clearSchedule(scheduleId) {
		return http.post('/schedule/clear', { scheduleId });
	},

	/**
	 * 桌台同步
	 *
	 * @param storeId 门店ID
	 * @return 返回操作结果
	 */
	syncTable(storeId) {
		return http.post('/schedule/syncTable', { storeId });
	},

	/**
	 * 删除排班
	 *
	 * @param scheduleId 排班ID
	 * @return 返回操作结果
	 */
	deleteSchedule(scheduleId) {
		return http.post('/schedule/delete', { scheduleId });
	},

	/**
	 * 复制排班
	 *
	 * @param scheduleId 排班ID
	 * @return 返回操作结果
	 */
	copySchedule(scheduleId) {
		return http.post('/schedule/copy', { scheduleId });
	},
	
	/**
	 * 编辑排班
	 *
	 * @param scheduleDTO 排班DTO
	 * @return 返回编辑后的排班DTO
	 */
	editSchedule(scheduleDTO) {
		return http.post('/schedule/edit', scheduleDTO);
	},

	/**
	 * 下载桌台二维码
	 *
	 * @param tableId 桌台ID
	 * @return 返回下载结果
	 */
	downloadTableQRCode(tableId) {
		return http.get('/schedule/table/downloadCode', { params: { tableId } });
	},

	/**
	 * 保存班次设置
	 *
	 * @param shiftDTO 班次DTO
	 * @return 返回保存后的班次DTO
	 */
	saveShift(shiftDTO) {
		return http.post('/schedule/shift/save', shiftDTO);
	},

	//系统设置
	/**
	 * 发送系统消息
	 * @param message 使用构造器赋值参数 如果不设置category(消息类型)则默认为2 发送系统消息
	 */
	sendSysAnnouncement(message) {
		return http.post('/sendSysAnnouncement', message);
	},

	/**
	 * 发送消息 附带业务参数
	 * @param message 使用构造器赋值参数
	 */
	sendBusAnnouncement(message) {
		return http.post('/sendBusAnnouncement', message);
	},

	/**
	 * 通过模板发送消息
	 * @param message 使用构造器赋值参数
	 */
	sendTemplateAnnouncement(message) {
		return http.post('/sendTemplateAnnouncement', message);
	},

	/**
	 * 通过模板发送消息 附带业务参数
	 * @param message 使用构造器赋值参数
	 */
	sendBusTemplateAnnouncement(message) {
		return http.post('/sendBusTemplateAnnouncement', message);
	},


	/**
	 * 通过消息中心模板，生成推送内容
	 * @param templateDTO 使用构造器赋值参数
	 * @return
	 */
	parseTemplateByCode(templateDTO) {
		return http.post('/parseTemplateByCode', templateDTO);
	},

	/**
	 * 根据业务类型busType及业务busId修改消息已读
	 */
	updateSysAnnounReadFlag(busType, busId) {
		return http.get('/updateSysAnnounReadFlag', { params: { busType, busId } });
	},

	
	/**
	 * 创建接口的前端请求代码示例(js code)
	 *
	 * @param username 用户名
	 * @return 返回登录用户信息
	 */
	getUserByName(username) {
		return http.get('/getUserByName', { params: { username } });
	},
	
	/**
	 * 根据用户id查询用户信息
	 * @param id
	 * @return
	 */
	getUserById(id) {
		return http.get('/getUserById', { params: { id } });
	},
	
	
	/**
	 * 通过用户账号查询角色集合
	 *
	 * @param username 用户名
	 * @return 返回角色集合
	 */
	getRolesByUsername(username) {
		return http.get('/getRolesByUsername', { params: { username } });
	},
	
	/**
	 * 通过用户账号查询部门集合
	 * @param username
	 * @return 部门 id
	 */
	getDepartIdsByUsername(username) {
		return http.get('/getDepartIdsByUsername', { params: { username } });
	},
	
	
	/**
	 * 通过用户账号查询部门 name
	 * @param username
	 * @return 部门 name
	 */
	getDepartNamesByUsername(username) {
		return http.get('/getDepartNamesByUsername', { params: { username } });
	},
	
	
	/**
	 * 获取数据字典
	 * @param code
	 * @return
	 */
	queryDictItemsByCode(code) {
		return http.get('/queryDictItemsByCode', { params: { code } });
	},
	
	/**
	 * 获取有效的数据字典
	 * @param code
	 * @return
	 */
	queryEnableDictItemsByCode(code) {
		return http.get('/queryEnableDictItemsByCode', { params: { code } });
	},
	
	/**
	 * 查询所有的父级字典，按照create_time排序
	 */
	queryAllDict() {
		return http.get('/queryAllDict');
	},

	 /**
     * 查询所有分类字典
     * @return
     */
	queryAllSysCategory() {
		return http.get('/queryAllSysCategory');
	},
		
	  /**
     * 查询所有部门 作为字典信息 id -->value,departName -->text
     * @return
     */
   	queryAllDepartBackDictModel() {
		return http.get('/queryAllDepartBackDictModel');
	},
	
	/**
     * 查询所有部门 作为字典信息 id -->value,departName -->text
     * @return
     */
   	queryAllDepartBackDictModel() {
		return http.get('/queryAllDepartBackDictModel');
	},
		  
	/**
     * 获取所有角色 带参
     * roleIds 默认选中角色
     * @return
     */
	queryAllRole() {
		return http.get('/queryAllRole');
	},
	
	/**
     * 通过用户账号查询角色Id集合
     * @param username
     * @return
     */
	getRoleIdsByUsername() {
		return http.get('/getRoleIdsByUsername');
	},
	
	 /**
     * 通过部门编号查询部门id
     * @param orgCode
     * @return
     */
	getDepartIdsByOrgCode() {
		return http.get('/getDepartIdsByOrgCode');
	},

    /**
     * 查询所有部门
     * @return
     */
	getAllSysDepart() {
		return http.get('/getAllSysDepart');
	},	
	 /**
     * 根据 id 查询数据库中存储的 DynamicDataSourceModel
     *
     * @param dbSourceId
     * @return
     */
	getDynamicDbSourceById() {
		return http.get('/getDynamicDbSourceById');
	},
	/**
     * 根据部门Id获取部门负责人
     * @param deptId
     * @return
     */
	getDeptHeadByDepId() {
		return http.get('/getDeptHeadByDepId');
	},
	/**
     * 查找父级部门
     * @param departId
     * @return
     */
	getParentDepartId() {
		return http.get('/getParentDepartId');
	},


	/**
     * 根据 code 查询数据库中存储的 DynamicDataSourceModel
     *
     * @param dbSourceCode
     * @return
     */
	getDynamicDbSourceByCode() {
		return http.get('/getDynamicDbSourceByCode');
	},
	/**
     * 给指定用户发消息
     * @param userIds
     * @param cmd
     */
	sendWebSocketMsg() {
		return http.get('/sendWebSocketMsg');
	},

	/**
     * 根据id获取所有参与用户
     * userIds
     * @return
     */
	queryAllUserByIds() {
		return http.get('/queryAllUserByIds');
	},

	/**
     * 查询所有用户 返回ComboModel
     * @return
     */
	queryAllUserBackCombo() {
		return http.get('/queryAllUserBackCombo');
	},

    /**
     * 分页查询用户 返回JSONObject
     * @return
     */
	queryAllUser() {
		return http.get('/queryAllUser');
	},
	/**
     * 将会议签到信息推动到预览
     * userIds
     * @return
     * @param userId
     */
	meetingSignWebsocket() {
		return http.get('/meetingSignWebsocket');
	},
     /**
     * 根据name获取所有参与用户
     * userNames
     * @return
     */
	queryUserByNames() {
		return http.get('/queryUserByNames');
	},
	/**
     * 获取用户的角色集合
     * @param username
     * @return
     */
	getUserRoleSet() {
		return http.get('/getUserRoleSet');
	},
	/**
     * 获取用户的权限集合
     * @param username
     * @return
     */
	getUserPermissionSet() {
		return http.get('/getUserPermissionSet');
	},

 	/**
     * 判断是否有online访问的权限
     * @param onlineAuthDTO
     * @return
     */
	hasOnlineAuth() {
		return http.get('/hasOnlineAuth');
	},

	hasOnlineAuth() {
		return http.get('/hasOnlineAuth');
	},


	/**
     * 查询用户角色信息
     * @param username
     * @return
     */
	queryUserRoles() {
		return http.get('/queryUserRoles');
	},
 	/**
     * 查询用户权限信息
     * @param username
     * @return
     */
	queryUserAuths() {
		return http.get('/queryUserAuths');
	},
	/**
     * 通过部门id获取部门全部信息
     */
	selectAllById() {
		return http.get('/selectAllById');
	},
	 /**
     * 根据用户id查询用户所属公司下所有用户ids
     * @param userId
     * @return
     */
	queryDeptUsersByUserId() {
		return http.get('/queryDeptUsersByUserId');
	},
	 /**
     * 查询数据权限
     * @return
     */
	queryPermissionDataRule() {
		return http.get('/queryPermissionDataRule');
	},
	/**
     * 查询用户信息
     * @param username
     * @return
     */
	getCacheUser() {
		return http.get('/getCacheUser');
	},
	/**
     * 普通字典的翻译
     * @param code
     * @param key
     * @return
     */
	translateDict() {
		return http.get('/translateDict');
	},
	 /**
     * 36根据多个用户账号(逗号分隔)，查询返回多个用户信息
     * @param usernames
     * @return
     */
	queryUsersByUsernames() {
		return http.get('/queryUsersByUsernames');
	},
	/**
     * 37根据多个用户id(逗号分隔)，查询返回多个用户信息
     * @param ids
     * @return
     */
	queryUsersByIds() {
		return http.get('/queryUsersByIds');
	},
	 /**
     * 38根据多个部门编码(逗号分隔)，查询返回多个部门信息
     * @param orgCodes
     * @return
     */
	queryDepartsByOrgcodes() {
		return http.get('/queryDepartsByOrgcodes');
	},
	/**
     * 39根据多个部门ID(逗号分隔)，查询返回多个部门信息
     * @param ids
     * @return
     */
	queryDepartsByIds() {
		return http.get('/queryDepartsByIds');
	},
	/**
     * 40发送邮件消息
     * @param email
     * @param title
     * @param content
     */
	sendEmailMsg() {
		return http.get('/sendEmailMsg');
	},
	 /**
     * 41 获取公司下级部门和公司下所有用户信息
     * @param orgCode
     */
	getDeptUserByOrgCode() {
		return http.get('/getDeptUserByOrgCode');
	},
	/**
     * 查询分类字典翻译
     *
     * @param ids 分类字典表id
     * @return
     */
	loadCategoryDictItem() {
		return http.get('/loadCategoryDictItem');
	},
	/**
     * 根据字典code加载字典text
     *
     * @param dictCode 顺序：tableName,text,code
     * @param keys     要查询的key
     * @return
     */
	loadDictItem() {
		return http.get('/loadDictItem');
	},
	/**
     * 根据字典code查询字典项
     *
     * @param dictCode 顺序：tableName,text,code
     * @param dictCode 要查询的key
     * @return
     */
	getDictItems() {
		return http.get('/getDictItems');
	},
	/**
     * 根据多个字典code查询多个字典项
     *
     * @param dictCodeList
     * @return key = dictCode ； value=对应的字典项
     */
	getManyDictItems() {
		return http.get('/getManyDictItems');
	},
    /**
     * 【下拉搜索】
     * 大数据量的字典表 走异步加载，即前端输入内容过滤数据
     *
     * @param dictCode 字典code格式：table,text,code
     * @param keyword  过滤关键字
     * @return
     */
	loadDictItemByKeyword() {
		return http.get('/loadDictItemByKeyword');
	},
	/**
     * 48 普通字典的翻译，根据多个dictCode和多条数据，多个以逗号分割
     * @param dictCodes
     * @param keys
     * @return
     */
	translateManyDict() {
		return http.get('/translateManyDict');
	},
 	/**
     * 获取表数据字典 【接口签名验证】
     * @param table
     * @param text
     * @param code
     * @return
     */
	queryTableDictItemsByCode() {
		return http.get('/queryTableDictItemsByCode');
	},
	/**
     * 查询表字典 支持过滤数据 【接口签名验证】
     * @param table
     * @param text
     * @param code
     * @param filterSql
     * @return
     */
	queryFilterTableDictInfo() {
		return http.get('/queryFilterTableDictInfo');
	},
	/**
     * 【接口签名验证】
     * 查询指定table的 text code 获取字典，包含text和value
     * @param table
     * @param text
     * @param code
     * @param keyArray
     * @return
     */
	queryTableDictByKeys() {
		return http.get('/queryTableDictByKeys');
	},
	/**
     * 字典表的 翻译【接口签名验证】
     * @param table
     * @param text
     * @param code
     * @param key
     * @return
     */
	translateDictFromTable() {
		return http.get('/translateDictFromTable');
	},
	/**
     * 【接口签名验证】
     * 49 字典表的 翻译，可批量
     *
     * @param table
     * @param text
     * @param code
     * @param keys  多个用逗号分割
     * @return
     */
	translateDictFromTableByKeys() {
		return http.get('/translateDictFromTableByKeys');
	},
	 /**
     * 发送模板信息
     * @param message
     */
	sendTemplateMessage() {
		return http.get('/sendTemplateMessage');
	},
	 /**
     * 获取消息模板内容
     * @param code
     * @return
     */
	getTemplateContent() {
		return http.get('/getTemplateContent');
	},
	 /**
     * 保存数据日志
     * @param dataLogDto
     */
	saveDataLog() {
		return http.get('/saveDataLog');
	},
	addSysFiles() {
		return http.get('/addSysFiles');
	},
	getFileUrl() {
		return http.get('/getFileUrl');
	},
	/**
     * 更新头像
     * @param loginUser
     * @return
     */
	updateAvatar() {
		return http.get('/updateAvatar');
	},
	/**
     * 向app端 websocket推送聊天刷新消息
     * @param userId
     * @return
     */
	sendAppChatSocket() {
		return http.get('/sendAppChatSocket');
	},
};

export default apiService;

