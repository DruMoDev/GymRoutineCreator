import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
});

const singleRoutineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  exercises: {
    preventive1: exerciseSchema,
    preventive2: exerciseSchema,
    kneeDominant: exerciseSchema,
    hipDominant: exerciseSchema,
    core: exerciseSchema,
    lowerUpperBody: exerciseSchema,
    clientRelated: exerciseSchema,
    rotational: exerciseSchema,
    starts: exerciseSchema,
  },
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

const SingleRoutine = model("SingleRoutine", singleRoutineSchema);

export default SingleRoutine;
