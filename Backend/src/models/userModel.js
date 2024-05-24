import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
});

userSchema.pre("save", async function (next) {
    // Comprueba que no se haya modificado ya para no hashear algo hasheado ya. Utiliza isModified de moongose.
    if (!this.isModified("password")) {
      next(); //Next es un metodo de express para mandarte al siguiente midleware sin hacer un return.
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

// Código para comprobar el password | El methods.X crea un metodo para Usuario, que puede utilizar cuando quieras.
userSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password); // Compara el password que el usuario escribe con el de la base de datos
};


const User = model("User", userSchema);
export default User;
