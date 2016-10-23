var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/gridfs');

var conn = mongoose.connection;
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');

//TODO: fs will do the work here to get file info


// take the value from the upload , TODO
var filepath = path.join(__dirname, 'uploads/forest1.JPG') ; 

Grid.mongo = mongoose.mongo;

conn.once('open', function(){
    console.log(' - connection open ' );
    var gfs = Grid(conn.db);

    var writeStream = gfs.createWriteStream({
        filename: 'forest1.JPG', //TODO : take the value from file
        mode: 'w'
    }); 

    fs.createReadStream(filepath).pipe(writeStream);

    writeStream.on('close', function(file){
        console.log(file.filename + ' written to db');
    });
});


 