import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (values) => {
  const direction = {
    orderBy: values.orderBy ,
     orderDirection: values.orderDirection }
  const { data,  loading } = useQuery(GET_REPOSITORIES,{fetchPolicy: 'cache-and-network',variables:direction});
  return { repositories:data, loading, refetch:useRepositories};
};

export default useRepositories;