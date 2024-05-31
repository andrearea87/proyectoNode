'use strict'

const {validationResult}=require('express-validator');

var Users = require('../models/users');
const bcrypt = require('bcrypt');

const {usersJob}=require('../workers/queues');

var controller={
    userlist:function(req,res){
        Users.find({})
        .then(usuarios =>{
            console.log(usuarios);
            return res.status(200).send({
                status:200,
                message:"Listado de Usuarios",
                data:usuarios
            });
        })
        .catch(error=>{
            console.error(error);
            return res.status(500).send({
                status:500,
                message:"Error detectado"           
            });
        });    
       
    },

    userSingular:function(req,res){
        var params=req.params;
        var iduser=params.iduser;
        Users.findOne({iduser:parseInt(iduser)})
        .then(usuario =>{
            console.log(usuario);
            if(usuario != null){
                return res.status(200).send({
                    status:200,
                    message:"Informacion del usuario",
                    data:usuario
                });
            }
            return res.status(200).send({
                status:200,
                message:"Usuario no encontrado"
            });
        })
        .catch(error=>{
            console.error(error);
            return res.status(500).send({
                status:500,
                message:"Error detectado"           
            });
        });    
       
    },

    createuser:function(req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400,errors:errors.array()});
        }

        var data=req.body;
        usersJob.add(data);
        return res.status(200).send({
            status:200,
            message:"Usuario recibido" 
                      
        });           
       
    },

    updateuser:function(req,res){

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400,errors:errors.array()});
        }

        var params = req.params;
        var iduser=params.iduser;
        var data=req.body;

        const saltRounds=10;
            //Crypt de pass
            bcrypt.genSalt(saltRounds, function (err, salt){
                bcrypt.hash(data.password, salt, function (err, hash){
                    var update_user={
                        iduser:data.iduser,
                        nombre:data.nombre,
                        edad:data.edad,                       
                        password:hash,
                        email:data.email
                    };
                    //console.log(data.iduser);
                    Users.findOneAndUpdate({iduser:parseInt(data.iduser)},update_user)
                    .then(usuario =>{
                        //console.log(usuario);
                        if(!usuario){
                            return res.status(200).send({
                                status:200,
                                message:"Usuario no encontrado put"
                            });
                        }
                        return res.status(200).send({
                            status:200,
                            message:"Usuario Actualizado"
                        });
            
                    })
                    .catch(error=>{
                        console.error(error);
                        return res.status(500).send({
                            status:500,
                            message:"Error detectado"           
                        });
                    }); 
                });
            });
    },

    deleteuser:function(req,res){
        var params = req.params;
        var iduser=params.iduser;
        Users.findOneAndDelete({iduser:parseInt(iduser)})
        .then(usuario =>{
            //console.log(usuario);
            if(!usuario){
                return res.status(200).send({
                    status:200,
                    message:"Usuario no encontrado"
                });
            }
            return res.status(200).send({
                status:200,
                message:"Usuario eliminado"
            });
        })
        .catch(error=>{
            console.error(error);
            return res.status(500).send({
                status:500,
                message:"Error detectado"           
            });
        });   

    }
};

module.exports=controller;