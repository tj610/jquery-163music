$(function(){

    getCookie();      // 获取cookie

    setVal();         // 设置高度

	$(window).resize(function(){    	
	    setVal();
	});    

    setTop();         // 顶部  

    setBot();         // 底部  

    setLeft();        // 左侧  

    setFocus();       // 焦点图 

    setPlayer();      // 播放器

    setPage();        // 分页
    


    checkLogin();          


        





});