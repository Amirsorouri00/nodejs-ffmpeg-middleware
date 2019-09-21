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


ffmpeg -i ../../e.mp4 -c:a libmp3lame -ar 48000 -ab 64k  -c:v libx264 -b:v 128k lags -global_header -map 0 -f segment -segment_list test.m3u8 -segment_time 10 -segment_format mpegts segment_%05d.ts

ffmpeg -i ../../e.mp4 -vf "drawtext=text='hellllllooooooooo there' :x=10:y=H-th-10:fontfile=/path/to/font.ttf:fontsize=12:fontcolor=white:shadowcolor=black:shadowx=5:shadowy=5" -c:a libmp3lame -ar 48000 -ab 64k  -c:v libx264 -b:v 128k -flags -global_header -map 0 -f segment -segment_list test_f.m3u8 -segment_time 10 -segment_format mpegts segment_f_%05d.ts

ffmpeg -i ../../e.mp4 -c 24 -vcodec h264 -acodec aac -ac 1 -strict -2 -b:v 128k -profile:v baseline -maxrate 400k -bufsize 1835k -hls_time 10 -hls_playlist_type vod -vsync 1 index1.m3u8 -c 24 -vcodec libx264 -acodec aac -ac 1 -strict -2 -b:v 128k -profile:v baseline -maxrate 700k -bufsize 1835k -hls_time 10 -hls_playlist_type vod -vsync 1 index2.m3u8
````



### Dash

````
$ ffmpeg -i stream.m3u8 -strict -2 -min_seg_duration 2000 -window_size 5 -extra_window_size 5 -use_template 1 -use_timeline 1 -f dash dash/out.mpd
````



## nginx_rtm_conference_i_frame

````
$ ffprobe -select_streams v -skip_frame nokey -show_frames -v quiet e.mp4 | grep '^pkt_pts_time' | sed 's/pkt_pts_time=//'
````
