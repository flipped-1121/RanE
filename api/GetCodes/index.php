<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST");
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Content-type: application/json; charset=utf-8');

$author = '落日QQ2734148069';
//获取登录code 输出登录链接
if($_GET['do'] == 'login' && $_GET['info'] == 'getqr'){
	$url = 'https://q.qq.com/ide/devtoolAuth/GetLoginCode';
	$data = get_curl($url);
	$data = json_decode($data,true);
	if(!$data['data']['code']){
		showJson(array(
			'code'	=>	-1,
			'msg'	=>	'接口异常',
			'author' => $author
		));
	}else{
		showJson(array(
			'code'	=>	$data['data']['code'],
			'msg'	=>	'success',
			'loginurl' => 'https://h5.qzone.qq.com/qqq/code/'.$data['data']['code'].'?_proxy=1&from=ide',
			'author' => $author
		));
	}
}
//查询登录状态 判断是否登录成功
if($_GET['do'] == 'login1' && $_GET['info'] == 'getqr'){
	if (isset($_GET['code']) || isset($_POST['code'])) {
		$code = isset($_REQUEST["code"]) ? $_REQUEST["code"] : "";
		$url = 'https://q.qq.com/ide/devtoolAuth/syncScanSateGetTicket?code='.$code;
		$data = get_curl($url);
		$data = json_decode($data,true);
		if(!$data['data']['uin']){
			showJson(array(
				'code'	=>	-1,
				'msg'	=>	'接口异常',
				'author' => $author
			));
		}else{
			$array = [];
			$array = array(
				'login' => $data['data']['ok'],
				'code' => $data['data']['code'],
				'ticket' => $data['data']['ticket'],
				'uin' => $data['data']['uin']
			);	
			showJson(array(
				'code'	=>	1,
				'data'	=>	$array,
				'author' => $author
			));
		}
	}else{
		showJson(array(
			'code'	=>	-1,
			'msg'	=>	"code不能为空",
			'author' => $author
		));
	}
}

//获取登录ticket
if($_GET['do'] == 'rane' && $_GET['info'] == 'ticket'){
	if (isset($_GET['ticket']) || isset($_POST['ticket'])) {
		$ticket = isset($_REQUEST["ticket"]) ? $_REQUEST["ticket"] : "";
		$url = 'https://q.qq.com/ide/login';
		$post = [
			'ticket' => $ticket,
			'appid' => '1110797565',
		];
		$header = array('Host: q.qq.com','Content-type: application/json','User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36');
		$data = get_curl($url,$post,$header);
		$data = json_decode($data,true);
		if($data['code'] == -13200){
			showJson(array(
				'code'	=>	-1,
				'msg'	=>	"ticket效验失败",
				'author' => $author
			));
		}else{
			showJson(array(
				'code'	=>	$data['code'],
				'msg'	=>	$data['message'],
				'author' => $author
			));
		}
	}else{
		showJson(array(
			'code'	=>	-1,
			'msg'	=>	"ticket不能为空",
			'author' => $author
		));
	}
}

function get_curl($url,$post=0,$referer=0,$cookie=0,$header=0,$ua=0,$nobaody=0,$split=0){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	if($post){
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
	}
	if($header){
		curl_setopt($ch, CURLOPT_HEADER, TRUE);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	}
	if($cookie){
		curl_setopt($ch, CURLOPT_COOKIE, $cookie);
	}
	if($referer){
		curl_setopt($ch, CURLOPT_REFERER, $referer);
	}
	if($ua){
		curl_setopt($ch, CURLOPT_USERAGENT,$ua);
	}else{
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Linux; Android 9; ONEPLUS A6010 Build/PKQ1.180716.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 V1_AND_SQ_8.1.5_1258_YYB_D QQ/8.1.5.4215 NetType/WIFI WebP/0.4.1 Pixel/1080 StatusBarHeight/81 SimpleUISwitch/0");
	}
	if($nobaody){
		curl_setopt($ch, CURLOPT_NOBODY,1);
	}
	curl_setopt($ch, CURLOPT_ENCODING, "gzip");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	$ret = curl_exec($ch);
	if ($split) {
		$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
		$header = substr($ret, 0, $headerSize);
		$body = substr($ret, $headerSize);
		$ret=array();
		$ret['header']=$header;
		$ret['body']=$body;
	}
	curl_close($ch);
	return $ret;
}

function showJson($array = []){
    header('Content-type: application/json;charset=utf8');
    exit(json_encode($array,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
}

?>