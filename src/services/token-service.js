export default class TokenService {
    getEmail = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).email;
        }
        catch {
            return null;
        }
    }
}