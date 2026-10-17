import { useEffect, useState } from "react";

const MIN_THUMB_WIDTH = 130; // px; a column is added once each cell can be at least this wide
const COLUMN_GAP = 32; // px; keep in sync with .gallery column-gap
const MAX_COLUMNS = 7;

// Tracks an element's content-box size. Returns a callback ref and the size.
function useElementSize() {
  const [element, setElement] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [setElement, size];
}

function matches(value, selected) {
  if (selected.length === 0) return true;
  return Array.isArray(value)
    ? value.some((v) => selected.includes(v))
    : selected.includes(value);
}

export default function Gallery({
  setSelectedItem,
  filters,
  currentPage,
  setCurrentPage,
  setTotalPages,
}) {
  const [items, setItems] = useState([]);
  const [galleryRef, gallerySize] = useElementSize();
  const [thumbRef, thumbSize] = useElementSize();

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItems = items.filter(
    (item) =>
      matches(item.category, filters.category) &&
      matches(item.culture, filters.culture) &&
      matches(item.color, filters.color)
  );

  // Every cell has the same width (CSS grid), so a thumbnail's height depends
  // only on the column count, never on which page is showing.
  const columns = Math.min(
    MAX_COLUMNS,
    Math.max(
      1,
      Math.floor(
        (gallerySize.width + COLUMN_GAP) / (MIN_THUMB_WIDTH + COLUMN_GAP)
      )
    )
  );
  const rows = thumbSize.height
    ? Math.max(1, Math.floor(gallerySize.height / thumbSize.height))
    : 1;
  const pageSize = columns * rows;
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const page = Math.min(currentPage, Math.max(0, totalPages - 1));

  useEffect(() => {
    setTotalPages(totalPages);
    if (page !== currentPage) setCurrentPage(page);
  }, [totalPages, page, currentPage, setTotalPages, setCurrentPage]);

  const pageItems = filteredItems.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="vertical">
      <div
        ref={galleryRef}
        className="gallery"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {pageItems.map((item, i) => (
          <div
            key={item.id}
            ref={i === 0 ? thumbRef : undefined}
            className="thumbnail"
            onClick={() => setSelectedItem(item)}
          >
            <p className="id-number">[{item.id}]</p>
            <div className="item-container">
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
