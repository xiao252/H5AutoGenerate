<?php
function getRealIp(){
    $ip=false;
    if(!empty($_SERVER["HTTP_CLIENT_IP"])){
        $ip = $_SERVER["HTTP_CLIENT_IP"];
	}
	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
        if ($ip) { 
            array_unshift($ips, $ip); $ip = FALSE; 
        }
        for ($i = 0; $i < count($ips); $i++) {
            if (!preg_match("/^(10│172.16│192.168)./", $ips[$i])) {
                $ip = $ips[$i];
                break;
            }
        }
    }
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}
$name = $_POST['name'];
$tel = $_POST['tel'];
$city = $_POST['city'];
$date = $_POST['date'];
$pdo = new PDO("mysql:host=xxx:3306;dbname=xx","xx","xx");//创建一个pdo对象
$pdo->exec("set names 'utf8'");
$stmt = $pdo->prepare("select * from xx where tel=?");
$stmt->bindValue(1,$tel);
$stmt->execute();  //执行一条预处理语句 .成功时返回 TRUE, 失败时返回 FALSE
$rows = $stmt->fetchAll();
$row_count = $stmt->rowCount();
if($row_count>0){
	echo "{\"mun\":1}";
}else{
	$stmt = $pdo->prepare("insert into xx(name,tel,city,date)values(?,?,?,?)");
	$stmt->bindValue(1,addslashes($name));
	$stmt->bindValue(2,addslashes($tel));
	$stmt->bindValue(3,addslashes($city));
	$stmt->bindValue(4,addslashes($date));
	$stmt->execute();
	$count = $stmt->rowCount();//受影响行
	if($count>0){
		echo "{\"mun\":1}";
	}else{
		echo "{\"mun\":0}";
	}
}


$pdo = null;//关闭连接

?>