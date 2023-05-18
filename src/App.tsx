import { type ChangeEvent, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { findUser, updateUser } from './graphql/user';

const userId = '42a1cfa2-4308-4cfd-a876-6b8445b14cf5';

const App = () => {
  const [nickname, setNickname] = useState('');

  const { data, loading, refetch } = useQuery(findUser, {
    variables: { id: userId },
  });

  const [update, { loading: loading2 }] = useMutation(updateUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleClick = () => {
    update({
      variables: {
        id: userId,
        params: {
          name: nickname,
        },
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
    <div>
      <p>{loading ? 'loading...' : JSON.stringify(data)}</p>
      <div>
        <input
          placeholder='请输入新的昵称'
          disabled={loading2}
          value={nickname}
          onChange={handleChange}
        />
        <button type='button' onClick={handleClick}>
          {loading2 ? '更新中' : '修改名称'}
        </button>
      </div>
    </div>
  );
};

export default App;
