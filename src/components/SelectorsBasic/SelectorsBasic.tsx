import React from 'react';
import { atom, selector, useRecoilState } from 'recoil';

const exchangeRate = 0.097397644;

const addCommission = (amount: number, commission: number) => {
  return amount / (1 - commission / 100);
};

const removeCommission = (amount: number, commission: number) => {
  return amount * (1 - commission / 100);
};

const tryState = atom<number>({
  key: 'tryState',
  default: 1,
});

const comissionEnabledState = atom<boolean>({
  key: 'comissionEnabledState',
  default: false,
});

const comissionState = atom<number>({
  key: 'comissionState',
  default: 5,
});

const usdSelector = selector<number>({
  key: 'usdSelector',
  get: ({ get }) => {
    let lira = get(tryState);
    const comissionEnable = get(comissionEnabledState);
    if (comissionEnable) {
      const comission = get(comissionState);
      return removeCommission(lira, comission) * exchangeRate;
    }
    return lira * exchangeRate;
  },
  set: ({ set, get }, newUsdValue) => {
    let newTrValue = +newUsdValue / exchangeRate;
    const comissionEnable = get(comissionEnabledState);
    if (comissionEnable) {
      const comission = get(comissionState);
      newTrValue = addCommission(newTrValue, comission);
    }
    set(tryState, newTrValue);
  },
});

const SelectorsBasic = () => {
  const [lira, setLira] = useRecoilState(tryState);
  const [usd, setUSD] = useRecoilState(usdSelector);
  const [isComissionEnable, setIsComissionEnable] = useRecoilState(
    comissionEnabledState,
  );
  const [comission, setComission] = useRecoilState(comissionState);

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
      <div>
        <input
          type="checkbox"
          checked={isComissionEnable}
          onChange={() => setIsComissionEnable(!isComissionEnable)}
        />
        <input
          placeholder="comission"
          disabled={!isComissionEnable}
          value={comission}
          onChange={(e) => setComission(+e.target.value)}
        />
      </div>
    </div>
  );
};

export default SelectorsBasic;
