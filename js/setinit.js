
// 设置内容区域高度
function setVal(){
    $('#containerArea').css('height',$(document).height()-75+'px');
    $('.top-tool .mail').css('height',$(document).height()-71+'px');   
}


//判断当前元素是否是被筛选元素的子元素或者本身 
jQuery.fn.isChildAndSelfOf = function(b){ 
	return (this.closest(b).length > 0); 
}; 


// 设置字符长度
function setLength(str){       
    var m=str.length;
    if( m>10 ){
        var n=str.substring(10,m);
        if(n.length==1){
            return str;
        };
        return str.replace(n,'...');
    }else{
        return str;
    }   
}


// 获取cookie数据
function getCookie(){	
	// 底部开关
	if($.cookie('on')){
		clearInterval(BotTimer);  
    	$('.botlock a').addClass($.cookie('on'));
    };
    // 左侧歌单
    if($.cookie('listname')){
    	var data=$.cookie('listname').split(',');
    	for(var i=0;i<data.length;i++){
    		var str='<dd class="list"><a class="list" href="javascript:;">'+data[i]+'</a><i class="delete"></i></dd>';
			$('.listname input').parent().before(str);
    	};		
    }
    // 顶部皮肤
    if($.cookie('skin')){
        $(document).find('body').attr('id',$.cookie('skin'));
    	$('li.'+$.cookie('skin')).append('<em></em>');        
        setAlbum();
    }else{
        $(document).find('body').attr('id','coolBlack');
        $('li.coolBlack').append('<em></em>');
        
    }
    // 播放器循环
    if($.cookie('loop')){
    	$('.player .ctrl a').eq(1).removeClass().addClass($.cookie('loop'));
    }
    // 用户登录信息
    if($.cookie('username')){
        $('.top-login span a').html($.cookie('username').toUpperCase());
        $('.top-login ul').html('<li><a class="quit" href="javascript:;">退出</a></li>');
    }
}



// 设置默认封面
function setAlbum(){
    switch($(document).find('body').attr('id')){
        case 'coolBlack':
            $('.player .album img').attr('src','images/default_album.jpg');
            break;
        case 'officialRed':
            $('.player .album img').attr('src','images/default_album_red.jpg');
            break;
        case 'lovelyPink':
            $('.player .album img').attr('src','images/default_album_pink.jpg');
            break;
        default:
            $('.player .album img').attr('src','images/default_album_red.jpg');
            break;
    };
}


// 登陆验证
function checkLogin(){
    $('#loginForm').submit(function(){
        var username=$.trim($('#username').val());
        var password=$.trim($('#password').val());
        var userA = username == "litangjun" && password =="123456";   //模拟服务器
        var userB = username == "huaerkuwei" && password =="123456";
        var isAdmin = userA || userB;

        if(username=='' || password==''){  
            alert("请确认是否有空缺项！");  
            return false;
        }
        if(username.length<6 || username.length>20){
            alert("用户名长度应在6到20个字符之间！");  
            return false;
        }
        if(password.length<6 || password.length>20){
            alert("密码长度应在6到20个字符之间！");  
            return false;
        }
        if(username==password){  
            alert("密码不能和用户名相同！"); 
            return false;
        }
        if(isAdmin){
            alert("登陆成功！");
            $.cookie('username',username,{expires:7});
            return true;
        }else{
            alert("用户名或密码错误！");
            return false;
        }
    });
};