import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const {
    pokemon, loading, error, page, totalPages, nextPage, prevPage, goToPage,
  } = usePokemonList();

  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
    search,
  } = usePokemonSearch();

  const isSearchActive = searchResults !== null;
  const displayPokemon = isSearchActive
    ? searchResults.map((name) => ({ name, url: null }))
    : pokemon;

  const handleSearch = (term) => {
    search(term);
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Pokédex</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {searchLoading && <LoadingSpinner />}
      {!searchLoading && searchError && isSearchActive && <ErrorMessage message={searchError} />}

      {!isSearchActive && loading && <LoadingSpinner />}
      {!isSearchActive && error && <ErrorMessage message={error} />}

      {!isSearchActive && !loading && !error && (
        <>
          <div className="pokemon-grid">
            {displayPokemon.map((p) => (
              <PokemonCard key={p.name} name={p.name} url={p.url} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={prevPage}
            onNext={nextPage}
            onGoTo={goToPage}
          />
        </>
      )}

      {isSearchActive && !searchLoading && !searchError && (
        <div className="pokemon-grid">
          {displayPokemon.map((name) => (
            <PokemonCard key={name} name={name} url={null} />
          ))}
        </div>
      )}

      {isSearchActive && !searchLoading && searchResults && searchResults.length === 0 && (
        <ErrorMessage message="No se encontraron Pokémon con ese nombre." />
      )}
    </div>
  );
}
