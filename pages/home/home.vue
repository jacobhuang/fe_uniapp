<template name="home">
  <view>
    <view class="tab-bar-style" id="tabBar">
      <view class="top-bar-style">首页</view>
<view class="bg-black">
	<u-tabs
	  class="tabs-style"
	  height="150"
	  font-size="12"
	  inactive-style="color:#FFFFFF;" 
	  active-style="color:#e4a650;"
	  line-color="#e4a650"
	  :list="list"
	  :is-scroll="false"
	  :currentIndex="currentIndex"
	  @change="change"
	>
	  <view slot="right" class="right-style" @tap="switchOrg">
	    <u-icon
	      name="account-fill"
	      size="18"
	      bold
	      @click="switchOrg"
	    ></u-icon>
	    <u-icon name="arrow-right" size="14" bold></u-icon>
	  </view>
	</u-tabs>
</view>

      
    </view>
    
    <view class="margin-top-style"></view>
    <view v-if="currentIndex == 0">
      <view>
        <scroll-view class="scroll-view-style">
          <!-- 轮播 -->
          <!-- <swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
					:autoplay="true" interval="5000" duration="500" :style="[{animation: 'show 0.2s 1'}]">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</swiper-item>
					</swiper> -->

          <view
            class="cu-list grid col-4 text-sm cu-bar no-border top-gridStyle"
          >
            <view class="cu-item">
              <view class="uni-center-content margin-bottom">
                {{ todayPerformance }}
              </view>
              <view class="uni-center-content"> 今日业绩 </view>
            </view>
            <view class="cu-item">
              <view class="uni-center-content margin-bottom">
                {{ monthPerformance }}
              </view>
              <view class="uni-center-content"> 本月业绩 </view>
            </view>
            <view class="cu-item">
              <view class="uni-center-content margin-bottom">
                {{ lastWeekPerformance }}
              </view>
              <view class="uni-center-content">上周同期 </view>
            </view>
            <view class="cu-item">
              <view class="uni-center-content margin-bottom">
                {{ lastMonthPerformance }}
              </view>
              <view class="uni-center-content">上月同期</view>
            </view>
          </view>
          <view v-for="(pi, i) in headerList" :key="i" class="marginStyle">
            <view class="cu-bar bg-white solid-bottom cuBarStyle">
              <view class="action">
                {{ pi.title }}
              </view>
            </view>

            <view class="cu-list grid col-3 text-sm no-border gridStyle">
              <view
                class="cu-item"
                v-for="(item, index) in pi.us.data"
                :key="index"
                @tap="goPage(item.page)"
              >
                <view class="padding text-center">
                  <image :src="item.icon" class="imageStyle">
                    <view
                      class="cu-tag badge margin-top-sm cuTagStyle"
                      v-if="getTtemDotInfo(item)"
                    >
                      <block v-if="getTtemDotInfo(item)">{{
                        getTtemDotInfo(item)
                      }}</block>
                    </view>
                  </image>
                  <view class="margin-top-xs">{{ item.title }}</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view v-if="currentIndex == 1">
      <view>
        <view v-for="(pi, i) in shareShopList" :key="i" class="marginStyle">
          <view class="cu-bar bg-white solid-bottom cuBarStyle">
            <view class="action">
              {{ pi.title }}
            </view>
          </view>

          <view class="cu-list grid col-3 text-sm no-border">
            <view
              class="cu-item"
              v-for="(item, index) in pi.us.data"
              :key="index"
              @tap="goPage(item.page)"
            >
              <view class="padding text-center">
                <image :src="item.icon" class="imageStyle">
                  <view
                    class="cu-tag badge margin-top-sm cuTagStyle"
                    v-if="getTtemDotInfo(item)"
                  >
                    <block v-if="getTtemDotInfo(item)">{{
                      getTtemDotInfo(item)
                    }}</block>
                  </view>
                </image>
                <view class="margin-top-xs">{{ item.title }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="currentIndex == 2">
      <view>
        <view v-for="(pi, i) in shareEmployeeList" :key="i" class="marginStyle">
          <view class="cu-bar bg-white solid-bottom cuBarStyle">
            <view class="action">
              {{ pi.title }}
            </view>
          </view>

          <view class="cu-list grid col-3 text-sm no-border gridStyle">
            <view
              class="cu-item"
              v-for="(item, index) in pi.us.data"
              :key="index"
              @tap="goPage(item.page)"
            >
              <view class="padding text-center">
                <image :src="item.icon" class="imageStyle">
                  <view
                    class="cu-tag badge margin-top-sm cuTagStyle"
                    v-if="getTtemDotInfo(item)"
                  >
                    <block v-if="getTtemDotInfo(item)">{{
                      getTtemDotInfo(item)
                    }}</block>
                  </view>
                </image>
                <view class="margin-top-xs">{{ item.title }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="currentIndex == 3">
      <view>
        <view v-for="(pi, i) in shareNetHotList" :key="i" class="marginStyle">
          <view class="cu-bar bg-white solid-bottom cuBarStyle">
            <view class="action">
              {{ pi.title }}
            </view>
          </view>

          <view class="cu-list grid col-3 text-sm no-border gridStyle">
            <view
              class="cu-item"
              v-for="(item, index) in pi.us.data"
              :key="index"
              @tap="goPage(item.page)"
            >
              <view class="padding text-center">
                <image :src="item.icon" class="imageStyle">
                  <view
                    class="cu-tag badge margin-top-sm cuTagStyle"
                    v-if="getTtemDotInfo(item)"
                  >
                    <block v-if="getTtemDotInfo(item)">{{
                      getTtemDotInfo(item)
                    }}</block>
                  </view>
                </image>
                <view class="margin-top-xs">{{ item.title }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="currentIndex == 4">
      <view> </view>
    </view>
    <view v-if="currentIndex == 5">
      <view> </view>
    </view>
    <view v-if="currentIndex == 6">
      <view> </view>
    </view>
  </view>
</template>

<script>
import { header } from "@/common/util/work.js";
import { shareShop } from "@/common/util/shareShop.js";
import { shareEmployee } from "@/common/util/shareEmployee.js";
import { shareNetHot } from "@/common/util/shareNetHot.js";
import socket from "@/common/js-sdk/socket/socket.js";
export default {
  name: "home",
  props: {
    cur: String,
  },
  watch: {
    cur: {
      immediate: true,
      handler: function (val, oldVal) {
        console.log("cur", val, oldVal);
        this.initMenu();
      },
    },
  },
  data() {
    return {
      todayPerformance: 0,
      monthPerformance: 0,
      lastWeekPerformance: 0,
      lastMonthPerformance: 0,
      show: false,
      list: [],
      selectedColor: "#FFF",
      currentIndex: 2,
      swiperList: [
        {
          id: 1,
          type: "image",
          url: "/static/banner/banner1.png",
          link: "",
        },
        {
          id: 2,
          type: "image",
          url: "/static/banner/banner2.jpg",
          link: "",
        },
        {
          id: 3,
          type: "image",
          url: "/static/banner/banner3.jpg",
          link: "",
        },
        {
          id: 4,
          type: "image",
          url: "/static/banner/banner4.jpg",
          link: "",
        },
      ],
      headerList: header.data,
      shareShopList: shareShop.data,
      shareEmployeeList: shareEmployee.data,
      shareNetHotList: shareNetHot.data,
      msgCount: 0,
      dot: {
        mailHome: false,
      },
    };
  },
  mounted() {
    this.loadTabMenu();
  },
  methods: {
    loadTabMenu() {
      this.list = [
        {
          name: "共享一号",
        },
        {
          name: "共享店铺",
        },
        {
          name: "员工合伙",
        },
        {
          name: "抖音生态",
        },
        {
          name: "网红系统",
        },
         {
          name: "共享商圈",
        },
      ];
    },
    showToast(params) {},
    switchOrg() {
      this.$Router.push({
        name: "selectOrg",
        transition: {
          name: "slide",
          duration: 300,
        },
      });
    },
    change(item) {
      this.currentIndex = item.index;
      console.log("-----------" + JSON.stringify(item) + "------------");
    },
    initMenu() {
      console.log("-----------home------------");
      // this.onSocketOpen();
      // this.onSocketReceive();
      // this.loadCount(0);
    },
    goPage(page) {
      if (!page) {
        return false;
      }
      if (page === "annotationList") {
        this.msgCount = 0;
      }
      this.dot[page] = false;
      this.$Router.push({
        name: page,
      });
    },
    // 启动webSocket
    onSocketOpen() {
      socket.init("websocket");
    },
    onSocketReceive() {
      var _this = this;
      socket.acceptMessage = function (res) {
        // console.log("页面收到的消息", res);
        if (res.cmd == "topic") {
          //系统通知
          _this.loadCount("1");
        } else if (res.cmd == "user") {
          //用户消息
          _this.loadCount("2");
        } else if (res.cmd == "email") {
          //邮件消息
          _this.loadEmailCount();
        }
      };
    },
    loadCount(flag) {
      console.log("loadCount::flag", flag);
      let url = "/sys/annountCement/listByUser";
      this.$http.get(url).then((res) => {
        console.log("res::", JSON.stringify(res));
        if (res.data.success) {
          let msg1Count = res.data.result.anntMsgTotal;
          let msg2Count = res.data.result.sysMsgTotal;
          this.msgCount = msg1Count + msg2Count;
          console.log("this.msgCount", this.msgCount);
        }
      });
    },
    loadEmailCount() {
      this.dot.mailHome = true;
    },
    getTtemDotInfo(item) {
      if (item.page === "annotationList" && this.msgCount > 0) {
        return this.msgCount;
      }
      return "";
    },
  },
};
</script>

<style scoped>
.cu-list.grid > .cu-item {
  padding: 0px 0px;
}

.line2-icon {
  width: 60px;
  height: 60px;
}

.tab-bar-style {
  position: fixed;
  top: 0upx;
  width: 100%;
  z-index: 999;
  background-color: #000000;
  text-align: center;
  color: white;
  padding: 20upx;
  font-size: 13pt;
  padding-top:54px;
}



.right-style {
  padding-left: 4px;
  display: flex;
  flex-direction: row;
}

.margin-top-style {
  margin-top: 282upx;
}

.scroll-view-style {
  background-color: #efefef;
  border-radius: 30upx;
}

.top-gridStyle {
  margin: 0 30upx 30upx 30upx;
  border-radius: 10upx;
}

.marginStyle {
  margin: 30upx;
}

.cuBarStyle {
  border-radius: 20upx 20upx 0 0;
}

.imageStyle {
  width: 28px;
  height: 28px;
}

.cuTagStyle {
  margin-left: 1.2em;
}
</style>
