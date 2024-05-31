import { Organization } from "../models/models.js";

// Controlador para obtener una organización por su ID ✅
export const getOrganization = async (req, res) => {
  res.json(req.organization);
};

// Controlador para crear una nueva organización ✅
export const createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    organization.director = req.user._id;
    await organization.save();
    res
      .status(201)
      .json({ message: "Organization created successfully!", organization });
  } catch (error) {
    res.status(500).json({ message: "Error creating organization", error });
  }
};

// Controlador para actualizar una organización existente
export const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (organization) {
      organization.name = req.body.name || organization.name;
      organization.staff = req.body.staff || organization.staff;
      organization.clients = req.body.clients || organization.clients;
      organization.extras = req.body.extras || organization.extras;

      await organization.save();
      res.json({ message: "Organization updated successfully" });
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating organization", error });
  }
};

// Controlador para eliminar una organización
export const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (organization) {
      await organization.remove();
      res.json({ message: "Organization deleted successfully" });
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting organization", error });
  }
};

// Controlador para crear una rutina a un cliente por ID
export const createOrganizationClientRoutine = async (req, res) => {
  const { organizationId, clientId } = req.params;
  const { routine } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const client = organization.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.routines.push(routine);
    await organization.save();

    res.json({
      message: "Routine added to client",
      routine: client.routines.slice(-1)[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding routine to client", error });
  }
};

// Controlador para eliminar una rutina de un cliente por ID
export const deleteOrganizationClientRoutine = async (req, res) => {
  const { organizationId, clientId, routineId } = req.params;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const client = organization.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.routines = client.routines.filter(
      (routine) => routine._id.toString() !== routineId
    );
    await organization.save();

    res.json({ message: "Routine removed from client" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing routine from client", error });
  }
};

// Controlador para obtener todas las rutinas de un cliente
export const getOrganizationClientRoutines = async (req, res) => {
  const { organizationId, clientId } = req.params;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const client = organization.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client.routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routines", error });
  }
};
