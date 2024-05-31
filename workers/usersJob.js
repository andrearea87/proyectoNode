'use strict'

var Users = require('../models/users');
const bcrypt = require('bcrypt');


module.exports=async(job, done)=>{
    try {

        let data = job.data;

        Users.findOne({iduser:data.iduser})
        .then(usuario =>{
            //console.log(usuario);
            if(usuario){  
                return done(new Error('Usuario existente.'))
            }       

            const saltRounds=10;
            //Crypt de pass
            bcrypt.genSalt(saltRounds, function (err, salt){
                bcrypt.hash(data.password, salt, function (err, hash){
                    var create_user=new Users();
                    create_user.iduser=data.iduser;
                    create_user.nombre=data.nombre;
                    create_user.edad=data.edad; 
                    create_user.email=data.email;                  
                    create_user.password=hash;
            
                    create_user.save()
                    .then(result =>{
                       // console.log(result);
                       job.progress(100);
                        return done(null, result);
                    })
                    .catch(error=>{
                        //console.error(error);
                        return done(error);
                    });  
                });
            });

        })
        .catch(error=>{
            //console.error(error);
           return done(error);
        });
        
        //return done(null,"Job ejecutado correctamente");
        
    } catch (error) {
        return done(error);
    }
};