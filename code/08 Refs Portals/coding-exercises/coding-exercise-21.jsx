import React from "react";

function App() {
  const input = React.useRef();

  function handleClick() {
    input.current.click();
  }

  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input
          ref={input}
          data-testid="file-picker"
          type="file"
          accept="image/*"
        />
        <button onClick={handleClick}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;
