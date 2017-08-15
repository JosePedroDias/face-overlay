"use strict";

const Nightmare = require("nightmare");
const n = Nightmare({ show: true });

const YTID = "fyaI4-5849w";
const W = 854 / 2;
const H = 480 / 2;
const TS = 30;
const TE = 50;
const PLAYBACK_RATE = 0.25;
const numFrames = (TE - TS) / PLAYBACK_RATE;

const DIR = "frames";

const existing = {};

function oops(err) {
  console.error(err);
}

n
  .goto(
    `http://127.0.0.1:6677/scrape.html#${YTID}/${W}/${H}/${TS}/${TE}/${PLAYBACK_RATE}`
  )
  .catch(oops);

function step() {
  n
    .title()
    .then(function(t) {
      //console.log("[%s]", t);
      if (!t || t < TS || t > TE || existing[t]) {
        return;
      }

      const l = Object.keys(existing).length;
      console.log(
        "t:%s, existing:%s, all:%s, (%s %)",
        t,
        l,
        numFrames,
        (l / numFrames * 100).toFixed(1)
      );

      existing[t] = true;

      n
        .screenshot(`${DIR}/${t}.png`, { x: 0, y: 0, width: W, height: H })
        .then(function() {
          console.log("SAVED %s!", t);
        })
        .catch(oops);
    })
    .catch(oops);
}

const ms = ~~(PLAYBACK_RATE * 800);

console.log("running every %s ms...", ms);

setInterval(step, ms);
