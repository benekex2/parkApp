// src/graphql/mutations/registerUser.ts
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $language: Language!
    $terms: Boolean!
  ) {
    registerUser(
      name: $name
      email: $email
      password: $password
      language: $language
      terms: $terms
    ) {
      id
      status
    }
  }
`;
