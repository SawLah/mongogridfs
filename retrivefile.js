var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/gridfs');

var conn = mongoose.connection;
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');

//TODO: fs will do the work here to get file info
 

Grid.mongo = mongoose.mongo;


conn.once('open', function(){
    console.log(' - connection open ...');
    var gfs = Grid(conn.db);

    var fsWriteStream = fs.createWriteStream(path.join(__dirname, 'writeto/forest2.JPG'))

    var readStream = gfs.createReadStream({
        filename: 'forest1.JPG'
    });

    readStream.pipe(fsWriteStream);

    fsWriteStream.on('close', function(){
        console.log('file has been witten fully!');

    });

}); 