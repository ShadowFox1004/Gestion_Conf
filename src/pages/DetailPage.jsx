import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetail(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return null;

  const stats = pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));

  const types = pokemon.types.map((t) => t.type.name);
  const abilities = pokemon.abilities.map((a) => a.ability.name);
  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="detail-card">
        <div className="detail-image">
          <img src={image} alt={pokemon.name} />
        </div>

        <div className="detail-info">

          <h1 className="pokemon-name">{pokemon.name}</h1>

          <div className="detail-types">
            {types.map((type) => (
              <span key={type} className={`type-badge type-${type}`}>{type}</span>
            ))}
          </div>

          <div className="detail-measurements">
            <div><strong>Altura:</strong> {pokemon.height / 10} m</div>
            <div><strong>Peso:</strong> {pokemon.weight / 10} kg</div>
          </div>

          <div className="detail-abilities">
            <h3>Habilidades</h3>
            <ul>{abilities.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>

          <div className="detail-stats">
            <h3>Estadísticas Base</h3>
            <div className="stats-bars">
              {stats.map((s) => (
                <div key={s.name} className="stat-row">
                  <span className="stat-label"><strong>{s.name}</strong></span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${Math.min(100, (s.value / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
