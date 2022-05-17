/** Third party dependencies*/
const mongoose = require("mongoose");
const _ = require("lodash");

/** Local libraries & dependencies */
const { extendSchema } = require("../utils");
const { BaseSchema } = require("./schema/base.schema");

const {
  Types: { ObjectId },
} = mongoose;

/** Un-discriminated (without base) */
const MessageSchema = mongoose.Schema(
  {
    chatId: {
      type: ObjectId,
      required: true,
    },
    messagename: {
      type: String,
      required: true,
      unique: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    reactions: {
      type: [string],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Message Methods
 */
MessageSchema.methods = {
  safeModel: function (attributesToOmit = []) {
    return _.omit(this.toObject(), [...attributesToOmit]);
  },
};

/** Message Methods */
MessageSchema.methods = {
  safeModel: function (attributesToOmit) {
    return _.omit(this.toObject(), [...attributesToOmit]);
  },
};

/**
 * Message Statics
 */
MessageSchema.statics = {
  async get(id) {
    try {
      let message = await this.findOne({ id }).lean().exec();
      if (!message) {
        const e = new Error("No such message found");
        throw e;
      }
      return message.active ? message : { active: false };
    } catch (error) {
      throw error;
    }
  },

  async updateData(message, data) {
    try {
      let updated = await message.update(data);
      if (!updated.nModified) {
        const error = new Error("message not updated");
        throw error;
      }
      return updated;
    } catch (error) {
      throw error;
    }
  },
};

/** Discriminating Message Schema using Base model */
const Message = mongoose.model("Message", MessageSchema);

/**
 * @typedef Message
 */
module.exports = {
  Message,
  MessageSchema,
};
