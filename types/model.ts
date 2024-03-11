export enum REDUCER_ACTION {
  TIMER,
  ALLOWED_SOUND,
}

export interface REDUCER_TYPE {
  type: REDUCER_ACTION;
  payload: string;
}

export type WorkoutProp = {
  name: string;
  numExercises: number;
}[];
