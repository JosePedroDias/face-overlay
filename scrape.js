"use strict";

var YTID = "fyaI4-5849w";
var W = 854 / 2;
var H = 480 / 2;
var TS = 30;
var TE = 50;
var PLAYBACK_RATE = 0.25;

var h = location.hash;
if (h) {
  h = h.substring(1);
  // YTID / W / H / TS / TE / PLAYBACK_RATE;
  var parts = h.split("/");
  YTID = parts.shift();
  W = ~~parts.shift();
  H = ~~parts.shift();
  TS = ~~parts.shift();
  TE = ~~parts.shift();
  PLAYBACK_RATE = parseFloat(parts.shift());
}

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
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady() {
  //console.log( p.getAvailablePlaybackRates() );
  p.setPlaybackRate(PLAYBACK_RATE);
  p.playVideo();
  p.seekTo(TS);
  setInterval(function() {
    var t0 = p.getCurrentTime();
    var t = (~~(t0 * 4) / 4).toFixed(2);
    if (t0 > TE) {
      p.seekTo(30);
    }
    document.title = t;
  }, PLAYBACK_RATE * 1000 * 0.8);
}
