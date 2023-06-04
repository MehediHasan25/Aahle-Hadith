// AuthService.js

class AuthService {
    getToken() {
      return localStorage.getItem('AuthToken');
    }
  
    setToken(token) {
      localStorage.setItem('AuthToken', token);
    }
  
    removeToken() {
      localStorage.removeItem('AuthToken');
    }
  
    isTokenExpired() {
      const token = this.getToken();
      if (!token) return true;
  
      // Extract and decode the token payload
      const payload = JSON.parse(atob(token.split('.')[1]));
  
      // Check if the token expiration time has passed
      return Date.now() >= payload.exp * 1000;
    }
  }
  
  export default new AuthService();
  