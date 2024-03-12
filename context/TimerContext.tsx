import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { REDUCER_TIME_ACTION, REDUCER_TIME_TYPE } from "../types/model";

const InitialState = {
  time: "",
};

type TimerContextProp = {
  time: string;
  dispatch: React.Dispatch<REDUCER_TIME_TYPE>;
  workouts: {
    name: string;
    numExercises: number;
  }[];
  formatTime: (date: Date) => string;
  setTime: (id: string) => void;
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}
const TimerContext = createContext<TimerContextProp | undefined>(undefined);

type TimerProviderProp = {
  children: ReactNode;
};
function TimerProvider({ children }: TimerProviderProp) {
  // Will be be AM or PM

  function reducer(
    state: typeof InitialState,
    action: REDUCER_TIME_TYPE
  ): typeof InitialState {
    switch (action.type) {
      case REDUCER_TIME_ACTION.TIMER:
        return {
          ...state,
          time: action.payload ? action.payload : "",
        };

      default:
        throw new Error("This code is never to be reached");
    }
  }

  const [{ time }, dispatch] = useReducer(reducer, InitialState);

  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  function setTime(id: string) {
    dispatch({ type: REDUCER_TIME_ACTION.TIMER, payload: id });
  }

  const value = useMemo(() => {
    return {
      time,
      dispatch,
      workouts,
      formatTime,
      setTime,
    };
  }, [time, workouts]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

function useTimer() {
  const context = useContext(TimerContext);

  if (context === undefined)
    throw new Error("Context was used outside a provider");

  return context;
}

export { useTimer, TimerProvider };
