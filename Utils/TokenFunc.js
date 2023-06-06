export function isTokenExpired(token) {
    if (!token) {
      return true; // Token is not provided
    }
  
    const decodedToken = decodeToken(token); // Decode the token (implementation depends on your token format)
    const currentTime = Date.now() / 1000; // Get the current time in seconds
  
    return decodedToken.exp < currentTime; // Compare expiration time with current time
  }