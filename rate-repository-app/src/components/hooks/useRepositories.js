import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'


const useRepositories = (variables) => {
  const directions = {
    orderBy: variables.orderBy,
    orderDirection: variables.orderDirection,
    searchKeyword:variables.searchKeyword
  }
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables:{
    ...directions,
    first:variables.first,
    after:"",},
    fetchPolicy: "cache-and-network"
  });
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first:variables.first,
        ...variables,
      },
    });
  };
  
  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};
export default useRepositories;