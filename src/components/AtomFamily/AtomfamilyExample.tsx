import {
  atom,
  atomFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const colorsListState = atom<string[]>({
  key: 'colorsListState',
  default: ['blue', 'red', 'green'],
});

const squareColorState = atomFamily<string, number>({
  key: 'squareColorState',
  default: '',
});

const colorIdState = atomFamily({
  key: 'colorIdState',
  default: [],
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
  const list = useRecoilValue(colorsListState);
  return (
    <div style={{ display: 'flex' }}>
      {list.map((value, index) => {
        return (
          <div>
            <Square colorId={index} />
            <Button colorId={index} colorName={value} />
          </div>
        );
      })}
    </div>
  );
};

export default AtomfamilyExample;
