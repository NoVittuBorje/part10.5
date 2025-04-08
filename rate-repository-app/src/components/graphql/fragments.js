import { gql } from "@apollo/client"
//"orderBy": "RATING_AVERAGE"
//"orderDirection": "ASC"||"DESC"
export const REPO_RATING_FROM_DIR = gql`query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          forksCount
          description
          createdAt
          fullName
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
        }
      }
    }
  }`

