//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.post('/device/',function(req,res){
    
    console.log("Creando nuevo dispositivo");
  
    console.log("deviceName=" + req.body.deviceName);
    console.log("deviceDescription=" + req.body.deviceDescription);
    console.log("deviceType=" + req.body.deviceType);

    var query = "INSERT INTO Devices (name , description, state, type) values (?,?,?,?)";
    var params = [req.body.deviceName , req.body.deviceDescription , 0 , req.body.deviceType];

    utils.query(query ,params, function(err,result){

        if (err){
            console.log(JSON.stringify(err));
            console.log("status 409 ");
            res.status(409);
            res.send("el texto no es valido");
        }else{
            console.log(JSON.stringify(result));
            console.log("Row inserted with id = " + result.insertId);
            console.log("status 200 ");
            res.status(200);
            res.send("Todo ok");
        }
    });
});

app.get('/devices/', function(req,res) {
    utils.query("select * from Devices",function(err,rsp,fields){
        //if(err!=null)
        res.send(JSON.stringify(rsp));
    });
  
});

// app.get('/devices/', function(req, res, next) {
//     devices = [
//         { 
//             'id': 1, 
//             'name': 'Lampara 1', 
//             'description': 'Luz living', 
//             'state': 0, 
//             'type': 1, 
//         },
//         { 
//             'id': 2, 
//             'name': 'Ventilador 1', 
//             'description': 'Ventilador Habitacion', 
//             'state': 1, 
//             'type': 2, 
            
//         },
//     ]
//     res.send(JSON.stringify(devices)).status(200);
// });


// app.get('/test2/', function(req,res) {
//     devices = [
//         { 
//             'id': 1, 
//             'name': 'hello2', 
//         },
//     ]
//     res.send(JSON.stringify(devices)).status(200);
// });

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
