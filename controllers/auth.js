'use strict'

require('dotenv').config();
var jwt =require("jsonwebtoken");
const {validationResult}=require('express-validator');
const bcrypt = require('bcrypt');

var Users = require('../models/users');
var Sessions =require('../models/accesstoken')

var controller={
    login_user:function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({status:400,errors:errors.array()});
        }

        var data=req.body;
        Users.findOne({email:data.email})
        .then(usuario =>{
            //console.log(usuario);
            bcrypt.compare(data.password, usuario.password, function(err, result){
                if(result){

                    const payload={
                        user:usuario
                    };
                    let access_token=jwt.sign(payload,process.env.KEY,{
                        expiresIn:'1d'
                    } );
    
                    let today = new Date().toISOString();
    
                    var update_user = {
                        user: usuario.email, 
                        key: access_token,
                        creationDate:today,
                        expirationDate:'1d',
                        active:true 
                    }
    
                    Sessions.findOneAndUpdate({user:usuario.email},update_user, {upsert:true,new:true})
                    .then(sessions =>{
                        //console.log(usuario);
                        if(!sessions){
                            return res.status(401).send({
                                status:401,
                                message:"Usuario no encontrado"
                            });
                        }
                        return res.status(200).send({
                            status:200,
                            message:"Login correcto",
                            token: access_token       
                        });
            
                    })
                    .catch(error=>{
                        //console.error(error);
                        return res.status(500).send({
                            status:500,
                            message:"Error detectado"           
                        });
                    });   
    
    
                    
                }else{
                    return res.status(401).send({
                        status:401,
                        message:"Datos no validos"           
                    });
                }
            });  
            
        })
        .catch(error=>{
            //console.error(error);
            return res.status(401).send({
                status:401,
                message:"Datos no validos"           
            });
        });    
       
    },

    logout:function(req, res){
        const token =req.headers['x-curso2024-access-token'];
        Sessions.findOneAndDelete({user:req.decoded.user.email, key:token})
        .then(session =>{
            //console.log(usuario);
            if(!session){
                return res.status(200).send({
                    status:200,
                    message:"Token invalido"
                });
            }
            return res.status(200).send({
                status:200,
                message:"Sesion finalizada"
            });
        })
        .catch(error=>{
            //console.error(error);
            return res.status(500).send({
                status:500,
                message:"Token invalido"           
            });
        });   
    }

};
module.exports=controller;