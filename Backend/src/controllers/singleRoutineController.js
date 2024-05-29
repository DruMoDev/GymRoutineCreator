import SingleRoutine from "../models/singleRoutineModel.js";

// Controlador para crear una nueva rutina
export const createRoutine = async (req, res) => {
  try {
    const { clientName, exercises } = req.body;

    const newRoutine = new SingleRoutine({
      name: clientName,
      exercises: exercises,
      createdBy: req.user._id, // Assuming you have user authentication and user is attached to request
    });

    await newRoutine.save();
    res.status(201).json({ message: "Routine created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating routine", error });
  }
};

// Controlador para obtener todas las rutinas
export const getRoutines = async (req, res) => {
  try {
    const routines = await SingleRoutine.find({ createdBy: req.user._id });
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routines", error });
  }
};

// Controlador para obtener una rutina por ID
export const getRoutineById = async (req, res) => {
  try {
    const routine = await SingleRoutine.findById(req.params.id);
    if (!routine || routine.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routine", error });
  }
};

// Controlador para actualizar una rutina
export const updateRoutine = async (req, res) => {
  try {
    const routine = await SingleRoutine.findById(req.params.id);
    if (!routine || routine.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Routine not found" });
    }

    routine.name = req.body.clientName || routine.name;
    routine.exercises = req.body.exercises
      ? Object.values(req.body.exercises).map((ex) => ({
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
        }))
      : routine.exercises;

    await routine.save();
    res.status(200).json({ message: "Routine updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating routine", error });
  }
};

// Controlador para eliminar una rutina
export const deleteRoutine = async (req, res) => {
  const id = req.params.id;
  
  try {
    const routine = await SingleRoutine.findById(id);
    if (!routine || routine.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Routine not found" });
    }
    console.log(routine);
    
    await routine.deleteOne();
    res.status(200).json({ message: "Routine deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting routine", error });
  }
};
