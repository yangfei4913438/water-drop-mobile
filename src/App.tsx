import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Input, Button, ImageUploader, type ImageUploadItem } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';

import { findUser, updateUser, type UserFieldType } from '@/graphql/user';
import useUploadOSS from '@/hooks/useUploadOSS';

// 本地测试的用户ID数据
const userId = 'd02f3298-8446-41bf-b9a2-1e5fe5fe97f8';

const App = () => {
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm<UserFieldType>();
  // 密码输入框的可见性
  const [visible, setVisible] = useState(false);
  // 上传oss的响应方法
  const { uploadHandler } = useUploadOSS<ImageUploadItem>();

  // 自动请求
  const { refetch } = useQuery<{ find: UserFieldType }>(findUser, {
    variables: { id: userId },
    onCompleted: ({ find }) => {
      // console.log('find:', find);
      // 请求成功后，将数据写入表格。 tips: 多几个属性不影响的。
      form.setFieldsValue({
        ...find,
        avatars: [{ url: find.avatar }], // 因为后台不存在 avatars属性，所以拿到数据的时候，需要处理一下。
      });
    },
  });

  // 更新hook
  const [update, { loading }] = useMutation(updateUser);

  // 响应提交按钮，参数就是所有表单选项的kv值, 不会有多余的无关属性
  const handleFinish = (value: UserFieldType) => {
    const { avatars, ...rest } = value;
    update({
      variables: {
        id: userId,
        params: {
          ...rest, // 因为后台没有 avatars 这个属性，所以在需要在传递的时候移除属性
          avatar: avatars[0].url, // 更新avatar数据
        },
      },
    })
      .then(() => {
        // 更新成功后，重新发起请求
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
          {loading ? '更新中' : '修改名称'}
        </Button>
      }
    >
      <Form.Item name='name' label='昵称'>
        <Input placeholder='请输入新的昵称' clearable />
      </Form.Item>
      <Form.Item name='avatars' label='头像'>
        <ImageUploader upload={uploadHandler} />
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
