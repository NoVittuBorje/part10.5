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