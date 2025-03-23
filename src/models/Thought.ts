import mongoose, { Schema, model, Document } from 'mongoose';

interface IReaction {
  reactionId: Schema.Types.ObjectId;
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

const ReactionSchema = new Schema<IReaction>({
  reactionId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ThoughtSchema = new Schema<IThought>(
  {
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [ReactionSchema]
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);
export default Thought;