function setPage(){
    var arr=[];
    var iNow=11;

    page({
        id : 'pageBox',
        nowNum : 1,
        allNum : Math.ceil(listInfJson.length/12),
        callBack : function(now,all){
            
            var num=now*12 < listInfJson.length ? 12 : listInfJson.length-(now-1)*12;
            var oUl=$('.listInf ul');

            if(!oUl.html()){
                for(var i=0;i<num;i++){
                    var oLi='<li><a href="javascript:;"><img src="'+listInfJson[(now-1)*12+i].img+'"></a><span><i></i>'+listInfJson[(now-1)*12+i].hits+'<em></em></span><p>'+setLength(listInfJson[(now-1)*12+i].title)+'</p></li>';
                    oUl.append(oLi);
                }           
                $('.listInf ul li').each(function(){
                    arr.push([$(this).offset().left,$(this).offset().top]);
                });
                $('.listInf ul li').each(function(){
                    $(this).css({
                        'position':'absolute',
                        'left':arr[$(this).index()][0],
                        'top':arr[$(this).index()][1],
                        'margin':0
                    });
                });
            }else{
                var timer=setInterval(function(){
                    $('.listInf ul li').eq(iNow).animate({
                        'left': '710px',
                        'top': '900px',
                        'opacity':'0'
                    });
                    if(iNow==0){
                        clearInterval(timer);
                        iNow=num-1;
                        for(var i=0;i<num;i++){
                            $('.listInf ul li').eq(i).html('<a href="javascript:;"><img src="'+listInfJson[(now-1)*12+i].img+'"></a><span><i></i>'+listInfJson[(now-1)*12+i].hits+'<em></em></span><p>'+setLength(listInfJson[(now-1)*12+i].title)+'</p>');
                        } 
                        var timer2=setInterval(function(){
                            $('.listInf ul li').eq(iNow).animate({
                                'left': arr[iNow][0],
                                'top': arr[iNow][1],
                                'opacity':'1'
                            });
                            if(iNow==0){
                                clearInterval(timer2);
                                iNow=num-1;
                            }else{
                                iNow--;
                            }
                        },100);
                    }else{
                        iNow--;
                    }
                },100);
            };
            
        

        }
    });

}