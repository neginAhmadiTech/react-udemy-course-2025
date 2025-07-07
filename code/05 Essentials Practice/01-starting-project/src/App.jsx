import UserInput from "./components/UserInput";

function App() {
  return (
    <>
      <div id="user-input">
        <div className="input-group">
          <UserInput
            label="initial investment"
            type="number"
            defaultValue={10000}
          />
          <UserInput
            label="anual investment"
            type="number"
            defaultValue={1200}
          />
        </div>
        <div className="input-group">
          <UserInput label="expected return" type="number" defaultValue={6} />
          <UserInput label="duration" type="number" defaultValue={10} />
        </div>
      </div>
    </>
  );
}

export default App;
