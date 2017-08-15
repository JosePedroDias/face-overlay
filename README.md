# face overlay

First version is on JSBin, the [bas dost song from Rihanna](https://output.jsbin.com/tosotuy/latest/quiet).  
Current version [in github.io](https://josepedrodias.github.io/face-overlay/).

## how to adapt

1. Choose a video from YouTube. Write down it's id, width and height (`YTID`, `W`, `H`). Also choose the start and end times for your loop animation (`TS`, `TE`).
2. Look for pictures of the replacement face. <https://images.google.com> are very effective. Keep in mind the pose you're looking for.
3. Edit the replacement face in Photoshop/GIMP/etc - delete the surroundings. Save as PNG and write down width and height (scale down if too large first). `face.png`, `fw`, `fh`.
4. Edit `main.css`:
    * in the `img` rule, change `margin-left` and `margin-top` so they're minus half the face width and height.
4. Edit `index.html` to make it match the viewport width of the video and confirm the `face.png` exists.
5. Edit the constants above in `main.js`.
6. Reset `timeline.js` to an empty object.
7. Extract frames using `scrapeScript`. It's a nodejs script which uses nightmarejs to extract frames so we can better map the face offline (requires running `npm install` in the console to install dependencies).
8. Open `edit.html`. Use the keys:
    * `click` recenters face
    * `X` clears frame
    * `->` next frame
    * `<-` prev frame
    * `/\` increase scale
    * `\/` decrease scale
    * `A` rotate right
    * `Z` rotate left

9. Export keyframes to `timeline.js` using the command `JSON.stringify(o)` in the console before leaving the edit page. It should be saved like `var o = {...}`.
10. Publish :D

## reference

* <https://developers.google.com/youtube/iframe_api_reference>
