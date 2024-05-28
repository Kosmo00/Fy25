import { createClient } from "redis";

const redisClient = createClient({
    password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
    socket: {
        host: process.env.NEXT_PUBLIC_REDIS_HOST,
        port: process.env.NEXT_PUBLIC_REDIS_PORT
    }
}) 

redisClient.on('error', (err) => console.log(err))

if(!redisClient.isOpen){
    redisClient.connect()
}

export { redisClient }
