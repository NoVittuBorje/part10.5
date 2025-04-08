import { useMutation } from '@apollo/client';
import {REPO_RATING_FROM_DIR} from "../graphql/fragments"

const useRepoDir = () => {
    const [mutate, result] = useMutation(REPO_RATING_FROM_DIR);

    const getdir = async (values) => {
        const direction = {
            orderBy: values.orderBy,
             orderDirection: values.orderDirection}
        const data = await mutate({variables:{direction}})
        return data
      };
    return [getdir,result]
}
export default useRepoDir