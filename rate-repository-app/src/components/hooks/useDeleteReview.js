import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
const useDeleteReview = () => {
    const [mutate,result] = useMutation(DELETE_REVIEW)
    const delete_review = async (id) => {
        const deleteReviewId = id
        console.log(deleteReviewId)
        const data = await mutate({variables:{deleteReviewId}})
        console.log(data)
        return data
    }
    return[delete_review,result]
}
export default useDeleteReview