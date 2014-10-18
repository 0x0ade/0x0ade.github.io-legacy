$(window).scroll(function(){
    if ($(this).width() < 820) {
      return;
    }
    if ($(this).scrollTop() > 116) {
      $("#toolbar").css("position", "fixed");
      $(".floatlink").css("position", "fixed");
      $(".floatlink").css("top", "100%");
      $(".floatlink").css("margin", "-72px 16px 4px 682px");
    } else {
      $("#toolbar").css("position", "relative");
      $(".floatlink").css("position", "absolute");
      $(".floatlink").css("top", "0");
      $(".floatlink").css("margin", "4px 0 0 682px");
    }
});
