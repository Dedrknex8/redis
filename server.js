const redis = require('redis');

const client = redis.createClient({
    host : 'localhost',
    port : 6379
});

//Error event
client.on('Error', (error)=> console.log(error)
);

async function redisConnection(){
    try {
        await client.connect();
        console.log("connect to redis successfully");
        
        //Set key and value
        await client.set("name","Dedrknex");

        const extractValue = await client.get("name");
        console.log(extractValue);
        
        //To delete a key

        const delvalue  = await client.del("name");
        console.log("this will",delvalue); //this will return count of del value

        const NewUpdatedValue  = await client.get("name");
        
        console.log(NewUpdatedValue); //This will return null as no value is associated with it

        
        
    } catch (error) {
        console.log(error);
        
    }finally{
        await client.quit();
    }
}

redisConnection();