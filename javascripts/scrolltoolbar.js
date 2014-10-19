var previousTop = $(window).scrollTop();
$(window).scroll(function() {
    if ($(this).width() < 820) {
      $(".headerimg").css("margin", ($(this).scrollTop() * 0.75 - 33)+"px 0 "+(-($(this).scrollTop() * 0.75) - 33)+"px 0");
      $(".header").css("background-color", "rgba(3, 169, 244, "+($(this).scrollTop() / $(".headerimg").outerHeight(true))+")");
      $(".header").css("box-shadow", "0px 2px 4px rgba(0, 0, 0, "+(0.4*($(this).scrollTop() / $(".headerimg").outerHeight(true)))+")");
      return;
    }
    
    var scrollTop = $(this).scrollTop();
    var scroll = scrollTop - previousTop;
    
    $(".header").css("top", -scrollTop / 4);
    $(".footer").css("bottom", -($(document).height() - ($(this).scrollTop() + $(this).height())) / 4);
    
    if (scroll > 0) {
      $("#toolbar").css("top", Math.max(parseInt($("#toolbar").css("top")), scrollTop-134 - $("#toolbar").outerHeight(true) - 16));
    }
    if (scroll < 0) {
      $("#toolbar").css("top", Math.max(0, Math.min(parseInt($("#toolbar").css("top")), scrollTop-134)));
    }
    
    if (scrollTop > 134) {
      if (parseInt($(".floatlink").css("top")) > scrollTop-134 + $(this).height()) {
        $(".floatlink").css("transition-property", "transform, -moz-box-shadow, -webkit-box-shadow, -o-box-shadow, box-shadow");
      }
      $(".floatlink").css("top", scrollTop-100 + $(this).height());
      $(".floatlink").css("margin", "0 16px 4px 682px");
    } else {
      $(".floatlink").css("transition-property", "transform, -moz-box-shadow, -webkit-box-shadow, -o-box-shadow, box-shadow, top, margin");
      $(".floatlink").css("top", "134px");
      $(".floatlink").css("margin", "4px 0 0 682px");
    }
    previousTop = scrollTop;
});

$(window).scroll();
