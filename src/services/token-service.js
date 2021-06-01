import API from '../api';
import { setJwtToken, removeJwtToken } from '../redux/jwtTokenSlice';
import { setRefreshToken, removeRefreshToken } from '../redux/refreshTokenSlice';
import store from '../redux/store';

export default class TokenService {
    getEmail = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).email;
        }
        catch {
            return null;
        }
    }

    refreshCurrentToken = async (refreshToken) => {
        console.log(store.refreshToken);
        await API.post(`/users/refresh-token`, {
            refreshToken: refreshToken,
        })
        .then(response => response.data)
        .then(data => {
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            store.dispatch(setJwtToken(data.jwtToken));
            store.dispatch(setRefreshToken(data.refreshToken));
        })
        .catch(error => {
            console.log(error.response.data);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('refreshToken');
            store.dispatch(removeJwtToken());
            store.dispatch(removeRefreshToken());
        });
    }
}