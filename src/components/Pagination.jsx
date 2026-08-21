export default function Pagination({ page, totalPages, onPrev, onNext, onGoTo }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible);
    if (end - start < maxVisible) start = Math.max(0, end - maxVisible);
    for (let i = start; i < end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={onPrev}>
        Anterior
      </button>

      {getPageNumbers().map((num) => (
        <button
          key={num}
          className={num === page ? 'active' : ''}
          onClick={() => onGoTo(num)}
        >
          {num + 1}
        </button>
      ))}

      <button disabled={page >= totalPages - 1} onClick={onNext}>
        Siguiente
      </button>
    </div>
  );
}
