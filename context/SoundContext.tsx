import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { REDUCER_SOUND_ACTION, REDUCER_SOUND_TYPE } from "../types/model";

type soundProp = {
  children: ReactNode;
};

type SoundContextProp = {
  allowSound: boolean;
  dispatch: React.Dispatch<REDUCER_SOUND_TYPE>;
};

const InitialState = {
  allowSound: false,
};
const SoundContext = createContext<SoundContextProp | undefined>(undefined);
function SoundProvider({ children }: soundProp) {
  function reducer(
    state: typeof InitialState,
    action: REDUCER_SOUND_TYPE
  ): typeof InitialState {
    switch (action.type) {
      case REDUCER_SOUND_ACTION.ALLOWED_SOUND:
        return {
          ...state,
          allowSound: !state.allowSound,
        };

      default:
        throw new Error("This code is never to be reached");
    }
  }
  const [{ allowSound }, dispatch] = useReducer(reducer, InitialState);
  const value = useMemo(() => {
    return {
      allowSound,
      dispatch,
    };
  }, [allowSound]);
  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

function useSound() {
  const context = useContext(SoundContext);

  if (context === undefined)
    throw new Error("Context was used outside of a provider");

  return context;
}

export { useSound, SoundProvider };
