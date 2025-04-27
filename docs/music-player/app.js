"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2025-04-27
 * @modified
 *
 * @description
 * @description
 * @difficulty Easy
 * @time_complexity O(n)
 * @space_complexity O(n)
 * @augments
 * @example
 * @link https://music.xgqfrms.xyz/music-player/index.html
 * @link https://music.xgqfrms.xyz/music-player/index.html?q=background-music/Go-West.mp3
 * @solutions
 *
 * @best_solutions
 *
 */

const log = console.log;

const MUSIC_PLAYER = `music-player/index.html`;
const {
  origin: DOMAIN,
  search: query,
}= window.location;

const getMusicFileName = () => {
  const args = new URLSearchParams(query);
  console.log(`args =`, args);
  try {
    const filename = args.get('q');
    console.log(`filename =`, filename);
    if(filename) {
      // auto play music
      const caption = document.querySelector(`#caption`);
      caption.innerText = filename;
      const audio = document.querySelector(`#audio`);
      audio.src = filename;
      audio.play();
      console.log(`✅ auto play music success =`, filename);
    }
  } catch (err) {
    console.log(`❌ get music filename error =`, err)
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed ✅");
  const btn = document.querySelector(`#btn`);
  // fix auto play limit
  btn.addEventListener(`click`, (e) => {
    const audio = document.querySelector(`#audio`);
    const caption = document.querySelector(`#caption`);
    const filename = getMusicFileName(audio, caption);
    if(!filename) {
      alert(`❌ filename is null`);
      return;
    }
    audio.src = filename;
    // local test
    if(window.location.protocol === `http:` || window.location.hostname === `127.0.0.1`) {
      audio.src = `https://music.xgqfrms.xyz/${filename}`;
    }
    audio.playbackRate = 1.0;
    audio.play();
  });
});

