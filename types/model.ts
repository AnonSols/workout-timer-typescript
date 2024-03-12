export enum REDUCER_TIME_ACTION {
  TIMER,
}

export interface REDUCER_TIME_TYPE {
  type: REDUCER_TIME_ACTION;
  payload?: string;
}
export enum REDUCER_SOUND_ACTION {
  ALLOWED_SOUND,
}

export interface REDUCER_SOUND_TYPE {
  type: REDUCER_SOUND_ACTION;
  payload?: string;
}
