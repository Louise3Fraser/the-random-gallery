import { useEffect, useState } from "react";

export default function Gallery({ setSelectedItem }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="gallery">
      {items.map((item) => (
        <div
          key={item.id}
          className="thumbnail"
          onClick={() => setSelectedItem(item)}
        >
          <span className="id-number">[{item.id}]</span>
          <div className="item-container">
            <img src={item.image} alt={item.title} />
          </div>
        </div>
      ))}
    </div>
  );
}
