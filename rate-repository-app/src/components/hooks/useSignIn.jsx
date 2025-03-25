import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
  
    const signIn = async ({ username, password }) => {
        const credentials =  {
            password: password,
            username: username
          }
        mutate(credentials)
    };
  
    return [signIn, result];
  };