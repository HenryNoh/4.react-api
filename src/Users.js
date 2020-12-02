import React, { useState } from 'react';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';
import User from './User';

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { data: users, loading, error } = state.users;
  // useEffect쓰고 deps 빈배열로 해도 똑같은지 확인
  // 실행은 잘 됨 같은지 아닌지는 모르겠음
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      {/* <button onClick={run}>다시 불러오기</button> */}
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
// refetch를 통해서 state에 값을 넣어줄 것이다.
// useAsync라는 직접만든 hook에 getUsers라는 함수를 넣어주고
// 이 함수는 json data를 get해오는데 그건 useAsync 안에 try문 안에 data의 정보로 들어가고
// 해당 await가 완료될 때까지 async하고 다되면 state에 값을 넣어준다.
// 근데 useAsync에 반환 값에 fetchData는 왜 있는거임?
// 없어도 동작 잘 됨 ㅎㅎ;?

// refetch를 할 경우에 13번째 줄에 useAsync의 인자를 넣어주는게 아니라
// 직접 함수 안으로 들어감 왜지??
