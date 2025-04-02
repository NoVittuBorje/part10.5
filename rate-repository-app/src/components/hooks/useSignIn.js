import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {
      const credentials =  {
          password: password,
          username: username
        }
      const data = await mutate({variables:{credentials}})
      if (data){
        await authStorage.setAccessToken(data.data.authenticate.accessToken);
        apolloClient.resetStore();
        
      }

      return data
    };
    
    return [signIn, result];
  };
export default useSignIn