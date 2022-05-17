const mongoose = require("mongoose");
const _ = require("lodash");

const {
  Types: { ObjectId },
} = mongoose;

const ChatSchema = mongoose.Schema(
  {
    users: {
      type: [ObjectId],
    },
    chatname: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

/**
 * Chat Methods
 */
ChatSchema.methods = {
  safeModel: function (attributesToOmit = []) {
    return _.omit(this.toObject(), [...attributesToOmit]);
  },
};

/** Chat Methods */
ChatSchema.methods = {
  safeModel: function (attributesToOmit) {
    return _.omit(this.toObject(), [...attributesToOmit]);
  },
};

/**
 * Chat Statics
 */
ChatSchema.statics = {
  async get(id) {
    try {
      let chat = await this.findOne({ id }).lean().exec();
      if (!chat) {
        const e = new Error("No such chat found");
        throw e;
      }
      return chat.active ? chat : { active: false };
    } catch (error) {
      throw error;
    }
  },

  async updateData(chat, data) {
    try {
      let updated = await chat.update(data);
      if (!updated.nModified) {
        const error = new Error("chat not updated");
        throw error;
      }
      return updated;
    } catch (error) {
      throw error;
    }
  },
};

const Chat = mongoose.model("Chat", ChatSchema);

/**
 * @typedef Chat
 */
module.exports = {
  Chat,
  ChatSchema,
};
