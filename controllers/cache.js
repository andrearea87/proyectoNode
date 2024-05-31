'use strict'

var controller={
    testcache:function(req, res){
        let saludos=[];
        for (let index = 0; index < 10000; index++) {
            console.log("Hola soy el numero "+index);
            saludos.push("Hola soy el numero "+index);
            
        }

        return res.status(200).send({
            status:200,
            message:"Test de cache",
            data:saludos
        });
    },

    fibo:function(req, res){
        let n=100000;
        var fib = [0,1];
        for(var i=2;i<=n;i++){
            fib[i]=fib[i-1]+fib[i-2];
        }
        

        return res.status(200).send({
            status:200,
            message:"Test de fibo",
            data:fib.slice(0,n+1)
        });
    }


};
module.exports=controller;