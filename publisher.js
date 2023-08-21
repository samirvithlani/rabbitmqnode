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
            let queueName = 'myQueue2';
            let msg = 'from publisher....';
            ch.assertQueue(queueName,{durable:false});
            ch.sendToQueue(queueName,Buffer.from(msg));
            ///get ack from consumer
           // console.log(`[x] Sent ${msg}`);
           ch.consume(queueName, (msg) => {
            console.log(`[x] Received ${msg.content.toString()}`);
            ch.ack(msg);
          });
    
            setTimeout(() => {
                conn.close();
            }, 10000);
        }
    })
});