import { useState, useEffect } from 'react';
import { getPokemonByNameOrId } from '../services/api';

export function usePokemonDetail(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonByNameOrId(nameOrId);
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [nameOrId]);

  return { pokemon, loading, error };
}
