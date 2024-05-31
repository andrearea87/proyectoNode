'use strict'

let redis = {
    port: 14427,
    host:'redis-14427.c308.sa-east-1-1.ec2.redns.redis-cloud.com',
    password:'wFNgJOfo62vc9U6U03kqmRAlJCt2HKVd'
};

const {
    testJob:testJobWorker,
    usersJob:usersJobWorker
} = require("./workers");

const Queue = require('bull');

const testJob = new Queue('testJob',{
    redis
});

const usersJob = new Queue('usersJob',{
    redis
});

testJob.process(1,(job,done)=>testJobWorker(job, done));
usersJob.process(1,(job,done)=>usersJobWorker(job, done));

const queues =[
    {   
        name:'testJob',
        hostId:'Job de test de configuracion',
        redis
    },
    {   
        name:'usersJob',
        hostId:'Job de creacion de usuarios',
        redis
    }
];

module.exports={
    testJob,
    usersJob,
    queues
}
