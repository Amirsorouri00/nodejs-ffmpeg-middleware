// var HLSServer = require('hls-server')
// var http = require('http')

// var server = http.createServer()
// var hls = new HLSServer(server, {
//   path: '/streams',     // Base URI to output HLS streams
//   dir: '/home/gheidar/Desktop/ffmpeg_test/testWater/public/video'  // Directory that input files are stored
// })
// server.listen(8181)

// const ffmpeg = require("fluent-ffmpeg");
// const ffmpeg = require("ffmpeg");
const HLSServer = require('hls-server')
const http = require('http')
const express = require('express');
var fs = require('fs')

var ffmpeg = require('fluent-ffmpeg');


var app = express();


const server = http.createServer(app)



const hls = new HLSServer(server, {
  path: '/streams', // Base URI to output HLS streams
  dir: '/home/amirsorouri00/Desktop/opt/nodejs/node-ffmpeg/files', // Directory that input files are stored
  provider: {
    exists: function (req, callback) { // check if a file exists (always called before the below methods)
      console.log("existssss.")
      ffmpeg(req.filePath, { timeout: 432000 })
      // .addOptions([
      //   '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
      //   '-level 3.0', 
      //   '-s 640x360',          // 640px width, 360px height output video dimensions
      //   '-start_number 0',     // start the first .ts segment at index 0
      //   '-hls_time 10',        // 10 second segment duration
      //   '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
      //   '-f hls'               // HLS format
      // ])
      .output(req.filePath)
      .on('end', callback).run()
      // callback(null, true) // File exists and is ready to start streaming
      // callback(new Error("Server Error!")) // 500 error
      // callback(null, false)                // 404 error
    },
    getManifestStream: function (req, callback) { // return the correct .m3u8 file
      // "req" is the http request
      // "callback" must be called with error-first arguments

      callback(null, fs.createReadStream(req.filePath))
      // or
      // callback(new Error("Server error!"), null)
    },
    getSegmentStream: function (req, callback) { // return the correct .ts file
      // console.log('injs')
      //       readStream=fs.createReadStream(req.filePath, {
      //         bufferSize: 64 * 1024
      //       })
      // readStream.on('data',function(chunk){
      //   console.log('newchunk ' ,chunk)
      // })
      callback(null, '')
    }
  }
});


var httpAttach = require('http-attach')

function yourMiddleware(req, res, next) {
  // set your headers here
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
}
httpAttach(server, yourMiddleware)

server.listen(8182, () => {


  // var stream = fs.createWriteStream('./yout_target.flv')

  // // make sure you set the correct path to your video file
  // var proc = ffmpeg('./index0.ts')
  //   // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
  //   .preset('flashvideo')
  //   // setup event handlers
  //   .on('end', function() {
  //     console.log('file has been converted succesfully');
  //   })
  //   .on('error', function(err) {
  //     console.log('an error happened: ' + err.message);
  //   })
  //   // save to stream
  //   .pipe(stream, {end:true});
  console.log('success');
});
