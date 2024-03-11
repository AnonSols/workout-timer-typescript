import { REDUCER_ACTION_TYPE, useTimer } from "../context/TimerContext";

function ToggleSounds() {
  const { allowSound, dispatch } = useTimer();
  return (
    <button
      className="btn-sound"
      onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.ALLOWED_SOUND })}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default ToggleSounds;
