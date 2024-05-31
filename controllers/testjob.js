'use strict'

const {testJob}=require('../workers/queues')

var controller={
    test_job: function (req, res){
        let numeros=req.body;
        testJob.add(numeros);
        console.log("Hola mundo desde el controller");
        
        return res.status(200).send({
            status:200,
            message:"El job fue recibido"
        });
    }
}

module.exports=controller;