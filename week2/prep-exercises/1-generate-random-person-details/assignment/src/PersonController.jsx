import { useState, useEffect } from "react";
import Person from "./Person.jsx";

export default function PersonController() {
  const [person, setPerson] = useState(null);

  async function getPerson() {
    const res = await fetch("https://randomuser.me/api?results=1");
    const data = await res.json();

    const p = {
      firstName: data.results[0].name.first,
      lastName: data.results[0].name.last,
      email: data.results[0].email,
    };

    setPerson(p);
  }

  useEffect(() => {
    getPerson();
  }, []);

  return <Person person={person} />;
}
