// JavaScript Document
$(function () {
    $('.head .logo').click(function (e) {
        $('.left_list').addClass('left_sport');
        $('.dian').addClass('dian_yi');
        $('.grayDiv').css('display', 'block');
        $('.grayDiv').addClass('.grauDivyi');
        $(window).scroll(function () {
            jQuery(window).scrollTop(0);
        });
    });

    $('.grayDiv').click(function (e) {
        $(this).css('display', 'none');
        $('.left_list').removeClass('left_sport');
        $('.dian').removeClass('dian_yi');
        $(window).unbind('scroll'); //ÒÆ³ýscroll·½·¨
    });

    $('.select_dian').click(function (e) {
        $('.sel_dian').toggleClass('sel_dianyi');
    });


    //var navH = $('.nav').offset().top;
    //$(window).scroll(function () {
    //    var scroH = $(this).scrollTop();
    //    if (scroH >= navH) {
    //        $('.nav').css({'position': 'fixed', 'top': '0', 'left': '0', 'z-index': '200'})
    //    } else if (scroH < navH) {
    //        $('.nav').css({'position': 'static', 'margin': ' 0 auto'});
    //    }
    //})
})
