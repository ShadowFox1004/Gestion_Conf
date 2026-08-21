const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 24, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener el listado`);
  const data = await res.json();
  return {
    results: data.results,
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
}

export async function getPokemonByNameOrId(nameOrId) {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error(`Error ${res.status}: Pokémon no encontrado`);
  return res.json();
}

export async function getAllPokemonNames() {
  const res = await fetch(`${BASE_URL}/pokemon?limit=100000&offset=0`);
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener la lista completa`);
  const data = await res.json();
  return data.results.map((p) => p.name);
}
