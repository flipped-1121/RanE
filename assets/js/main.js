$(function () {
	var getuin = localStorage
	var qqarray = []
	var datalist = { uin: '', ticket: '' }
	var uin;
	var date = new Date();
	if (getuin.getItem('qqlist')) {
		$('.uinlist').show()
		qqarray = JSON.parse(getuin.getItem('qqlist'))
		qqlists()
	}else{
		$('.get-login').hide()
		$('.remove-uin').hide()
	}
	$('.add-uin').on('click', function () {
		$('.info').hide()
		$('.uinlist').hide()
		$('.rane-fun').hide()
		$.ajax({
			url:  './api/GetCodes?do=login&info=getqr',
			dataType: 'json',
			async:false,
			success:function(data){
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					console.log(data);
					jQuery('.qrimg').qrcode({
					    render: "canvas", //也可以替换为table
					    width: 100,
					    height: 100,
					    text: data.loginurl
					});
					$('.login-log').html("请使用手机QQ完成扫码登录")
					$('.userimg').hide()
					$('.get-login').hide()
					$('.remove-uin').hide()
					$('.add-uin').hide()
					$('.uinlist').hide()
					var code = data.code
					var qrlogin = 'mqqapi://forward/url?version=1&src_type=web&url_prefix='+window.btoa(data.loginurl)
					var logincode = setInterval(function () {
						$.ajax({
							url:  './api/GetCodes?do=login1&info=getqr',
							data: {"code":code},
							dataType: 'json',
							async:false,
							success:function(data){
								if(data.code == -1){
									$('.login-log').html("未扫码...");
									$('.go-login').show()
									$('.go-login').html('返回首页')
									$('.sm-tips').show()
									if (/Android|SymbianOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Midp/i
                						.test(navigator.userAgent) && navigator.userAgent.indexOf("QQ/") == -1) {
                						$('.qr-login').show()
                                        $('.qr-login').click(function(){
                							window.location.href = qrlogin;
                						})
                					}
								}else if(data.data.login == 1){
									$('.sm-tips').hide()
									$('.qr-login').hide()
									var datalist = { uin: data.data.uin, ticket: data.data.ticket }
									qqarray.push(datalist)
									getuin.setItem('qqlist', JSON.stringify(qqarray))
									$('.login-log').html('<span class="layui-badge layui-bg-blue">添加成功请返回登录</span>');
									$('.go-login').show()
									clearInterval(logincode)
									qqarray = JSON.parse(getuin.getItem('qqlist'))
								}
							}
						})
					},1200)
				}
			}
		})
	});
	
	var ticket;
	var codes;
	var token;
	var uid;
	$('.get-login').on('click', function () {
		$('.uinlist').hide()
		$('.get-login').hide()
		$('.add-uin').hide()
		$('.remove-uin').hide()
		$('.qie-uin').show()
		ticket = $('#qqlist').val()
		uin = $('#qqlist').find("option:selected").text();
		$.ajax({
			url:  './api/GetCodes?do=rane&info=ticket',
			data: {"ticket":ticket},
			dataType: 'json',
			async:false,
			success:function(data){
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					codes = data.code
				}
			}
		})
		sign = hex_md5('2014' + codes + "472770f9e581cffb09349f422af57c5d")
		let obj = { "gid": "201", "sdk": 4, "uid": codes, "ios": "false", "sign": sign }
		let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
		let ranv = encode(rant, JSON.stringify(obj))
		$.ajax({
			url:  './api/GetLogin',
			data: {t:rant,v:ranv,rane:'login/login'},
			dataType: 'json',
			timeout: 30000,
			async:true,
			success:function(data){
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					data = JSON.parse(decode(data.t, data.v))
					console.log(data)
					if(data.data){
						var thiswidth = $('.user-qq').outerWidth();
						$('.userimg').attr('src','https://q1.qlogo.cn/g?b=qq&nk='+uin+'&s=100&t=');
						$('.login-log').html('燃鹅信息');
						$('.user-qq').html('<span class="layui-badge-dot"></span> 当前帐号:'+uin)
						$('.info').show()
						var info = '<table class="layui-table" style="table-layout:fixed;"><colgroup><col width="'+thiswidth/2+'px"><col width="'+thiswidth/2+'px"></colgroup><tbody>'+
						'<tr><td>QQ帐号</td><td>'+uin+'</td></tr>'+
						'<tr><td>uid</td><td>'+data.uid+'</td></tr>'+
						'<tr><td>token</td><td>'+data.token+'</td></tr>'+
						'<tr><td>金币</td><td>'+data.data.money+'</td></tr>'+
						'<tr><td>奖券</td><td>'+data.data.gfc+'</td></tr>'+
						'</tbody></table>';
						$('.user-info').html(info)
						layer.msg('登录成功',{offset:'250px'})
						token = data.token;
						uid = data.uid;
					}else{
						layer.alert("当前QQ的code已过期请重新扫码添加");
						getuin.removeItem("qqlist");
					}
				}
			},
		})
	});
	var ts = 1;
	var xcount;
	var kcount;
	var setnew;
	$('.checrane').on('click', function () {
		var dofun = $("input[type='radio']:checked").val()
		if(dofun == 1){
			let qddays = date.getDay()
			if (qddays == 0) {
			  qddays = 7
			}
			sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ "day": qddays,"pid":0, "video": true, "t": 0 }) + "472770f9e581cffb09349f422af57c5d")
			let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ "day": qddays,"pid":0, "video": true, "t": 0 }), "sign": sign }
			let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
			let ranv = encode(rant, JSON.stringify(obj))
			$.ajax({
				url:  './api/GetLogin',
				data: {t:rant,v:ranv,rane:'game/sign'},
				dataType: 'json',
				timeout: 30000,
				async:true,
				success:function(data){
					if(data.code == -1){
						layer.alert(data.msg);
					}else{
						data = JSON.parse(decode(data.t, data.v))
						let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
						let relog = $('.add-log').val()
						if (!data.errMsg) {
							$('.add-log').val(relog + time + '：' + "签到成功" + '\n')
							layer.msg('签到成功',{offset:'250px'})
							ts += 1
							return;
						}else if(data.errMsg == '参数错误'){
							layer.msg('请先登录',{offset:'250px'})
							return
						}else{
							$('.add-log').val(relog + time+'：'+data.errMsg+'\n')
							layer.msg(data.errMsg,{offset:'250px'})
							ts += 1;
							getheight()
						}	
					}
				},
			})
		}else if(dofun == 2){
			sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 't': 1, 'ios': false, 'video': true }) + "472770f9e581cffb09349f422af57c5d")
			let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 't': 1, 'ios': false, 'video': true }), "sign": sign }
			let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
			let ranv = encode(rant, JSON.stringify(obj))
			$.ajax({
				url:  './api/GetLogin',
				data: {t:rant,v:ranv,rane:'game/lotteryStart'},
				dataType: 'json',
				timeout: 30000,
				async:true,
				success:function(data){
					if(data.code == -1){
						layer.alert(data.msg);
					}else{
						data = JSON.parse(decode(data.t, data.v))
						let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
						let relog = $('.add-log').val()
						if (!data.errMsg) {
							$('.add-log').val(relog + time + '：' + "[广告超级抽奖]获得-" + getwid(data.id) + '\n')
							layer.msg('正在抽奖...中奖记录请拉到底部查看',{offset:'250px'})
							ts += 1
							getheight()
						}else if(data.errMsg == '参数错误'){
							layer.msg('请先登录',{offset:'250px'})
							return
						}else{
							$('.add-log').val(relog + time + '：' + "[广告超级抽奖]-" + data.errMsg + '\n')
							layer.msg(data.errMsg,{offset:'250px'})
							ts += 1;
							getheight()
						}
						setTimeout(function() {
							sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 'ios': false }) + "472770f9e581cffb09349f422af57c5d")
							let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 'ios': false }), "sign": sign }
							let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
							let ranv = encode(rant, JSON.stringify(obj))
							$.ajax({
								url:  './api/GetLogin',
								data: {t:rant,v:ranv,rane:'game/lotteryEnd'},
								dataType: 'json',
								timeout: 30000,
								async:true,
								success:function(data){
									ts += 1
									xcount = 3
									kcount = 0
									timehandle(normal)
									
								}
							})
						}, 4000);
					}
				},
			})
		}
	})
	
	function qqlists(){
		layui.use('form', function(){
		    var form = layui.form;
		    form.render();
			var qqlists = JSON.parse(getuin.getItem('qqlist'));
			for (var i=0; i<qqlists.length; i++){
				$('#qqlist').append(new Option(qqlists[i].uin,qqlists[i].ticket));
				form.render('select');
			}
		});
	}
	
	function timehandle(handle) {
		setnew = setInterval(function() {
			if (xcount != kcount) {
				console.log(kcount)
				date = new Date()
				handle()
				return
			}
			date = new Date()
			let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
			let relog = $('.add-log').val()
			$('.add-log').val(relog + time + '：' + '任务已完成' + '\n')
			
			clearInterval(setnew)
		}, 1000, handle)
	}
	
	//免费普通抽 每日3次
	function normal(){
		clearInterval(setnew)
		sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 't': 0, 'ios': false, 'video': true }) + "472770f9e581cffb09349f422af57c5d")
		let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 't': 0, 'ios': false, 'video': true }), "sign": sign }
		let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
		let ranv = encode(rant, JSON.stringify(obj))
		let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		$.ajax({
			url:  './api/GetLogin',
			data: {t:rant,v:ranv,rane:'game/lotteryStart'},
			dataType: 'json',
			timeout: 30000,
			async:true,
			success:function(data){
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					data = JSON.parse(decode(data.t, data.v))
					console.log(data)
					let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
					let relog = $('.add-log').val()
					if (!data.errMsg) {
						$('.add-log').val(relog + time + '：' + "[广告普通抽奖]获得-" + getwid(data.id) + '\n')
						ts += 1
						getheight()
					}else if(data.errMsg == '参数错误'){
						layer.msg('请先登录',{offset:'250px'})
						return
					}else if(data.errMsg == '当天视频抽奖次数已用完'){
						$('.add-log').val(relog + time + '：' + "[广告普通抽奖]-" + data.errMsg + '\n')
						$('.add-log').val(relog + time + '：广告抽奖已停止（原因：视频抽奖次数已用完)' + '\n')
						getheight()
						return
					}else{
						$('.add-log').val(relog + time + '：' + "[广告普通抽奖]-" + data.errMsg + '\n')
						ts += 1;
						getheight()
					}
					setTimeout(function() {
						sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 'ios': false }) + "472770f9e581cffb09349f422af57c5d")
						let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 'ios': false }), "sign": sign }
						let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
						let ranv = encode(rant, JSON.stringify(obj))
						$.ajax({
							url:  './api/GetLogin',
							data: {t:rant,v:ranv,rane:'game/lotteryEnd'},
							dataType: 'json',
							timeout: 30000,
							async:true,
							success:function(data){
								console.log(data)
								ts += 1
								kcount += 1
								timehandle(normal)
							}
						})
					}, 4000);
				}
			},
		})
	}
	
	//跑分刷金币
	function coins(){
		clearInterval(setnew)
		sign = hex_md5(uid + token + ts.toString() + "{}" + "472770f9e581cffb09349f422af57c5d")
		let obj = { "uid": uid, "ts": ts, "token": token, "params": "{}", "sign": sign }
		let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
		let ranv = encode(rant, JSON.stringify(obj))
		$.ajax({
			url:  './api/GetLogin',
			data: {t:rant,v:ranv,rane:'game/fbStart'},
			dataType: 'json',
			timeout: 30000,
			async:true,
			success:function(data){
				data = JSON.parse(decode(data.t, data.v))
				let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				let relog = $('.add-log').val()
				$('.add-log').val(relog + time + '：' + "任务进行中请稍后..." + '\n')
				ts += 1
				setTimeout(function() {
					sign = hex_md5(uid + token + ts.toString() + JSON.stringify({"score": 9100, "step": 445 }) + "472770f9e581cffb09349f422af57c5d")
					let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({"score": 9100, "step": 445 }), "sign": sign }
					let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
					let ranv = encode(rant, JSON.stringify(obj))
					console.log(kcount);
					$.ajax({
						url:  './api/GetLogin',
						data: {t:rant,v:ranv,rane:'game/fbSingle'},
						dataType: 'json',
						timeout: 30000,
						async:true,
						success:function(data){
							ts += 1
							console.log(data);
							setTimeout(function() {
								sign = hex_md5(uid + token + ts.toString() + JSON.stringify({"score": 9100, "step": 445 }) + "472770f9e581cffb09349f422af57c5d")
								let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({"score": 9100, "step": 445 }), "sign": sign }
								let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
								let ranv = encode(rant, JSON.stringify(obj))
								$.ajax({
									url:  './api/GetLogin',
									data: {t:rant,v:ranv,rane:'game/fbPkVideo'},
									dataType: 'json',
									timeout: 30000,
									async:true,
									success:function(data){
										ts += 1
										kcount += 1
										data = JSON.parse(decode(data.t, data.v))
										console.log(data);
										if (data.errMsg) {
											let relog = $('.add-log').val()
											$('.add-log').val(relog + time + '：[当前金币]-' + data.money + ' | ' + "总共" + kcount.toString() + "轮获得: " + data.amoney + '金币' + '\n')
											getheight()
											timehandle(coins)
											return;
										}
										let relog = $('.add-log').val()
										$('.add-log').val(relog + time + '：[金币任务]-' + data.errMsg + '\n')
										ts += 1
										getheight()
										timehandle(coins)
									}
								})
							}, 15000);
						}
					})
				}, 190000);
			}
		})
	}
	
	//奖券兑换  一天200
	function ticketer(tickets){
		let date = new Date()
		let qddays = date.getDay()
		if (qddays == 0) {
			qddays = 7
		}
		sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ "gift": tickets }) + "472770f9e581cffb09349f422af57c5d")
		let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ "gift": tickets }), "sign": sign }
		let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
		let ranv = encode(rant , JSON.stringify(obj))
		$.ajax({
			url:  './api/GetLogin',
			data: {t:rant,v:ranv,rane:'game/exchangeGift'},
			dataType: 'json',
			timeout: 30000,
			async:true,
			success:function(data){
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					data = JSON.parse(decode(data.t, data.v))
					let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
					let relog = $('.add-log').val()
					if (!data.errMsg) {
						$('.add-log').val(relog + time + '：' + "兑换成功 |" + '剩余金币：' + data.money + ' |剩余奖券：' + data.gfc + '\n')
						layer.msg('兑换成功',{offset:'250px'})
						ts += 1
						getheight()
						return;
					}else{
						$('.add-log').val(relog + time+'：'+data.errMsg+'\n')
						layer.msg(data.errMsg,{offset:'250px'})
						ts += 1;
						getheight()
					}	
				}
			},
		})
	}
	
	//普通奖券抽奖
	function docom(){
		clearInterval(setnew)
		sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 't': 0, 'ios': false, 'video': false }) + "472770f9e581cffb09349f422af57c5d")
		let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 't': 0, 'ios': false, 'video': false }), "sign": sign }
		let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
		let ranv = encode(rant, JSON.stringify(obj))
		let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		console.log('1')
		$.ajax({
			url:  './api/GetLogin',
			data: {t:rant,v:ranv,rane:'game/lotteryStart'},
			dataType: 'json',
			timeout: 30000,
			async:true,
			success:function(data){
				console.log('2')
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					data = JSON.parse(decode(data.t, data.v))
					console.log(data)
					let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
					let relog = $('.add-log').val()
					if (!data.errMsg) {
						$('.add-log').val(relog + time + '：第' + (kcount + 1).toString() + "次 - [普通抽奖]" + getwid(data.id) + '\n')
						layer.msg('正在抽奖...中奖记录请拉到底部查看',{offset:'250px'})
						getheight()
						ts += 1
					}else if(data.errMsg == '奖券不足'){
						$('.add-log').val(relog + time + '：第' + (kcount + 1).toString() + "次 - [普通抽奖]" + data.errMsg + '\n')
						$('.add-log').val(relog + time + '：普通抽奖已停止（原因：奖券不足)' + '\n')
						return
					} else {
						$('.add-log').val(relog + time + '：第' + (kcount + 1).toString() + "次 - [普通抽奖]" + data.errMsg + '\n')
						getheight()
						ts += 1
					}
					setTimeout(function() {
						sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 'ios': false }) + "472770f9e581cffb09349f422af57c5d")
						let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 'ios': false }), "sign": sign }
						let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
						let ranv = encode(rant, JSON.stringify(obj))
						$.ajax({
							url:  './api/GetLogin',
							data: {t:rant,v:ranv,rane:'game/lotteryEnd'},
							dataType: 'json',
							timeout: 30000,
							async:true,
							success:function(data){
								console.log(data)
								ts += 1
								kcount += 1
								timehandle(docom)
							}
						})
					}, 4000);
				}
			},
		})
	}
	
	//超级奖券抽奖
	function dosuper(){
		clearInterval(setnew)
		sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 't': 1, 'ios': false, 'video': false }) + "472770f9e581cffb09349f422af57c5d")
		let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 't': 1, 'ios': false, 'video': false }), "sign": sign }
		let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
		let ranv = encode(rant, JSON.stringify(obj))
		let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		console.log('1')
		$.ajax({
			url:  './api/GetLogin',
			data: {t:rant,v:ranv,rane:'game/lotteryStart'},
			dataType: 'json',
			timeout: 30000,
			async:true,
			success:function(data){
				console.log('2')
				if(data.code == -1){
					layer.alert(data.msg);
				}else{
					data = JSON.parse(decode(data.t, data.v))
					console.log(data)
					let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
					let relog = $('.add-log').val()
					if (!data.errMsg) {
						$('.add-log').val(relog + time + '：第' + (kcount + 1).toString() + "次 - [超级抽奖]" + getwid(data.id) + '\n')
						layer.msg('正在抽奖...中奖记录请拉到底部查看',{offset:'250px'})
						getheight()
						ts += 1
					}else if(data.errMsg == '奖券不足'){
						$('.add-log').val(relog + time + '：第' + (kcount + 1).toString() + "次 - [超级抽奖]" + data.errMsg + '\n')
						$('.add-log').val(relog + time + '：超级抽奖已停止（原因：奖券不足)' + '\n')
						return
					} else {
						$('.add-log').val(relog + time + '：第' + (kcount + 1).toString() + "次 - [超级抽奖]" + data.errMsg + '\n')
						getheight()
						ts += 1
					}
					setTimeout(function() {
						sign = hex_md5(uid + token + ts.toString() + JSON.stringify({ 'ios': false }) + "472770f9e581cffb09349f422af57c5d")
						let obj = { "uid": uid, "ts": ts, "token": token, "params": JSON.stringify({ 'ios': false }), "sign": sign }
						let rant = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);
						let ranv = encode(rant, JSON.stringify(obj))
						$.ajax({
							url:  './api/GetLogin',
							data: {t:rant,v:ranv,rane:'game/lotteryEnd'},
							dataType: 'json',
							timeout: 30000,
							async:true,
							success:function(data){
								console.log(data)
								ts += 1
								kcount += 1
								timehandle(dosuper)
							}
						})
					}, 4000);
				}
			},
		})
	}
	
	var i = 1
	function getheight() {
		var obj = document.querySelector(".add-log");
		i++;
		obj.scrollTop = obj.scrollHeight;
	}
	
	function getwid(id) {
		if (id == "160") {
		  return "一年大会员"
		}
		if (id == "151") {
		  return "5成长值"
		}
		if (id == "157") {
		  return "1月豪华黄钻"
		}
		if (id == "153") {
		  return "200成长值"
		}
		if (id == "156") {
		  return "1年超级会员"
		}
		if (id == "159") {
		  return "1月大会员"
		}
		if (id == "154") {
		  return "1天超级会员"
		}
		if (id == "158") {
		  return "1年豪华黄钻"
		}
		if (id == "152") {
		  return "100成长值"
		}
		if (id == "155") {
		  return "3个月超级会员"
		}
		if (id == "") {
		  return '未中奖'
		}
		if (id == "101") {
		  return "未中奖"
		}
		if (id == "107") {
		  return "14天超级会员"
		}
		if (id == "103") {
		  return "10成长值"
		}
		if (id == "109") {
		  return "未中奖"
		}
		if (id == "104") {
		  return "20成长值"
		}
		if (id == "105") {
		  return "1天超级会员"
		}
		if (id == "110") {
		  return "未中奖"
		}
		if (id == "106") {
		  return "7天超级会员"
		}
		if (id == "102") {
		  return "5成长值"
		}
		if (id == "108") {
		  return "1个月超级会员"
		}
	}
	
	$('#qqlist').change(function () {
	    ticket = $(this).val()
	})
	
	$('.remove-uin').on('click', function () {
	    getuin.removeItem('qqlist')
		layer.msg('清空帐号成功');
		window.location.reload()
	})
	
	$('.go-login').on('click', function () {
	    window.location.reload()
	})
	
	$('.qie-uin').on('click', function () {
	    window.location.reload()
	})
	
	$('.do-coins').on('click', function () {
		xcount = Number($('input[name=coins]').val())
		if(!uid){
			layer.msg('请先登录',{offset:'250px'})
			return
		}else if(!xcount){
			layer.msg('请输入任务次数',{offset:'250px'})
			return
		}else{
			var rwtime = xcount*3
			layer.msg('任务提交成功预计需要'+rwtime+'分钟请勿关闭...',{offset:'250px'})
		}
	    kcount = 0
	    date = new Date()
	    coins()
	})
	
	$('.do-ticket').on('click',function(){
		let tickets = Number($('input[name=ticket]').val())
		if(!uid){
			layer.msg('请先登录',{offset:'250px'})
			return
		}else if(!tickets){
			layer.msg('请兑换数量',{offset:'250px'})
			return
		}else{
			ticketer(tickets);
		}
	})
	
	$('.do-com').on('click',function(){
		xcount = Number($('input[name=docom]').val())
		if(!uid){
			layer.msg('请先登录',{offset:'250px'})
			return
		}else if(!xcount){
			layer.msg('请输入抽奖次数',{offset:'250px'})
			return
		}else{
			layer.msg('正在抽奖请稍后...中奖记录请查看底部日志',{offset:'250px'})	
		}
		kcount = 0
		date = new Date()
		docom()
		
	})
	
	$('.do-super').on('click',function(){
		xcount = Number($('input[name=dosuper]').val())
		if(!uid){
			layer.msg('请先登录',{offset:'250px'})
			return
		}else if(!xcount){
			layer.msg('请输入抽奖次数',{offset:'250px'})
			return
		}else{
			layer.msg('正在抽奖请稍后...中奖记录请查看底部日志',{offset:'250px'})	
		}
		kcount = 0
		date = new Date()
		dosuper()
		
	})
})


