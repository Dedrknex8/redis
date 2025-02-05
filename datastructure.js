const redis = require('redis');

const client =  redis.createClient({
    host  : 'localhost',
    port: 6379 //defualt port
});

async function connectionToRedis(){
    try {
        await client.connect();

        console.log("connect to redis successfully");

        
        //List -> LPUSH, LRANGE,LPOP,RPOP
        await client.del("notes");

        await client.lPush("notes",["note 1","note 2","note 3"])
        const extractAll = await client.lRange("notes",0,-1);
        console.log(extractAll);
        
        // sets -> SADD , SMEMBERS, SISMEMBER,SREM
        // await client.sRem("user:name");
        await client.sAdd("user:name",["varun","Rahul","randomeNickName"]);

        const extractSetName = await client.sMembers("user:name");

        console.log(extractSetName);
        
        //check if varun is a meber of set or not return true if present and false if not present

        const isVarunIsOneOfUserNickName = await client.sIsMember("user:name","varun");

        console.log(isVarunIsOneOfUserNickName);
        
        const removeName = await client.sRem("user:name","Rahul");
        console.log(removeName);
        const getUpdatedUserName = await client.sMembers("user:name");
        console.log(getUpdatedUserName);


    } catch (error) {
        console.log(error);
        
    }finally{
        await client.quit();
    }
}

connectionToRedis();