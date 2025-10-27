export default function Footer({ currentPage, totalPages, onPageChange }) {
  return (
    <footer className="footer">
      <span className="footer-links">
        <p className="p-grey"> © Louise Fraser 2025</p>

        <a
          href="https://www.linkedin.com/in/louise-fraser-379b0b251/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="https://louisebfraser.com" target="_blank" rel="noreferrer">
          Portfolio
        </a>
      </span>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-button ${i === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </footer>
  );
}
