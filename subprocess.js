var ffmpegs = require('fluent-ffmpeg')

process.on('message', (m) => {
    if (m === 'server') {
      convert();
    }
});


function convert(ffmpeg) {
    // https://www.ffmpeg.org/ffmpeg-formats.html#hls-2
    // callback = callback
    // function after() {
    //     callback(null, true);
    // }
    // var name = path.replace('.ts','').concat(["stream.ts"]) //"x".concat([req.filePath]) //
    const fileDirs = '/home/amirsorouri00/Desktop/opt/nodejs/node-ffmpeg/files'; // Directory that input files are stored
    console.log("subprocess starting to convert....")

    ffmpegs('e.mp4', { timeout: 432000 })
    .videoFilters({
      filter: 'drawtext',
      options: {
        text: 'VERY LONG TEXT VERY VERY VERY VERY LOL!!!',
        fontsize: 36,
        fontcolor: 'white',
        x: '(main_w/2-text_w/2)',
        y: '(text_h/2)+15',
        shadowcolor: 'black',
        shadowx: 2,
        shadowy: 2
      }
    })
    .addOptions([
    '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
    '-level 3.0', 
    '-start_number 0',     // start the first .ts segment at index 0
    '-hls_time 1',        // 10 second segment duration
    '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
    '-hls_playlist_type event',
    '-preset veryfast',
    '-f hls'               // HLS format
    ])
    .output('files/stream.m3u8')
    .on('end', function(stdout, stderr) {
        console.log('ffmpeg done. !');
    })
    .on('error', function(stdout, stderr) {
        console.log('ffmpeg got error. !');
    })
    .run()
}