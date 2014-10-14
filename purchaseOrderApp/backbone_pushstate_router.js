//Source https://gist.github.com/wololodev/e9ed539527396b77f340

var backbonePushState = function (){
  
  // Only need this for pushState enabled browsers
  if (Backbone.history && Backbone.history._hasPushState) {
  var $document = $(window.document);
  var openLinkInTab = false;
 
  $document.keydown(function(e) {
    if (e.ctrlKey || e.keyCode === 91) {
      openLinkInTab = true;
    }
  });
 
  $document.keyup(function(e) {
    openLinkInTab = false;
  });
 
  $document.on("click", "a", function(e) {
    var $this = $(this);
    var href = $this.attr("href");
    var domain = $this.prop("hostname");
 
    // if the href is not equal to outpost.travel
    var isCSRF = domain !== window.document.location.hostname;
    var hasHashLink = href.indexOf("#") === -1;
 
    // if it's been indicated that we don't want to open in a new tab
    // and that the link is the same domain then preventDefault
    // protection againts internal #div links
    if (!openLinkInTab && !isCSRF && hasHashLink) {
      e.preventDefault();
      Backbone.history.navigate(href, true);
    }
  });
}};