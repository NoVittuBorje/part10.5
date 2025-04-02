import { gql } from '@apollo/client';

export const LOGIN = gql`mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }`