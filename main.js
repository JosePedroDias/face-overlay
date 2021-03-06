"use strict";

var YTID = "fyaI4-5849w";
var W = 854 / 2;
var H = 480 / 2;
var TS = 30;
var TE = 50;

var b = document.querySelector("button");
var p;
function onYouTubeIframeAPIReady() {
  p = new YT.Player("yt_target", {
    width: W,
    height: H,
    videoId: YTID,
    playerVars: {
      controls: 0,
      showinfo: 0,
      rel: 0,
      fs: 0
    },
    events: {
      //onReady: onPlayerReady
    }
  });
}

b.addEventListener("click", function() {
  document.body.removeChild(b);
  onPlayerReady();
});

function onPlayerReady() {
  p.playVideo();
  p.seekTo(TS);
  var i = document.querySelector("img");
  setInterval(function() {
    var t0 = p.getCurrentTime() + 0.25; // a keyframe ahead of time
    t = (~~(t0 * 4) / 4).toFixed(2);
    if (t0 > TE) {
      p.seekTo(30);
    }
    var pos = o[t];
    if (pos) {
      i.style.left = pos[0] + "px";
      i.style.top = pos[1] + "px";
      if (pos[2]) {
        i.style.transform = "scale(" + pos[2] + ", " + pos[2] + ")";
      }
      i.style.opacity = 1;
    } else {
      i.style.opacity = 0;
    }
  }, 220);
}

var t, x, y;

var down = false;
var over = document.querySelector("#over");
over.style.width = W + "px";
over.style.height = H + "px";

function stop(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}
