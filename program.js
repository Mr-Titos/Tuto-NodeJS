// Implement the http library
const http = require('http');

// Use the method createServer() to create our own HTTP Server
// The parameter is a function with callback system
http.createServer(function (req, res) {

    // Request need to use the method POST or GET
    if(req.method === 'POST' || req.method === 'GET') {
        
        let reqBody = '';
        // Event triggered on every char in the request body
        req.on('data', chunk => {
            reqBody += chunk.toString(); // convert Buffer to string
        });

        // Event triggered on the end of the request
        req.on('end', () => {
            // Get index of the header "HeaderKey"
            let indexHeader = req.rawHeaders.indexOf("HeaderKey");
            
            // Concatenation of the response body 
            let toSend = "HEADER :" + "<br>" + req.rawHeaders[indexHeader + 1];
            toSend += "<br>" + "BODY :" + reqBody;
            
            // Send the body of the response
            res.write(toSend); 
            console.log("Request " + req.method + " succeed : " + toSend);

            // Close the response
            res.end();
        });
    }
    else {
        res.write("You need to use GET or POST method");
        res.end();
    }
}).listen(8080); 


