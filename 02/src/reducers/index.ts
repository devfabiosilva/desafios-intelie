//@ts-ignore
import { combineReducers, createStore } from 'redux';
import { SET_DATA_STATE } from '../action';

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

const graphic_data_state = combineReducers(
    { 
        saveEditorState
    }
);

export const store = createStore(graphic_data_state);
