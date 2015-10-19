//helper functions
urlforid = function(id) {
  return "https://angelde98.github.io/posts/" + id + ".html";
};

//global stuff
var window_ = {elem: $(window)};

var navbar = {merged: true};
var main = {};
var posts = {};

//on scroll handler
window_.elem.scroll(function() {
  var scrollTop = window_.elem.scrollTop();
  
  if (scrollTop < posts.offset.top && !navbar.merged) {
    navbar.merged = true;
    navbar.elem.addClass("merged");
  }
  
  if (scrollTop >= posts.offset.top && navbar.merged) {
    navbar.merged = false;
    navbar.elem.removeClass("merged");
  }
});

//share modal
var share = {};

share.close = function() {
  share.elem.closeModal();
};

share.init = function() {
  $("#share-link")[0].addEventListener("click", function() {
    var tmp = $("<textarea style=\"position: fixed; top: 0; left: 0; opacity: 0;\"></textarea>");
    tmp[0].value = urlforid(share.id);
    $("body").append(tmp);
    try {
      tmp[0].select();
      document.execCommand("copy");
      share.close();
    } catch (e) {
      console.log(e);
    }
    tmp.remove();
  });
  
  $("#share-facebook").on("click", function() {
    window.open("https://www.facebook.com/sharer.php?u="+encodeURIComponent(urlforid(share.id)), "", "width=600, height=400");
    share.close();
  });
  
  $("#share-twitter").on("click", function() {
    window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(share.title)+"%20on%20%400x0ade%27s%20Website%3A%20&url="+encodeURIComponent(urlforid(share.id)), "", "width=600, height=400");
    share.close();
  });
  
  $("#share-gplus").on("click", function() {
    window.open("https://plus.google.com/share?url="+encodeURIComponent(urlforid(share.id)), "", "width=600, height=400");
    share.close();
  });
  
};

share.update = function() {
  $("#share-link").find(".link").text(urlforid(share.id));
};

share.it = function(id, title) {
  share.id = id;
  share.title = title;
  share.update();
  share.elem.openModal();
};

//search code
var searchResults = {visible: false, searched: false};

showSearch = function(permanent) {
  searchResults.searched = searchResults.searched || permanent;
  
  if (!searchResults.visible) {
    searchResults.elem.addClass("visible");
  }
  searchResults.visible = true;
};

hideSearch = function(auto) {
  if (auto && searchResults.searched) {
    return;
  }
  
  searchResults.searched = false;
  if (searchResults.visible) {
    searchResults.elem.removeClass("visible");
  }
  searchResults.visible = false;
};

initSearch = function(foo) {
  if (typeof foo == "undefined") {
    google.load("search", "1");
    google.setOnLoadCallback(function() {initSearch("bar");});
    return;
  }
  
  //init custom search
  var csc = new google.search.CustomSearchControl("005453329356042368377:l1eqyxm6l68");
  var draw = new google.search.DrawOptions();
  draw.setSearchFormRoot("search-form");
  csc.draw("search-results", draw);
  
  //remove initial hidden google branding
  $(".gsc-branding").remove();
  
  //wrap the search form correctly
  $("form.gsc-search-box").addClass("search-wrapper").addClass("input-field");
  
  //re-order elements
  var input = $("form.gsc-search-box input#gsc-i-id1");
  var clear = $("div.gsc-clear-button");
  input.detach().appendTo($("form.gsc-search-box"));
  clear.detach().appendTo($("form.gsc-search-box"));
  
  //fix individual elements
  input.attr("type", "search").attr("style", "").after($("<label for=\"gsc-i-id1\"><i class=\"material-icons\">search</i></label>"));
  clear.removeClass("gsc-clear-button").addClass("material-icons").text("close").css("height", "64px").css("line-height", "64px");
  
  //force-fix the input branding
  var events = [];
  for (var key in input[0]) {
    if (key.indexOf("on") == 0 && key != "onscroll") {
      events.push(key.slice(2));
    }
  }
  input.bind(events.join(" "), function() {
      input.attr("style", "");
  });
  
  //also do the same for the clear button
  events = [];
  for (var key in clear[0]) {
    if (key.indexOf("on") == 0 && key != "onscroll") {
      events.push(key.slice(2));
    }
  }
  clear.bind(events.join(" "), function() {
      input.attr("style", "");
  });
  
  //add listeners for showing / hiding search
  input.on("focusin click", function() {showSearch(false);});
  input.on("submit", function() {showSearch(true);});//doesn't work..? //TODO remove?
  input.keyup(function(e) {
    if (e.keyCode == 13) {
        showSearch(true);
    }
  });
  input.on("focusout", function() {hideSearch(true);});
  clear.on("click", function() {hideSearch(false);});
  
  //remove leftovers
  $("form.gsc-search-box table").remove();
};

//post code
initPost = function(post) {
  if (post.hasClass("initialized")) {
    return;
  }
  post.addClass("initialized");
  
  post.find(".btn-share").on("click", function() {
    share.it(parseInt(post.find(".id").text().substr(1)), post.find(".title").text());
  });
};

initPosts = function() {
  $(".post").each(function() {
    initPost($(this));
  });
};

//init code
$(document).ready(function() {
  $(".button-collapse").sideNav({
    menuWidth: 240,
    edge: "left"
  });
  
  navbar.elem = $("nav");
  main.elem = $("main");
  posts.elem = $("#posts");
  posts.offset = posts.elem.offset();
  share.elem = $("#share");
  searchResults.elem = $("#search-results");
  
  share.init();
  
  initPosts();
  initSearch();
  
  $(window).scroll();
});
