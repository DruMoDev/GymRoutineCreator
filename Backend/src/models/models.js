import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// Schema de ejercicio
const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  observations: {
    type: String,
  },
});

// Schema de bloque
const blockSchema = new Schema({
  blockName: {
    type: String,
    required: true,
  },
  exercises: [exerciseSchema],
});

// Schema de rutina
const routineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  blocks: [blockSchema],
  exercises: [exerciseSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema de cliente
const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  routines: [routineSchema],
  observations: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema de organización
const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  staff: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  director: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clients: [clientSchema],
  extras: {
    type: Map,
    of: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema de usuario
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  clients: [clientSchema],
  templates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Template",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const User = model("User", userSchema);
const Organization = model("Organization", organizationSchema);
const Client = model("Client", clientSchema);

export { User, Organization, Client };
