import React, { useCallback } from 'react';
import './App.css';
import useProgress from './component/useProgress';
import dummy from './asset/dummy.json'

function App() {
  const { ProgressBar, customFetch } = useProgress();
  const onBtnClick = useCallback(async () => {
    try {
      const response = await customFetch.post("https://jsonplaceholder.typicode.com/posts", dummy);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="App">
      <ProgressBar></ProgressBar>
      <button type="button" onClick={onBtnClick}>POST</button>
    </div>
  );
}

export default App;
