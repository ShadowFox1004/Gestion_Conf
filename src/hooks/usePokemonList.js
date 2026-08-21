import { useState, useEffect, useCallback } from 'react';
import { getPokemonList } from '../services/api';

const PAGE_SIZE = 20;

export function usePokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const fetchPage = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const offset = pageNum * PAGE_SIZE;
      const data = await getPokemonList(PAGE_SIZE, offset);
      setPokemon(data.results);
      setCount(data.count);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  const nextPage = () => {
    if (page < totalPages - 1) fetchPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) fetchPage(page - 1);
  };

  const goToPage = (num) => {
    if (num >= 0 && num < totalPages) fetchPage(num);
  };

  return {
    pokemon, loading, error, page, totalPages, nextPage, prevPage, goToPage,
  };
}
