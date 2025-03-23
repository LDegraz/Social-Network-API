import mongoose, { Schema, model, Document } from 'mongoose';
import { formatDate } from '../utils/formatDate.js';

interface IReaction {
  reactionId: mongoose.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

const ReactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => formatDate(timestamp),
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => formatDate(timestamp),
    },
    username: { type: String, required: true },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);
export default Thought;
