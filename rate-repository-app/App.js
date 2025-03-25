import { NativeRouter } from 'react-router-native';

import { ApolloProvider } from '@apollo/client';

import Main from './src/components/main.jsx';
import Constants from 'expo-constants';
import createApolloClient from './src/components/utils/apolloClient'


const apolloClient = createApolloClient();
console.log(Constants.expoConfig.extra.env)
const App = () => {
  
  return (
    <NativeRouter>

      <ApolloProvider client={apolloClient}>
        <Main />

      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;