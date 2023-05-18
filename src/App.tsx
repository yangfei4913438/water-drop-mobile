import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Input, Button } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';

import { findUser, updateUser } from './graphql/user';

const userId = '42a1cfa2-4308-4cfd-a876-6b8445b14cf5';

interface FieldType {
  id: string;
  name: string;
  desc: string;
  tel: string;
  password: string;
  account: string;
}

const App = () => {
  const [form] = Form.useForm<FieldType>();
  const [visible, setVisible] = useState(false);

  const { refetch } = useQuery<{ find: FieldType }>(findUser, {
    variables: { id: userId },
    onCompleted: ({ find }) => {
      form.setFieldsValue(find);
    },
  });

  const [update, { loading: loading2 }] = useMutation(updateUser);

  const handleFinish = (value: FieldType) => {
    update({
      variables: {
        id: userId,
        params: value,
      },
    })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.log('failed:', err);
      });
  };

  return (
    <Form
      form={form}
      layout='horizontal'
      onFinish={handleFinish}
      footer={
        <Button block type='submit' color='primary' size='large'>
          {loading2 ? '更新中' : '修改名称'}
        </Button>
      }
    >
      <Form.Item name='name' label='昵称'>
        <Input placeholder='请输入新的昵称' clearable />
      </Form.Item>
      <Form.Item name='desc' label='描述'>
        <Input placeholder='请输入新的描述' clearable />
      </Form.Item>
      <Form.Item name='tel' label='电话'>
        <Input placeholder='请输入新的电话' clearable />
      </Form.Item>
      <Form.Item name='account' label='账号'>
        <Input placeholder='请输入新的账号' clearable />
      </Form.Item>
      <Form.Item
        name='password'
        label='密码'
        extra={
          <div style={{ padding: 4, cursor: 'pointer' }}>
            {!visible ? (
              <EyeInvisibleOutline
                style={{ display: 'block' }}
                fontSize={18}
                onClick={() => setVisible(true)}
              />
            ) : (
              <EyeOutline
                style={{ display: 'block' }}
                fontSize={18}
                onClick={() => setVisible(false)}
              />
            )}
          </div>
        }
      >
        <Input type={visible ? 'text' : 'password'} placeholder='请输入新的密码' clearable />
      </Form.Item>
    </Form>
  );
};

export default App;
