$(".post").find("img").click(function() {
  $(".hover").empty();
  
  $(".hover").append("<img src=\""+$(this).attr("src")+"\" alt=\""+$(this).attr("alt")+"\">");
  var imgwidth = $(".hover").find("img").outerWidth(true);
  var imgheight = $(".hover").find("img").outerHeight(true);
  var imgratio = imgwidth / imgheight;
  
  if (imgwidth > $(window).width() - 192) {
    imgwidth = $(window).width() - 192;
    imgheight = imgwidth / imgratio;
  }
  if (imgheight > $(window).height() - 192) {
    imgheight = $(window).height() - 192;
    imgwidth = imgheight * imgratio;
  }
  
  $(".hover").find("img").css("width", imgwidth);
  $(".hover").find("img").css("height", imgheight);
  
  $(".hover").append("<br>");
  $(".hover").append("<p>"+$(this).attr("alt")+"</p>");
  $(".hover").find("p").css("text-align", "center");
  
  $(".hover").css("text-align", "center");
  $(".hover").css("left", $(window).width()/2 - $(".hover").outerWidth(true)/2);
  $(".hover").css("top", $(window).height()/2 - $(".hover").outerHeight(true)/2);
  
  $(".dark").css("background-color", "rgba(0, 0, 0, 0.6)");
  $(".dark").css("pointer-events", "auto");
  $(".hover").css("opacity", "1");
  $(".hover").css("pointer-events", "auto");
});

$(".dark").click(function() {
  $(".dark").css("background-color", "rgba(0, 0, 0, 0)");
  $(".dark").css("pointer-events", "none");
  $(".hover").css("opacity", "0");
  $(".hover").css("pointer-events", "none");
});
