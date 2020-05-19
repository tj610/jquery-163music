function drag(ele){
	var element=document.getElementById(ele);
	
	var disX=0;
	var disY=0;

	var prevX=0;
	var prevY=0;
	var ispeedX=0;
	var ispeedY=0;
	var timer=null;
	var arr=[];
	var num=0;
	
	element.getElementsByTagName('span')[0].onmousedown=function(ev){
		var ev=ev||window.event;
		
		disX=ev.clientX-element.offsetLeft;
		disY=ev.clientY-element.offsetTop;
		
		document.onmousemove=function(ev){
			var ev=ev||window.event;
			var l=ev.clientX-disX;
			var t=ev.clientY-disY;


            ispeedX=ev.clientX-prevX;
            ispeedY=ev.clientY-prevY;

            prevX=ev.clientX;
            prevY=ev.clientY;
           
            clearInterval(timer);
			
			if(l<0){
				l=0;
			}else if(l>document.documentElement.clientWidth-element.offsetWidth){
				l=document.documentElement.clientWidth-element.offsetWidth;
			}
			
			if(t<0){
				t=0;
			}else if(t>document.documentElement.clientHeight-element.offsetHeight){
				t=document.documentElement.clientHeight-element.offsetHeight;
			}
			
			element.style.left=l+'px';
			element.style.top=t+'px';
			element.style.marginLeft=0;
			element.style.marginTop=0;
		};
		
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			startMove();
		};

		return false;
	};

	function startMove(){
		clearInterval(timer);
		timer=setInterval(function(){

            ispeedY+=5;

			var L=element.offsetLeft+ispeedX;
			var T=element.offsetTop+ispeedY;

			if(L<0){
				L=0;
				ispeedX*=-1;
				ispeedX*=0.8;
			}else if(L>document.documentElement.clientWidth-element.offsetWidth){
				L=document.documentElement.clientWidth-element.offsetWidth;
				ispeedX*=-1;
				ispeedX*=0.8;
			}
			
			if(T<0){
				T=0;
				ispeedY*=-1;
				ispeedY*=0.8;
			}else if(T>document.documentElement.clientHeight-element.offsetHeight){
				T=document.documentElement.clientHeight-element.offsetHeight;
				ispeedY*=-1;
				ispeedY*=0.8;
				ispeedX*=0.8;

			}

			element.style.left=L+'px';
			element.style.top=T+'px';
			element.style.marginLeft=0;
			element.style.marginTop=0;

			$('.dialogArea').find('i').click(function(){
				clearInterval(timer);
			});

		},30);

	}
}