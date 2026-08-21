import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button type="button" className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}
      <button type="submit" className="search-btn">Buscar</button>
    </form>
  );
}
