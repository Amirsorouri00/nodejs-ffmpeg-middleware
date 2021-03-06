var ffmpegs = require('fluent-ffmpeg')

process.on('message', (m) => {
    if (m === 'server') {
      convert();
    }
    else if(m === 'segment'){
      const args = process.argv.slice(2)
      const stringPath = args[0]
      console.log("here: ", stringPath);
      convert_segment(stringPath);

    }
    else{
      console.log("wrong messege");
    }
});

function convert_segment(tsfile) {
  // https://www.ffmpeg.org/ffmpeg-formats.html#hls-2
  
  console.log("subprocess starting to convert segment")

  ffmpegs(tsfile, { timeout: 432000 })
  .videoFilters({
    filter: 'drawtext',
    options: {
      text: 'This is AmirHossein Sorouries TXT. How u like me nowww.',
      fontsize: 18,
      fontcolor: 'red',
      x: '(main_w/2-text_w/2)',
      y: '(text_h/2)+15',
      shadowcolor: 'black',
      shadowx: 2,
      shadowy: 2
    }
  })
  .addOptions([
  // '-c:a libmp3lame',
  // '-ar 48000',
  // '-ab 64k',
  // '-c:v libx264',
  // '-b:v 128k',
  // '-flags',
  // '-global_header',
  // // '-map 0',
  // '-f segment',
  // // '-segment_list test_WWW.m3u8',
  // '-segment_time 10',
  // '-segment_format mpegts',
  // '-segment_list_type m3u8',
  '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
  '-level 4.0', 
  '-start_number 0',     // start the first .ts segment at index 0
  '-hls_time 1',        // 10 second segment duration
  '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
  '-hls_playlist_type event',
  // '-hls_segment_filename "files/fileSequence%d.ts"',
  '-preset veryfast',
  // '-flags',
  // '-global_header',
  '-f segment' ,              // HLS format
  // '-hls_flags single_file'
  // '-g 60'
  ])
  .output(tsfile)
  .on('end', function(stdout, stderr) {
      console.log('ffmpeg done. !');
  })
  .on('error', function(stdout, stderr) {
      console.log(stdout);
  })
  .run()
}


// Haminjooodi for test
function convert(ffmpeg) {
  // https://www.ffmpeg.org/ffmpeg-formats.html#hls-2
  // callback = callback
  // function after() {
  //     callback(null, true);
  // }
  // var name = path.replace('.ts','').concat(["stream.ts"]) //"x".concat([req.filePath]) //
  const fileDirs = '/home/amirsorouri00/Desktop/opt/nodejs/node-ffmpeg/files'; // Directory that input files are stored
  console.log("subprocess starting to convert....")

  ffmpegs('files/velelesh/stream0.m3u8', { timeout: 432000 })
  .videoFilters({
    filter: 'drawtext',
    options: {
      text: 'This is AmirHossein Sorouries TXT. How u like me nowww.',
      fontsize: 18,
      fontcolor: 'red',
      x: '(main_w/2-text_w/2)',
      y: '(text_h/2)+15',
      shadowcolor: 'black',
      shadowx: 2,
      shadowy: 2
    }
  })
  .addOptions([
  '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
  '-level 4.0', 
  '-start_number 0',     // start the first .ts segment at index 0
  '-hls_time 1',        // 10 second segment duration
  '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
  '-hls_playlist_type event',
  // '-hls_segment_filename "files/fileSequence%d.ts"',
  '-preset veryfast',
  '-f hls' ,              // HLS format
  '-hls_flags single_file'
  // '-g 60'
  ])
  .output('files/velelesh/stream.m3u8')
  .on('end', function(stdout, stderr) {
      console.log('ffmpeg done. !');
  })
  .on('error', function(stdout, stderr) {
      console.log(stdout);
  })
  .run()
}















// Live Version
// function convert(ffmpeg) {
//     // https://www.ffmpeg.org/ffmpeg-formats.html#hls-2
//     // callback = callback
//     // function after() {
//     //     callback(null, true);
//     // }
//     // var name = path.replace('.ts','').concat(["stream.ts"]) //"x".concat([req.filePath]) //
//     const fileDirs = '/home/amirsorouri00/Desktop/opt/nodejs/node-ffmpeg/files'; // Directory that input files are stored
//     console.log("subprocess starting to convert....")

//     ffmpegs('gio.mp4', { timeout: 432000 })
//     .videoFilters({
//       filter: 'drawtext',
//       options: {
//         text: 'This is AmirHossein Sorouries TXT. How u like me nowww.',
//         fontsize: 18,
//         fontcolor: 'red',
//         x: '(main_w/2-text_w/2)',
//         y: '(text_h/2)+15',
//         shadowcolor: 'black',
//         shadowx: 2,
//         shadowy: 2
//       }
//     })
//     .addOptions([
//     '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
//     '-level 3.0', 
//     '-start_number 0',     // start the first .ts segment at index 0
//     '-hls_time 1',        // 10 second segment duration
//     '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
//     '-hls_playlist_type event',
//     // '-hls_segment_filename "files/fileSequence%d.ts"',
//     '-preset veryfast',
//     '-f hls'               // HLS format
//     ])
//     .output('files/stream.m3u8')
//     .on('end', function(stdout, stderr) {
//         console.log('ffmpeg done. !');
//     })
//     .on('error', function(stdout, stderr) {
//         console.log(stdout);
//     })
//     .run()
// }