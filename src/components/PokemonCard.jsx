import { Link } from 'react-router-dom';

export default function PokemonCard({ name, url }) {
  const id = url ? extractId(url) : null;
  const imageUrl = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    : null;

  return (
    <Link to={`/pokemon/${name}`} className="pokemon-card">
      <div className="pokemon-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={name} loading="lazy" />
        ) : (
          <div className="no-image">?</div>
        )}
      </div>
      <div className="pokemon-card-info">

        <h3 className="pokemon-name">{name}</h3>
      </div>
    </Link>
  );
}

function extractId(url) {
  const parts = url.replace(/\/$/, '').split('/');
  return Number(parts[parts.length - 1]);
}
