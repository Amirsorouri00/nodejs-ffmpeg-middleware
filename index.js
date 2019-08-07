var HLSServer = require('hls-server')
var http = require('http');
var fs = require('fs');
var server = http.createServer()

const fileDirs = '/home/amirsorouri00/Desktop/opt/nodejs/node-ffmpeg/files'; // Directory that input files are stored

var hls = new HLSServer(server, {
  path: '/streams',     // Base URI to output HLS streams
  dir: fileDirs,  // Directory that input files are stored
  provider: {
    exists: function (req, callback) { // check if a file exists (always called before the below methods)
      console.log("inside exists");
      callback(null, true)                 // File exists and is ready to start streaming
    //   callback(new Error("Server Error!")) // 500 error
    //   callback(null, false)                // 404 error
    },
    getManifestStream: function (req, callback) { // return the correct .m3u8 file
      // "req" is the http request
      // "callback" must be called with error-first arguments
      callback(null, fs.createReadStream(req.filePath))
      // or
    //   callback(new Error("Server error!"), null)
    },
    getSegmentStream: function (req, callback) { // return the correct .ts file
      callback(null, fs.createReadStream(req.filePath))
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