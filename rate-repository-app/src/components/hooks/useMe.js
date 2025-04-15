import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries'
import useAuthStorage from './useAuthStorage';

const useME = (include) => {
    const getToken = async () => {
        const authStorage = useAuthStorage();
        const authtoken = await authStorage.getAccessToken()
        return authtoken
    }
    const tok = getToken()
    const token = tok
    if (include){
        const { data, error, loading , refetch } = useQuery(GET_ME,{variables: {includeReviews: true} ,headers: {authorization: token ? `Bearer ${token}` : ""}});
        return { data:data, loading:loading,error:error,refetch:refetch};
    }else{
        const { data, error, loading, refetch } = useQuery(GET_ME,{headers: {authorization: token ? `Bearer ${token}` : ""}});
        return { data:data, loading:loading,error:error,refetch:refetch};
    }
};

export default useME;