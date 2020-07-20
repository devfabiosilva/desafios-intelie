export const SET_DATA_STATE = 1;

export function setDataState(text: string) {
    return { type: SET_DATA_STATE, text}
}
