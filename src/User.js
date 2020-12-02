import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  // 이전에 사용한 hook은 deps에 [id]를 넣어서 useAsync내부에서
  // useEffect를 통해서 리렌더링 해줬다면
  // useAsync를 사용하면 watch에 값을 넣어줌으로써 PromiseFn에 들어간 함수를 재호출함.
  // 또한 getUser에서 {id}로 받아와야 지금 밑에 들어간 useAsync에서
  // 선언한 id를 받을 수 있음.
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });
  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
