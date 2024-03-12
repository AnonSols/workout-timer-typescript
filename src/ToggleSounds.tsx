import { memo } from "react";
import { useSound } from "../context/SoundContext";
import { REDUCER_SOUND_ACTION } from "../types/model";

const ToggleSounds = memo(function ToggleSounds() {
  const { allowSound, dispatch } = useSound();
  return (
    <button
      className="btn-sound"
      onClick={() => dispatch({ type: REDUCER_SOUND_ACTION.ALLOWED_SOUND })}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});

export default ToggleSounds;
