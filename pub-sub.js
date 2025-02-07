const redis = require('redis');

const client = redis.createClient({
    host:'localhost',
    port:6379
});

client.on("error",(error)=>{
    console.log("error connecting to redis client");
    
});

async function testAdditonalFeatures(){
    try {
        await client.connect();

        // const subsriber =  client.duplicate(); //create a new client with same config
        // await subsriber.connect(); // connect to resis sevre for the subscriber

        // await subsriber.subscribe("dummy-channel",(message, channel) =>{
        //     console.log(`recived messsage form ${channel} : ${message}`);
            
        // })

        //publish message to dummy-channel

        // await client.publish('dummy-channel','Some dummy data from publisher');

        //ensure that message are recived before unsubscribing

        // await new Promise((resolve)=> setTimeout(resolve,1000));
        // await subsriber.unsubscribe('dummy-channel');
        // await subsriber.quit();
        // console.log('connection exits');

        // PIPELINE
        // const cartExmaple = client.multi();
        // multi.hIncrBy('cart:1234','item_count',1);
        // multi.hIncrBy('cart:1234',  'total_price',10);

        // multi.execute();

        //PIPELINE COMPRASION
        console.time("without pipeline");

        for(let i=0; i<1000;i++){
            await client.set(`user_key${i}`, `uservalue${i}`);

        }

        console.timeEnd("without pipeline");
        
        console.time("with pipleline");
        const pipleLine =  client.multi();

        for(let i=0; i<1000;i++){
            await pipleLine.set(`userPiple_key${i}`, `userPipeValue${i}`);

        }
        console.timeEnd("with pipleline");

        await pipleLine.exec();
        
        
        
        
    } catch (error) {
    
        console.log(error);
        
    }finally{
        await client.quit()
    }
}

testAdditonalFeatures();