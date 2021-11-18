import { Suspense } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const userIdState = atom<number | undefined>({
  key: 'userIdState',
  default: undefined,
});

const userState = selector({
  key: 'userState',
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (!userId) return;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    const data = await response.json();

    return data;
  },
});

const UserData = () => {
  const user = useRecoilValue(userState);
  if (!user) return null;
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.phone}</p>
    </div>
  );
};

const AsyncSelector = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  return (
    <div>
      <h1>Async Selector Data Fetch with Parameter</h1>
      <select
        style={{ width: '200px', height: '50px' }}
        value={userId}
        onChange={(e) => setUserId(+e.target.value)}
        onBlur={(e) => setUserId(+e.target.value)}
      >
        <option value="undefined">Choose a user</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      {userId !== undefined && (
        <Suspense fallback={<div>Loading...</div>}>
          <UserData />
        </Suspense>
      )}
    </div>
  );
};

export default AsyncSelector;
