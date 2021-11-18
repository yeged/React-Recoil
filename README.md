# Recoil Js

- Resources
- Install
- Atom Basics
- Selector Basics
  - get, set, *reset
- Hooks
  * useRecoilState
  * useRecoilValue
  * useSetRecoilState
  * *Others?
* Atom family 
* Selector family
* Async Selector
  * Data Fethcing Basics
  * Data Fetching Advance
* *Patterns?
* *Atom Effects
## Resources
* [Recoil JS](https://recoiljs.org/docs/introduction/getting-started/)
* [Learn Recoil](https://learnrecoil.com/)
* [Learn Recoil Github](https://github.com/jacques-blom/recoil-course)
## Installation
`
npm install recoil
`
````
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
````

## Atom Basics & useRecoilState - useRecoilValue

[Atom](https://recoiljs.org/docs/api-reference/core/atom) | 
[useRecoilState](https://recoiljs.org/docs/api-reference/core/useRecoilState) |
[useRecoilValue](https://recoiljs.org/docs/api-reference/core/useRecoilValue)

**Atom:** key is unique.

**useRecoilState:** Read and write.

**useRecoilValue:** Read only.

<table>
<tr>
<th>Atom State</th>
<th>useRecoilState</th>
<th>useRecoilValue</th>
</tr>
<tr>
 <td>
   
````
const darkModeState = atom<boolean>({
  key: 'darkModeState',
  default: false,
});
````
   
</td>
    <td>
   
````
const Button: React.FC = () => {
  const [isDark, setIsDark] = useRecoilState(darkModeState);
      return...
  }
````
   
</td>
<td>
   
````
const Header: React.FC = () => {
  const darkMode = useRecoilValue(darkModeState);
  return...
  }
````
   
</td>
</table>

## Selectors Basics (Get - Set)

[Selector](https://recoiljs.org/docs/api-reference/core/selector)

**useRecoilValue:** this hook works with both read-only state and writeable state. Atoms are writeable state while selectors may be either read-only or writeable.

**In Selector:**


only get: useRecoilValue

get and set: useRecoilState

<table>
<tr>
<th>Atom State</th>
</tr>
<tr>
 <td>
   
````
const tryState = atom<number>({
  key: 'tryState',
  default: 1,
});
````
   
</td>
</table>

<table>
<tr>
<th>Get</th>
<th>Set</th>
<th>Output</th>
</tr>
<tr>
 <td>
   
````
//Only changes tryState.
const usdSelector = selector<number>({
  key: 'usdSelector',
  get: ({ get }) => {
    let lira = get(tryState);
    return lira * exchangeRate;
  }
});
````
</td>
   
<td>
   
````
//the selector will return writeable state.
const usdSelector = selector<number>({
  key: 'usdSelector',
  get: ({ get }) => {
    let lira = get(tryState);
    return lira * exchangeRate;
  },
  set: ({ set, get }, newUsdValue) => {
    let newTrValue = +newUsdValue / exchangeRate;
    set(tryState, newTrValue);
  },
});
````
  </td>
  
<td>
   
````
const SelectorsBasic = () => {
  const [lira, setLira] = useRecoilState(tryState);
  const [usd, setUSD] = useRecoilState(usdSelector);
  return (
    <div>
        <input
          placeholder="₺"
          value={lira}
          onChange={(e) => setLira(+e.target.value)}
        />
        <input
          placeholder="$"
          value={usd}
          onChange={(e) => setUSD(+e.target.value)}
        />
     </div>
    )}
  //Output: 1₺ = 0.097$
````
  </td>
  </table>
  
## Atom Family
  
[Atom Family](https://recoiljs.org/docs/api-reference/utils/atomFamily) | [Example](https://yaniv-beaudoin.medium.com/first-steps-in-react-recoil-4e1ddf912e37) | [AtomFamily Example](https://github.com/yeged/React-Recoil/blob/main/src/components/AtomFamily/AtomfamilyExample.tsx) | [useSetRecoilState](https://recoiljs.org/docs/api-reference/core/useSetRecoilState)

One advantage of using this pattern for separate atoms for each element over trying to store a single atom with a map of state for all elements is that they all maintain their own individual subscriptions. So, updating the value for one element will only cause React components that have subscribed to just that atom to update.
  
For example, maybe your app is a UI prototyping tool where the user can dynamically add elements and each element has state, such as its position. Ideally, each element would get its own atom of state.
  
**Atom Family:**
  
* **elementState(1)** -> **atom for element 1**
* **elementState(2)** -> **atom for element 2**
* **elementState(n)** -> **atom for element n**
  
  
### Atom vs Atomfamily

Atom: **Click red button last.**
  
AtomFamily: **Click all buttons.**  
</td>
</table>

<table>
<tr>
<th>With only Atom</th>
<th>With Atomfamily</th>
</tr>
<tr>
   
<td>
   
<img width="181" alt="atomfamily" src="https://user-images.githubusercontent.com/51911426/142397739-532b8f07-9040-4011-8db6-ef6317052b41.png">

  </td>
  
<td>
   <img width="265" alt="2" src="https://user-images.githubusercontent.com/51911426/142397778-b58169d2-3401-41cb-a78f-2d4df5a570e8.png">

  </td>
  </table>  
  
<table>
<tr>
<th>Atom & AtomFamily</th>
<th>Square and Button Components</th>
<th>Appjs</th>
</tr>
<tr>
 <td>
   
````
const colorIdState = atom<colorObject[]>({
  key: 'colorIdState',
  default: [
    { id: 1, color: 'red' },
    { id: 2, color: 'blue' },
    { id: 3, color: 'green' },
  ],
});
   
const squareColorState = atomFamily<string, number>({
  key: 'squareColorState',
  default: '',
});
````
</td>
   
<td>
   
````
const Square = ({ colorId }: { colorId: number }) => {
  const color = useRecoilValue(squareColorState(colorId));
  return (
    <div
      style={{
        border: '2px solid black',
        height: '50px',
        width: '50px',
        backgroundColor: color,
      }}
    ></div>
  );
};
const Button = ({
  colorName,
  colorId,
}: {
  colorName: string;
  colorId: number;
}) => {
  const setColor = useSetRecoilState(squareColorState(colorId));
  return (
    <div>
      <button onClick={() => setColor(colorName)}>{colorName}</button>
    </div>
  );
};
````
  </td>
  
<td>
   
````
const AtomfamilyExample = () => {
  const list = useRecoilValue(colorIdState);
  return (
    <div style={{ display: 'flex' }}>
      {list.map(({ id, color }) => {
        return (
          <div>
            <Square colorId={id} />
            <Button colorId={id} colorName={color} />
          </div>
        );
      })}
````
  </td>
  </table>

## Selector Family

[Selector Family](https://recoiljs.org/docs/api-reference/utils/selectorFamily) | [Example](https://stackoverflow.com/questions/64433884/how-to-get-all-elements-from-an-atomfamily-in-recoil) | [SelectorFamily Example](https://github.com/yeged/React-Recoil/tree/main/src/components)
   
<table>
<tr>
<th>selectorfamily get</th>
<th>selectorfamily set</th>
</tr>
<tr>
   
<td>
   

<img width="451" alt="3" src="https://user-images.githubusercontent.com/51911426/142406371-16e83905-1a92-489f-8213-fb8aeeaba98d.png">

  </td>
  
<td>
  <img width="446" alt="4" src="https://user-images.githubusercontent.com/51911426/142406377-62c46103-de91-4c2c-ba09-4ec3824533c9.png">


  </td>
  </table>  
  
**id param**
   
<table>
<tr>
<th>SelectorFamily</th>
<th>Square and Button Components</th>
<th>Appjs</th>
</tr>
<tr>
 <td>
   
````
 
const rectangleColorState = atomFamily<string, number>({
  key: 'rectangleColorState',
  default: '',
});  
 
const changeColor = selectorFamily<string | undefined, number>({
  key: 'changeColor',
  get:
    (id) =>
    ({ get }) => {
      const selectedColor = get(rectangleColorState(id));
      if (!selectedColor) return;
      return selectedColor;
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      if (!newValue) {
        newValue = '';
      }
      set(rectangleColorState(id), newValue);
    },
});
````
</td>
   
<td>
   
````
const Rectangle: React.FC<{ colorId: number }> = (props) => {
  const color = useRecoilValue(rectangleColorState(props.colorId));
  return (
    <div
      style={{
        border: '2px solid black',
        height: '50px',
        width: '100px',
        backgroundColor: color,
      }}
    ></div>
  );
};

const Button: React.FC<{ colorId: number; colorName: string }> = (
  props,
) => {
  const setColor = useSetRecoilState(
    rectangleColorState(props.colorId),
  );
  const [selectedColor, setSelectedColor] = useRecoilState(
    changeColor(props.colorId),
  );
  return (
    <div>
      <input
        placeholder="Color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <button onClick={() => setColor(props.colorName)}>
        {props.colorName}
      </button>
    </div>
  );
};
````
  </td>
  
<td>
   
````
const SelectorfamilyExample = () => {
  const list = useRecoilValue(colorIdList);

  return (
    <div>
      <h1>SelectorFamily Example</h1>
      <div style={{ display: 'flex', marginTop: '5px' }}>
        {list.map(({ id, color }) => {
          return (
            <div>
              <Rectangle colorId={id} />
              <Button colorId={id} colorName={color} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
````
  </td>
  </table>
  
# Data Fetch
  
## Async Selector
  
[Async Selector](https://recoiljs.org/docs/api-reference/utils/selectorFamily#async-query-example)   
  
A selectorFamily is a powerful pattern that is similar to a selector, but allows you to pass parameters to the get and set callbacks of a selector. The selectorFamily() utility returns a function which can be called with user-defined parameters and returns a selector. Each unique parameter value will return the same memoized selector instance.
  
Note that using a selector to abstract queries like this should still be "pure" functions which always return the same result for a given set of inputs and dependency values.
  
<table>
<tr>
<th>Selector</th>
<th>Components</th>
</tr>
<tr>
 <td>
   
````
 
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
````
</td>
   
<td>
   
````

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
````
  </td>
  </table>
   
## Async SelectorFamily
   
<table>
<tr>
<th>Fetch Weather with Selectorfamily</th>
<th>Re-Fetch weather</th>
<th>Weather Component</th>
</tr>
<tr>
 <td>
   
````
 
const weatherState = selectorFamily({
  key: 'weatherState',
  get:
    (id: number) =>
    async ({ get }) => {
      get(weatherFetchIdState(id)); //Re-Fetch
      const user = get(userStateFamily(id));

      return await getWeather(user.address.city);
    },
});
````
</td>
   
<td>
   
````
const weatherFetchIdState = atomFamily<number, number>({
  key: 'weatherFetchIdState',
  default: 0,
});

const useRefreshWeather = (userId: number) => {
  const setFetchId = useSetRecoilState(weatherFetchIdState(userId));
  return () => setFetchId((id) => id + 1);
};
 
````
  </td>
  <td>
    
````
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
    
````
  </td>
  </table>
