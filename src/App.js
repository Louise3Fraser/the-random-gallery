import { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");

  const [filters, setFilters] = useState({
    category: [],
    culture: [],
    color: [],
  });

  const options = {
    category: [
      { value: "artifact", label: "Artifact" },
      { value: "natural", label: "Natural" },
      { value: "technology", label: "Technology" },
      { value: "currency", label: "Currency" },
      { value: "toy", label: "Toy/Game" },
      { value: "tool", label: "Tool" },
      { value: "furniture", label: "Furniture" },
      { value: "jewelry", label: "Jewelry" },
      { value: "art", label: "Art" },
    ],
    culture: [
      { value: "ancient", label: "Ancient" },
      { value: "modern", label: "Modern" },
      { value: "medieval", label: "Medieval" },
      { value: "american", label: "American" },
      { value: "asian", label: "Japanese" },
      { value: "european", label: "European" },
      { value: "unknown", label: "Unknown" },
    ],
    color: [
      { value: "red", label: "Red" },
      { value: "gold", label: "Gold" },
      { value: "pink", label: "Pink" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "orange", label: "Orange" },
      { value: "grey", label: "Grey"},
      { value: "multi", label: "Multi"}
    ],
  };
  return (
    <div className="app">
      <TopNav
        setSelectedItem={setSelectedItem}
        filters={filters}
        setFilters={setFilters}
        options={options}
      />
      <div className="main">
        <Sidebar selectedItem={selectedItem} />
        <Gallery setSelectedItem={setSelectedItem} filters={filters} />
      </div>
      <Footer />
      <img
        src="/images/paper-overlay.png"
        className="background-overlay"
        alt=""
      />
    </div>
  );
}

export default App;
