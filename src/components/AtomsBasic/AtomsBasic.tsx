import { useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

const colorState = atom<boolean>({
  key: 'colorState',
  default: false,
});

const Header: React.FC = () => {
  const color = useRecoilValue(colorState);
  return (
    <div>
      <h1 style={{ color: color ? 'red' : 'black' }}>Atom Basics</h1>
    </div>
  );
};

const Button: React.FC = () => {
  const [isRed, setIsRed] = useRecoilState(colorState);
  return (
    <div>
      <button onClick={() => setIsRed(!isRed)}>Change Color</button>
    </div>
  );
};

const AtomsBasic: React.FC = () => {
  return (
    <div>
      <Header />
      <Button />
    </div>
  );
};

export default AtomsBasic;
