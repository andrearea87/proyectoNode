'use strict'

const Queue = require('bull');

const myQueue = new Queue('myQueue',{
    redis:{
        port: 14427,
        host:'redis-14427.c308.sa-east-1-1.ec2.redns.redis-cloud.com',
        password:'wFNgJOfo62vc9U6U03kqmRAlJCt2HKVd'
    }
});

myQueue.process(async (job)=>{
    console.log(`Procesando tarea con ID ${job.id}`);
    await new Promise(resolve => setTimeout(resolve,3000));
    console.log(`Tarea completada para el ID ${job.id}`);
});

for(let i=0; i<5 ; i++ ){
    myQueue.add({index:i

    });
}