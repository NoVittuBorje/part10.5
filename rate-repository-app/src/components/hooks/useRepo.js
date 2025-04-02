import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries'

const useRepo = (id) => {
    console.log(id)
  const { data, error, loading } = useQuery(GET_REPO,{variables: {repositoryId:id},});
  return { repo:data, loading, refetch:useRepo};
};

export default useRepo;