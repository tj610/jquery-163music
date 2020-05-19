// 初始化2秒后收起
var BotTimer=setInterval(function(){
	$('#footerArea').animate({'bottom':'-46px'},500);
},2000);

function setBot(){

    // 点击切换锁定按钮
	$('.botlock a').click(function(){
		$(this).toggleClass('lock');
		if($(this).attr('class')=='lock'){
			// 当锁定时设置cookie
			$.cookie('on',$('.botlock a').attr('class'),{expires:7});
		}else{
			// 当解锁时删除cookie
			$.cookie('on','',{expires:-1});
		}
	});	

    // 鼠标经过时底部收起/展开效果
	$('#footerArea').hover(function(){    
		clearInterval(BotTimer);    
		$(this).animate({'bottom':'0'},500);   
	},function(){   
	    if($('.botlock a').attr('class')=='lock'){
	    	$(this).animate({'bottom':'0'},500);  
	    }else{
			BotTimer=setInterval(function(){
				$('#footerArea').animate({'bottom':'-46px'},500);
			},2000);
		}
	});

}