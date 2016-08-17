// JavaScript Document
	$(function(){
		var timer01 = null;
		var num = 0;
		var timerFn = function(){
			num++;
			if(num > 2){
				num = 0;
			}
			$('.banner_big .banner li').eq(num).stop().hide().fadeIn().siblings().hide();
			$('.banner_big ol li').eq(num).addClass('current').siblings().removeClass('current');
		};
		$('.banner_big .banner li').eq(0).css('display','block');
		$('.banner_big ol li').mouseover(function(e) {
			num = $(this).index();
            $('.banner_big .banner li').eq($(this).index()).stop().hide().fadeIn().siblings().hide();
			$(this).addClass('current').siblings().removeClass('current');
			
			
        });
		timer01 = setInterval(timerFn,3000);
		$('.banner_big').hover(function(e) {
            clearInterval(timer01);
			timer01 = n.bannerl;
        },function(){
            clearInterval(timer01);
			timer01 = setInterval(timerFn,3000);
		});
		
		
	})
