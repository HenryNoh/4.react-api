import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  // 마지막 인자 skip은 생략된거임
  // js에서는 함수에 인자가 들어가면 getUser(id) 이렇게는 파라미터로 못넣나봄
  // 무조건 화살표 함수로 해줘야 하나??
  // 두번째 인자 [id]는 usAsync 내부에 deps로 들어가서 useEffect에 들어가서
  // 바뀔때마다 리렌더링 해주게함 ㅋㅋ 개신기
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  if (loading) return <div>로딩중..</div>;
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
