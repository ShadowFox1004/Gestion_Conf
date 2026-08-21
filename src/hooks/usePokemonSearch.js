import { useState, useCallback, useRef } from 'react';
import { getAllPokemonNames } from '../services/api';

export function usePokemonSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const allNamesRef = useRef(null);

  const search = useCallback(async (term) => {
    const q = term.trim().toLowerCase();
    setQuery(q);
    if (!q) {
      setResults(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (!allNamesRef.current) {
        allNamesRef.current = await getAllPokemonNames();
      }

      const filtered = allNamesRef.current.filter((name) =>
        name.includes(q)
      );
      setResults(filtered);
      if (filtered.length === 0) {
        setError('Sin resultados');
      }
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { query, results, loading, error, search };
}
