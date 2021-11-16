import React from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const RecoilTutorial = () => {
  //atom
  const textState = atom<string>({
    key: 'textState',
    default: '',
  });

  //useRecoilState
  const [text, setText] = useRecoilState(textState);

  const onTextHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setText(event.target.value);
  };

  //selector
  const charCountState = selector<number>({
    key: 'charCountState',
    get: ({ get }) => {
      const text = get(textState);
      return text.length;
    },
  });

  //useRecoilValue - only read
  const count = useRecoilValue(charCountState);

  return (
    <div>
      <input
        placeholder="Length"
        value={text}
        onChange={onTextHandler}
      />
      <p>
        {text}'s length is {count}
      </p>
    </div>
  );
};

export default RecoilTutorial;
