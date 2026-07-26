const redis = require("redis");
require("dotenv").config();

let redisClient = null;

const host = process.env.host_link;
const password = process.env.redis_pass;
const port = parseInt(process.env.redis_port, 10);

if (
    host &&
    password &&
    Number.isInteger(port)
) {

    redisClient = redis.createClient({
        username: "default",
        password,
        socket: {
            host,
            port
        }
    });

    redisClient.on("error", err => {
        console.log("Redis Error:", err.message);
    });

} else {

    console.log("Redis Disabled");

}

module.exports = redisClient;