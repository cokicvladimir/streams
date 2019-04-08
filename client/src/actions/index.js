import streams from '../api/streams';
import {
    CREATE_STREAM,
    SIGN_IN,
    SIGN_OUT,
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM
} from "./types";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};


//formValues-from redux-forms, history-from withRouter HOC; see: StreamCreate.js
export const createStream = (formValues, history) => async (dispatch, getState) =>{
    const { userId } = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});
    dispatch({ type: CREATE_STREAM, payload: response.data});
    history.push('/');
};

export const fetchStreams = () => async dispatch =>{
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch =>{
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValues, history) => async dispatch =>{
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data});
    history.push('/');
};

export const deleteStream = (id, history) => async dispatch =>{
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id});
    history.push('/');
};
