/** Third party dependencies & Libraries */
const _ = require("lodash");

/** Local dependencies & Imports */
const { signAndReturnJWT } = require("../../libraries");

const chatNamespace = io.of("/chat");

/** Chat namespace connection handler */
chatNamespace.on("connection", (socket) => {
  try {
    socket.on("disconnect", (args) => {
      console.log("disconnect");
    });

    socket.on("message", (message) => {
      let { room_id } = message;
      console.log({ args });
      chatNamespace.to(room_id).emit("message", message);
    });

    const {
      handshake: {
        query: { token },
      },
    } = socket;

    const { chatId } = signAndReturnJWT(token);

    if (chatId) socket.join(`chatId-${chatId}`);
  } catch (exc) {
    socket.disconnect();

    console.log(exc);
  }
});

const socketsInChatForRoom = (query) => {
  const roomsToUse = Object.keys(query).map((key) => {
    const queryValue = query[key];

    return chatNamespace.to(`${key}-${queryValue}`);
  });

  return roomsToUse;
};

module.exports = {
  namespace: chatNamespace,
  socketsInRoom: socketsInChatForRoom,
};
