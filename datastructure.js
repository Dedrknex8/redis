const redis = require('redis');

const client =  redis.createClient({
    host  : 'localhost',
    port: 6379 //defualt port
});

async function connectionToRedis(){
    try {
        await client.connect();

        console.log("connect to redis successfully");

        
        // List -> LPUSH, LRANGE,LPOP,RPOP
    
    // sorted sets    //
    //         await client.del("notes");
    
    // sorted sets// 
        // await client.lPush("notes",["note 1","note 2","note 3"])
    
    // sorted sets    // const extractAll = await client.lRange("notes",0,-1);
    
    // sorted sets        // console.log(extractAll);
    
            // sorted sets
        // // sets -> SADD , SMEMBERS, SISMEMBER,SREM
        // // await client.sRem("user:name");
        // await client.sAdd("user:name",["varun","Rahul","randomeNickName"]);

        // const extractSetName = await client.sMembers("user:name");

        // console.log(extractSetName);
        
        // //check if varun is a meber of set or not return true if present and false if not present

        // const isVarunIsOneOfUserNickName = await client.sIsMember("user:name","varun");

        // console.log(isVarunIsOneOfUserNickName);
        
        // const removeName = await client.sRem("user:name","Rahul");
        // console.log(removeName);
        // const getUpdatedUserName = await client.sMembers("user:name");
        // console.log(getUpdatedUserName);

        // sorted sets
        // commands ->zAdd,zrange,zRem

        // await client.zAdd("cart",[
        //     {
        //         score : 100, value:"cart1"
        //     },
        //     {
        //         score : 103, value:"cart2"
        //     },
        //     {
        //         score : 10, value:"cart3"
        //     },
        // ]);

        // const getSortedSet = await client.zRange("cart",0,-1);
        // console.log(getSortedSet);
        // const getCartWithSortedScore  = await client.zRangeWithScores("cart",0,-1);
        // console.log(getCartWithSortedScore);

        //HASHES -> HSET,HGET,HGETALL

        await client.hSet("product",{
            name : "Product 1",
            description: "Prodcut 1 description",
            rating: "5",
        });

        const getProductRatuing = await client.hGet("product","rating");
        console.log(getProductRatuing);
        
        const getProdcutDetail = await client.hGetAll("product");
        console.log(getProdcutDetail);
        
        //del a single value
        await client.hDel("product",'rating');
        const updateValue = await client.hGetAll("product")
        console.log(updateValue);
               

    } catch (error) {
        console.log(error);
        
    }finally{
        await client.quit();
    }
}

connectionToRedis();