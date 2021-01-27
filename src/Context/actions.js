
import config from "../config.json";
import http from "../Services/httpService";

export async function loginUser(dispatch, loginPayload) {


    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await http.post(`${config.apiLogin}/Login`, loginPayload);
        let data = await response;

        if (response.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            //localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}