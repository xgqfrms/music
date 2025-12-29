"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2025-04-27
 * @modified 2025-12-29
 *
 * @description
 * @description
 * @difficulty Easy
 * @time_complexity O(n)
 * @space_complexity O(n)
 * @augments
 * @example
 * @link https://music.777737777.xyz/music-player/index.html
 * @link https://music.777737777.xyz/music-player/index.html?q=background-music/Go-West.mp3
 * @link https://music.777737777.xyz/music-player/index.html?q=https://cdn.pixabay.com/audio/2025/04/21/audio_ed6f0ed574.mp3
 * @link http://127.0.0.1:5500/2025-tesla-raspberry-pi3b/music-palyer/index.html?q=https://cdn.pixabay.com/audio/2025/04/21/audio_ed6f0ed574.mp3
 * @link https://music.777737777.xyz/music-player/index.html?q=file:///Users/xgqfrms-mm/Music/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/John%20The%20Whistler%20-%20Wild%20Wild%20Web.mp3
 * @solutions
 *
 * @best_solutions
 *
 */

const log = console.log;

// const DOMAIN = `${window.location.origin}`;
// const DOMAIN = `https://music.777737777.xyz`;
const {
  origin: DOMAIN,
  search: query,
}= window.location;

const MUSIC_PLAYER = `music-player/index.html`;

// let AUDIO_RESOURCE_LOADED_FLAG = false;
window.AUDIO_RESOURCE_LOADED_FLAG = false;


const inputFile = document.querySelector(`#music_input`);
const inputFiles = document.querySelector(`#music_inputs`);

inputFile.addEventListener(`change`, (e) => {
  const file = e.target.files[0];
  console.log(`file =`, file);
  if(file) {
    const audio = document.querySelector(`#audio`);
    const caption = document.querySelector(`#caption`);
    // blob url
    const objectUrl = URL.createObjectURL(file);
    console.log(`objectUrl =`, objectUrl);
    caption.innerText = file.name;
    audio.src = objectUrl;
    audio.setAttribute(`download`, file.name);
    // audio.playbackRate = 1.0;
    // audio.play();
    // console.log(`✅ play local music success =`, file.name);
  }
});


inputFile.addEventListener(`cancel`, (e) => {
  const audio = document.querySelector(`#audio`);
  const caption = document.querySelector(`#caption`);
  // blob url
  caption.innerText = `no file selected`;
  audio.src = ``;
  audio.removeAttribute(`download`);
  window.AUDIO_RESOURCE_LOADED_FLAG = false;
  console.log(`❌ cancel select file`);
});

inputFiles.addEventListener(`change`, (e) => {
  const files = e.target.files;
  console.log(`files =`, files);
  if(files && files.length > 0) {
    const audio = document.querySelector(`#audio`);
    const caption = document.querySelector(`#caption`);
    const fileList = [];
    for(const file of files) {
      fileList.push(file.name);
    }
    console.log(`fileList =`, fileList);
    caption.innerText = fileList.join(`, `);
    // just play the first one
    const firstFile = files[0];
    const objectUrl = URL.createObjectURL(firstFile);
    console.log(`objectUrl =`, objectUrl);
    audio.src = objectUrl;
    audio.setAttribute(`download`, firstFile.name);
    // audio.playbackRate = 1.0;
    // audio.play();
    // console.log(`✅ play local music success =`, firstFile.name);
  }
});


const getMusicFileName = (audio, caption) => {
  const args = new URLSearchParams(query);
  // console.log(`args.entries() =`, args.entries());
  for (const arg of args) {
    console.log(`arg =`, arg);
  }
  let filename = null;
  try {
    filename = args.get('q');
    console.log(`✅ filename =`, filename);
    if(filename) {
      caption.innerText = filename;
      // music cdn
      audio.src = `${DOMAIN}/${filename}`;
      audio.setAttribute(`download`, `${DOMAIN}/${filename}`);
      // fix local test
      if(window.location.protocol === `http:` || window.location.hostname === `127.0.0.1`) {
        audio.src = `https://music.777737777.xyz/${filename}`;
        audio.setAttribute(`download`, `https://music.777737777.xyz/${filename}`);
      }
      // https://music.777737777.xyz/music-player/index.html?q=https://cdn.pixabay.com/audio/2025/04/21/audio_ed6f0ed574.mp3
      if(filename.includes(`https://`) || filename.includes(`http://`)) {
        audio.src = `${filename}`;
        audio.setAttribute(`download`, `${filename}`);
      }
      // file:///Users/xgqfrms-mm/Music/网易云音乐/John The Whistler - Wild Wild Web.mp3
      if(filename.includes(`file://`)) {
        // audio.src = `${filename}`;
        // audio.setAttribute(`download`, `${filename}`);
        if(!window.AUDIO_RESOURCE_LOADED_FLAG) {
          inputFile.click();
        }
      }

      // once flag
      window.AUDIO_RESOURCE_LOADED_FLAG = true;
      audio.playbackRate = 1.0;
      audio.play();
      console.log(`✅ auto play music success =`, filename);
    }
  } catch (err) {
    console.log(`❌ get music filename error =`, err);
  }
  return filename;
}


document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed ✅");
  const btn = document.querySelector(`#btn`);
  const audio = document.querySelector(`#audio`);
  const caption = document.querySelector(`#caption`);
  // fix auto play limit
  btn.addEventListener(`click`, (e) => {
    // once
    if(!window.AUDIO_RESOURCE_LOADED_FLAG) {
      const filename = getMusicFileName(audio, caption);
      if(!filename) {
        console.log(`❌ filename is null`);
        alert(`❌ filename is null`);
        return;
      } else {
        console.log(`✅ filename is`, filename);
      }
    } else {
      console.log(`✅ AUDIO_RESOURCE_LOADED_FLAG =`, window.AUDIO_RESOURCE_LOADED_FLAG);
      if(!audio.paused) {
        audio.pause();
        btn.innerText = `click to replay`;
        // return;
      } else {
        audio.play();
        btn.innerText = `click to pause`;
      }
    }
  });
});




/*


https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file


Notes
You cannot set the value of a file picker from a script — doing something like the following has no effect:

```js
const input = document.querySelector("input[type=file]");
input.value = "foo";
```

When a file is chosen using an <input type="file">, the real path to the source file is not shown in the input's value attribute for obvious security reasons. Instead, the filename is shown, with C:\fakepath\ prepended to it. There are some historical reasons for this quirk, but it is supported across all modern browsers, and in fact is defined in the spec.


*/



/*

{
  "ancestorOrigins": {},
  "href": "https://music.777737777.xyz/background-music/index.html?q=background-music/Go-West.mp3",
  "origin": "https://music.777737777.xyz",
  "protocol": "https:",
  "host": "music.777737777.xyz",
  "hostname": "music.777737777.xyz",
  "port": "",
  "pathname": "/background-music/index.html",
  "search": "?q=background-music/Go-West.mp3",
  "hash": ""
}

*/


// const {
//   pathname: path,
//   search: query,
// } = window.location;



const getTbId = () => {
  let url = ``;
  const args = new URLSearchParams(location.search);
  try {
    for (let [name, id] of args) {
      if(name === 'id') {
        console.log(`id =`, id);
        url = `${window.location.origin}${window.location.pathname}?id=${id}`;
        console.log(`✅ get url success =`, url)
      }
    }
  } catch (err) {
    console.log(`❌ get url error =`, err)
  }
  return url;
}

/*

https://www.cnblogs.com/xgqfrms/p/9138024.html

https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams

const params = new URL("https://example.com/?name=Jonathan%20Smith&age=18")
  .searchParams;
const name = params.get("name");
const age = parseInt(params.get("age"));

console.log(`name: ${name}`); // name: Jonathan Smith
console.log(`age: ${age}`); // age: 18


https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

for (const [key, value] of mySearchParams) {
  //
}
for (const [key, value] of mySearchParams.entries()) {
  //
}


for (const arg of args.entries()) {
  console.log(`arg =`, arg)
}
arg = (2) ['q', 'background-music/Go-West.mp3']

for (const arg of args) {
  console.log(`arg =`, arg)
}
arg = (2) ['q', 'background-music/Go-West.mp3']


*/
