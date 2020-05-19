function setPlayer(){
    
    var myAudio=$('#myAudio')[0];
    myAudio.volume=0.2; 

    $('.player a').click(function(e){
		var e=e||window.event;
		e.stopPropagation();
	    switch($(this).attr('class')){
	    	case 'play':
		    	play();
                break;
            case 'pause':
		    	pause();
		    	break;
            case 'next':
                next();
                break;
            case 'prev':
                prev();
                break;
		    case 'volume':
		        volume();		    
			    break;
		    case 'volno':
		        volume();		    
			    break;
		    case 'loop':
		        shuffe();	
                $.cookie('loop',$(this).attr('class'),{expires:7});	    
			    break;
		    case 'shuffe':
		        one();		
                $.cookie('loop',$(this).attr('class'),{expires:7});      
			    break;	
		    case 'one':
		        loop();	
                $.cookie('loop',$(this).attr('class'),{expires:7});       
			    break;
            case 'like':
                if($.cookie('username')){}else{                        
                    $('#maskArea,#login').show(); 
                    $('#username').focus(); 
                }
                break;
            case 'share':
                if($.cookie('username')){   
                    $('#maskArea,#share').show();                     
                }else{                        
                    $('#maskArea,#login').show(); 
                    $('#username').focus(); 
                }
                break;			
	    };

	    $(document).click(function(e){
			var e=e||window.event;
            if(!$(e.target).isChildAndSelfOf('.volbar')){
		     	$('.volbar').hide();
	        };
	    });    

    });

    // 点击音量进度条
    $('.player .volbg').click(function(e){
    	var e=e||window.event;
    	var disY=-(e.clientY-$(this).offset().top-93);
    	var cpercent=(disY / $(this).height()*93);

    	myAudio.volume=(disY / $(this).height()).toFixed(1) < 0 ? 0 : (disY / $(this).height()).toFixed(1);
    	$('.player .volcur').css('height',cpercent+'px');
    });

    // 拖拽音量进度条
    $('.player .volcur span').mousedown(function(){
    	var areaY=$('.player .volbg').offset().top;
        
        $(document).mousemove(function(e){
        	var e=e||window.event;
        	var t=-(e.clientY-areaY-93);
            if(t>93) t=93;
            if(t<0){
	            t=0;
	            $('.player .ctrl a.volume').removeClass('volume').addClass('volno');
            }else if(t>0){
	            $('.player .ctrl a.volno').removeClass('volno').addClass('volume');            	
            }
        	$('.player .volcur').css('height',t+'px');
        });

    	$(document).mouseup(function(){
    		$(document).unbind('mousemove');
    		$(document).unbind('mouseup');
    	});
    });

    // 点击播放进度条
    $('.player .barbg').click(function(e){
    	var e=e || window.event;
		var disX=e.clientX-$(this).offset().left;
		var cpercent=(disX / $(this).width()*455).toFixed(2);

		myAudio.currentTime=(disX / $(this).width()*myAudio.duration).toFixed(2);
		$('.player .barbg .current').css('width',cpercent+'px'); 

		play();

    }); 
    
    // 拖拽播放进度条
    $('.player .current span').mousedown(function(){
    	var areaX=$('.player .barbg').offset().left;

    	$(document).mousemove(function(e){
    		var e=e || window.event;
    		var l=e.clientX-areaX;
            if(l>455) l=455;
            if(l<0) l=0;
    		$('.player .current').css('width',l+'px');
    	});

    	$(document).mouseup(function(){
    		$(document).unbind('mousemove');
    		$(document).unbind('mouseup');
    	});
    });

    var num=Math.floor(Math.random()*musicJson.length);
    myAudio.src=musicJson[num].src;

    // 播放
    function play(){         
        myAudio.play();

        $('.player .words .title').html(musicJson[num].title);
        $('.player .words span a').html(musicJson[num].singer);
        $('.player .album img').attr('src',musicJson[num].album);

    	$('.player a.play').removeClass('play').addClass('pause');
        $('.player .time span').html(setTime(myAudio.duration));   //获取总时长
        
        myAudio.ondurationchange=function(){          
            $('.player .time span').html(setTime(myAudio.duration));   //重新获取时长
        }

        var playTimer=setInterval(function(){        	
        	$('.player .time em').html(setTime(myAudio.currentTime));                        // 当前播放时间
		    var timeRanges = myAudio.buffered;                                               // 获取已缓冲部分的 TimeRanges 对象
		    var timeBuffered = timeRanges.end(timeRanges.length - 1);                        // 获取已缓存的时间
		    var bufferPercent = (timeBuffered / myAudio.duration).toFixed(2)*100;            // 获取缓存进度
		    var currentPercent = (myAudio.currentTime / myAudio.duration * 455).toFixed(2);  // 获取当前进度
            $('.player .barbg .ready').css('width',bufferPercent+'%');
            $('.player .barbg .current').css('width',currentPercent+'px'); 

            if(myAudio.ended){
                clearInterval(playTimer);
                switch( $('.player .ctrl a').eq(1).attr('class') ){
                    case 'loop':                         
                        num= num>=musicJson.length-1 ? 0 : num+1;
                        myAudio.src=musicJson[num].src;
                        play();                                 
                        break;
                    case 'shuffe':
                        num=Math.floor(Math.random()*musicJson.length);
                        myAudio.src=musicJson[num].src;
                        play();
                        break;  
                    case 'one':
                        play();
                        break;  
                };
            };
        },500);    	

	}
    
    // 暂停
    function pause(){
    	myAudio.pause();
    	$('.player a.pause').removeClass('pause').addClass('play');    	
    }

    // 下一首
    function next(){
        if(num>=musicJson.length-1){
            num=0;
        }else{
            num++;
        }  
        myAudio.src=musicJson[num].src;  
        play();
    }

    // 上一首
    function prev(){
        if(num<=0){
            num=musicJson.length-1;
        }else{
            num--;
        } 
        myAudio.src=musicJson[num].src;  
        play();
    }

    // 音量
    function volume(){
    	$('.player .volbar').css('display')=='none' ? $('.player .volbar').show() : $('.player .volbar').hide();
    	$('.player .volcur').css('height',0.2*93+'px');
    }

    // 循环
    function loop(){        
        $('.player a.one').removeClass('one').addClass('loop');  
        $('.player .modetips').show().html('循环');
    }

    // 随机
    function shuffe(){    
    	$('.player a.loop').removeClass('loop').addClass('shuffe').mouseout(function(){
    		$('.player .modetips').hide();
    	});
    	$('.player .modetips').show().html('随机');
    } 

    // 单曲循环
    function one(){    	
    	$('.player a.shuffe').removeClass('shuffe').addClass('one'); 
    	$('.player .modetips').show().html('单曲循环');
    }     
    
    // 格式化时间
    function setTime(seconds){
    	var min=Math.floor(seconds/60)>=10 ? Math.floor(seconds/60) : '0'+Math.floor(seconds/60);
    	var sec=Math.floor(seconds%60)>=10 ? Math.floor(seconds%60) : '0'+Math.floor(seconds%60);
    	return min+':'+sec;
    }


    // 歌单列表
    $('.player .list').html(musicJson.length);

}