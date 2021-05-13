<?php
header("Access-Control-Allow-Origin:*");
//header("Access-Control-Allow-Methods:GET,POST");
//header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Content-type: application/json; charset=utf-8');

$rane = $_REQUEST['rane'];//路径
$ranet = $_REQUEST['t'];//燃鹅t
$ranev = $_REQUEST['v'];//燃鹅v

if(!$rane || !$ranet || !$ranev){
	showJson(array(
		'code'	=>	-1,
		'msg'	=>	'参数不完整'
	));
}

$url = 'https://rane.jwetech.com:8080/'.$rane;
//提交t和v
$post = [
	't' => $ranet,
	'v' => $ranev
];

//设置请求头信息
$header = array(
	'referer: https://appservice.qq.com/1110797565/1.1.5/page-frame.html',
	'Content-Type: application/x-www-form-urlencoded',
	'User-Agent: Mozilla/5.0(Linux)AppleWebKit/537.36(KHTML;likeGecko)Version/4.0Chrome/86.0.4240.185MobileSafari/537.36QQ/8.5.5.5105V1_AND_SQ_8.5.5_1630_YYB_DQQ/MiniApp',
	'Accept-Encoding:gzip'
);

$data = get_curl($url,$post,$header);
echo $data;


function get_curl($url,$post=0,$cookie=0,$header=0,$nobaody=0,$split=0){
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