import GroupRoutine from "../models/groupRoutineModel.js";

// Controlador para crear una nueva rutina grupal
export const createGroupRoutine = async (req, res) => {
  try {
    const { groupName, exercises } = req.body;
    const newRoutine = new GroupRoutine({
      name: groupName,
      exercises: Object.values(exercises).map((ex) => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
      })),
      createdBy: req.user._id, // Assuming you have user authentication and user is attached to request
    });

    await newRoutine.save();
    res.status(201).json({ message: "Group routine created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating group routine", error });
  }
};

// Controlador para obtener todas las rutinas grupales
export const getGroupRoutines = async (req, res) => {
  try {
    const routines = await GroupRoutine.find({ createdBy: req.user._id });
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group routines", error });
  }
};

// Controlador para obtener una rutina grupal por ID
export const getGroupRoutineById = async (req, res) => {
  try {
    const routine = await GroupRoutine.findById(req.params.id);
    if (!routine || routine.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Group routine not found" });
    }
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group routine", error });
  }
};

// Controlador para actualizar una rutina grupal
export const updateGroupRoutine = async (req, res) => {
  try {
    const routine = await GroupRoutine.findById(req.params.id);
    if (!routine || routine.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Group routine not found" });
    }

    routine.name = req.body.groupName || routine.name;
    routine.exercises = req.body.exercises
      ? Object.values(req.body.exercises).map((ex) => ({
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
        }))
      : routine.exercises;

    await routine.save();
    res.status(200).json({ message: "Group routine updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating group routine", error });
  }
};

// Controlador para eliminar una rutina grupal
export const deleteGroupRoutine = async (req, res) => {
  try {
    const routine = await GroupRoutine.findById(req.params.id);
    if (!routine || routine.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Group routine not found" });
    }

    await routine.remove();
    res.status(200).json({ message: "Group routine deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting group routine", error });
  }
};
