import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { REDUCER_ACTION, REDUCER_TYPE } from "../types/model";

const InitialState = {
  allowSound: true,
  time: formatTime(new Date()),
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

type TimerContextProp = {
  time: string;
  dispatch: React.Dispatch<REDUCER_TYPE>;
  allowSound: boolean;
  workouts: {
    name: string;
    numExercises: number;
  }[];
  formatTime: (date: Date) => string;
  setTime: (id: string) => void;
};

const TimerContext = createContext<TimerContextProp | undefined>(undefined);

type TimerProviderProp = {
  children: ReactNode;
};
function TimerProvider({ children }: TimerProviderProp) {
  // Will be be AM or PM

  function reducer(
    state: typeof InitialState,
    action: REDUCER_TYPE
  ): typeof InitialState {
    switch (action.type) {
      case REDUCER_ACTION.TIMER:
        return {
          ...state,
          time: action.payload,
        };
      case REDUCER_ACTION.ALLOWED_SOUND:
        return {
          ...state,
          allowSound: !state.allowSound,
        };

      default:
        throw new Error("This code is never to be reached");
    }
  }

  const [{ time, allowSound }, dispatch] = useReducer(reducer, InitialState);

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
    dispatch({ type: REDUCER_ACTION.TIMER, payload: id });
  }

  const value = useMemo(() => {
    return {
      time,
      dispatch,
      allowSound,
      workouts,
      formatTime,
      setTime,
    };
  }, [allowSound, time, workouts]);

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
