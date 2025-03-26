import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage';

const useME = () => {
    const getToken = async () => {
        const authStorage = useAuthStorage();
        const authtoken = await authStorage.getAccessToken()
        return authtoken
    }
    const tok = getToken()
    const token = tok
    const { data, error, loading } = useQuery(GET_ME,{headers: {authorization: token ? `Bearer ${token}` : ""}});
    return { data:data, loading:loading,error:error};
};

export default useME;