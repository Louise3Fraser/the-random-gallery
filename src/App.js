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
      // ...
    ],
    culture: [
      { value: "greek", label: "Greek" },
      { value: "japanese", label: "Japanese" },
      // ...
    ],
    color: [
      { value: "red", label: "Red" },
      { value: "gold", label: "Gold" },
      // ...
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
        <Gallery setSelectedItem={setSelectedItem} filters={filters} />{" "}
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
