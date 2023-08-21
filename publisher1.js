const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    if(err){
        console.log(err);
    }
    conn.createChannel((err,ch)=>{
        if(err){
            console.log(err);
        }
        else{
            let queueName = 'myQueue1';
            let msg = 'publisher 1';
            ch.assertQueue(queueName,{durable:false});
            ch.sendToQueue(queueName,Buffer.from(msg));
            ///get ack from consumer
           // console.log(`[x] Sent ${msg}`);
            setTimeout(() => {
                conn.close();
            }, 1000);
        }
    })
});