import { gql } from '@apollo/client';

export interface UserFieldType {
  id: string;
  avatar: string;
  avatars: { url: string }[]; // 本地缓存数据，组件库用的
  name: string;
  desc: string;
  tel: string;
  password: string;
  account: string;
}

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
      avatar
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
