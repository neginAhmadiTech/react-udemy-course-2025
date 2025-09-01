import { useState } from "react";

export default function Player() {
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);

  function handleChange(e) {
    setSubmit(false);
    setName(e.target.value);
  }

  function handleClick() {
    setSubmit(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submit ? name : "unknown entity"}</h2>
      <p>
        <input type="text" onChange={handleChange} value={name} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
