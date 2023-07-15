import { useLoaderData } from "react-router-dom";

export function Component() {
  const ditto = useLoaderData();

  console.log(ditto);

  return (
    <div>
      <div>HOME</div>
      <div>HOME</div>
      <div>HOME</div>
    </div>
  );
}

export default async function loader() {
  const req = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  return req.json();
}
