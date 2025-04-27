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

// const DOMAIN = `${window.location.origin}`;
// const DOMAIN = `https://music.xgqfrms.xyz`;
const {
  origin: DOMAIN,
  search: query,
}= window.location;

const MUSIC_PLAYER = `music-player/index.html`;

const getMusicFileName = (audio, caption) => {
  const args = new URLSearchParams(query);
  // console.log(`args.entries() =`, args.entries());
  // console.log(`args =`, args);
  for (const arg of args) {
    console.log(`arg =`, arg);
  }
  let filename = null;
  try {
    filename = args.get('q');
    console.log(`✅ filename =`, filename);
    if(filename) {
      caption.innerText = filename;
      // audio.src = filename;
      audio.src = `${DOMAIN}/${filename}`;
      // fix local test
      if(window.location.protocol === `http:` || window.location.hostname === `127.0.0.1`) {
        audio.src = `https://music.xgqfrms.xyz/${filename}`;
      }
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
    if(!audio.paused) {
      audio.pause();
      btn.innerText = `click to replay`;
      return;
    } else {
      btn.innerText = `click to pause`;
    }
    const filename = getMusicFileName(audio, caption);
    if(!filename) {
      alert(`❌ filename is null`);
      return;
    } else {
      console.log(`✅ filename is`, filename);
    }
  });
});
