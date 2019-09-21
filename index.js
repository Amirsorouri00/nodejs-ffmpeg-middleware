const subprocess = require('child_process').fork('subprocess.js');
var HLSServer = require('hls-server');
var ffmpeg = require('fluent-ffmpeg');
var sleep = require('sleep');
var http = require('http');
var fs = require('fs');

var server = http.createServer();


// http://127.0.0.1:8000/streams/stream.m3u8

const fileDirs = '/home/amirsorouri00/Desktop/opt/nodejs/node-ffmpeg/files/verytmp'; // Directory that input files are stored

const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

async function command_runner() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}

function subst(st){
  var substr = st.substring(
    st.lastIndexOf("/") + 1, 
    st.lastIndexOf("s") + 1
  ).replace('segment_', '').replace('.ts', '');
  substr = Number(substr) + 1
  substr = 'segment_0000' + String(substr) + '.ts'
  var substr1 = st.substring(
    st.lastIndexOf("/") + 1, 
    st.lastIndexOf("s") + 1
  )
  rhhh = st.replace(substr1, substr)//.concat(substr)
  return rhhh;
}

var hls = new HLSServer(server, {
  path: '/streams',     // Base URI to output HLS streams
  dir: fileDirs,  // Directory that input files are stored
  provider: {
    exists: function (req, callback) { // check if a file exists (always called before the below methods)
        console.log("Inside exists")
        callback(null, true)                 // File exists and is ready to start streaming
        //  callback(new Error("Server Error!")) // 500 error
        //  callback(null, false)                // 404 error
    },
    getManifestStream: function (req, callback) { // return the correct .m3u8 file
        // "req" is the http request
        // "callback" must be called with error-first arguments
        console.log("Inside getManifestStream");
        var exist = false;
        fs.access(req.filePath, fs.F_OK, (err) => {
          if (err) {
            console.error("doesn't exist any m3u8");
            // /* Live Version
            // subprocess.send('server');
            // sleep.sleep(1);  
            callback(null, fs.createReadStream(req.filePath))
          }
          // file exists
          else {
            // Test
            // subprocess.send('server');
            // sleep.sleep(6); 
            callback(null, fs.createReadStream(req.filePath))
          }
        });
        // m3ToConvertor(null);
        // or
        //   callback(new Error("Server error!"), null)
    },
    getSegmentStream: function (req, callback) { // return the correct .ts file
      console.log("Inside getSegmentStream")
      
      var rhhh = subst(req.filePath);
      console.log(rhhh)

      const subprocess1 = require('child_process').fork('subprocess.js', [rhhh]);
      subprocess1.send('segment');
      sleep.msleep(200);

      callback(null, fs.createReadStream(req.filePath))
      // setTimeout(mine, 1000);
    }
  }
})

function yourMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log("inside middleware");
  next()
}

var httpAttach = require('http-attach')
httpAttach(server, yourMiddleware)
server.listen(8000, () => {
    console.log("hls_server is ready on port 8000:\n");
})

function m3ToConvertor(path) {
          // Below is FFMPEG converting MP4 to HLS with reasonable options.
        
        command_runner();
        
          // https://www.ffmpeg.org/ffmpeg-formats.html#hls-2
        // callback = callback
        // function after() {
        //     callback(null, true);            
        // }

        // ffmpeg(path, { timeout: 432000 })
        // // .videoFilters({
        // //   filter: 'drawtext',
        // //   options: {
        // //     text: 'VERY LONG TEXT VERY VERY VERY VERY LOL!!!',
        // //     fontsize: 36,
        // //     fontcolor: 'white',
        // //     x: '(main_w/2-text_w/2)',
        // //     y: '(text_h/2)+15',
        // //     shadowcolor: 'black',
        // //     shadowx: 2,
        // //     shadowy: 2
        // //   }
        // // })
        // .addOptions([
        // '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
        // '-level 3.0', 
        // '-start_number 0',     // start the first .ts segment at index 0
        // '-hls_time 1',        // 10 second segment duration
        // '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
        // '-hls_playlist_type event',
        // '-preset veryfast',
        // '-f hls'               // HLS format
        // ])
        // .output(fileDirs.concat(['/stream.m3u8']))
        // .on('end', function(stdout, stderr) {
        //     console.log('ffmpeg done. !', req.filePath);
        // })
        // .run()
}


function tsToConvertor(req) {
  function mine() {
    callback(null, fs.createReadStream(req.filePath))
  }

//   ffmpeg(req.filePath, { timeout: 432000 })
// //   .videoFilters({
// //     filter: 'drawtext',
// //     options: {
// //       text: 'VERY LONG TEXT VERY VERY VERY VERY LOL!!!',
// //       fontsize: 36,
// //       fontcolor: 'white',
// //       x: '(main_w/2-text_w/2)',
// //       y: '(text_h/2)+15',
// //       shadowcolor: 'black',
// //       shadowx: 2,
// //       shadowy: 2
// //     }
// //   })
//   .videoCodec('libx264')
//   .audioCodec('aac')
//   .audioChannels(6)
//   .addOption('-hls_list_size', 0)
// //   .addOptions([
// //   '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
// //   '-level 3.0', 
// //   '-start_number 0',     // start the first .ts segment at index 0
// //   '-hls_time 1',        // 10 second segment duration
// //   '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
// //   '-hls_playlist_type event',
// //   '-preset veryfast',
// //   '-f hls'               // HLS format
// //   ])
//   .format('mpegts')
//   .output(name)
//   .on('end', function(stdout, stderr) {
//       console.log('ffmpeg done. !', req.filePath);
//       callback(null, fs.createReadStream(name))
//   })
//   .run()

//   .pipe();
// setTimeout(mine, 1000);
mine();
}