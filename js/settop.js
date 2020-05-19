function setTop(){

    // 顶部导航点击切换
	$('.top-nav ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	// 搜索框下拉列表
	$('.top-search input').focus(function(){
		$('.top-search dl').show();
	}).blur(function(){	
	    $('.top-search dd').click(function(){
			$('.top-search input').val($(this).text());	
		});
	    setTimeout(function(){
	    	$('.top-search dl').hide();
	    },200);
	});

    // 登录下拉列表
	$('.top-login').hover(function(){
		$(this).siblings().find('.downarea').hide();
		$(this).find('ul').show();
		$(this).find('span').find('a').removeClass('down').addClass('up');
	},function(){
		$(this).find('ul').hide();
		$(this).find('span').find('a').removeClass('up').addClass('down');
	});

	$('.top-login a').click(function(){
		switch($(this).attr('class')){
			case 'quit':
				$.cookie('username','',{expires:-1});
				window.location.href=window.location.href;
				break;
			default:
				$('#maskArea').show();
				$('#login').show();	
				$('#username').focus();	
		}
		$(this).parent().parent().hide();
	});	

    // 登陆框拖拽
    drag('login');
    drag('share');

    // 登陆框关闭
    $('.dialogArea').find('i').click(function(){
		$('#maskArea,.dialogArea').hide();
		$('.dialogArea').css({
			'left':'50%',
			'top':'50%',
			'margin-left':-($(this).parent().width()/2)+'px',
			'margin-top':-($(this).parent().height()/2)+'px'
		});
    });



    // 消息框/皮肤框下拉列表
	$('.top-tool span').click(function(e){
		var e=e||window.event;
		e.stopPropagation();
		$(this).parent().siblings().find('.downarea').hide();
		if($(this).next().css('display')=='none'){
    		$(this).next().show();
		}else{
			$(this).next().hide();
		}
        // 点击关闭按钮隐藏下拉框
	    $('.top-tool i').click(function(){
	    	$(this).parent().hide();
		});
        // 点击其他区域隐藏下拉框
	    $(document).click(function(e){
			var e=e||window.event;
            if(!$(e.target).isChildAndSelfOf('.downarea')){
		     	$('.downarea').hide();
	        };
	    });
	});

    // 消息内容切换
    $('.mail li').click(function(){
    	var index=$(this).index();
    	var shows=$(this).parent().parent().find('div');
    	$(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
    	shows.eq(index).css('display','block').siblings('div').css('display','none');
    });

    // 皮肤点击
    $('.skin li').click(function(){
    	$(document).find('body').attr('id',$(this).attr('class'));
    	$(this).append('<em></em>').siblings().find('em').remove();
    	$.cookie('skin',$(this).attr('class'),{expires:7});
		setAlbum();
    });

}