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

        const subsriber =  client.duplicate(); //create a new client with same config
        await subsriber.connect(); // connect to resis sevre for the subscriber

        await subsriber.subscribe("dummy-channel",(message, channel) =>{
            console.log(`recived messsage form ${channel} : ${message}`);
            
        })

        //publish message to dummy-channel

        await client.publish('dummy-channel','Some dummy data from publisher');

        //ensure that message are recived before unsubscribing

        await new Promise((resolve)=> setTimeout(resolve,1000));
        await subsriber.unsubscribe('dummy-channel');
        await subsriber.quit();
        console.log('connection exits');
        
    } catch (error) {
    
        console.log(error);
        
    }finally{
        await client.quit()
    }
}

testAdditonalFeatures();