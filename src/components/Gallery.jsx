import { useEffect, useState } from "react";

export default function Gallery({
  setSelectedItem,
  filters,
  currentPage,
  setCurrentPage,
  setTotalPages,
  sidebarCollapsed,
}) {
  const [items, setItems] = useState([]);

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

//     function getRowCount(height) {
//       if (height < 500) return 2;
//       if (height < 700) return 3;
//       if (height < 900) return 4;
//       if (height < 1100) return 5;
//       if (height < 1300) return 6;
//       return 7;
//     }
//   }

  const [columnsPerRow, setColumnsPerRow] = useState(
    getColumnCount(window.innerWidth, sidebarCollapsed)
  );

  useEffect(() => {
    const handleResize = () => {
      const newCount = getColumnCount(window.innerWidth, sidebarCollapsed);
      setColumnsPerRow(newCount);
      setCurrentPage(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarCollapsed]);

  const rowsPerPage = 4;
  const itemsPerPage = columnsPerRow * rowsPerPage;

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
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems, itemsPerPage]);

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

  return (
    <div class="vertical">
      <div
        className="gallery"
        style={{
          justifyContent: isSparsePage ? "flex-start" : "space-between",
        }}
      >
        {chunkedRows.map((row, rowIndex) => (
          <div className="gallery-row"  style={{
          justifyContent: isSparsePage ? "flex-start" : "space-between",
        }} key={rowIndex}>
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
                  <img style={{maxHeight: "140px"}} src={item.image} alt={item.title} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
