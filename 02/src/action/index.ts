import { GRAPHIC_DATA, GRAPHIC_DATA_ERROR } from "../util/dataInterface";

export const SET_DATA_STATE = 1;
export const PLOT_GRAPHIC = 2;
export const SEND_ERROR_MESSAGE = 3;
/**
 * This function save all text changing in CodeMirror to Redux state
 */
export function setDataState(text: string) {
    return { type: SET_DATA_STATE, text}
}

/**
 * This function stores all data extracted from Codemirror text to Redux state
 */
export function plotGraphic(data: GRAPHIC_DATA[]) {
    return {type: PLOT_GRAPHIC, data};
}

/**
 * This function stores last error to Redux state
 */
export function sendErrorMessage(errorMsg: GRAPHIC_DATA_ERROR|null) {
    return {type: SEND_ERROR_MESSAGE, errorMsg};
}
