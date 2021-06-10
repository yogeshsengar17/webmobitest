const express = require('express');
const path = require('path');
const port = 5000;
const client = require('socket.io')(4000);


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());


// const mongo = require('mongodb').MongoClient;



    // Connect to Socket.io
    client.on('connection', function(socket){

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection

        // Handle input events
        socket.on('input', function(data){
            //let name = data.name;
            let message = data.message;

            // Check for name and message
            if(message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                
                client.emit('output', [data]);

                    // Send status object
                sendStatus({
                    message: 'Message sent',
                    clear: true
                });
            }
        });
    });





    



       







app.get('/',function(req,res){
    return res.render('home')
});

app.post('/create-user',function(req,res){
     return res.render('index');
})



app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log(`Server is running at the port:${port}`);
})