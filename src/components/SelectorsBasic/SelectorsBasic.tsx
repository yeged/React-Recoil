import React from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const exchangeRate = 0.097397644;

const tryState = atom<number>({
  key: 'tryState',
  default: 1,
});

const usdSelector = selector<number>({
  key: 'usdSelector',
  get: ({ get }) => {
    const lira = get(tryState);
    return lira * exchangeRate;
  },
  set: ({ set }, newUsdValue) => {
    let newTrValue = +newUsdValue / exchangeRate;
    set(tryState, newTrValue);
  },
});

const SelectorsBasic = () => {
  const [lira, setLira] = useRecoilState(tryState);
  const [usd, setUSD] = useRecoilState(usdSelector);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input
          id="tr"
          placeholder="₺"
          value={lira}
          onChange={(e) => setLira(+e.target.value)}
        />
        <label htmlFor="tr">₺</label>
      </div>
      <div>
        <input
          placeholder="$"
          value={usd}
          onChange={(e) => setUSD(+e.target.value)}
        />
        <label htmlFor="usd">$</label>
      </div>
    </div>
  );
};

export default SelectorsBasic;
