import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    // Get the access token for the storage
    const Token = AsyncStorage.getItem(
        `${this.namespace}:Token`,
    )
    return Token
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    AsyncStorage.setItem(
        `${this.namespace}:Token`,
        accessToken,
      );
  }

  removeAccessToken() {
    // Remove the access token from the storage
    AsyncStorage.removeItem(`${this.namespace}:Token`);
  }
}

export default AuthStorage;