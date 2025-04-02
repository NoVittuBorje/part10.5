import { NativeRouter } from 'react-router-native';

import { ApolloProvider } from '@apollo/client';

import Main from './src/components/main.jsx';
import createApolloClient from './src/components/utils/apolloClient'
import AuthStorage from './src/components/utils/authStorage.js'
import AuthStorageContext from './src/components/contexts/AuthStorageContext.js';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
const App = () => {
  
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
        <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;