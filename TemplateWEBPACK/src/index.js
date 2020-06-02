import "../public/css/main.css"
import "../public/css/Slide.css"
import "../public/css/weui.min.css"

import wx from  '../public/js/jweixin-1.6.0'
import weixinShare from  '../public/js/share.js'
import "../public/js/Slide.js"
import weui from  "../public/js/weui.min.js"
import screen from "../public/js/screen.js"

import bgm from '../public/media/music.mp3'

window.wx = wx;
weixinShare();

$('#music').attr('src',bgm);

screen({
	width:750,
	height:1500,
	isAuto:true,
	dom:'.page-wrap',
	bgColor:'#fefaee'
});
var slide = new Slide({
    touchObj:".page-wrap",
    speed: 0.7,
    direction: 'vertical',
    effect: 'flip',
    loop: false,
    pageId: 1,
    allowTouch: true,
    distance: 150,
    musicSrc:bgm,
    isMusicData:false,
});
slide.addEventListener('loaded',function () {
    $('body').addClass('loaded');
})
slide.addEventListener('animationStart',function () {

})
slide.addEventListener('animationEnded',function () {
    if(slide.pageId==slide.pageNum)
    {
        $('#next').hide();
    }else {
        $('#next').show();
    }
})

document.addEventListener("touchmove",function(event){
    event.preventDefault();
},{passive:false});

document.addEventListener("WeixinJSBridgeReady", function () {
    slide.musicPlay();
}, false);

// //微信分享
//     $.weixinShare({
//         debug: false,
//         title: "title",
//         desc: "vice_title",
//         link: "http://54lions.com/H5/xxxxxx/xxxxxx/index.html",
//         imgUrl: "http://54lions.com/H5/xxxxxx/xxxxxx/images/ics.png"
//     });
//     $('title').html('title');
// 	wx.ready(function() {
// 		//wx.hideAllNonBaseMenuItem();
// 		wx.hideMenuItems({
// 			menuList: ["menuItem:copyUrl"]
// 		});
// 	});

$("#btn").on("touchend",function(){
    insert();
})
$(document).keyup(function(event){
    if(event.keyCode ==13){
        insert();
    }
});
var checktime = null;
function insert(){
    clearTimeout(checktime);
    checktime = setTimeout(function(){
        var data = {
            name:$('#name').val(),
            tel : $('#tel').val(),
            uduilian : $('#Ucouplets').val()||'未填写',
            mduilian : getDulianText(duilian),
            date : $('#beginTime div').html()
        }
        if(!(/^[\u4e00-\u9fa5]{2,5}$/.test(data.name))){
            weui.topTips("姓名格式有误!");
            return;
        }
        if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(data.tel))){
            weui.topTips("手机号有误!");
            return;
        }
        if(/[.'"-]/g.test(data.uduilian)){
            weui.topTips("文字不能包含敏感字符！");
            return;
        }
        if(data.date.length == 0){
            weui.topTips("请选择日期");
            return;
        }
        var loading = weui.loading('提交中...');
        $.post("/request/insert.php",data,function(data){
            if(data.mun == 1){
                weui.toast("提交成功!",2000);
            }else{
                weui.topTips("服务繁忙，请稍后重试...");
            }
            loading.hide();
        },"json")
    },300);
}