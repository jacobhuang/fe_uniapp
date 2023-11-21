<template>
    
	<view>
        <cu-custom bgColor="bg-black" :isBack="true">
				<block slot="content">审核中</block>
			</cu-custom>
        <view class="main-content">
            <view style="border:1px solid red;width:80px;height:80px;">
                <img src="/static/waiting.png" alt="">
            </view>
            <view class="textInfo">
                正在审核中，请耐心等待
            </view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
        methods: {
        }
	}
</script>

<style scoped>
	.main-content{
		height: 100vh;
		margin-bottom: 10px;
		overflow-y:scroll;
        background-color:#FFFFFF;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
	}
.textInfo{
    color:#888888;
    margin-top:30px;
}
</style>