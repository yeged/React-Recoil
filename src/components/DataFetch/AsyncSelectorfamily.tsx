import { Suspense, useState } from 'react';
import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const userStateFamily = selectorFamily({
  key: 'userStateFamily',
  get: (id: number) => async () => {
    const data = fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    ).then((res) => res.json());

    return data;
  },
});

const UserData = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userStateFamily(userId));
  if (!user) return null;
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.phone}</p>
    </div>
  );
};

const AsyncSelectorFamily = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  return (
    <div>
      <h1>Async Selector Data Fetch with Parameter</h1>
      <select
        style={{ width: '200px', height: '50px' }}
        placeholder="Choose a user"
        value={userId}
        onChange={(e) => setUserId(+e.target.value)}
        onBlur={(e) => setUserId(+e.target.value)}
      >
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      {userId !== undefined && (
        <Suspense fallback={<div>Loading...</div>}>
          <UserData userId={userId} />
        </Suspense>
      )}
    </div>
  );
};

export default AsyncSelectorFamily;
