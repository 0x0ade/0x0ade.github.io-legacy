$(".appicon, .menuicon").click(function() {
  $(".dark").css("background-color", "rgba(0, 0, 0, 0.6)");
  $(".dark").css("pointer-events", "auto");
  $(".menu").css("left", "0");
});

$(".dark").click(function() {
  $(".dark").css("background-color", "rgba(0, 0, 0, 0)");
  $(".dark").css("pointer-events", "none");
  $(".menu").css("left", "-232px");
});
