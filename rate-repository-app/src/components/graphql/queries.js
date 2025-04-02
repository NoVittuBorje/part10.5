import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories {
    repositories {
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
    }
}`;
export const GET_ME = gql`{
  me {
    id
    username
  }
}`
export const GET_REPO = gql`
query Repository($repositoryId: ID!) {
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
    reviews {
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
    }
  }
}`