<?php
error_reporting(0);
$conf['qqjump']=1;
$siteurl = $_SERVER['HTTP_REFERER']?$_SERVER['HTTP_REFERER']:"http://".$_SERVER['HTTP_HOST'];
$useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
if(strpos($useragent, 'iphone')!==false || strpos($useragent, 'ipod')!==false){
	$alert = '<img src="//puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rLrNvRzmibibqrjTFj5g2kzGyoQj3ViartAEQ/0" class="icon-safari" /> <span id="openm">Safari打开</span>';
}elseif(strpos($useragent, 'micromessenger')!==false){
	$alert = '<img src="//puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rLbNVmztN9ia6GPRJ0IFicucFTr4Pp8xzibsw/0" class="icon-safari" /> <span id="openm">浏览器打开</span>';
}else{
	$alert = '<img src="//puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rOCTm6gtUeQKX7m84xg47iaVosibGckrP0JQ/0" class="icon-safari" /> <span id="openm">浏览器打开</span>';
}
if(strpos($_SERVER['HTTP_USER_AGENT'], 'QQ/')!==false && $conf['qqjump']==1){
echo '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <meta content="black" name="apple-mobile-web-app-status-bar-style"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta content="false" name="twcClient" id="twcClient"/>
    <meta name="aplus-touch" content="1"/>
    <style>
body,html{width:100%;height:100%}
*{margin:0;padding:0}
body{background-color:#fff}
.top-bar-guidance{font-size:15px;color:#fff;height:70%;line-height:1.8;padding-left:20px;padding-top:20px;background:url(//gw.alicdn.com/tfs/TB1eSZaNFXXXXb.XXXXXXXXXXXX-750-234.png) center top/contain no-repeat}
.top-bar-guidance .icon-safari{width:25px;height:25px;vertical-align:middle;margin:0 .2em}
.app-download-tip{margin:0 auto;width:290px;text-align:center;font-size:15px;color:#2466f4;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAcAQMAAACak0ePAAAABlBMVEUAAAAdYfh+GakkAAAAAXRSTlMAQObYZgAAAA5JREFUCNdjwA8acEkAAAy4AIE4hQq/AAAAAElFTkSuQmCC) left center/auto 15px repeat-x}
.app-download-tip .guidance-desc{background-color:#fff;padding:0 5px}
.app-download-btn{display:block;width:214px;height:40px;line-height:40px;margin:18px auto 0 auto;text-align:center;font-size:18px;color:#2466f4;border-radius:20px;border:.5px #2466f4 solid;text-decoration:none}
    </style>
</head>
<body>
<div class="top-bar-guidance">
    <p>点击右上角'.$alert.'</p>
    <p>可以继续浏览本站哦~</p>
</div>
<div class="app-download-tip">
    <span class="guidance-desc">您也可以手动复制本站网址，到其它浏览器打开</span>
</div>
</body>
</html>';exit;} ?>
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="author" content="落日" />
		<title>燃鹅在线抽奖小助手</title>
		<meta name="Description" content="燃鹅在线抽奖小助手（燃鹅抽奖,燃鹅跑分,燃鹅向前冲,燃鹅刷金币,燃鹅代跑）" />
		<meta name="Keywords" content="燃鹅小助手,燃鹅抽奖,燃鹅跑分,燃鹅向前冲,燃鹅刷金币,燃鹅代跑" />
		<link rel="shortcut icon" href="assets/images/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="./assets/layui/css/layui.css" />
		<link rel="stylesheet" type="text/css" href="assets/css/xy_style.css?v=1.1" />
	</head>
	<body>
		<div class="layui-header header" spring="">
			<div class="layui-container">
				<a class="title" href="/">
					<h1>燃鹅小助手</h1>
				</a>
				<ul class="layui-nav" lay-filter="">
					<li class="layui-nav-item layui-this">
						<a href="/">首页</a>
					</li>
					</li>
					<li class="layui-nav-item">
						<a href="javascript:;">更多</a>
						<dl class="layui-nav-child">
							<!-- 二级菜单 -->
							<dd><a href="" target="_blank" rel="nofollow">待添加</a></dd>
							<dd><a href="" target="_blank" rel="nofollow">待添加</a></dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
		<div class="layui-container layui-row">
			<div class="layui-col-md12 site-content">
				<div class="layui-card layui-anim layui-anim-up">
					<div class="layui-card-header"><span class="layui-badge-dot"></span> 燃鹅操作面板</div>
					<div class="layui-card-body">
						<form class="layui-form" action="">
							<div class="login-main">
								<div class="user-img">
									<img class="userimg" src="https://q1.qlogo.cn/g?b=qq&nk=123456789&s=100&t="><!--不是QQ-->
								</div>
								<div class="login-log">未登录</div>
								<div class="layui-row uinlist" style="display: none;">
									<div class="layui-form-item layui-col-md6 layui-col-md-offset3">
										<label class="layui-form-label">选择QQ登录</label>
										<div class="layui-input-block">
											<select id="qqlist" name="qqlist">
											</select>
										</div>
									</div>
								</div>
								<div class="layui-row info" style="display: none;">
									<div class="layui-col-md4 layui-col-md-offset4 user-info"></div>
								</div>
								<div class="login-btn">
									<button type="button" class="layui-btn layui-btn-normal get-login">单点登录</button>
									<button type="button" class="layui-btn layui-btn-normal add-uin">添加帐号</button>
									</hr>
									<button type="button" class="layui-btn layui-btn-normal remove-uin">删除帐号</button>
									<button type="button" class="layui-btn layui-btn-normal qie-uin" style="display: none;">切换帐号</button>
								</div>
								<div class="qrimg"></div>
								<div class="login-btn">
									<button type="button" class="layui-btn layui-btn-normal go-login" style="display: none;">返回登录</button>
									<a href="#" class="layui-btn layui-btn-normal qr-login" style="display: none;">快速登录</a>
									<p class="sm-tips" style="padding-top: 25px;display: none;">
										<span class="layui-badge layui-bg-blue">提示</span> 扫码请等待2-3秒再点确定 如已扫码无反应请刷新页面重试
									</p>
								</div>
								<div class="rane-fun layui-col-md6 layui-col-md-offset3">
									<div class="text-title">
										<fieldset>
											<legend><a name="textarea">功能操作</a></legend>
										</fieldset>
									</div>
									<div class="text-tips" style="padding-bottom: 15px;">
										<p>
										    <span class="layui-badge layui-bg-blue">提示</span>
										    刷金币任务切换到后台等待即可 任务详情见底部日志请等待任务完成再执行另一个任务否则会导致时序异常
										</p>
									    
									</div>
									<div class="layui-row layui-col-space15">
										<div class="layui-col-md12">
											<div class="layui-panel">
												<div class="fun-title">
													<span class="layui-badge-dot layui-bg-blue"></span> 单项操作
												</div>
												<div class="fun-row">
													<input type="radio" name="dofun" value="1" title="每日签到" checked>
													<input type="radio" name="dofun" value="2" title="广告抽奖(一天4次)">
												</div>
												<div class="fun-btn">
													<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal checrane">开始执行</button>
												</div>
											</div>
										</div>
										<div class="layui-col-md6">
											<div class="layui-panel">
												<div class="fun-title">
													<span class="layui-badge-dot layui-bg-blue"></span> 刷金币(1次3分钟左右)
												</div>
												<div class="fun-row">
													<input type="text" name="coins" placeholder="输入次数" autocomplete="off" class="layui-input">
												</div>
												<div class="fun-btn">
													<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal do-coins">开始执行</button>
												</div>
											</div>
										</div>
										<div class="layui-col-md6">
											<div class="layui-panel">
												<div class="fun-title">
													<span class="layui-badge-dot layui-bg-blue"></span> 兑换奖券(1奖券100金币)
												</div>
												<div class="fun-row">
													<input type="text" name="ticket" placeholder="输入数量" autocomplete="off" class="layui-input">
												</div>
												<div class="fun-btn">
													<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal do-ticket">兑换奖券</button>
												</div>
											</div>
										</div>
										<div class="layui-col-md6">
											<div class="layui-panel">
												<div class="fun-title">
													<span class="layui-badge-dot layui-bg-blue"></span> 普通抽奖(15奖券1次)
												</div>
												<div class="fun-row">
													<input type="text" name="docom" placeholder="输入抽奖次数" autocomplete="off"
													 class="layui-input">
												</div>
												<div class="fun-btn">
													<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal do-com">开始抽奖</button>
												</div>
											</div>
										</div>
										<div class="layui-col-md6">
											<div class="layui-panel">
												<div class="fun-title">
													<span class="layui-badge-dot layui-bg-blue"></span> 超级抽奖(45奖券1次)
												</div>
												<div class="fun-row">
													<input type="text" name="dosuper" placeholder="输入抽奖次数" autocomplete="off"
													 class="layui-input">
												</div>
												<div class="fun-btn">
													<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal do-super">开始抽奖</button>
												</div>
											</div>
										</div>
									</div>
									<div class="rane-log">
										<textarea placeholder="日志输出区域" class="layui-textarea add-log"></textarea>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="layui-footer footer  layui-anim layui-anim-up">
			<div class="layui-container">
				<p>©  <a href="/" target="_blank">伽罗云互联</a> - 
				<a href="http://slxt.huluxia.cn/sites/1267.html" target="_blank">LR
				</p>
			</div>
		</div>
		<script src="./assets/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="./assets/js/jquery.qrcode.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="./assets/layui/layui.js" type="text/javascript" charset="utf-8"></script>
		<script src="./assets/js/md5.js" type="text/javascript" charset="utf-8"></script>
		<script src="./assets/js/codes.js" type="text/javascript" charset="utf-8"></script>
		<script src="./assets/js/main.js?v=1.21" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			layui.use(['element', 'layer'], function() {
				var element = layui.element;
				var layer = layui.layer;
			});
		</script>
	</body>
</html>
