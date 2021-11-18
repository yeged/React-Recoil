import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

interface colorObj {
  id: number;
  color: string;
}

const colorIdList = atom<colorObj[]>({
  key: 'colorIdList',
  default: [
    { id: 1, color: 'red' },
    { id: 2, color: 'blue' },
    { id: 3, color: 'green' },
  ],
});

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

export default SelectorfamilyExample;
