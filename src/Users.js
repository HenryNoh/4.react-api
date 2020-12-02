import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // async로 함수를 실행할 경우 해당 함수는 await가 끝나기 전까지 다음걸 실행하지 않는다.
  const fetchUsers = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setUsers(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      // axios는 rest api를 사용하는 라이브러리로써 axios.get을 통해 다음에 들어갈 url에 들어간 정보( 정보는 무슨 형태?? maybe json? )를 response에 저장해준다.
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      {/*  실질적으로 fetchUsers를 실행하게 되면 useEffect의 deps가 빈 배열이어서 해당 컴포넌트가 처음 나타날 때 등록해놓은 함수를 호출하고 */}
      {/* 즉 useEffect -> fetchUsers -> async -> await 순으로 동작된다. */}
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
