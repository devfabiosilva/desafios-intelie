import { GRAPHIC_DATA } from "../util/dataInterface";

export const SET_DATA_STATE = 1;
export const PLOT_GRAPHIC = 2;

export function setDataState(text: string) {
    return { type: SET_DATA_STATE, text}
}

export function plotGraphic(data: GRAPHIC_DATA[]) {
    return {type: PLOT_GRAPHIC, data};
}
