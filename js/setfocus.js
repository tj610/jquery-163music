function setFocus(){

    var picArr=[];
    var bBtn=true;
    $('#focusAds ul.pic li').each(function(){
        picArr.push([ $(this).offset().left-$(this).parent().offset().left,$(this).offset().top-$(this).parent().offset().top,$(this).css('z-index'),$(this).find('img').css('opacity'),$(this).find('img').css('width'),$(this).find('img').css('height') ]);
        
        $('#focusAds ul.btn').append('<li></li>');
        $('#focusAds ul.btn').css('width',$('#focusAds ul.btn li').length*23+'px');

        if($(this).css('z-index')==98){
            $('#focusAds ul.btn li').eq($(this).index()).addClass('active');
        };
    });

    $('#focusAds a.next').click(function(){
        clearInterval(picTimer);
        picArr.unshift(picArr[picArr.length-1]);
        picArr.pop();
        picMove();
    });

    $('#focusAds a.prev').click(function(){
        clearInterval(picTimer);
        picArr.push(picArr[0]);
        picArr.shift();
        picMove();
    });

    var picTimer=setInterval(function(){
        picArr.unshift(picArr[picArr.length-1]);
        picArr.pop();
        picMove();
    },4000);

    $('#focusAds').hover(function(){
        clearInterval(picTimer);
    },function(){
        picTimer=setInterval(function(){
            picArr.unshift(picArr[picArr.length-1]);
            picArr.pop();
            picMove();
        },4000);
    });

    function picMove(){
        if(bBtn){
            bBtn=false;
            $('#focusAds ul.pic li').each(function(){
                $(this).animate({
                    'width':picArr[$(this).index()][4],
                    'height':picArr[$(this).index()][5],
                    'z-index':picArr[$(this).index()][2],
                    'left':picArr[$(this).index()][0],
                    'top':picArr[$(this).index()][1]
                },400,function(){
                    if($(this).css('z-index')=='98'){
                        $('#focusAds ul.btn li').eq($(this).index()).addClass('active').siblings().removeClass('active');
                    };
                });

                $(this).find('img').animate({
                    'opacity':picArr[$(this).index()][3],
                    'width':picArr[$(this).index()][4],
                    'height':picArr[$(this).index()][5]                 
                },400,function(){
                    bBtn=true;
                });
            });
        }
    }

    
}