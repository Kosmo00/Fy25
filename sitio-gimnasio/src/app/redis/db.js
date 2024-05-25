import { createClient } from "redis";

const redisClient = await createClient({
    password: '',
    socket: {
        host: 'localhost',
        port: '6379'
    }
}) 

redisClient.on('error', (err) => console.log(err))

if(!redisClient.isOpen){
    redisClient.connect()
}

export { redisClient }
