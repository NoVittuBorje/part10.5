
import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries'

const useRepo = (id) => {
  const { data,  loading } = useQuery(GET_REPO,{variables: {repositoryId:id},fetchPolicy: 'cache-and-network',});
  return { repo:data, loading, refetch:useRepo};
};

export default useRepo;