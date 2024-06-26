import { User } from "../models/models.js";
import generateJWT from "../utils/generateJWT.js";

// Controlador para registrar un nuevo usuario ✅
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({ error: "This email is already registered" });
  }

  try {
    const user = new User(req.body);
    user.token = generateJWT(user._id);
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Controlador para iniciar sesión ✅
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "This user doesn't exist" });
    }
    if (await user.comprobarPassword(password)) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
        clients: user.clients,
      });
    } else {
      res.status(403).json({ message: "Wrong password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// Controlador para obtener el perfil de un usuario con el token ✅
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (username) {
    req.user.username = username;
  }
  if (email) {
    req.user.email = email;
  }
  if (password) {
    req.user.password = password;
  }

  try {
    await req.user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// Controlador para registrar un cliente nuevo en el usuario ✅
export const registerUserClient = async (req, res) => {
  const client = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.clients.push(client);
    await user.save();
    res.status(201).json({
      message: "Client registered successfully",
      client: user.clients.slice(-1)[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering client", error });
  }
};

// Controlador para actualizar un cliente
export const updateUserClient = async (req, res) => {
  const { clientId } = req.params;
  const { name, age, routines, observations } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const client = user.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    client.name = name || client.name;
    client.age = age || client.age;
    client.routines = routines || client.routines;
    client.observations = observations || client.observations;

    await user.save();

    res.json({ client, message: "Client updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};

// Controlador para eliminar un cliente ✅
export const deleteUserClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const client = user.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    user.clients = user.clients.filter(
      (client) => client._id.toString() !== clientId
    );
    console.log(user.clients);
    await user.save();
    res.json({ client, message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};

// Controlador para crear una rutina a un cliente por ID
export const createClientRoutine = async (req, res) => {
  const { clientId } = req.params;
  const { routine } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const client = user.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.routines.push(routine);
    await user.save();

    res.json({
      message: "Routine added to client",
      routine: client.routines.slice(-1)[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding routine to client", error });
  }
};

// Controlador para eliminar una rutina de un cliente por ID
export const deleteClientRoutine = async (req, res) => {
  const { clientId, routineId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const client = user.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.routines = client.routines.filter(
      (routine) => routine._id.toString() !== routineId
    );
    await user.save();

    res.json({ message: "Routine removed from client" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing routine from client", error });
  }
};
