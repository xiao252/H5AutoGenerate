
;(function(root,factory){
    if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory;
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["weixinShare"] = factory;
	else
		root["weixinShare"] = factory;
})(this,function(){
     var apiBaseUrl = "http://wx.gajxsh.com/api/";
	 var localUrl = encodeURIComponent(window.location.href);
	 
	// 统计访问/分享次数
    function syncUpdateCount(title, desc, type) {
        $.getJSON(apiBaseUrl + "wechat_visit.php?t=1&callback=?", {
            "url": localUrl, "title": title ,"desc":desc, "type": type
        }, function (json) {
            //to do
            console.info(json);
            //if(json.visit_count){
            //    $(function(){
            //        $("#visit_count").html("<style>#visit_count{position:fixed; bottom:5px; right:5px; color:#FFF; text-align:right; font-family:Verdana, Geneva, sans-serif;}#visit_count .views{vertical-align:middle; margin-right:5px; margin-top: -9px; width: 28px; height: 17px; display: inline-block; background: url(apiBaseUrl+'/views.png') no-repeat left top; background-size: 100% 100%;}</style><span class='views'></span><i>"+json.visit_count+"</i>");
            //        $(".visit_count").html(json.visit_count);
            //    })
            //}
        });
    }
        
    $.weixinShare = function (options) {

        var defaults = {
            debug: true,
            title: "亲，忘记写标题了！",
            desc: "亲，忘记写内容了！",
            link: localUrl,
            imgUrl: "https://www.baidu.com/img/baidu_jgylogo3.gif",
            nocount: false,
            success: function () {
                syncUpdateCount(this.title,this.desc, "Share");
            },
            share_success:false,
            cancel: function () {
                // alert("用户取消分享!");
            }
        };


        // 参数合并
        var opts = $.extend(true, defaults, options);
        if(opts.nocount==true){

        }else{
            //访问
            syncUpdateCount(opts.title,opts.desc, "Visit");
            //console.log(opts.success);
        }
        

        // 分享
        $.getJSON(apiBaseUrl + "wechat_token.php?t=1&callback=?", {"url":
            encodeURIComponent(window.location.href)}, function (json) {
            if (json) {
                wx.config({
                    debug: opts.debug,
                    appId: json.appId,
                    timestamp: json.timestamp,
                    nonceStr: json.nonceStr,
                    signature: json.signature,
                    //jsApiList: new Array('onMenuShareTimeline', 'onMenuShareAppMessage','showMenuItems','hideMenuItems','hideAllNonBaseMenuItem','hideOptionMenu','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','openLocation','getLocation')
               		jsApiList: [
				        'checkJsApi',
				        'onMenuShareTimeline',
				        'onMenuShareAppMessage',
				        'onMenuShareQQ',
				        'onMenuShareWeibo',
				        'hideMenuItems',
				        'showMenuItems',
				        'hideAllNonBaseMenuItem',
				        'showAllNonBaseMenuItem',
				        'translateVoice',
				        'startRecord',
				        'stopRecord',
				        'onRecordEnd',
				        'playVoice',
				        'pauseVoice',
				        'stopVoice',
				        'uploadVoice',
				        'downloadVoice',
				        'chooseImage',
				        'previewImage',
				        'uploadImage',
				        'downloadImage',
				        'getNetworkType',
				        'openLocation',
				        'getLocation',
				        'hideOptionMenu',
				        'showOptionMenu',
				        'closeWindow',
				        'scanQRCode',
				        'chooseWXPay',
				        'openProductSpecificView',
				        'addCard',
				        'chooseCard',
				        'openCard'
				      ]
                });

                wx.ready(function () {
                    // 分享给朋友
                    
                    wx.onMenuShareAppMessage(opts);
                    // 分享到QQ
                    wx.onMenuShareQQ(opts);

                    // 分享到腾讯微博
                    wx.onMenuShareWeibo(opts);

                    // 分享到朋友圈                   
                    var optsx = $.extend({},opts);    
                    optsx.success = optsx.share_success||optsx.success;
                    wx.onMenuShareTimeline(optsx);
                    
                    
                });
            }
        });
    }
})