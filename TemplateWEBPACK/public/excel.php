<?php
    $pdo = new PDO("mysql:host=47.112.17.149:3306;dbname=h5","root","gcs20170309");//创建一个pdo对象
    $pdo->exec("set names 'utf8'");

    $filename = "绿地|爱心巴士乘坐报名表";
    $title = array("编号","姓名","手机号","城市","乘车日期","提交时间");
    $emm = $pdo->prepare("select * from lvdi_20190117");
    $emm->execute();  //执行一条预处理语句 .成功时返回 TRUE, 失败时返回 FALSE
    $data = $emm->fetchAll(PDO::FETCH_ASSOC);
    //var_dump($data)
    header("Content-type:application/octet-stream");
    header("Accept-Ranges:bytes");
    header("Content-type:application/vnd.ms-excel");
    header("Content-Disposition:attachment;filename=" . $filename . ".xls");
    header("Pragma: no-cache");
    header("Expires: 0");

    //导出xls 开始
    if (!empty($title)) {
        foreach ($title as $k => $v) {
            $title[$k] = iconv("UTF-8", "GBK", $v);
        }
        $title = implode("\t", $title);
        echo "$title\n";
    }
    if (!empty($data)) {
        foreach ($data as $key => $val) {
            foreach ($val as $ck => $cv) {
                if($ck=='nickname'){
                    $data[$key][$ck] =  mb_convert_encoding(base64_decode(stripslashes($cv)),"GBK");
                }else{
                    $data[$key][$ck] =  mb_convert_encoding(stripslashes($cv),"GBK");
                }
            }
            $data[$key] = implode("\t", $data[$key]);
        }
        echo implode("\n", $data);
    }
?>