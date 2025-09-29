import { useState, useEffect } from "react";
import PersonController from "./PersonController";

export default function App() {
  const [person, setPerson] = useState(null);

  async function getPerson() {
    const res = await fetch("https://randomuser.me/api?results=1");
    const data = await res.json();
    setPerson(data.results[0]);
  }

  useEffect(() => {
    getPerson();
  }, []);

  if (!person) return <p>Loading...</p>;

  return (
    <ul>
      <li>First name: {person.name.first}</li>
      <li>Last name: {person.name.last}</li>
      <li>Email: {person.email}</li>
      <h1>Random Person Generator</h1>
      <PersonController />
    </ul>
  );
}
