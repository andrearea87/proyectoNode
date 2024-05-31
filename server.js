'use strict'

require('dotenv').config();
const mongoose=require('mongoose');
var app=require('./app');
var port=3000;
const url=process.env.MONGO_BDD;

//mongoose.Promise=global.Promise;
mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology:true})
        .then(()=>{
            console.log("Conexion a la base de datos exitosa");
            var server=app.listen(port, () => {
                console.log(`Example app listening on port ${port}`)
                });
            server.timeout=12000;    
        }

        )
        .catch(err => console.log(err));