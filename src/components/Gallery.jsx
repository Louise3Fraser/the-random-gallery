import { useEffect, useState, useRef, useCallback } from "react";

export default function Gallery({
  setSelectedItem,
  filters,
  currentPage,
  setCurrentPage,
  setTotalPages,
  sidebarCollapsed,
}) {
  const [items, setItems] = useState([]);
  const galleryRef = useRef(null);
  const rowRef = useRef(null);

  function getColumnCount(width, collapsed) {
    if (collapsed) {
      if (width < 500) return 2;
      if (width < 700) return 3;
      if (width < 900) return 4;
      if (width < 1100) return 5;
      if (width < 1300) return 6;
      return 7;
    } else {
      if (width < 500) return 1;
      if (width < 700) return 2;
      if (width < 900) return 3;
      if (width < 1100) return 4;
      if (width < 1300) return 5;
      if (width < 1700) return 6;
      return 7;
    }
  }

  const [columnsPerRow, setColumnsPerRow] = useState(
    getColumnCount(window.innerWidth, sidebarCollapsed)
  );
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const calculateRowsPerPage = useCallback(() => {
    if (!galleryRef.current || !rowRef.current) {
      return 4; // default fallback
    }

    const galleryHeight = galleryRef.current.clientHeight;
    const rowHeight = rowRef.current.offsetHeight;

    if (rowHeight <= 0) {
      return 4; // fallback if row height not measured yet
    }

    const availableHeight = galleryHeight - 36;
    const calculatedRows = Math.floor(availableHeight / rowHeight);

    return Math.max(1, Math.min(calculatedRows, 10));
  }, []);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const applyFilters = (items) => {
    return items.filter((item) => {
      const categoryMatch =
        filters.category.length === 0 ||
        (Array.isArray(item.category)
          ? item.category.some((cat) => filters.category.includes(cat))
          : filters.category.includes(item.category));

      const cultureMatch =
        filters.culture.length === 0 ||
        (Array.isArray(item.culture)
          ? item.culture.some((cul) => filters.culture.includes(cul))
          : filters.culture.includes(item.culture));

      const colorMatch =
        filters.color.length === 0 ||
        (Array.isArray(item.color)
          ? item.color.some((col) => filters.color.includes(col))
          : filters.color.includes(item.color));

      return categoryMatch && cultureMatch && colorMatch;
    });
  };

  const filteredItems = applyFilters(items);

  useEffect(() => {
    const handleResize = () => {
      const newColumnCount = getColumnCount(
        window.innerWidth,
        sidebarCollapsed
      );
      setColumnsPerRow(newColumnCount);

      setTimeout(() => {
        const newRowsPerPage = calculateRowsPerPage();
        setRowsPerPage(newRowsPerPage);

        const newItemsPerPage = newColumnCount * newRowsPerPage;
        const newTotalPages = Math.ceil(filteredItems.length / newItemsPerPage);

        if (currentPage >= newTotalPages && newTotalPages > 0) {
          setCurrentPage(Math.max(0, newTotalPages - 1));
        }
      }, 50);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    sidebarCollapsed,
    calculateRowsPerPage,
    currentPage,
    setCurrentPage,
    filteredItems.length,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newRowsPerPage = calculateRowsPerPage();
      setRowsPerPage(newRowsPerPage);
    }, 100);
    return () => clearTimeout(timer);
  }, [columnsPerRow, calculateRowsPerPage]);

  const itemsPerPage = columnsPerRow * rowsPerPage;

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredItems.length / itemsPerPage);
    setTotalPages(newTotalPages);

    if (currentPage >= newTotalPages && newTotalPages > 0) {
      setCurrentPage(Math.max(0, newTotalPages - 1));
    }
  }, [
    filteredItems.length,
    itemsPerPage,
    setTotalPages,
    currentPage,
    setCurrentPage,
  ]);

  const getChunkedRows = () => {
    const start = currentPage * itemsPerPage;
    const pageItems = filteredItems.slice(start, start + itemsPerPage);
    const rows = [];

    for (let i = 0; i < pageItems.length; i += columnsPerRow) {
      rows.push(pageItems.slice(i, i + columnsPerRow));
    }

    return rows;
  };

  const chunkedRows = getChunkedRows();
  const currentRowCount = chunkedRows.length;
  const isSparsePage = currentRowCount < 3 || columnsPerRow < 3;

  useEffect(() => {
    if (chunkedRows.length > 0 && rowRef.current && galleryRef.current) {
      const timer = setTimeout(() => {
        const newRowsPerPage = calculateRowsPerPage();
        if (newRowsPerPage !== rowsPerPage) {
          setRowsPerPage(newRowsPerPage);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [chunkedRows.length, calculateRowsPerPage, rowsPerPage]);

  return (
    <div className="vertical">
      <div
        ref={galleryRef}
        className="gallery"
        style={{
          justifyContent: isSparsePage ? "flex-start" : "space-between",
        }}
      >
        {chunkedRows.map((row, rowIndex) => (
          <div
            ref={rowIndex === 0 ? rowRef : null}
            className="gallery-row"
            style={{
              justifyContent: isSparsePage ? "flex-start" : "space-between",
            }}
            key={rowIndex}
          >
            {row.map((item) => (
              <div
                key={item.id}
                className="thumbnail"
                style={{
                  flex: `1 1 calc((100% - ${
                    columnsPerRow - 1
                  } * 2rem) / ${columnsPerRow})`,
                  maxWidth: "175px",
                }}
                onClick={() => setSelectedItem(item)}
              >
                <p className="id-number">[{item.id}]</p>
                <div className="item-container">
                  <img
                    style={{ maxHeight: "140px" }}
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
