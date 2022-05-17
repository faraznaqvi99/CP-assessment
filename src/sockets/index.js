const http = require("http");
const socketIO = require("socket.io");
const redis = require("redis").createClient;
const socketIoRedis = require("socket.io-redis");

const {
  SOCKET_IO_REDIS_PORT: socketIoRedisPort,
  REDIS_DB_NO: db,
  REDIS_HOST: host,
} = require("../config");

/**
 * @param {*} server - HTTP Server extended with Express Instance
 * @returns {*} server
 */
const socketIntializationWithExpress = function (server) {
  global["io"] = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const pubClient = redis(socketIoRedisPort, host, { db });
  const subClient = redis(socketIoRedisPort, host, { db });

  const redisAdapterForIo = socketIoRedis({
    pubClient,
    subClient,
  });

  io.adapter(redisAdapterForIo);

  const chat = require("./modules/chat");

  Object.assign(io, {
    chat,
  });
  return server;
};

module.exports = {
  socketIntializationWithExpress,
};
