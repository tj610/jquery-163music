function setLeft(){

	// 左侧导航点击切换
	$('#leftArea dd').click(function(){
		leftNavChange(this);
	});

	function leftNavChange(ele){
		$(ele).addClass('active').siblings().removeClass('active').parent().siblings().find('dd').removeClass('active');
	}

	// 左侧折叠点击切换
	$('#leftArea dl').find('span').click(function(){
		if($(this).attr('class')=='open'){
			$(this).removeClass('open').addClass('close');
			$(this).parent().parent().find('dd').hide();
		}else if($(this).attr('class')=='close'){
			$(this).removeClass('close').addClass('open');
			$(this).parent().parent().find('dd').show();
		}
	});

	var listarr=[];	 
	// 左侧动态添加
    $('#leftArea dl').find('.add').click(function(){
    	// 收起时点击添加自动展开
		$('.close').removeClass('close').addClass('open');
    	$(this).parent().parent().find('dd').show();
        // 点击添加
    	$('.listname').show().find('input').focus().blur(function(){ 
			setList();
    	}).keydown(function(event){  
    		var event=event || window.event;
    		if(event.keyCode=="13"){
    			setList();
    		}
    	});
    });

    // 添加List
	function setList(){
		$('.listname').hide();
	    var val=$('.listname input').val(); 
		if($('.listname input').val()!=''){
			var str='<dd class="list"><a class="list" href="javascript:;">'+val+'</a><i class="delete"></i></dd>';
			$('.listname input').parent().before(str);
			$('.listname input').val('');
            // 将新增数据存入数组并写入cookie
	        if($.cookie('listname')){
		    	listarr=$.cookie('listname').split(',');
		    }
		    listarr.push(val);
		    $.cookie('listname',listarr.join(','),{expires:7});
			// 动态DOM绑定事件
			$('.list').on('click',function(){
				leftNavChange(this);
			});
			$('.delete').on('click',function(){
				// 从dom中删除
				$(this).parent().remove();      
		        if($.cookie('listname')){
			    	listarr=$.cookie('listname').split(',');
			    }
			    // 从cookie中删除
			    listarr.splice($.inArray($(this).parent().text(),listarr),1); 
			    $.cookie('listname',listarr.join(','),{expires:7});
			});
		}
	}

	// 删除动态数据
    $('dd.list .delete').click(function(){
		$(this).parent().remove();   
        if($.cookie('listname')){
	    	listarr=$.cookie('listname').split(',');
	    }
	    listarr.splice($.inArray($(this).parent().text(),listarr),1); 
	    $.cookie('listname',listarr.join(','),{expires:7});
    });

}