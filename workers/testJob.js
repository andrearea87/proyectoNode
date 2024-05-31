'use strict'

module.exports=async(job, done)=>{
    try {

        job.progress(10);
        let numeros=job.data;
        console.log(numeros);
        setTimeout(function(){
            console.log("Han pasado 20 segundos");
            job.progress(100);
            //return done(null ,{"message":"Job ejecutado correctamente"});
            numeros.message="Job ejecutado correctamente";
            return done(null,numeros);
        },
        2000);          
        
    } catch (error) {
        return done(error);
    }
};