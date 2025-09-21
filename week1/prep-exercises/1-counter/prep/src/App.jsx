import { useState } from "react";

function Count({ value }) {
  return <p>count is {value}</p>;
}

function Button({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const feedback = count > 10 ? "It's higher than 10!" : "Keep counting...";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1>Counter</h1>

      <Count value={count} />

      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={() => setCount((c) => c + 1)}>Add 1!</Button>
        <Button onClick={() => setCount((c) => Math.max(0, c - 1))}>
          Minus 1
        </Button>
        <Button onClick={() => setCount((c) => c + 2)}>+2</Button>
        <Button
          onClick={() => setCount((c) => Math.max(0, c - 2))}
          disabled={count < 2}
        >
          -2
        </Button>
      </div>

      <p>{feedback}</p>
    </div>
  );
}

export default function App() {
  return <Counter />;
}
