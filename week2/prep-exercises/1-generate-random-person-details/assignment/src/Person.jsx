export default function Person({ person }) {
  if (!person) return <p>Loading...</p>;

  return (
    <ul>
      <li>First name: {person.firstName}</li>
      <li>Last name: {person.lastName}</li>
      <li>Email: {person.email}</li>
    </ul>
  );
}
