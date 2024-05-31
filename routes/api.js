'use strict'

const express = require('express');
const {body}=require('express-validator');
const expressRedisCache=require('express-redis-cache');

var api=express.Router();
var middleware=require("../middleware/middleware");
var UsersController=require("../controllers/users");
var AuthController=require("../controllers/auth");
var TestCacheController=require("../controllers/cache");
var TestJobController=require('../controllers/testjob');

const cache = expressRedisCache({
    host:'redis-14427.c308.sa-east-1-1.ec2.redns.redis-cloud.com',
    port: 14427,
    auth_pass:'wFNgJOfo62vc9U6U03kqmRAlJCt2HKVd',
    expire:1500
});

//login
api.post('/login',  [
    body("email").not().isEmpty(),
    body("password").not().isEmpty()   
],AuthController.login_user);

//logout
api.post('/logout', middleware.userprotectUrl, AuthController.logout);

//Usuarios
api.get('/user', middleware.userprotectUrl, UsersController.userlist);
api.get('/user/:iduser', middleware.userprotectUrl, UsersController.userSingular);
    
api.post('/user', middleware.userprotectUrl, [
    body("nombre").not().isEmpty(),   
    body("edad").not().isEmpty(),
    body("iduser").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
],UsersController.createuser);
    
api.put('/user/:iduser', middleware.userprotectUrl,  [
    body("nombre").not().isEmpty(),  
    body("edad").not().isEmpty(),
    body("iduser").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
]
,UsersController.updateuser)  ;

api.delete('/user/:iduser',middleware.userprotectUrl, UsersController.deleteuser); 


//Test cache
api.get('/testcache',cache.route(),TestCacheController.testcache);
api.get('/fibo',cache.route(),TestCacheController.fibo);

//Test jobs
api.get('/testjob',TestJobController.test_job)


module.exports=api;