import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);
    const create = async ({values}) => {
        const user = {
            "password": values.password,
            "username": values.username
        }
        const data = await mutate({variables:{user}})
        return data
      };
    return [create,result]
}
export default useSignUp