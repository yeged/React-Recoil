import {
  atom,
  atomFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

interface colorObject {
  id: number;
  color: string;
}

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
    </div>
  );
};

export default AtomfamilyExample;
