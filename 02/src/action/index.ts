import { GRAPHIC_DATA, GRAPHIC_DATA_ERROR } from "../util/dataInterface";

export const SET_DATA_STATE = 1;
export const PLOT_GRAPHIC = 2;
export const SEND_ERROR_MESSAGE = 3;

export function setDataState(text: string) {
    return { type: SET_DATA_STATE, text}
}

export function plotGraphic(data: GRAPHIC_DATA[]) {
    return {type: PLOT_GRAPHIC, data};
}

export function sendErrorMessage(errorMsg: GRAPHIC_DATA_ERROR|null) {
    return {type: SEND_ERROR_MESSAGE, errorMsg};
}
