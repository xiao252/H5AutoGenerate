/**
 * 自适应
 * @param {*} width 750 设计稿宽
 * @param {*} height 1334 设计稿高
 * @param {*} dom '.page-wrap' 盒子总容器
 * @param {*} type 'w','h' 指定适配方式
 * @param {*} isAuto false 自动匹配
 */
;(function(root,factory){
    if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory;
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["screen"] = factory;
	else
		root["screen"] = factory;
})(this,function(obj){
    var pageWi = obj.width || 750;
	var pageWh = obj.height || 1334;
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
	var mathH =viewWidth/pageWi*pageWh;
    var mathW = viewHeight/pageWh*pageWi;
    var mathDom = obj.dom || '.page-wrap';
    var mathType = obj.type||'w';
    var mathIsAtuto = obj.isAuto || false;
    var mathBgColor = obj.bgColor || '#000';
    if(mathIsAtuto){
        $('body').css({'background':mathBgColor});
        if(viewHeight/viewWidth>=pageWh/pageWi){
            $(mathDom).css({width:viewWidth+'px',height:mathH+'px',top:((viewHeight-mathH)/2)+'px',position: 'fixed',overflow: 'hidden'})//w
        }else{
            $(mathDom).css({width:mathW+'px',height:viewHeight+'px',left:(viewWidth-mathW)/2+'px',position: 'fixed',overflow: 'hidden'})//h
        }
    }else{
        if(mathType=='w'){
            $(mathDom).css({width:viewWidth+'px',height:mathH+'px',top:((viewHeight-mathH)/2)+'px',position: 'fixed',overflow: 'hidden'})//w
        }else{
            $(mathDom).css({width:mathW+'px',height:viewHeight+'px',left:(viewWidth-mathW)/2+'px',position: 'fixed',overflow: 'hidden'})//h
        }
    }
    function $(domstr){
        var node = document.querySelector(domstr);
        return {
            css:function(obj){
                for(var key in obj){
                    node.style.cssText+=key+':'+obj[key]+';';
                }
            }
        }
    }
})
