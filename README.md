# Recoil Js

- Resources
- Install
- Atom Basics
- Selector Basics
  - get, set, *reset
- Hooks
  * useRecoilState
  * useRecoilValue
  * *useSetRecoilState
  * *Others?
* *Atom family 
* *Selector family
* *Async Selector
 * *Data Fethcing Basics
 * *Data Fetching Advance
* *Patterns?
* *Atom Effects
## Resources
[Recoil JS](https://recoiljs.org/docs/introduction/getting-started/)
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
