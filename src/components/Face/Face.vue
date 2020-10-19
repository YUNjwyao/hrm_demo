<template>
    <div>
        <dl class="admin_login">
			<dt>
				<strong>CSI员工之家</strong><em></em> <strong>请把你的脸放摄像头面前</strong>
			</dt>
			<div id="media">
				<video id="video" width="100%" height="300" autoplay></video>
				<canvas id="canvas" width="530" height="300"></canvas>
			</div>
			<dd>
				<input type="button" onclick="query()" value="立即登录"
					class="submit_btn" />
			</dd>

		</dl>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
  body {
	height: 100%;
	background: #213838;
	overflow: hidden;
}

canvas {
	z-index: -1;
	position: absolute;
}
* {
	margin: 0;
	padding: 0;
}

body {
	height: 100vh;
	background-position: center;
	overflow: hidden;
}

h1 {
	color: #fff;
	text-align: center;
	font-weight: 100;
	margin-top: 40px;
}

#media {
	width: 100%;
	height: 250px;
	margin: 10px auto 0;
	border-radius: 30px;
	overflow: hidden;
	opacity: 0.7px;
}

#video {
	
}

#canvas {
	display: none;
}

#btn {
	width: 160px;
	height: 50px;
	background: #03a9f4;
	margin: 70px auto 0;
	text-align: center;
	line-height: 50px;
	color: #fff;
	border-radius: 40px;
}
</style>