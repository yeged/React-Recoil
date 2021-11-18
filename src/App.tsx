import React from 'react';
import AtomfamilyExample from './components/AtomFamily/AtomfamilyExample';
import AtomsBasic from './components/AtomsBasic/AtomsBasic';
import AsyncSelector from './components/DataFetch/AsyncSelector';
import AsyncSelectorFamily from './components/DataFetch/AsyncSelectorfamily';
import RecoilTutorial from './components/GettingStarted/RecoilTutorial';
import SelectorfamilyExample from './components/SelectorFamily/SelectorfamilyExample';
import SelectorsBasic from './components/SelectorsBasic/SelectorsBasic';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ margin: '10px' }}>
        <RecoilTutorial />
        <div>---------------------------------</div>
        <AtomsBasic />
        <div>---------------------------------</div>
        <SelectorsBasic />
        <div>---------------------------------</div>
        <AtomfamilyExample />
        <div>---------------------------------</div>
        <SelectorfamilyExample />
      </div>
      <div style={{ margin: '10px' }}>
        <AsyncSelector />
        <div>---------------------------------</div>
        <AsyncSelectorFamily />
      </div>
    </div>
  );
}

export default App;
