"use strict";

var PI2 = Math.PI * 2;
var DEG2RAD = Math.PI / 180;

var urlTpl = `frames/{t}.png`;

function format(t) {
  return (~~(t * 4) / 4).toFixed(2);
}

var TS = 30;
var TE = 50;

var W = 854;
var H = 480;

var FW = 167;
var FH = 213;

var SCL = 0.5;

var x = W / 2;
var y = H / 2;
var t = TS;
var ts = format(t);

var scale = 0.5;
var rot = 0;

var imgEl = document.querySelector("img");
var canvasEl = document.querySelector("canvas");
var ctx = canvasEl.getContext("2d");

function updateCanvas() {
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "rgba(0, 0, 0, 0.66)";
  ctx.fillRect(0, 0, W, H);

  var oo = o[ts];
  console.log(oo);

  if (oo) {
    ctx.strokeStyle = "#F0F";
    ctx.beginPath();

    if (oo[0]) {
      x = oo[0] / SCL;
    }

    if (oo[1]) {
      y = oo[1] / SCL;
    }

    if (oo[2]) {
      scale = oo[2];
    }

    if (isFinite(oo[3])) {
      rot = oo[3];
    }

    // (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    ctx.ellipse(x, y, FW * scale, FH * scale, rot * DEG2RAD, 0, PI2);
    ctx.stroke();
  }
}

function onMouseDown(ev) {
  var oo = o[ts];
  var x = ~~(ev.clientX * SCL);
  var y = ~~(ev.clientY * SCL);

  if (oo) {
    oo[0] = x;
    oo[1] = y;
  } else {
    o[ts] = [x, y];
  }

  updateCanvas();
}

function onKeyDown(ev) {
  var k = ev.keyCode;
  //console.log(k);
  var inc = 0;
  var oo = o[ts];
  if (k === 39) {
    // right - next frame
    inc = 0.25;
  } else if (k === 37) {
    // left - prev frame
    inc = -0.25;
  } else if (k == 38) {
    // up - scale up
    scale += 0.1;
    if (!oo) {
      o[ts] = [x, y, scale];
    } else {
      oo[2] = scale;
    }
  } else if (k == 40) {
    // down - scale down
    scale -= 0.1;
    if (!oo) {
      o[ts] = [x, y, scale];
    } else {
      oo[2] = scale;
    }
  } else if (k == 88) {
    // x - delete keyframe
    delete o[ts];
  } else if (k == 65) {
    rot += 5;
    // a - rotate right
    if (!oo) {
      o[ts] = [x, y, scale, rot];
    } else {
      oo[3] = rot;
    }
  } else if (k == 90) {
    // z - rotate left
    rot -= 5;
    if (!oo) {
      o[ts] = [x, y, scale, rot];
    } else {
      oo[3] = rot;
    }
  }

  t += inc;
  if (t > TE) {
    t = TS;
  } else if (t < TS) {
    t = TE;
  }
  ts = format(t);

  var url = urlTpl.replace("{t}", ts);
  document.title = ts;
  imgEl.src = url;

  updateCanvas();
}

canvasEl.addEventListener("mousedown", onMouseDown);
window.addEventListener("keydown", onKeyDown);
onKeyDown({});
