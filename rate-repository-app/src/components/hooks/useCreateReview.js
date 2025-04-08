import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const create = async (values) => {
      const review = {
        "ownerName": values.OwnerName,
        "rating": Number(values.Rating),
        "repositoryName": values.RepositoryName,
        "text": values.Text
      }
        const data = await mutate({variables:{review}})
        return data
      };
    return [create,result]
}
export default useCreateReview