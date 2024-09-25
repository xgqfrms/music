# m3u8

> CCTV m3u8 video downloader

## demo & try ❓

> 使用 vscode emmet 构造索引为 01 ～ 100 的 ts 视频片段，默认只有 4 个 ts 视频片段！

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="author" content="xgqfrms">
  <meta name="generator" content="VS code">
  <title></title>
</head>
<body>
 emmet
 <!-- p*100{`https://ldncctvwbcdali.v.myalicdn.com/ldncctvwbcd/cdrmldcctv1_1td/1727237361_4318093`0$.ts} -->

 <!--

 https://code.visualstudio.com/docs/editor/emmet

https://www.cnblogs.com/xgqfrms/p/18357977#5304062

 -->
</body>
</html>

```

原始 m3u8 文件

```ts
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:431809644
#EXT-X-ALLOW-CACHE:NO
#EXT-X-TARGETDURATION:5
#EXTINF:4.000000,
/ldncctvwbcd/cdrmldcctv1_1td/1727238573_431809644.ts
#EXTINF:4.000000,
/ldncctvwbcd/cdrmldcctv1_1td/1727238577_431809645.ts
#EXTINF:4.000000,
/ldncctvwbcd/cdrmldcctv1_1td/1727238581_431809646.ts
#EXTINF:4.000000,
/ldncctvwbcd/cdrmldcctv1_1td/1727238585_431809647.ts
```

![image](https://github.com/user-attachments/assets/8f336f93-1cba-402a-8e58-7366d8fc390c)


改造后 m3u8 文件


```ts
#EXTM3U
https://ldncctvwbcdali.v.myalicdn.com/ldncctvwbcd/cdrmldcctv1_1td/1727237361_431809301.ts
https://ldncctvwbcdali.v.myalicdn.com/ldncctvwbcd/cdrmldcctv1_1td/1727237361_431809302.ts
...
https://ldncctvwbcdali.v.myalicdn.com/ldncctvwbcd/cdrmldcctv1_1td/1727237361_431809398.ts
https://ldncctvwbcdali.v.myalicdn.com/ldncctvwbcd/cdrmldcctv1_1td/1727237361_431809399.ts
https://ldncctvwbcdali.v.myalicdn.com/ldncctvwbcd/cdrmldcctv1_1td/1727237361_4318093100.ts
```

https://github.com/xgqfrms/music/blob/main/docs/m3u8/cctv1_1td.m3u8


https://music.xgqfrms.xyz/m3u8/cctv1_1td.m3u8





## refs

https://www.cnblogs.com/xgqfrms/p/18357977
