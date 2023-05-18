import { gql } from '@apollo/client';

// 查询用户
export const findUser = gql`
  query findUser($id: String!) {
    find(id: $id) {
      id
      account
      password
      tel
      name
      desc
    }
  }
`;

// 创建用户
export const createUser = gql`
  mutation createUser($params: UserInput!) {
    create(params: $params)
  }
`;

// 更新用户
export const updateUser = gql`
  mutation updateUser($id: String!, $params: UserInput!) {
    update(id: $id, params: $params)
  }
`;

// 删除用户
export const removeUser = gql`
  mutation removeUser($id: String!) {
    remove(id: $id)
  }
`;
