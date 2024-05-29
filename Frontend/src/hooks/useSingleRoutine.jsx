import { useContext } from "react";
import SingleRoutineContext from "../context/SingleRoutineProvider";

const useSingleRoutine = () => {
  return useContext(SingleRoutineContext);
};

export default useSingleRoutine;
