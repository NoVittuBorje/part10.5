import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
console.log(Constants.expoConfig.extra.apollo_uri)
const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.expoConfig.extra.apollo_uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;