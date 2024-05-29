import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const blockSchema = new Schema({
  blockName: {
    type: String,
    required: true,
  },
  exercises: [exerciseSchema],
});

const groupRoutineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  blocks: [blockSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GroupRoutine = model("GroupRoutine", groupRoutineSchema);

export default GroupRoutine;
