//@ts-ignore
import { combineReducers, createStore } from 'redux';
import { SET_DATA_STATE, PLOT_GRAPHIC, SEND_ERROR_MESSAGE } from '../action';
import { GRAPHIC_DATA, GRAPHIC_DATA_ERROR } from '../util/dataInterface';

function saveEditorState(
    state = { text: "" },
    action: any
)
{
    switch (action.type) {
        case SET_DATA_STATE:
            return { text: action.text };

        default:
            return state;
    }
}

function graphicData(
    state: GRAPHIC_DATA[] = [],
    action: any
): GRAPHIC_DATA[]
{

    switch (action.type) {
        case PLOT_GRAPHIC:
            return action.data as GRAPHIC_DATA[];
        
        default:
            return state;
    }

}

export function errorMsg(
    state: GRAPHIC_DATA_ERROR|null = null,
    action: any
)
{
    switch (action.type) {
        case SEND_ERROR_MESSAGE:
            return action.errorMsg;

        default:
            return state;
    }
}

const graphic_data_state = combineReducers(
    { 
        saveEditorState,
        graphicData,
        errorMsg
    }
);

export const store = createStore(graphic_data_state);
