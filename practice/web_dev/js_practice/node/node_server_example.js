

var http=require('http');
var fs=require('fs'); //fs-File System -- allows to work with the file system on computer // fs is module in node
var url=require('url');   //The URL module splits up a web address into readable parts.

http.createServer(server).listen(7000);

function server(req,res){      //This function is a callback function

    var q=url.parse(req.url,true);  //url.parse() takes a URL string, parses it, and it will return a URL object with each part of the address as properties.
    console.log(q.pathname);   //pathname--property of the URL interface represents a location in a hierarchical structure.

    if(q.pathname==='/'){          //changed req.url to q.pathname                                  // if used to route
        fs.readFile('sample.html',function(err,data){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end(); 
        })
    }
    else if(q.pathname==='/login'){
        fs.readFile('login.html',function(err,data){
            res.writeHead(200,{'Content-Type':'text/html'});
            //res.write('Login Page');
            res.write(data);
            res.end();
        })
        
    }
    else if(q.pathname==='/signupaction'){
        //console.log(q.query.name);  //checking whether it reach server
        res.write('form');
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write('Error');
        res.end();
    }
   
    //res.write('JavaScript')
    //res.end()
}