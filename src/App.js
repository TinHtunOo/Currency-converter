import { useEffect, useState } from "react";

export default function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getRate() {
        try {
          const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
          );
          if (!res.ok) throw new Error("Bad Currency Pair.");
          const data = await res.json();
          setError("");
          setRate(data.rates[to]);
        } catch (error) {
          console.error(error.message);
          setError(error.message);
        }
      }
      getRate();
    },
    [from, to]
  );

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <div className="box">
        <span>From</span>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <span>to</span>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <h3>{!error ? `${(amount * rate).toFixed(2)} ${to}` : `${error}`}</h3>
    </div>
  );
}
