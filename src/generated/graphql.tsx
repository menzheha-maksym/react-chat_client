import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: 'Chat';
  chatId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  usersIds: Array<Scalars['Float']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chatId: Scalars['Float'];
  createdAt: Scalars['String'];
  messageId: Scalars['Float'];
  senderId: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat?: Maybe<Chat>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendMessage?: Maybe<Message>;
};


export type MutationCreateChatArgs = {
  participant: Scalars['Float'];
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationSendMessageArgs = {
  chatId: Scalars['Float'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chats: Array<Chat>;
  findAllChatsByCurrentUserId?: Maybe<Array<Chat>>;
  findChatWithTwoUsersByUserIds?: Maybe<Chat>;
  getUserById?: Maybe<UserType>;
  getUserByUsername?: Maybe<UserType>;
  hello: Scalars['String'];
  me?: Maybe<UserType>;
  messages: Array<Message>;
  messagesByChatId: Array<Message>;
  users: Array<UserType>;
};


export type QueryFindChatWithTwoUsersByUserIdsArgs = {
  userId1: Scalars['String'];
  userId2: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryMessagesByChatIdArgs = {
  chatId: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'UserType', id: string, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'UserType', id: string, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FindAllChatsByCurrentUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllChatsByCurrentUserIdQuery = { __typename?: 'Query', findAllChatsByCurrentUserId?: Array<{ __typename?: 'Chat', chatId: number, usersIds: Array<number> }> | null };

export type FindChatWithTwoUsersByUserIdsQueryVariables = Exact<{
  userId1: Scalars['String'];
  userId2: Scalars['String'];
}>;


export type FindChatWithTwoUsersByUserIdsQuery = { __typename?: 'Query', findChatWithTwoUsersByUserIds?: { __typename?: 'Chat', chatId: number, updatedAt: string } | null };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'UserType', id: string, username: string } | null };

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = { __typename?: 'Query', getUserByUsername?: { __typename?: 'UserType', id: string, username: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id: string, username: string } | null };

export type MessagesByChatIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MessagesByChatIdQuery = { __typename?: 'Query', messagesByChatId: Array<{ __typename?: 'Message', messageId: number, text: string, senderId: number, chatId: number }> };


export const LoginDocument = gql`
    mutation Login($input: UserInput!) {
  login(input: $input) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const FindAllChatsByCurrentUserIdDocument = gql`
    query FindAllChatsByCurrentUserId {
  findAllChatsByCurrentUserId {
    chatId
    usersIds
  }
}
    `;

export function useFindAllChatsByCurrentUserIdQuery(options?: Omit<Urql.UseQueryArgs<FindAllChatsByCurrentUserIdQueryVariables>, 'query'>) {
  return Urql.useQuery<FindAllChatsByCurrentUserIdQuery>({ query: FindAllChatsByCurrentUserIdDocument, ...options });
};
export const FindChatWithTwoUsersByUserIdsDocument = gql`
    query FindChatWithTwoUsersByUserIds($userId1: String!, $userId2: String!) {
  findChatWithTwoUsersByUserIds(userId1: $userId1, userId2: $userId2) {
    chatId
    updatedAt
  }
}
    `;

export function useFindChatWithTwoUsersByUserIdsQuery(options: Omit<Urql.UseQueryArgs<FindChatWithTwoUsersByUserIdsQueryVariables>, 'query'>) {
  return Urql.useQuery<FindChatWithTwoUsersByUserIdsQuery>({ query: FindChatWithTwoUsersByUserIdsDocument, ...options });
};
export const GetUserByIdDocument = gql`
    query GetUserById($userId: String!) {
  getUserById(userId: $userId) {
    id
    username
  }
}
    `;

export function useGetUserByIdQuery(options: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByIdQuery>({ query: GetUserByIdDocument, ...options });
};
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String!) {
  getUserByUsername(username: $username) {
    id
    username
  }
}
    `;

export function useGetUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetUserByUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByUsernameQuery>({ query: GetUserByUsernameDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MessagesByChatIdDocument = gql`
    query MessagesByChatId($id: String!) {
  messagesByChatId(chatId: $id) {
    messageId
    text
    senderId
    chatId
  }
}
    `;

export function useMessagesByChatIdQuery(options: Omit<Urql.UseQueryArgs<MessagesByChatIdQueryVariables>, 'query'>) {
  return Urql.useQuery<MessagesByChatIdQuery>({ query: MessagesByChatIdDocument, ...options });
};