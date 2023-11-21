<template>
  <view class="container">
    <view class="nav" @click="goPage('home')">
      <div class="cuIcon-home"></div>
      <text class="title">&nbsp;&nbsp;首页</text>
    </view>
	<!-- 顶部信息栏 -->
	<view class="top-info">
	  <!-- 左侧信息 -->
	  <view class="left-info">
		<view class="info-row">
		  门店开通日期: 2022-11-1
		</view>
		<view class="info-row">
		  租赁费到期日: 2023-11-1
		</view>
	  </view>
	  <!-- 右侧续费按钮 -->
	  <view class="right-btn">
		<button class="renew-btn">续费</button>
	  </view>
	</view>
    <view class="search-box">
		<u-search placeholder="搜索" v-model="search" :animation="true" @search="searchOrg" ></u-search>
      <!-- <input v-model="search" type="text" placeholder="搜索" class="search-input" /> -->
	  <!-- <div class="cuIcon-user search-icon">切换</div> -->
    </view>
    <view class="main">
      <view class="card">
        <ul class="org-list">
          <li v-for="(org, index) in orgList" :key="org.id">
            <div class="org-info">
              <div class="check-icon" :class="org.expired ? 'cuIcon-warn' : 'cuIcon-warnfill'" />
			  <div class="check-icon" :class="org.expired ? 'cuIcon-roundcheckfill' : 'cuIcon-roundcheck'" />
              <span class="org-level">{{ getLevel(org.level) }}</span>
              <span class="org-name" @click="goPage('home')">{{ org.name }}</span>
			  <div class="cuIcon-edit edit-icon" @click="editOrg(index)"></div>
			  <div class="cuIcon-roundright  arrow-icon" :class="{ 'cuIcon-rounddown': org.expanded }" 
			  @click="toggle(org)"></div>
            </div>
            <ul v-if="org.expanded" class="sub-list">
              <li v-for="(subOrg, index2) in org.subOrgs" :key="subOrg.id">
                <div class="org-info">
				  <div class="check-icon" :class="subOrg.expired ? 'cuIcon-warn' : 'cuIcon-warnfill'" />
				  <div class="check-icon" :class="subOrg.current ? 'cuIcon-roundcheckfill' : 'cuIcon-roundcheck'" />
                  <span class="org-level">{{ getLevel(subOrg.level) }}</span>
                  <span class="org-name" @click="goPage('home')">{{ subOrg.name }}</span>
				  <div class="cuIcon-edit edit-icon" @click="editSubOrg(index, index2)"></div>
				  <div class="cuIcon-roundright  arrow-icon" :class="{ 'cuIcon-rounddown': org.expanded }"
				  @click="toggle(subOrg)"></div>
                </div>
                <ul v-if="subOrg.expanded" class="sub-list">
                  <li v-for="(childOrg, index3) in subOrg.childOrgs" :key="childOrg.id">
                    <div class="org-info">
						<div class="check-icon" :class="childOrg.expired ? 'cuIcon-warn' : 'cuIcon-warnfill'" />
						<div class="check-icon" :class="childOrg.current ? 'cuIcon-roundcheckfill' : 'cuIcon-roundcheck'" />
                      <span class="org-level">{{ getLevel(childOrg.level) }}</span>
                      <span class="org-name" @click="goPage('home')">{{ childOrg.name }}</span>
					  <div class="cuIcon-edit edit-icon" @click="editChildOrg(index, index2, index3)"></div>
					 <div v-if="subOrg.level>2" class="cuIcon-roundright  arrow-icon" :class="{ 'cuIcon-rounddown': childOrg.expanded }"
					 @click="toggle(childOrg)"></div>
					</div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </view>
    </view>
    <view class="footer">
      <button class="reset-button" @click="resetPassword">重置密码</button>
      <button class="logout-button" @click="logout">退出登陆</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        orgList: [],
        search: ''
      }
    },
    mounted() {
      this.getOrgList()
    },
    methods: {
		searchOrg(){
				this.orgList = this.orgList.filter(org => org.name.includes(this.search));
		},
		resetPassword(){
			uni.showModal({
						content:"是否重置密码",
						confirmText:"确认",
						cancelText:"取消"
					});
		},
		logout(){
			uni.showModal({
						content:"是否重置密码",
						confirmText:"确认",
						cancelText:"取消"
					});
		},
      getOrgList() {
        // fetch orgList from API
        // ...

        // dummy data for testing
        this.orgList = [
          {
            id: 1,
            name: '总部',
            level: 1,
            expired: false,
            expanded:true,
            subOrgs: [
              {
                id: 2,
                name: '哗啦啦机构',
                level: 2,
                expired: false,
                expanded:true,
				current:true,
                childOrgs: [
                  {
                    id: 3,
                    name: '岚第.岁飨食单店',
                    level: 3,
                    expired: false,
					current:true
                  },
                  {
                    id: 4,
                    name: '哗啦啦将军连锁',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 5,
                    name: '门店 3',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 6,
                    name: '门店 4',
                    level: 3,
                    expired: false
                  }
                ]
              },
              {
                id: 7,
                name: '机构 2',
                level: 2,
                expired: false,
                expanded:true,
                childOrgs: [
                  {
                    id: 8,
                    name: '门店 5',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 9,
                    name: '门店 6',
                    level: 3,
                    expired: true
                  },
                  {
                    id: 10,
                    name: '门店 7',
                    level: 3,
                    expired: false
                  }
                ]
              },
              {
                id: 11,
                name: '机构 3',
                level: 2,
                expired: false,
                expanded:true,
                childOrgs: [
                  {
                    id: 12,
                    name: '门店 8',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 13,
                    name: '门店 9',
                    level: 3,
                    expired: false
                  }
                ]
              },
              {
                id: 14,
                name: '机构 4',
                level: 2,
                expired: true,
                expanded:true,
                childOrgs: [
                  {
                    id: 15,
                    name: '门店 10',
                    level: 3,
                    expired: true
                  },
                  {
                    id: 16,
                    name: '门店 11',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 17,
                    name: '门店 12',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 18,
                    name: '门店 13',
                    level: 3,
                    expired: false
                  }
                ]
              },
              {
                id: 19,
                name: '机构 5',
                level: 2,
                expired: false,
                expanded:true,
                childOrgs: [
                  {
                    id: 20,
                    name: '门店 14',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 21,
                    name: '门店 15',
                    level: 3,
                    expired: false
                  },
                  {
                    id: 22,
                    name: '门店 16',
                    level: 3,
                    expired: false
                  }
                ]
              }
            ]
          }
        ];
      },
	  goPage(page) {
	  	if (!page) {
	  		return false;
	  	}
	  	this.$Router.push({
	  		name: page
	  	})
	  },
      getLevel(level) {
        switch (level) {
          case 1:
            return "总部"
          case 2:
            return "机构"
          case 3:
            return "门店"
          default:
            return ""
        }
      },
      toggle(org) {
        org.expanded = !org.expanded
      },
      editOrg(index) {
        // handle org edit
		uni.showActionSheet({
			itemList:["sdf","sdf"],
			title:"Edit"
		})
      },
      editSubOrg(parentIndex, index) {
        // handle sub org edit
		uni.showModal({
			content:"是否进行续费",
			confirmText:"确认",
			cancelText:"取消"
		})
      },
      editChildOrg(parentIndex, subIndex, index) {
        // handle child org edit
		uni.showActionSheet({
					itemList:["门店","sdf"],
					title:"Edit"
				})
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    padding: 20px;
	color:white;
	background-color: black;
  }
  .nav {
    display: flex;
    align-items: center;
    cursor: pointer;
	margin-bottom:20upx;
  }
  // 顶部信息栏
  .top-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:10upx;
	margin-bottom:20upx;
  }
  .left-info {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 24px;
  
  }
  
  .left-info .info-row {
    margin-bottom: 5px;
  }
  .right-btn {
    display: flex;
  }
    .renew-btn {
      background: linear-gradient(to right, #FFFFFF, #FFD700);
      color: #000000;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 10px;
	  width:160upx;
      font-size: 16px;
      line-height: 15px;
    }
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .search-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .search-icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .search-input {
    height: 30px;
    width: 90%;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
  }
  .main {
    flex: 1;
    overflow-y: auto;
  }
  .card {
    background-color: black;
    border: 1px solid grey;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px grey;
  }
  .org-list, .sub-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .org-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .check-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .org-level {
    display: inline-block;
    margin-right: 10px;
    padding: 5px;
    background-color: goldenrod;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
  .org-name {
    display: inline-block;
    flex-grow: 1;
    margin-right: 10px;
    font-size: 16px;
    color: white;
    font-weight: bold;
  }
  .edit-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
  .arrow-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .arrow-down {
    transform: rotate(90deg);
  }
  .sub-list {
    margin-left: 20px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
  }
  .reset-button, .logout-button {
    height: 40px;
    width: 45%;
    border-radius: 20px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
  }
  .reset-button {
    color: white;
    background-color: grey;
  }
  .logout-button {
    color: darkgoldenrod;
    background-image: linear-gradient(45deg, white, gold);
    box-shadow: 0 0 5px darkgoldenrod;
  }
  .logout-button:hover {
    box-shadow: 0 0 10px darkgoldenrod;
  }
</style>
