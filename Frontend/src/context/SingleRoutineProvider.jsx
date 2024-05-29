import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/clienteAxios";

// Crea el contexto de rutinas individuales
const SingleRoutineContext = createContext();

// Crea el proveedor de rutinas individuales
const SingleRoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchRoutines = useCallback(async () => {
    try {
      const { data } = await clienteAxios.get("/routines/single", config);
      setRoutines(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching routines");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  const createRoutine = async (clientName, exercises) => {
    try {
      const { data } = await clienteAxios.post(
        "/routines/single",
        { clientName, exercises },
        config
      );
      toast.success("Routine created successfully");
      setRoutines([...routines, data]);
    } catch (error) {
      console.log(error);
      toast.error("Error creating routine");
    }
  };

  const getRoutineById = async (id) => {
    try {
      const { data } = await clienteAxios.get(`/routines/single/${id}`, config);
      setSelectedRoutine(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching routine");
    }
  };

  const updateRoutine = async (id, updatedRoutine) => {
    try {
      const { data } = await clienteAxios.put(
        `/routines/single/${id}`,
        updatedRoutine,
        config
      );
      toast.success("Routine updated successfully");
      setRoutines(
        routines.map((routine) => (routine._id === id ? data : routine))
      );
    } catch (error) {
      console.log(error);
      toast.error("Error updating routine");
    }
  };

  const deleteRoutine = async (id) => {
    try {
      await clienteAxios.delete(`/routines/single/${id}`, config);
      toast.success("Routine deleted successfully");
      setRoutines(routines.filter((routine) => routine._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Error deleting routine");
    }
  };

  const value = useMemo(
    () => ({
      routines,
      selectedRoutine,
      createRoutine,
      getRoutineById,
      updateRoutine,
      deleteRoutine,
      fetchRoutines,
    }),
    [routines, selectedRoutine, fetchRoutines]
  );

  if (loading) return <h1>Loading...</h1>;

  return (
    <SingleRoutineContext.Provider value={value}>
      {children}
    </SingleRoutineContext.Provider>
  );
};

export { SingleRoutineProvider };
export default SingleRoutineContext;
