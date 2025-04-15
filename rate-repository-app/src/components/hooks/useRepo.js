
import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries'

const useRepo = (variables) => {
  const { data,  loading, fetchMore ,refetch} = useQuery(GET_REPO,{variables: {repositoryId:variables.id,first:variables.first,after:""},fetchPolicy: 'cache-and-network',});
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first:variables.first,
        repositoryId:variables.id,
      },
    });
  };

  return { repo:data, loading, fetchMore:handleFetchMore, refetch};
};

export default useRepo;