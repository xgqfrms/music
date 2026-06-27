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
 * @link https://music.xgqfrms.xyz/music-player/index.html?q=https://cdn.pixabay.com/audio/2025/04/21/audio_ed6f0ed574.mp3
 * @link http://127.0.0.1:5500/2025-tesla-raspberry-pi3b/music-palyer/index.html?q=https://cdn.pixabay.com/audio/2025/04/21/audio_ed6f0ed574.mp3
 * @solutions
 *
 * @best_solutions
 *
 */

const log = console.log;

// const DOMAIN = `${window.location.origin}`;
// const DOMAIN = `https://music.xgqfrms.xyz`;
const CUSTOM_DOMAIN = `https://music.777737777.xyz`;
const {
  origin: DOMAIN,
  search: query,
}= window.location;

const MUSIC_PLAYER = `music-player/index.html`;

// let AUDIO_RESOURCE_LOADED_FLAG = false;
window.AUDIO_RESOURCE_LOADED_FLAG = false;

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
        audio.src = `${CUSTOM_DOMAIN}/${filename}`;
        audio.setAttribute(`download`, `${CUSTOM_DOMAIN}/${filename}`);
      }
      // https://music.xgqfrms.xyz/music-player/index.html?q=https://cdn.pixabay.com/audio/2025/04/21/audio_ed6f0ed574.mp3
      if(filename.includes(`https://`) || filename.includes(`http://`)) {
        audio.src = `${filename}`;
        audio.setAttribute(`download`, `${filename}`);
      }
      // ⚠️ 跨域安全限制：出于安全考虑，运行在 http:// 或 https:// 协议下的网页禁止直接通过 file:// 协议访问用户本地文件系统。这是为了防止恶意网站读取你电脑上的私密数据。
      // if(filename.includes(`file://`)) {
      //   audio.src = `${filename}`;
      //   audio.setAttribute(`download`, `${filename}`);
      // }
      // ✅ 如果你需要处理用户本地的任意文件，应使用 <input type="file">，通过 JavaScript 获取 File 对象并生成临时 URL
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
  // support local file
  const input = document.querySelector('input[type="file"]');
  
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    // URL blob
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.play();
    
    caption.innerText = file.name || `❓`;
    // const fileName = this.files[0] ? this.files[0].name : '未选择任何本地文件';
    // document.getElementById('file-name').textContent = fileName;
  });
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

