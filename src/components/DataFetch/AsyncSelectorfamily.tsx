import { Suspense, useState } from 'react';
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { getWeather } from './fakeApi';

const weatherFetchIdState = atomFamily<number, number>({
  key: 'weatherFetchIdState',
  default: 0,
});

const userStateFamily = selectorFamily({
  key: 'userStateFamily',
  get: (id: number) => async () => {
    const data = fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    ).then((res) => res.json());
    return data;
  },
});

const weatherState = selectorFamily({
  key: 'weatherState',
  get:
    (id: number) =>
    async ({ get }) => {
      get(weatherFetchIdState(id));
      const user = get(userStateFamily(id));

      return await getWeather(user.address.city);
    },
});

const useRefreshWeather = (userId: number) => {
  const setFetchId = useSetRecoilState(weatherFetchIdState(userId));
  return () => setFetchId((id) => id + 1);
};

const Weather = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userStateFamily(userId));
  const weather = useRecoilValue(weatherState(userId));

  return (
    <div>
      <p>
        Weather in {user.address.city}:{weather}
      </p>
      <button onClick={useRefreshWeather(userId)}>
        Refresh Weather
      </button>
    </div>
  );
};

const UserData = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userStateFamily(userId));
  if (!user) return null;
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.phone}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Weather userId={userId} />
      </Suspense>
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
        <option value="undefined">Choose a user</option>
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
