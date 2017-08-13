# face overlay

First version is on JSBin, the [bas dost song from Rihanna](https://output.jsbin.com/tosotuy/latest/quiet).  
Current version [in github.io](https://josepedrodias.github.io/face-overlay/).

## how to adapt

1. Choose a video from YouTube. Write down it's id, width and height (`YTID`, `W`, `H`). Also choose the start and end times for your loop animation (`TS`, `TE`).
2. Look for pictures of the replacement face. images.google.com are very effective. Keep in mind the pose you're looking for.
3. Edit the replacement face in Photoshop/GIMP/etc - delete the surroundings. Save as PNG and write down width and height (scale down if too large first). `face.png`, `fw`, `fh`.
4. Edit `main.css`:
    * in the `img` rule, change `margin-left` and `margin-top` so they're minus half the face width and height.
    * edit/add new `.i<number>` classes so you can scale (and/or rotate) the face during the animatio.
4. Edit `index.html` to make it match the viewport width of the video and confirm the `face.png` exists.
5. Edit the costants above in `main.js`.
6. Reset `timeline.js` to an empty array. Uncomment `p.setPlaybackRate(0.25);` line in `main.js`.
7. Loop endlessly through the animation cricking in the center of the face when and where it should appear. Export the data with `console.log(JSON.stringify(o))` and place it in `timeline.js`.
8. Remove faulty keyframes (when you clicked for too long), elect keys where the face changes size, if any (each item in an array with width, height and optionally a class to be assigned).
9. Comment `p.setPlaybackRate(0.25);` line in `main.js`.
10. Publish :D

## reference

* <https://developers.google.com/youtube/iframe_api_reference>
