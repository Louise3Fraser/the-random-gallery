import { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";
import WelcomeScreen from "./components/Welcome";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth < 800
  );

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const [filters, setFilters] = useState({
    category: [],
    culture: [],
    color: [],
  });

  const options = {
    category: [
      { value: "artifact", label: "Artifact" },
      { value: "natural", label: "Natural" },
      { value: "edible", label: "Edible" },
      { value: "technology", label: "Tech" },
      { value: "currency", label: "Currency" },
      { value: "toy", label: "Toy/Game" },
      { value: "tool", label: "Tool" },
      { value: "furniture", label: "Furniture" },
      { value: "jewelry", label: "Jewelry" },
      { value: "art", label: "Art" },
      { value: "sports", label: "Sports" },
      { value: "outerspace", label: "Space" },
    ],
    culture: [
      { value: "ancient", label: "Ancient" },
      { value: "modern", label: "Modern" },
      { value: "medieval", label: "Medieval" },
      { value: "american", label: "American" },
      { value: "russian", label: "Russian" },
      { value: "asian", label: "Japanese" },
      { value: "european", label: "European" },
      { value: "greek", label: "Greek" },
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
      { value: "grey", label: "Grey" },
      { value: "white", label: "White" },
      { value: "multi", label: "Multi" },
      { value: "silver", label: "Silver"},
      { value: "rainbow", label: "Rainbow" },
    ],
  };
  return (
    <>
      {showOverlay && (
        <div className="intro-overlay">
          <WelcomeScreen />
        </div>
      )}
      <div className="app">
        <TopNav
          setSelectedItem={setSelectedItem}
          filters={filters}
          setFilters={setFilters}
          options={options}
        />
        <div className={`main ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
          <Sidebar
            selectedItem={selectedItem}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          <Gallery
            setSelectedItem={setSelectedItem}
            filters={filters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setTotalPages={setTotalPages}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <img
          src="/images/paper-overlay.png"
          className="background-overlay"
          alt=""
        />
      </div>
    </>
  );
}

export default App;
