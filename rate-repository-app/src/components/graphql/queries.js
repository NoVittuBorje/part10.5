import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repositories($searchKeyword: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $first: Int, $after: String) {
  repositories(searchKeyword: $searchKeyword, orderDirection: $orderDirection, orderBy: $orderBy, first: $first, after: $after) {
        edges {
        node {
            id
            fullName
            reviewCount
            stargazersCount
            forksCount
            ratingAverage
            ownerAvatarUrl
            description
            language
        }
        }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
}
`
export const GET_ME = gql`
query getCurrentUser($includeReviews: Boolean= false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          repository {
            fullName
            id
          }
          rating
          text
          createdAt
          id
        }
      }
    }
  }
}`
export const GET_REPO = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    fullName
    forksCount
    description
    name
    id
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    url
    language
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}`