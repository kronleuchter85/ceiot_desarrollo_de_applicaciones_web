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

app.get('/devices/', function(req,res) {
    utils.query("select * from Devices",function(err,result,fields){
        if(err){
            console.log(JSON.stringify(err));
            res.status(409);
            res.send("Error recuperando dispositivos");
        }else{
            console.log(JSON.stringify(result));
            console.log("Devolviendo dispositivos");
            res.status(200);
            res.send(JSON.stringify(result));
        }
    });
});

app.post('/devices/',function(req,res){
    
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
            res.send("Error insertando un nuevo dispositivo");
        }else{
            console.log(JSON.stringify(result));
            console.log("200 - Row inserted with id = " + result.insertId);
            res.status(200);
            res.send("Row inserted with id = " + result.insertId);
        }
    });
});

app.put('/devices/',function(req,res){
    
    console.log("Actualizando dispositivo" + req.body.deviceId);
    console.log("deviceName=" + req.body.deviceName);
    console.log("deviceDescription=" + req.body.deviceDescription);
    console.log("deviceType=" + req.body.deviceType);

    var query = "UPDATE Devices set name = ? , description = ? , type = ? WHERE id = ?";
    var params = [req.body.deviceName , req.body.deviceDescription , req.body.deviceType , req.body.deviceId];

    utils.query(query ,params, function(err,result){
        if(err){
            console.log(JSON.stringify(err));
            res.status(409);
            res.send("Error actualizando dispositivos");
        }else{
            console.log(JSON.stringify(result));
            console.log("Dispositivo actualizado dispositivos");
            res.status(200);
            res.send(JSON.stringify(result));
        }
    });
});

app.put('/devices/status',function(req,res){
    
    console.log("Cambiando el status de un dispositivo");
    console.log("deviceId =" + req.body.deviceId);
    console.log("deviceStatus =" + req.body.deviceStatus);

    var query = "UPDATE Devices SET state = ? where id = ?";
    var params = [req.body.deviceStatus , req.body.deviceId ];

    utils.query(query ,params, function(err,result){
        if (err){
            console.log(JSON.stringify(err));
            console.log("status 409 - no se pudo actualizar el estado del dispositivo");
            res.status(409);
            res.send("no se pudo actualizar el estado del dispositivo");
        }else{
            console.log(JSON.stringify(result));
            console.log("200 - Dispositivo actualizado " );
            res.status(200);
            res.send("Dispositivo actualizado" );
        }
    });
});


app.delete('/devices/', function(req,res) {
    var query = "DELETE FROM Devices WHERE id = ?";
    var params = [req.body.deviceId] ;
    console.log("eliminando dispositivo " + params);
    utils.query( query ,params ,function(err,result,fields){
        if (err){
            console.log(JSON.stringify(err));
            res.status(409);
            res.send("Error eliminando dispositivo");
        }else{
            console.log(JSON.stringify(result));
            console.log("Dispositivo eliminado");
            res.status(200);
            res.send("Dispositivo eliminado");
        }
    });
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
