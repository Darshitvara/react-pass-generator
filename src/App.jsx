import { useCallback, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [isCharacter, setCharacter] = useState(false);
  const [isNumber, setNumber] = useState(false);
  const [password, setPassword] = useState('');
  const copyText = useRef();

  const onCopyClick = () => {
    window.navigator.clipboard.writeText(password);
    copyText.current.select();
  };

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = ""; 
    if (isCharacter) str += "~!@#$%^&*()_-+={[}]|:;'<,>.?/";
    if (isNumber) str += "0123456789";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, isCharacter, isNumber]);

  return (
    <>
      <h1 className="text-center font-bold mb-4">Password Generator</h1>
      <div className="flex flex-wrap mx-auto shadow-lg rounded-xl mt-6 pt-7 pb-4 px-5 bg-slate-300 text-black">
        <div className="flex w-full items-center rounded-lg">
          <input
            type="text"
            ref={copyText}
            readOnly
            value={password}
            className="flex-1 outline-none px-3 bg-slate-800 text-slate-100 py-3 rounded-lg"
            placeholder="password"
          />
          <button
            onClick={onCopyClick}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-row justify-around text-lg font-bold w-full items-center mt-3 rounded-lg text-slate-900">
          <div className="flex align-baseline">
            <input
              type="range"
              min={8}
              max={50}
              className="m-3 cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              step={1}
            />
            <label className="m-3">length({length})</label>
          </div>

          <div>
            <input
              type="checkbox"
              className="m-4 cursor-pointer"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label>Character</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => setNumber((prev) => !prev)}
              className="m-4 cursor-pointer"
            />
            <label>Numbers</label>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center">
          <button
            className="w-6/12 bg-blue-600 text-white text-center cursor-pointer"
            onClick={passwordGenerator}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
