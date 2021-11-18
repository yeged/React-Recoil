import {
  atom,
  atomFamily,
  selector,
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

//3 square color state atom created -- squareColorState(1)...(2)...(3)
const squareColorState = atomFamily<string, number>({
  key: 'squareColorState',
  default: '',
});

const selectedColorIdState = atom<number | null>({
  key: 'selectedColorIdState',
  default: null,
});

const selectedSquareColor = selector<string | undefined>({
  key: 'selectedSquareColor',
  get: ({ get }) => {
    const selectedColorId = get(selectedColorIdState);
    if (!selectedColorId) return;
    return get(squareColorState(selectedColorId));
  },
  set: ({ set, get }, newValue) => {
    if (!newValue) return;
    const selectedColorId = get(selectedColorIdState);
    if (!selectedColorId) return;
    set(squareColorState(selectedColorId), newValue);
    console.log(squareColorState(selectedColorId));
  },
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
  const setColorId = useSetRecoilState(selectedColorIdState);

  const onColorChange = () => {
    setColor(colorName);
    setColorId(colorId);
  };

  return (
    <div>
      <button onClick={onColorChange}>{colorName}</button>
    </div>
  );
};

const AtomfamilyExample = () => {
  const list = useRecoilValue(colorIdState);
  const [selectedColor, setSelectedColor] = useRecoilState(
    selectedSquareColor,
  );
  return (
    <div>
      <h1>AtomFamily Example</h1>
      <input
        placeholder="Color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <div style={{ display: 'flex', marginTop: '5px' }}>
        {list.map(({ id, color }) => {
          return (
            <div>
              <Square colorId={id} />
              <Button colorId={id} colorName={color} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AtomfamilyExample;
