const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) {
    console.log(err);
  }
  conn.createChannel((err, ch) => {
    if (err) {
      console.log(err);
    } else {
      let queueName = "myQueue2";
      let queueName1 = "myQueue1";
      let msg1 = 'my message from subscriber...';

      //let msg = "Hello World";
      ch.assertQueue(queueName, { durable: false });
      ch.assertQueue(queueName1, { durable: false });

      ch.consume(queueName, (msg) => {
        console.log(`[x] Received ${msg.content.toString()}`);
        ch.ack(msg);
      });

      ch.consume(queueName, (msg) => {
        console.log(`[x] Received ${msg.content.toString()}`);
        ch.ack(msg);
      });

      ch.sendToQueue(queueName, Buffer.from(msg1));

      setTimeout(() => {
        conn.close();
      }, 10000);
    }
  });
});
