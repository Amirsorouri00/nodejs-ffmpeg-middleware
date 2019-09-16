# nodejs-ffmpeg-middleware


## Installation

### Back-End
````
$ git clone <repository_url>
$ cd to the cloned repo
$ npm install 
$ node index.js
Server is Up Now...
````

### Client-Side
use demo.jwplayer in Usefull Links and make a request to the url below:
* http://127.0.0.1:8000/streams/stream.m3u8


## Usefull Links
* http://demo.jwplayer.com/developer-tools/http-stream-tester/
* https://github.com/t-mullen/hls-server#producing-streams
* https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
* https://codeforgeek.com/how-to-check-if-file-exists-node/




### One-Test
````
cd files_dir
ffmpeg -i ../e.mp4     -c:v h264 -crf 21 -preset veryfast    -c:a aac -b:a 128k -ac 2 -f hls  -hls_playlist_type event -hls_time 1   stream.m3u8
cd ./test

ffmpeg -i ../stream0.ts     -c:v h264 -crf 21 -preset veryfast    -c:a aac -b:a 128k -ac 2 -f hls  -hls_playlist_type event -hls_time 10   stream.m3u8
(OOOOOOOOOORRRRRRRR(with filter use the next one))
ffmpeg -i ../stream0.ts  -vf "drawtext=text='hellllllooooooooo there' :x=10:y=H-th-10:fontfile=/path/to/font.ttf:fontsize=12:fontcolor=white:shadowcolor=black:shadowx=5:shadowy=5"   -c:v h264 -crf 21 -preset veryfast    -c:a aac -b:a 128k -ac 2 -f hls  -hls_playlist_type event -hls_time 10   stream.m3u8

mv ../stream0.ts ../yechizi.ts  

mv stream0.ts ../stream0.ts

paly it via node-server and jwplayer and it works.
````
