export default class TokenService {
    getEmail = () => {
        try {
            return JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).email;
        }
        catch {
            return null;
        }
    }
}