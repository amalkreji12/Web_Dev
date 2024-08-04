

var http=require('http');
var fs=require('fs')  //fs-File System -- allows to work with the file system on computer

http.createServer(server).listen(7000);

function server(req,res){
    fs.readFile('sample.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
        
    })
    //res.write('JavaScript')
    //res.end()
}