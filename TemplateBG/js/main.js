function fadeIn(JQel,callback){
	JQel.off('animationend');
	JQel.removeClass('fadeIn_jq--xg fadeOut_jq--xg').addClass('fadeIn_jq--xg').show();
	JQel.on('animationend',function(){
		JQel.removeClass('fadeIn_jq--xg');
		callback && callback();
	})
}
function fadeOut(JQel,callback){
	JQel.off('animationend');
	JQel.removeClass('fadeIn_jq--xg fadeOut_jq--xg').addClass('fadeOut_jq--xg');
	JQel.on('animationend',function(){
		JQel.removeClass('fadeOut_jq--xg').hide();
		callback && callback();
	})
}